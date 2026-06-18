---
name: pickup
description: "Pick up where you left off — branch-aware. Reads the current branch's shard + handoff (.claude/sessions/<branch>.md, .claude/handoffs/<branch>.md), PROGRESS.md (merged-work record), TASKS.md (with claim annotations), BRAIN.md, VISION.md, CONTEXT.md, checks recent brain captures keyed by canonical project name, scans git status, detects abandoned work, surfaces other branches in flight, and presents a concise briefing. Use when the user says \"/pickup\", \"pick up where I left off\", \"let's continue\", \"what's next\", \"where were we\", \"catch me up\", or \"what was I working on\"."
---

# Pickup — Pick Up Where You Left Off (Branch-Aware)

Load all relevant context for the current project AND current branch, present a briefing that lets the user pick up exactly where the last session on this branch left off. Agent-View-aware — surfaces other branches in flight without conflating them.

## When to Use

- `/pickup` — run the resume briefing
- "let's continue" / "pick up where we left off" / "where were we"
- "what's next" / "what was I working on"
- At the start of any session where prior work exists

## Instructions

### Step 0: Identity (Worktree-Aware)

```bash
WORKTREE_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
BRANCH=$(git branch --show-current 2>/dev/null)
COMMON_GIT_DIR=$(git rev-parse --git-common-dir 2>/dev/null)
CANONICAL_ROOT=$(cd "$(dirname "$COMMON_GIT_DIR")" 2>/dev/null && pwd)
CANONICAL_NAME=$(basename "$CANONICAL_ROOT" 2>/dev/null)
SHARD_KEY=$(echo "${BRANCH:-detached}" | tr '/' '-')
```

`CANONICAL_NAME` is the project identity — used for ALL brain queries. NEVER substitute `basename($WORKTREE_ROOT)` (that would be the worktree name inside a worktree).

If we're in `~/Projects` root (not a project), tell the user and ask which project to resume.

---

### Step 1: Branch-Scoped Handoff — Resolution Ladder

Check `$WORKTREE_ROOT/.claude/handoffs/$SHARD_KEY.md` first — this is the branch-specific handoff written by the last `/wrap-up` on this branch.

Resolution ladder:
1. Branch handoff at `.claude/handoffs/$SHARD_KEY.md` exists → primary context source.
2. Branch handoff missing BUT `ls .claude/handoffs/*.md` shows OTHER branch handoffs → list them with timestamps and the first line of each kickstart prompt. Ask which branch to resume. Don't pick silently.
3. No handoffs at all → cold-start path (see Error Handling).

NEVER read `.claude/handoff.md` (singular). That path is deprecated — if it exists, ignore it and use the resolution ladder above.

If the branch handoff exists, read it in full. The `## Kickstart Prompt` section contains the ready-to-use continuation prompt for THIS branch.

### Step 1b: Read Branch Shard + Project Docs (parallel, budget-conscious)

Read ALL of these in parallel. Respect token budgets:

| File | How to Read | Budget | Purpose |
|------|-------------|--------|---------|
| `.claude/sessions/$SHARD_KEY.md` | full file | ~3k tokens | THIS branch's session history (where we left off) |
| `PROGRESS.md` | `limit: 60` (from end) | ~2k tokens | Record of MERGED work — context only, NOT "where we left off" |
| `TASKS.md` | full file | ~3k tokens | Active tasks with claim annotations |
| `BRAIN.md` | full file (if exists) | ~1k tokens | Session log keyed by date + branch |
| `VISION.md` | `limit: 40` (top section) | ~1k tokens | Core intent + constraints |
| `CONTEXT.md` | `limit: 50` | ~1.5k tokens | Domain knowledge |
| `CLAUDE.md` (project) | Check if exists, read `limit: 40` | ~1k tokens | Project-specific rules |

**"Where we left off" comes from the branch shard's most recent `## Session` block — NOT from PROGRESS.md.** PROGRESS.md is now a merged-work record; it tells you what's shipped on main, not what this branch is mid-doing.

**Skip gracefully** if any file doesn't exist — don't error.

**DO NOT read** during resume:
- Full source code files
- Large architecture docs (read TOC only if referenced in TASKS.md)
- Test files, migration files, config files
- These get loaded on-demand when you start working

---

### Step 2: Check Git State (parallel with Step 1)

Run in parallel with the doc reads:

```bash
cd "$WORKTREE_ROOT" && git status --short 2>/dev/null | head -20
```

```bash
cd "$WORKTREE_ROOT" && git log --oneline -5 2>/dev/null
```

This tells you:
- Are there uncommitted changes on THIS branch (mid-feature work)?
- What was the last commit on this branch?
- Is there a WIP commit from a previous wrap-up?

