# CLAUDE.md — fhe-brand

@AGENTS.md

<!-- FHE-TEAM-BLOCK:START — managed by scripts/rollout-team-system.sh. Edit the Repository Map purposes freely; keep the markers. -->

## Team Collaboration

This repo is worked by the FHE team (Enzo `@enzo` · Mark `@mark` · Mike `@mike`). **The rules of engagement live in `COLLABORATION.md` at this repo root — read it before parallel work.** Highlights:

- **`main` is PR-gated.** No direct commits by Mark/Mike — feature branch → reviewed PR (Enzo approves) → squash-merge. Enzo (admin) is exempt for urgent fixes.
- **Branch naming:** `<type>/<dev>-<desc>` (e.g. `feat/mark-household-popup`). **Pull-rebase before claiming a task or opening a PR.**
- **Task syntax** (`TASKS.md`): `- [STATUS] <desc>  ·  by:@<creator>  →:@<assignee>  [STATE]`. Respect others' `(in-progress: … @other)` claims.
- **PROGRESS.md** is written only by `/push` post-merge — one merged-entry per branch (`by:@author` + `Devs:`).
- **Brain:** capture to the FHE SharedBrain (brain_id `fhe`); if no MCP, append a line to `BRAIN.md` → `## Session Log` (every dev always writes it).
- **Skills:** `.claude/skills/` ships the workflow staples — `/pickup → /commit → /test → /wrap-up → /pr`. `/push` is branch-only here.

## Repository Map

What each top-level directory in this repo stores. Standard dirs (`src/`, `docs/`, `supabase/`, `scripts/`, `tests/`, `plans/`, `skills/`, `_scratch/`, `_prompts/`, `.claude/`) follow the FHE convention in `ECOSYSTEM.md`; repo-specific dirs are described below.

| dir | what it stores |
|-----|----------------|
| `_prompts/` | Reusable prompt content |
| `_scratch/` | Ephemeral analysis output (gitignored) |
| `docs/` | Repo documentation |
| `plans/` | Drafted plans for this repo (PRDs, phase plans) |
| `skills/` | Repo-specific project skills |
| `src/` | Application source |

<!-- FHE-TEAM-BLOCK:END -->
