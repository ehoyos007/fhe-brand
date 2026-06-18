---
name: commit
status: shipped
description: >-
  Checkpoint, commit & continue (branch-aware) — mini wrap-up to the branch shard + local commit + background test + advance to next task. Use when the user says "/commit", "commit this", "commit and continue", "save and continue", "mark this done", or "task done".
---

# /commit — Checkpoint, Commit & Continue (Branch-Aware)

Mini wrap-up to the BRANCH SHARD (not PROGRESS.md) + local commit + background test + advance to next AVAILABLE task. Respects parallel-worktree task claims via TASKS.md annotations.

## Triggers
- `/commit`
- `commit this`
- `commit and continue`
- `save and continue`
- `mark this done`
- `task done`

## Workflow

### Step 0: Identity

```bash
WORKTREE_ROOT=$(git rev-parse --show-toplevel)
BRANCH=$(git branch --show-current)
COMMON_GIT_DIR=$(git rev-parse --git-common-dir)
CANONICAL_ROOT=$(cd "$(dirname "$COMMON_GIT_DIR")" && pwd)
CANONICAL_NAME=$(basename "$CANONICAL_ROOT")
SHARD_KEY=$(echo "${BRANCH:-detached-$(git rev-parse --short HEAD)}" | tr '/' '-')
```

### Step 1: Mini Wrap-Up to Shard

1. **TASKS.md** — Check off the current task with branch annotation:
```markdown
- [x] Task description (done: $BRANCH @ YYYY-MM-DD HH:MM)
```

2. **Branch Shard** — APPEND to `$WORKTREE_ROOT/.claude/sessions/$SHARD_KEY.md` (NOT PROGRESS.md):
```markdown
### <task name> — YYYY-MM-DD HH:MM
- <what was done in 1-2 bullets>
- <key decision if any>
```

3. **Brain capture** — ONE capture only, and ONLY if a meaningful decision or insight happened. Skip for routine implementation. Prefix `text` with:
```
[branch:$BRANCH | wt:$(basename $WORKTREE_ROOT) | project:$CANONICAL_NAME]
<the actual capture text>
```
Set `source: "commit"`, `project_ref: $CANONICAL_NAME`.

### Step 1.5: FHE Artifact Auto-Push (fhe-hq Files)

If this checkpoint produced a standalone **deliverable** artifact in an FHE context (worktree under `~/Projects/FirstHealth/`, or `$CANONICAL_NAME` is an FHE repo), publish it to the fhe-hq Files page:
```bash
bash ~/.claude/skills/_lib/fhe-hq-file-push.sh "<abs-path>" --name "<human title>" --tags "<comma,tags>"
```
Only shareable deliverables (report/briefing/deck/dashboard/standalone html|md|pdf|json|image). NEVER project docs (TASKS.md, PROGRESS.md, etc.), source, configs, `.claude/*`, or scratch/backup files. The engine self-gates + is idempotent on `storage_path`. Exit `3` = gate skip (stay silent); `4`/`5` = surface the error. Bucket is PUBLIC — share-intended only. Don't let this delay the commit.

### Step 2: Commit Locally

```bash
CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
```