Note: `git status` scopes to the current worktree — it does NOT show what other worktrees are doing.

---

### Step 3: Brain Context — Canonical Project Name (parallel with Steps 1-2)

If Open Brain MCP tools are available, run these in parallel — using `$CANONICAL_NAME`, NEVER `basename($WORKTREE_ROOT)`:

1. **Project-specific captures:** `mcp__open-brain__semantic_search` with `query: "$CANONICAL_NAME"`, `limit: 5`
2. **Recent decisions:** `mcp__open-brain__list_recent` with `category: "decision"`, `limit: 5`
3. **Branch-specific captures:** `mcp__open-brain__semantic_search` with `query: "branch:$BRANCH"`, `limit: 5` — finds captures from prior sessions on the same branch

If the FHE SharedBrain MCP is available AND the project is related (check `$CANONICAL_NAME` against known FHE projects), also query:
4. **Team brain:** `mcp__claude_ai_FHE_Brain__shared_brain_search` with `query: "$CANONICAL_NAME"`, `limit: 3`

If brain MCP is unavailable, check PROGRESS.md for a `### Pending Brain Captures` section and note those.

---

### Step 3b: Abandoned Work Detection — Canonical Scope (parallel with Steps 1-3)

Query the session_turns table for work left hanging in this specific project — using `$CANONICAL_NAME`:

```bash
# Pulls from ~/.zshenv (new sb_secret_* key; legacy JWT disabled 2026-05-04)
OB_URL="${OPENBRAIN_SUPABASE_URL:-https://dbsrlvihxtxgrkbelqwf.supabase.co}"
OB_KEY="$OPENBRAIN_SUPABASE_SERVICE_KEY"
if [ -z "$OB_KEY" ]; then
  echo "ERROR: OPENBRAIN_SUPABASE_SERVICE_KEY missing — source ~/.zshenv or skip this section" >&2
else
  curl -sf -X POST "$OB_URL/rest/v1/rpc/detect_abandoned_work" \
    -H "apikey: $OB_KEY" -H "Authorization: Bearer $OB_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"p_lookback_days\": 7, \"p_followup_hours\": 48, \"p_project\": \"$CANONICAL_NAME\"}"
fi
```

If results come back, include them in the briefing under "Dropped Threads."

If no session_turns data exists yet, skip silently.

---

### Step 4: Check for Stranded Captures

```bash
grep -c "^- " "$WORKTREE_ROOT/PROGRESS.md" 2>/dev/null | tail -1
```

If PROGRESS.md has a `### Pending Brain Captures` section with entries, note the count — these should be synced.

---

### Step 5: Present the Briefing

Format as a concise, scannable brief. Every line should help the user start working immediately.

```markdown
## Resume: {CANONICAL_NAME} / {BRANCH}

### Where We Left Off
{Extract from `.claude/sessions/$SHARD_KEY.md` — most recent `## Session` block's "Where Left Off" section, or summarize the block in 2-3 lines if no explicit section.}

