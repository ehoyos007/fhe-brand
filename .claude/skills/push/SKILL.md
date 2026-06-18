---
name: push
status: shipped
description: >-
  Commit & push (ruleset-aware) — auto wrap-up if stale, commit, push the current branch; consolidates merged-branch shards when on main. Use when the user says "/push", "push it", "push to main", "commit and push", "ship it", or "ship".
---

# /push — Commit & Push (Ruleset-Aware)

Commit current work and get it to its destination — the current branch's remote, OR all the way to `main` when working from a worktree branch under a status-check ruleset. Detects active branch protection and runs the right flow automatically.

## Triggers
- `/push`
- `push it`
- `push to main`
- `commit and push`
- `ship it`
- `ship`

## Flags
- `--no-consolidate` — skip Step 5. Useful when you don't want shard processing during a quick push.
- `--consolidate-only` — run Step 5 without a new push. Sweeps the shard backlog. Requires that something already landed on `$DEFAULT_BRANCH`; if HEAD on the worktree branch isn't yet on origin/main, refuse with an error.

## Workflow

### Step 0: Identity

```bash
WORKTREE_ROOT=$(git rev-parse --show-toplevel)
BRANCH=$(git branch --show-current)
COMMON_GIT_DIR=$(git rev-parse --git-common-dir)
CANONICAL_ROOT=$(cd "$(dirname "$COMMON_GIT_DIR")" && pwd)
SHARD_KEY=$(echo "${BRANCH:-detached-$(git rev-parse --short HEAD)}" | tr '/' '-')
DEFAULT_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's@^refs/remotes/origin/@@' || echo main)
```

### Step 1: Branch-Scoped Freshness Check

Read `.claude/handoffs/$SHARD_KEY.md` (NOT `.claude/handoff.md` — that singular path is deprecated).
Read `.claude/sessions/$SHARD_KEY.md`.

**Wrap-up is stale if ANY of these are true:**
- No branch shard exists for `$SHARD_KEY`
- Branch shard's last `## Session` block doesn't reflect changes in `git diff --stat HEAD`
- Branch handoff missing OR timestamp >30min old AND there are new uncommitted changes

**If stale:** Run the full `/wrap-up` workflow before continuing. Announce: "Running wrap-up first — changes detected since last save."

**If fresh:** Skip to Step 2. Announce: "Wrap-up is current. Pushing $BRANCH."

### Step 1.5: CodeRabbit Gate (asynchronous — hook-enforced)

**You do not run a synchronous CodeRabbit pass here.** As of 2026-06-18 the gate is async and enforced by harness hooks, so the push is never delayed by a multi-minute review:

- A **PostToolUse hook** (`coderabbit-push-trigger.sh`) fires a **detached** CodeRabbit review the moment the branch push lands (Step 4a/4c/4d). The push returns immediately.
- The review's verdict **surfaces at the user's next turn** via a UserPromptSubmit hook (🟢 clean / 🔴 BLOCKING + finding count + report path).
- If the review found anything, a per-branch **block marker** is written; a **PreToolUse hook** (`coderabbit-merge-gate.sh`) then **denies the promote-to-main** push / `gh pr merge` until `/coderabbit-fix` clears it.

So /push's only obligations are:
- **Don't fight the gate.** If a promote push in Step 4c is denied by the merge-gate, that's the gate working — relay its message (run `/coderabbit-fix`) and stop; do not retry or bypass.
- **Optional pre-clean:** the user may run `/coderabbit-fix` *before* /push to clean the diff ahead of the background review. Not required — the hook reviews regardless.

This keeps the COLLABORATION.md floor intact: integration→main stays gated, and nothing reaches `main` while a CodeRabbit block marker is unresolved. The gate fires on every push (bare `git push` included), not just pushes that go through this skill.

### Step 2: Stage & Commit

1. Check for changes:
```bash
git status --porcelain
```
If clean (nothing to commit AND nothing to push), report "Nothing to push — working tree clean and branch in sync." and exit.

2. Stage all changes (review for .env, credentials, large binaries — skip those):
```bash
git add -A
```