If changes exist:
```bash
git add -A
git commit -m "$(cat <<'EOF'
<type>: <description of completed task>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

Do NOT push. Local commit only — pushing happens with `/push`.

If no changes: skip commit, note "No changes to commit."

### Step 3: Background Test

Spawn a background agent to run:
```
lint + types + build (NOT full E2E — that's /test)
```

If `WORKTREE_ROOT != CANONICAL_ROOT` AND the project shares `node_modules` across worktrees (symlink, CoW, or shared volume), serialize the test using a soft mutex at `$CANONICAL_ROOT/.claude/test.lock` — wait up to 30s for the lock to clear before proceeding. If still locked after 30s, skip the test for this commit and note "Test skipped — sibling worktree holds test.lock."

- If it passes: silent — don't interrupt the main flow
- If it fails: notify with the specific error so it can be addressed

Do NOT wait for the test to finish before continuing.

### Step 4: Check Plan Status — Skip Claimed Tasks

Read TASKS.md and/or PLAN.md to find the next task.

**Next available task = first unchecked task with no `(in-progress: <other-branch>)` annotation, OR an annotation matching `$BRANCH`.**

If a task is annotated `(in-progress: <other-branch> @ ...)` and `<other-branch>` is NOT this branch, **skip it**. Surface skipped claims to the user:
```
Next available task: <task name>
Skipped (claimed by other branch):
- <task> — in-progress on <branch> since <time>
```

If ALL remaining tasks are claimed by other branches:
```
All remaining tasks claimed by other branches:
- <list with branch + time>
No work available on this branch — coordinate with the other branch, start a new task, or end the session.
```
Stop. Do NOT auto-advance into a claimed task.

If a task IS available, mark it in-progress (claim it) and IMMEDIATELY start working on it:
```markdown
- [~] Next task description (in-progress: $BRANCH @ YYYY-MM-DD HH:MM)
```

**If tasks remain (and one is available):**
```
Committed: <hash> — <message>
Progress: <X/Y tasks in current phase>
Claimed: <next task> (in-progress: $BRANCH)
Files: <pushed to fhe-hq Files — link | omit line if none>
Next: <next task description>
---
```
Then IMMEDIATELY start working on the next task. Do not wait for confirmation.

**If current phase is complete but more phases exist:**
```
Phase complete: <phase name> (<X/X tasks>)
Next phase: <phase name>
First task: <task description>
---
```
Then IMMEDIATELY start the next phase.

**If ALL tasks/phases are complete:**
```
Plan complete — all tasks finished.

  [1] Start a new plan (describe what's next)
  [2] Wrap up + push to main (/push)
```
Use AskUserQuestion to present these options. Do NOT auto-continue — the user decides what happens after a plan is done.

## Rules

- NEVER write to PROGRESS.md from /commit. Always to the branch shard at `.claude/sessions/$SHARD_KEY.md`.
- NEVER push to remote — this is a local checkpoint only.
- NEVER run full /wrap-up — keep it brief (TASKS.md + shard append + maybe 1 brain capture).
- ALWAYS respect `(in-progress: <other-branch>)` annotations as soft locks on TASKS.md.
- ALWAYS claim a task with `[~]` + annotation when starting it, so parallel sessions see the claim.
- ALWAYS use `$CANONICAL_NAME` for brain `project_ref` — never the worktree basename.
- Two branches checking off the same task will conflict on the annotation at merge — that's the intended signal, don't pre-resolve it.
- Background test acquires the test.lock soft mutex when worktree shares caches with canonical root.
- NEVER stop mid-plan to ask for confirmation — the point is momentum.
- ALWAYS continue to the next available task immediately (unless plan is done or all tasks are claimed elsewhere).
- Background test runs in parallel — don't block on it.
- Keep the checkpoint output to 3-5 lines — speed bump, not a wall.
- If TASKS.md doesn't exist, check PLAN.md. If neither exists, just commit and tell the user there's no plan to advance through.
- FHE-deliverable auto-push runs via `_lib/fhe-hq-file-push.sh` (shared engine, the single gating source) — FHE context only, never docs/source/configs/scratch, never blocks the commit.

---

## ⚠️ FHE TEAM OVERRIDES

**Read `COLLABORATION.md`. Three devs share this repo (Enzo `@enzo`, Mark `@mark`, Mike `@mike`).** These supersede the generic steps where they conflict.

1. **Pull before you claim the next task.** `git fetch origin && git pull --rebase origin main 2>/dev/null` so you see teammates' `(in-progress: … @other)` claims — a claim is only visible after a pull.
2. **Claims carry a dev tag** (derive `@enzo`/`@mark`/`@mike` from `git config user.email` per COLLABORATION.md §1):
   ```
   - [~] <next task>  ·  by:@<creator>  →:@<you>  (in-progress: $BRANCH @<you> @ YYYY-MM-DD HH:MM)
   ```
   Skip any task claimed by another dev.
3. **Brain capture is best-effort.** Route to the **FHE SharedBrain** (`capture_thought`, brain_id `fhe`) — **never** PureProfit/TLE/personal. If the MCP is unavailable on this machine, **do not error** — append the one-liner to `BRAIN.md` → `## Session Log`. Every dev always writes the `BRAIN.md` line.
4. **Local commit only, never push** (unchanged). Shipping is `/pr`.