### Active Tasks (on this branch)
{From TASKS.md — list in-progress or next-up tasks. Mark each with its claim status:
 - [~] claimed by THIS branch → safe to continue
 - [~] claimed by ANOTHER branch → note "claimed by <branch>"
 - [ ] unclaimed → safe to pick up
 Skip the full backlog — only what's actionable.}

### Other Branches In Flight
{ls .claude/sessions/*.md, excluding $SHARD_KEY and main.md and _archive/}
{For each: "<branch> — <N> sessions, last <relative time> — <one-line summary from shard's most recent Session block>"}
{Omit this section entirely if no other shards exist.}

### Git State
{Uncommitted changes on this branch: list modified files if any}
{Last commit: hash + message + relative time}
{Branch: $BRANCH}

### Brain Context
{Top 2-3 relevant brain entries — one line each with source tag}
{Recent decisions that affect current work}
{If pending captures exist: "N pending brain captures need syncing — run /brain-sync"}

### Dropped Threads
{From detect_abandoned_work results for $CANONICAL_NAME.}
{Format: "N days ago — prompt_preview (outcome: partial/ongoing/blocked)"}
{Show the response_summary so the user remembers what was happening.}
{If no abandoned work found, skip this section entirely.}

### Kickstart Prompt
{If .claude/handoffs/$SHARD_KEY.md exists, show its kickstart prompt verbatim in a blockquote}
{If no branch handoff, generate one from the branch shard + TASKS.md context}
{Specific and actionable, file paths included.}

> <the kickstart prompt>

### Recommended Next Action
{ONE specific, actionable recommendation scoped to THIS branch.}
{Be precise: "Continue implementing the webhook handler in src/api/webhooks.ts — left off at line 142"}
{NOT vague: "Continue working on the project"}
{If "Other Branches In Flight" is non-empty, note them: "Other branches have unfinished work — switch with `git checkout <branch>` and re-run /pickup if you'd rather work there."}
```

### Briefing Rules

- **Be specific, not vague.** File paths, line numbers, function names, task IDs.
- **Don't ask the user to re-explain decisions** — they're in the docs. Read them.
- **Don't summarize what the project IS** — the user knows. Say what's IN PROGRESS on this branch.
- **If the branch shard has a clear "Where Left Off"**, lead with that verbatim.
- **If there's a WIP commit on this branch**, highlight it — strongest signal of mid-work state.
- **If tasks are blocked or claimed by other branches**, surface that explicitly.
- **Keep the whole briefing under 30 lines.** This is a 15-second scan.

---

## Context Budget

Total resume cost should be **under 12k tokens** (slightly higher than pre-Agent-View because of the branch shard). This leaves 88%+ of context for actual work.

| Source | Budget |
|--------|--------|
| Branch shard | ~3k |
| PROGRESS.md (tail) | ~2k |
| TASKS.md | ~3k |
| BRAIN.md | ~1k |
| VISION.md (top) | ~1k |
| CONTEXT.md (top) | ~1.5k |
| Git status + log | ~0.3k |
| Brain search results | ~1k |
| **Total** | **~12k** |

If any single file is unusually large (>5k tokens), truncate to the most recent/relevant section.

---

## After the Briefing

Once the briefing is presented:
- Wait for the user to confirm direction or ask questions
- Do NOT start working until the user says go
- If the user says "looks good" or "let's go" — proceed with the recommended action
- If the user redirects — follow their lead, don't argue the recommendation
- If the user wants to switch to a parallel branch, do `git checkout <branch>` and re-run /pickup against that branch

---

## Rules

- NEVER read `.claude/handoff.md` (singular). Use `.claude/handoffs/$SHARD_KEY.md` and the resolution ladder.
- NEVER use worktree basename for brain queries. Use `$CANONICAL_NAME` derived from `git rev-parse --git-common-dir`.
- PROGRESS.md is now a record of MERGED work, not in-progress. "Where we left off" comes from the branch shard.
- If multiple handoffs exist and no current-branch handoff matches, surface the list explicitly. Don't pick one silently.
- Always surface other in-flight branches when they exist — invisible parallel work is the Agent-View failure mode.

---

## Error Handling

### No Project Docs Exist
If no PROGRESS.md, TASKS.md, branch shard, or CONTEXT.md exist:
```
No session history found for {CANONICAL_NAME} / {BRANCH}. This looks like a fresh start.
Run /auto-init to set up project documentation, or tell me what you'd like to work on.
```

### Brain MCP Unavailable
Skip brain queries silently. Note in briefing:
```
> Brain MCP not connected — skipping cross-project context
```

### Git Not Initialized
Skip git state and identity resolution. Note:
```
> Not a git repository — skipping git state and branch-scoped context
```

### Detached HEAD or No Branch
If `BRANCH` is empty (detached HEAD), use `SHARD_KEY=detached-<short-SHA>` and proceed. The shard and handoff files use that key. Note in briefing:
```
> Detached HEAD — using shard key `detached-<sha>` instead of a branch name.
```

---

## ⚠️ FHE TEAM OVERRIDES

**Read `COLLABORATION.md`. Three devs share this repo (Enzo `@enzo`, Mark `@mark`, Mike `@mike`).** The briefing must show teammates' in-flight work, not just your own.

1. **Fetch first, then surface remote state.** Before briefing:
   ```bash
   git fetch origin --quiet
   git branch -r --sort=-committerdate | grep -v HEAD | head -8     # teammates' branches
   gh pr list --state open --json number,title,headRefName,author \
     --jq '.[] | "PR #\(.number) \(.title) [\(.headRefName)] @\(.author.login)"' 2>/dev/null
   ```
   Add an **"In flight (team)"** section listing open PRs + recently-pushed remote branches with author, so you don't start work a teammate already owns.
2. **Read committed shards/handoffs for ANY branch**, not just yours — you may be resuming a teammate's branch. `.claude/sessions/` + `.claude/handoffs/` are committed and travel with the repo.
3. **Behind `main`?** If `origin/main` is ahead of local, note it and recommend `git pull --rebase` before claiming a task (so `TASKS.md` claims are current — COLLABORATION.md §4).
4. **Brain query is best-effort.** Devs with the FHE Brain MCP query it (brain_id `fhe`); without it, skip silently — the in-repo `BRAIN.md` log is the shared memory.