3. Generate a commit message using Conventional Commits:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `refactor:` for refactors
   - `chore:` for config/tooling
   - `docs:` for documentation
   - Read TASKS.md and the branch shard for context on what was accomplished

4. Commit:
```bash
git commit -m "$(cat <<'EOF'
<type>: <description>

<optional body — what and why, not how>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Step 2.5: FHE Artifact Auto-Push (fhe-hq Files)

Before pushing code, publish any standalone **deliverable** artifacts this session produced (in an FHE context) to the fhe-hq Files page so they appear automatically.

**Gate (all must hold):**
- FHE context — worktree under `~/Projects/FirstHealth/`, or the repo is an FHE repo.
- A shareable deliverable you created — report, briefing, deck, dashboard, standalone `.html`/`.md`/`.pdf`/`.json`/image.

**Never push:** project docs (TASKS.md, PROGRESS.md, CONTEXT.md, PLAN.md, BRAIN.md, VISION.md, CLAUDE.md, session shards, handoffs), source code, configs, `.claude/*`, scratch/backup files. When unsure, skip.

For each deliverable (absolute path):
```bash
bash ~/.claude/skills/_lib/fhe-hq-file-push.sh "<abs-path>" --name "<human title>" --tags "<comma,tags>"
```
The shared engine self-gates (FHE-path + exclusion list), auto-detects `file_type`, uploads to the public `fhe-files` bucket, and upserts the `public.fhe_files` row — idempotent on `storage_path`. Exit codes: `0` pushed · `3` gate skip (stay silent) · `4`/`5` key/upload error (surface it).

> The `fhe-files` bucket is PUBLIC-read — anything pushed is fetchable by URL. Push only share-intended artifacts.

### Step 3: Detect Target & Ruleset

Decide the destination and whether the destination is gated.

```bash
# What repo are we on (GitHub-only — fail open for other hosts).
REPO=""
if command -v gh >/dev/null 2>&1; then
  REPO=$(gh repo view --json nameWithOwner --jq .nameWithOwner 2>/dev/null || echo "")
fi

# Does the default branch have an active required-status-checks rule?
RULESET_PRESENT=false
REQUIRED_CHECKS=""
if [ -n "$REPO" ]; then
  RULES=$(gh api "repos/$REPO/rules/branches/$DEFAULT_BRANCH" 2>/dev/null || echo "[]")
  if echo "$RULES" | grep -q '"type":"required_status_checks"'; then
    RULESET_PRESENT=true
    REQUIRED_CHECKS=$(echo "$RULES" \
      | python3 -c "import sys,json; r=[x for x in json.load(sys.stdin) if x['type']=='required_status_checks'][0]; print(', '.join(c['context'] for c in r['parameters']['required_status_checks']))" 2>/dev/null || echo "")
  fi
fi
```

Pick the flow:
- **On default branch, no ruleset** → Step 4a (single push to `$DEFAULT_BRANCH`).
- **On default branch, ruleset present** → Step 4b (refuse, advise worktree).
- **On a non-default branch, ruleset present** → Step 4c (two-push promote to `$DEFAULT_BRANCH`).
- **On a non-default branch, no ruleset** → Step 4d (push branch only; no auto-promote without an explicit signal).

Announce the chosen flow before executing it: "Detected ruleset on $DEFAULT_BRANCH (checks: $REQUIRED_CHECKS) — running two-push promote." or similar.

### Step 4a: Single push to default branch

```bash
git push -u origin "$BRANCH"
```

If push is rejected (behind remote):
```bash
git pull --rebase origin "$BRANCH"
git push origin "$BRANCH"
```

### Step 4b: On default branch with ruleset — refuse

The ruleset rejects any push to `$DEFAULT_BRANCH` whose SHA hasn't been built. A SHA you commit directly on `$DEFAULT_BRANCH` has never lived on a remote, so CI has never run on it. Pushing it would always fail.

Tell the user:
> You're on `$DEFAULT_BRANCH` and `$REPO` enforces required status checks ($REQUIRED_CHECKS). I can't push directly. Move this work to a worktree branch (use `EnterWorktree`), commit there, and re-run /push — it'll do the two-push promote flow automatically.

Stop. Do not push.

### Step 4c: Two-push promote to default branch

Push the worktree/feature branch first so CI runs on its SHA, then push that same SHA to `$DEFAULT_BRANCH` once green.

1. Push the branch to its own remote:
```bash
git push -u origin "$BRANCH"
```

2. Wait for CI:
```bash
HEAD_SHA=$(git rev-parse HEAD)
"$HOME/.claude/skills/push/scripts/wait-for-ci.sh" "$REPO" "$HEAD_SHA"
WAIT_EXIT=$?
```

The helper exits 0 on green, 1 on red, 2 on timeout, 3 on tool/arg error, 4 if no run ever appeared. Each exit code has a different recovery:

- **0 (green)**: continue to step 3.
- **1 (failed)**: report the failed jobs (already printed by helper). Stop. Do NOT push to `$DEFAULT_BRANCH`. Tell the user to fix and re-run /push.
- **2 (timeout)**: tell the user the run is still in progress at `https://github.com/$REPO/actions`. Stop without pushing — they can re-run /push once it lands.
- **3 (tool error)**: report. Stop.
- **4 (no run)**: the workflow doesn't fire on the source branch. Either expand the workflow trigger (`on: push:` without branch filter) or use Step 4d. Stop.

3. Push the same SHA to `$DEFAULT_BRANCH`:
```bash
git push origin "HEAD:$DEFAULT_BRANCH"
```

If this push is rejected, the ruleset rejected it for a reason the wait helper didn't catch (e.g., a check requirement we don't know about). Print the git error verbatim and stop.

### Step 4d: Branch push without auto-promote

No ruleset present. Just push the current branch. Don't promote — without a signal that the user wants this on `$DEFAULT_BRANCH`, push only the branch they're on:

```bash
git push -u origin "$BRANCH"
```

In the report, tell the user the branch is pushed but not promoted. They can use `gh pr create` or merge manually if they want it on `$DEFAULT_BRANCH`.

### Step 5: Shard Consolidation (auto, no prompt)

This step fires after Step 4a or Step 4c successfully landed a commit on `$DEFAULT_BRANCH`. Skip otherwise.

**Default behavior:** auto-consolidate every shard whose branch is reachable from `origin/$DEFAULT_BRANCH`. No yes/no prompt per shard — the prompt is what historically caused backlog buildup (the interview got skipped to avoid derailing the push, then shards piled up). Reasons to override:

- **`/push --no-consolidate`** → skip Step 5 entirely. Branches stay in `.claude/sessions/` for a future cleanup pass.
- **`/push --consolidate-only`** → run Step 5 without a new push. Used to drain a backlog. Requires that something already landed on `$DEFAULT_BRANCH`.

List unconsolidated shards:
```bash
ls .claude/sessions/*.md 2>/dev/null | grep -v "${DEFAULT_BRANCH}\.md$" | grep -v '/_archive/'
```

For each shard file `.claude/sessions/<feature>.md`, run the resolution ladder. The goal is to bucket every shard into exactly one of three outcomes: **consolidate** (write PROGRESS.md entry + archive), **abandoned** (archive without writing), or **skip** (leave for next /push).

**Ladder:**

1. **Direct ancestor check** (cheap, covers normal merges):
```bash
git fetch origin "$DEFAULT_BRANCH" --quiet 2>/dev/null
if git show-ref --verify --quiet "refs/heads/<feature>"; then
  git merge-base --is-ancestor "refs/heads/<feature>" "origin/$DEFAULT_BRANCH" && MERGED=1
fi
```
If MERGED=1 → bucket: **consolidate**. Find the merge commit:
```bash
git log "origin/$DEFAULT_BRANCH" --grep="<feature>" --oneline | head -1
```

2. **By-name git-log search** (fallback when the local ref is gone — worktree removed, branch deleted, or squash-merged):
```bash
git log "origin/$DEFAULT_BRANCH" --grep="<feature>" --oneline | head -1
git log "origin/$DEFAULT_BRANCH" --merges --grep="<feature>" --oneline | head -1
```
If either returns a hit → bucket: **consolidate** with that SHA as the merge commit.

3. **By-keyword search** (squash-merged commits often drop the branch name; reconstruct from shard content):
   - Read 2-3 distinctive keywords from the shard (file paths, feature name, decision phrases).
   - `git log origin/$DEFAULT_BRANCH --since=<first-session-date> --until=<last-session-date+14d> --oneline | grep -iE "<keyword1>|<keyword2>"`
   - If a plausible SHA matches AND the shard's last session date is within 14 days of the commit → bucket: **consolidate** with that SHA.

4. **Age check** (no merge evidence found):
   - Compute shard age: `now - last_session_date` from the shard content.
   - If age > 90 days → bucket: **abandoned**. Move to `.claude/sessions/_archive/abandoned/<feature>-YYYYMMDD.md`. Do NOT write to PROGRESS.md.
   - If age ≤ 90 days → bucket: **skip** (might still merge later). Leave in place, surface in Step 6 report.

**For each `consolidate` bucket**, generate ONE unified PROGRESS.md entry — synthesize a coherent narrative, NOT stacked "Session 1, Session 2" blocks:

```markdown
## <feature> — merged YYYY-MM-DD (<PR# or SHA>)
**Branch:** <feature>
**Sessions:** <N> (<first: date> → <last: date>)

**Summary:** <2-4 sentence unified narrative synthesized from all session blocks in the shard. What was built, why, where it landed.>

**Decisions:**
- <merged decision list, deduplicated>

**Shipped in:** <commit SHAs / PR number from the ladder>
```

Append to PROGRESS.md (chronological — newer entries at the bottom).

Archive the shard and remove the handoff:
```bash
mkdir -p .claude/sessions/_archive
git mv .claude/sessions/<feature>.md .claude/sessions/_archive/<feature>-$(date +%Y%m%d).md
[ -f .claude/handoffs/<feature>.md ] && git rm .claude/handoffs/<feature>.md
```

**For each `abandoned` bucket**, archive without PROGRESS.md write:
```bash
mkdir -p .claude/sessions/_archive/abandoned
git mv .claude/sessions/<feature>.md .claude/sessions/_archive/abandoned/<feature>-$(date +%Y%m%d).md
[ -f .claude/handoffs/<feature>.md ] && git rm .claude/handoffs/<feature>.md
```

**For each `skip` bucket**, no action. Surface in Step 6 report so the user knows what's pending.

After all shards processed, commit + push the consolidation through whichever flow Step 3 picked (4a or 4c). Single consolidation commit — don't fragment per-shard.

**Narrative-quality threshold:** if you can't synthesize a coherent narrative from the shard content (truncated, no decisions section, no work-done section), bucket the shard as **archive-only** instead — write a one-line PROGRESS entry pointing at the merge SHA and skip the narrative. Honest absence > fake coherence.

### Step 6: Report

```
Pushed: <source SHA> → origin/<destination>
Branch: $BRANCH
Flow:   <4a single-push | 4c promote | 4d branch-only>
Commit: <hash> — <message>
Files:  <N pushed to fhe-hq Files — list each link | none>
```

If Step 5 ran, report each bucket separately:
```
Consolidated into PROGRESS.md:
- <feature> (N sessions → 1 entry, merged in <SHA>)

Abandoned (archived without narrative, >90 days no merge):
- <feature> → _archive/abandoned/

Skipped (no merge evidence yet, <90 days old):
- <feature>

Archived shards: .claude/sessions/_archive/
```

If on default branch and `.vercel/project.json` exists, and 4a or 4c succeeded:
```
Deploy: Vercel auto-deploying from $DEFAULT_BRANCH
```

## Rules

- The default destination is `$DEFAULT_BRANCH` whenever the source branch is non-default AND a ruleset is present (Step 4c). Otherwise default is the current branch's own remote.
- NEVER bypass a ruleset. If a check fails, stop and report — let the user fix, not the skill.
- NEVER force-push, NEVER `--no-verify`. If a push is rejected, investigate; don't override.
- ONLY write to PROGRESS.md during shard consolidation, never during normal pushes.
- Consolidation produces ONE unified narrative entry per branch, not stacked "Session N" blocks.
- Step 5 runs automatically with NO yes/no prompt per shard. The resolution ladder (ancestor → by-name → by-keyword → age) decides each shard's bucket. Override with `--no-consolidate` or run drain-only with `--consolidate-only`.
- Abandoned shards (>90 days, no merge evidence) move to `.claude/sessions/_archive/abandoned/` without a PROGRESS.md write. Honest absence > fake coherence.
- The wait-for-CI helper has a 10-min default timeout — long enough for the typical CI run with a buffer, short enough that a stuck pipeline doesn't block the user indefinitely. Re-running /push picks up where the wait left off (the branch is already pushed; the second wait will see the existing run).
- Detection of `$REPO` and rulesets via `gh` is fail-open — if `gh` isn't installed or the repo isn't on GitHub, fall back to Step 4a / 4d behavior (push to remote of the current branch).
- NEVER push .env files, credentials, or secrets.
- If git push fails with auth errors, tell the user the specific fix.
- If rebase produces merge conflicts, stop and help resolve — don't force-push.
- Co-Authored-By trailer on every commit.
- FHE-deliverable auto-push (Step 2.5) runs via `_lib/fhe-hq-file-push.sh` (shared engine, single gating source) — FHE context only, never docs/source/configs/scratch. The `fhe-files` bucket is public; publish only share-intended artifacts.

---

## ⚠️ FHE TEAM OVERRIDES

**Read `COLLABORATION.md` at repo root. These SUPERSEDE the generic steps above for FHE repos.** Three devs share these repos — Enzo `@enzo` (admin, exempt), Mark `@mark` (write), Mike `@mike` (write). `main` is PR-gated.

1. **`main` is never a direct push target for Mark/Mike.** Skip the Step 3 ruleset routing — do NOT run Step 4a/4b/4c. `/push` here is **branch-only**: push the current feature branch to its own remote, then **open or update its PR** targeting `main` with Enzo as reviewer.
   ```bash
   git fetch origin
   git pull --rebase origin "$BRANCH" 2>/dev/null   # only if branch has a remote
   git push -u origin "$BRANCH"
   gh pr view --json url --jq .url 2>/dev/null \
     || gh pr create --base main --reviewer ehoyos007 \
        --title "<type>: <desc>" \
        --body "$(printf '## Summary\n- ...\n\n## Test plan\n- [ ] ...\n')"
   ```
   On `main` locally: refuse to commit there. Move work to a `<type>/<dev>-<desc>` branch (COLLABORATION.md §2) and re-run. **Enzo (admin) may push direct for urgent fixes**, but defaults to the PR flow.

2. **Sync before push.** Always `git fetch` first; if behind, `git pull --rebase` then push. **Never `--force`** a branch with an open PR; `--force-with-lease` only on your own un-reviewed branch.

3. **Step 5 consolidation runs only after a PR MERGES to `main`.** Merges are squash on GitHub, so local ancestor detection misses — rely on the by-name / by-keyword ladder. Run from an up-to-date `main` (`git checkout main && git pull && /push --consolidate-only`) after PRs land. Never consolidate from a feature branch. PROGRESS.md uses the `by:@author` + `Devs:` format (COLLABORATION.md §7).

4. **Step 2.5 (fhe-hq artifact push) stays ACTIVE** — this IS an FHE repo, so share-intended deliverables you create may publish to the fhe-hq Files page. It self-gates (exit 3 = silent skip if `_lib/fhe-hq-file-push.sh` is absent on this machine). Never push docs/source/configs/scratch.

5. **Carve-outs:** `fhe-hermes` is local-only → no PR, commit locally. `carriernest-source` is a third-party mirror → don't push it; do real work on `kritibh-sys/carriernest`. (COLLABORATION.md §10)
