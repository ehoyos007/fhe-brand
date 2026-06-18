---
name: pr
status: shipped
description: >-
  Feature branch + pull request. Use when the user says "/pr", "create a pr", "open a pull request", or "create a pull request".
---

# /pr — Feature Branch + Pull Request

Creates a feature branch, commits, pushes, and opens a PR. Use this for team projects or when you explicitly need code review before merging. For solo work, use `/push` instead.

## Triggers
- `/pr`
- `create a pr`
- `open a pull request`
- `create a pull request`

## Workflow

### Step 1: Assess State
```bash
BRANCH=$(git branch --show-current)
REPO=$(basename $(git rev-parse --show-toplevel))
CHANGES=$(git status --porcelain | wc -l | tr -d ' ')
```

If no changes: tell the user and exit.

### Step 2: Create Feature Branch

If already on a feature branch, use it. If on main/master:

1. Generate a branch name from the work:
   - Read TASKS.md for current task name, OR
   - Use the most descriptive recent change, OR
   - Derive from files changed
2. Format: `feat/<short-description>` or `fix/<short-description>` (kebab-case, max 50 chars)
3. Create and switch:
```bash
git checkout -b feat/<branch-name>
```

### Step 3: Stage & Commit
```bash
git add -A
git commit -m "$(cat <<'EOF'
<type>: <description>

<optional body>

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Step 4: Push & Create PR
```bash
git push -u origin HEAD
```

Create PR:
```bash
gh pr create --title "<type>: <description>" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
- [ ] <verification steps>

Generated with Claude Code
EOF
)"
```

`gh` is the only supported path — it's already in PATH on this machine. If a session ever finds `gh` missing, install it (`brew install gh`) rather than reaching for a GitHub MCP; the github MCP was removed 2026-05-12 as a duplicate of the CLI.

### Step 5: Report
```
PR created: <branch-name>
Commit: <hash> — <message>
PR: <URL>
To merge: approve and merge on GitHub, or run `gh pr merge --squash --delete-branch`
```

## Rules
- This skill is for when you NEED a PR — team repos, risky changes, explicit request
- For solo projects, suggest `/push` instead unless the user specifically asked for a PR
- ALWAYS use Conventional Commits format
- If git push fails, tell the user the specific fix
- Co-Authored-By trailer on every commit

---

## ⚠️ FHE TEAM OVERRIDES

**Read `COLLABORATION.md`. On FHE repos `/pr` is the DEFAULT merge path** — `main` is PR-gated for Mark `@mark` + Mike `@mike` (Enzo `@enzo` is admin-exempt but defaults to it too).

1. **Always target `main` as base:** `gh pr create --base main …`.
2. **Rebase before opening:** `git fetch origin && git pull --rebase origin main` first, so the PR lands cleanly (COLLABORATION.md §5).
3. **Branch naming `<type>/<dev>-<desc>`** — `feat/mark-household-popup`, `fix/mike-revenue-rollup`. Integration branches for big rebuilds drop the dev prefix (`feat/grid-v2-rebuild`).
4. **Request Enzo as reviewer; don't self-merge non-trivial PRs:**
   ```bash
   gh pr create --base main --reviewer ehoyos007 --title "<type>: <desc>" --body "..."
   ```
   The Reviewer Agent runs on the diff before merge (read the report).
5. **Merge squash + delete branch** once approved + green: `gh pr merge --squash --delete-branch`. After it lands, run `/push --consolidate-only` from an updated `main` to fold the shard into `PROGRESS.md`.
6. **Carve-outs:** no PR on `fhe-hermes` (local-only) or `carriernest-source` (third-party mirror). (COLLABORATION.md §10)
