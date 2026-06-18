> Shipped copy of the FHE multi-dev protocol. Canonical source: the FirstHealth umbrella.
> Cross-references (MACHINES.md, ECOSYSTEM.md, scripts/) point at the umbrella repo.

# COLLABORATION.md — FHE Multi-Dev Workflow (canonical)

> **Source of truth for how the FHE team works these repos in parallel without colliding.**
> The shipped `.claude/skills/` in every in-scope repo read this file. When a skill's generic
> step conflicts with a rule here, **this file wins** for FirstHealth repos.
>
> Design goal: Enzo's solo flow is unchanged (admin, exempt). These rules add only the
> coordination a multi-dev, multi-machine team needs. Nothing here fires when working alone —
> it activates on a remote divergence or a teammate's claim.
>
> Established Enzo+Mark 2026-06-11; expanded to the full team 2026-06-18. Superseded the
> Enzo+Mark-only draft.

---

## 1. Roster & Identity

| Dev | Name | GitHub | Tag | Access | Repos | Brain / memory | Machine |
|-----|------|--------|-----|--------|-------|----------------|---------|
| **Enzo** | Enzo Hoyos | `ehoyos007` | `@enzo` | **admin** (exempt from protection) | all | FHE Brain MCP (`capture_thought`, brain_id `fhe`) | local |
| **Mark** | Mark Caraher | `markcaraher` | `@mark` | **write** | all active | mirrored ~/.claude → has FHE Brain MCP | `firsts-mbp` (Tailscale) |
| **Mike** | Michael Sanguily | `msanguily` | `@mike` | **write** | all active | FHE Brain MCP | (see MACHINES.md) |

- **Enzo** is the only repo **admin** and the single review gate (§3). Admin-exempt branch
  protection keeps his urgent direct pushes available.
- **Mark** and **Mike** have **write** (outside collaborators): they push their own branches
  freely; every change reaches a protected branch only through a **PR Enzo approves**.
- Roles: Mark — Grid CRM / frontend / household & CRM features (ramping). Mike — Grid CRM /
  frontend / admin pages / order & revenue tracking / Google-Ads & marketing integration.
- Full machine + SSH details: **`MACHINES.md`**. Ecosystem nav: **`ECOSYSTEM.md`**.

**Set git identity once per machine (before your first commit):**
```bash
git config user.name  "Your Name"
git config user.email "you@example.com"   # the email on your GitHub account
```
Authorship is how we tell who did what. Every Claude-assisted commit also carries
`Co-Authored-By: Claude <noreply@anthropic.com>`.

**Dev tag derivation (`git config user.email` → tag).** Skills derive your tag automatically
from this table — keep your row current:

| email | tag |
|-------|-----|
| `ehoyos@firsthealthenroll.org`, `enzod007@gmail.com` | `@enzo` |
| `<mark's github email>` | `@mark` |
| `<mike's github email>` | `@mike` |

> If an email isn't mapped, the skill falls back to the GitHub login (`gh api user --jq .login`)
> → `markcaraher`→`@mark`, `msanguily`→`@mike`, `ehoyos007`→`@enzo`. Fill the emails when known
> so the cheap path works offline.

**Grant / re-grant write to a collaborator** (run per active org repo):
```bash
gh api -X PUT repos/FirstHealthEnrollment/<repo>/collaborators/<login> -f permission=push
```

---

## 2. Branch Model — `main` is protected, PR-only (hybrid)

> *"Get into the habit of drafting PRs before you merge to main — especially now that we're all
> in the same repos."*

- **Nobody commits directly to a protected branch.** `main` changes only through a **reviewed,
  merged PR**. (Enzo is admin-exempt for urgent fixes, but defaults to the PR flow too.)
- **Default flow — trunk:** feature branch → PR → `main`. One short-lived branch per task.
  Use this for the vast majority of work.
- **Big rebuilds — integration branch:** when a rebuild spans many PRs over multiple sessions
  (the `feat/grid-v2-rebuild` pattern), stage feature branches into a **long-lived integration
  branch**, then PR the integration branch into `main` at the end. Use this *only* for
  multi-PR rebuilds — not for everyday tasks.
- `main` is the **integration + deploy** branch. Vercel auto-deploys org frontends from it.
- **One reviewer approval before merge (Enzo).** Reviewer ≠ author. Squash-merge, delete branch.

**Branch naming — `<type>/<dev>-<desc>` (kebab-case):**
```
feat/mark-household-create-popup
fix/mike-revenue-tracking-rollup
chore/enzo-supabase-schema-bump
```
`feat|fix|chore|docs|refactor`. The `<dev>-` prefix prevents two people colliding on a branch
name. Integration branches drop the dev prefix (`feat/grid-v2-rebuild`).

**Branch protection — applied to every in-scope repo's `main` now** (`scripts/apply-branch-protection.sh`):
```
☑ Require a pull request before merging
   ☑ Require approvals: 1   (Enzo)
☑ Require status checks to pass        ← only the checks that ACTUALLY EXIST in that repo
☑ Require branches to be up to date before merging
☑ Block force pushes
enforce_admins = false                  ← Enzo bypasses; Mark/Mike do not
```

**Required CI checks — "require what exists, expand as CI lands."** The target gate set is
**Tests · Typecheck · Lint · Build · E2E**. The protection script requires only the check-runs
that already exist on a repo (auto-detected from its latest run) so PRs don't get blocked on a
workflow a repo doesn't have yet. As a repo grows its CI, re-run the script to widen the gate.
Until any CI exists, **PR + 1 approval is the floor.**

---

## 3. Review — Enzo reviews all

- Every PR to a protected branch needs **1 approval from Enzo** (`--reviewer ehoyos007`).
- The **Reviewer Agent** runs on the diff before merge (global rule) — read the report.
- Don't self-merge a non-trivial PR. Doc-only / scaffold changes may be self-merged **only by
  Enzo** (admin), and only with a one-line flag in the PR.
- `.github/CODEOWNERS` routes review to `@ehoyos007` by default. As the team grows, split
  ownership by path (Grid frontend → Mark/Mike; infra/API/migrations → Enzo).

---

## 4. Task Claiming Across Machines

`TASKS.md` is the coordination layer. Claims are **soft locks**; across machines a claim is only
visible *after a pull*.

1. **Pull before you claim:** `git fetch && git pull --rebase origin main`.
2. **Uniform task syntax** (creator, assignee, state all explicit):
   ```
   - [STATUS] <description>  ·  by:@<creator>  →:@<assignee>  [STATE]
   ```
   - **STATUS:** `[ ]` todo · `[~]` in-progress · `[x]` done · `[!]` blocked
   - **`by:@<creator>`** — who created the task · **`→:@<assignee>`** — owner (`@any` = either dev)
   - **`[STATE]`** when claimed/done/blocked:
     - `(in-progress: <branch> @<doer> @ YYYY-MM-DD HH:MM)`
     - `(done: <branch> @<doer> @ YYYY-MM-DD HH:MM)`
     - `(blocked: <reason>)`
   ```
   - [ ] Build revenue rollup card        ·  by:@enzo   →:@mike
   - [~] Household create/edit popup      ·  by:@mark   →:@mark   (in-progress: feat/mark-household-popup @mark @ 2026-06-18 14:30)
   - [x] Apply branch protection          ·  by:@enzo   →:@enzo   (done: main @enzo @ 2026-06-18 00:45)
   - [!] Google Ads OAuth                  ·  by:@mike   →:@mike   (blocked: awaiting client ad-account access)
   ```
3. **Respect others' claims.** A task `(in-progress: … @other)` is theirs — skip it. `/commit`
   and `/pickup` enforce this automatically.
4. **Two people claiming one task** surfaces as an annotation merge conflict at PR time — that's
   the intended signal. Coordinate; one backs off.
5. **Where tasks live:** per-repo `TASKS.md` (claim board) + umbrella `TASKS.md` (cross-repo) +
   a shared **GitHub Projects** board as the team-wide truth.

---

## 5. Sync Discipline (parallel-work safety)

| Rule | Why |
|------|-----|
| `git fetch` / `pull --rebase` **before starting** | See teammates' claims; avoid stale code |
| `pull --rebase origin main` **before opening a PR** | Land on current `main`, minimize conflicts |
| **Never `git push --force`** a shared/reviewed branch (`main`, integration, any branch with an open PR) | Force-push rewrites history under a teammate |
| `--force-with-lease` **only on your own un-reviewed branch** | Safe rewrite when nobody else pulled it |
| **Rebase your feature branch on `main`** — don't merge `main` in | Keeps history linear, PRs reviewable |
| **Small, frequent PRs > one giant PR** | Less conflict surface, faster review |

Push rejected because you're behind: `git pull --rebase` → resolve → re-push. **Never** resolve
a conflict by force-pushing over a teammate's commits.

---

## 6. Session Artifacts Ride Merges

Per-branch session state is **committed**, so any dev can resume any branch cold:

- `.claude/sessions/<branch>.md` — branch work-log shard. Written by `/wrap-up` + `/commit`.
- `.claude/handoffs/<branch>.md` — next-session kickstart prompt. Written by `/wrap-up`.
- Tag the author (`@enzo`/`@mark`/`@mike`) in each session block.
- `.gitignore` negations keep them tracked; `/wrap-up` does **not** auto-stage — they get
  committed with the related work and travel in the PR.
- `PROGRESS.md` = merged-work history. **Only `/push` writes it, only after a PR merges.**

---

## 7. PROGRESS.md — merged-entry syntax (per repo)

Written only by `/push` post-merge, newest at the bottom. One unified entry per merged branch:

```
## <feature> — merged YYYY-MM-DD (PR #<n> / <SHA>) · by:@<author>
**Branch:** <branch>  ·  **Devs:** @<doers>  ·  **Sessions:** <N>
**Summary:** <2–4 sentence unified narrative — what shipped, why, where it landed>
**Decisions:**
- <deduped decision list>
**Shipped in:** <commit SHAs / PR number>
```

`by:@<author>` and `Devs:` derive from commit authorship (§1). Per-repo `PROGRESS.md` is the
local merge record; the umbrella `PROGRESS.md` stays the cross-repo narrative.

---

## 8. Brain / Memory — graceful degradation

- This is the **FHE business** — captures route to the **FHE SharedBrain** (`capture_thought`,
  brain_id `fhe`, via FHE-BrainHub). **Never** route FHE captures to PureProfit/TLE/personal brains.
- **Enzo & Mike** have the FHE Brain MCP; **Mark** has it via mirrored config.
- Any dev without the MCP: skills **must not error** — fall back to appending a one-line entry
  under `BRAIN.md` → `## Session Log`. **Every dev always writes the `BRAIN.md` line** so the
  shared record is complete regardless of who has the MCP.
- Shared in-repo memory both/all devs rely on: `BRAIN.md`, `PROGRESS.md`, session shards, `TASKS.md`.

---

## 9. The Shipped Toolkit

Every in-scope repo ships `.claude/skills/` so **all devs get the same commands on clone** — no
personal `~/.claude` setup required (matters for un-mirrored machines / new devs).

Five carry **FHE team overrides** (a `⚠️ FHE TEAM OVERRIDES` section appended to each `SKILL.md`,
superseding conflicting generic steps): **`/push`, `/pr`, `/commit`, `/wrap-up`, `/pickup`**.

**Golden loop:** `/pickup` → work → `/commit` ×N → `/test` → `/wrap-up` → **`/pr`**.
On these repos `/push` ships *your branch* and opens/updates its PR — it never promotes to `main`.

---

## 10. Repo Tiers & Carve-Outs

The system rolls out **uniformly** across in-scope repos, but two repos physically can't do the
PR flow and two are personal:

| Repo(s) | Tier | What applies |
|---------|------|--------------|
| 10 active org repos (grid-stream, apps, ally-event-pipeline, sca-v2, BrainHub, hq, portal, intake, contracting, life-landing) | **Full** | Docs + skills + folder map + CODEOWNERS + PR template + settings + **branch protection** |
| `fhe-brand`, `fhe-leaderboard` (personal, `ehoyos007`) | **Full-personal** | Same; protection applied since the team touches `@fhe/brand`. Leaderboard is largely solo. |
| `fhe-hermes` (**local-only, no remote**) | **Docs-only** | Docs + skills + folder map. **No PR, no protection** — Enzo-local. Give it a remote first if it goes team. |
| `carriernest-source` (**third-party rsync mirror**, `kritibh-sys`) | **Reference** | Docs note only. **No PR flow here** — collaboration with Ritibh happens on **his** repo (`kritibh-sys/carriernest`), or move it under the FHE org first. |
| `fhe-2026` | **Excluded** | Retiring into `fhe-hq`. Not in scope. |

---

## 11. First-Time Setup (new dev)

1. `git clone <repo> && cd <repo>` — and read **`ECOSYSTEM.md`** at the umbrella to find your way around.
2. Set git identity (§1) and add your email→tag row.
3. `npm install` (most repos are Next 16 / React 19 — read `node_modules/next/dist/docs/` first; see each repo's `AGENTS.md`).
4. `gh auth login` (needed for `/pr`).
5. `.claude/skills/` ship with the repo — `/pickup`, `/commit`, `/pr` work immediately. No brain MCP needed (BRAIN.md fallback).
6. Read the repo's `CLAUDE.md`, `CONTEXT.md`, `VISION.md`, then run `/pickup`.

---

## 12. Parallel-Work Edge-Case Matrix

| Situation | What to do |
|-----------|------------|
| Both edit the **same file** on different branches | Resolved at PR merge. Rebase on `main` before opening the PR to surface conflicts early. |
| Two devs grab the **same task** | Annotation collision in `TASKS.md` at merge = the signal. Coordinate; one backs off. |
| Teammate's claim **not visible** | You didn't pull. `pull --rebase` before claiming (§4). |
| Push **rejected — behind remote** | `git pull --rebase origin <branch>` → resolve → re-push. Never force over shared history. |
| Dev without brain MCP runs a capturing skill | Falls back to `BRAIN.md` log line. No error. |
| `/push` wants to promote **straight to `main`** | Overridden: branch-only + opens/updates a PR. `main` is PR-gated. |
| Resuming **teammate's branch** | `git checkout <branch>` → `/pickup` reads their committed shard + handoff. |
| Required CI check **doesn't exist on a repo** | Protection requires only existing checks; PR + approval is the floor. Re-run the protection script as CI lands. |
| Work on **fhe-hermes** | Local-only — no PR. Commit locally; give it a remote before sharing. |
| Work on **carriernest** | Reference mirror — do real work on Ritibh's repo, not the FHE mirror. |
| `PROGRESS.md` **merge conflict** | Rare — only `/push` writes it post-merge. Keep both entries (chronological), drop exact dupes. |
| Force-push needed on your **own un-reviewed** branch | `--force-with-lease` only, and only if nobody pulled it. |

---

## 13. Non-Negotiables

1. **No direct commits to a protected branch** — PR + Enzo review (Mark/Mike); Enzo admin-exempt for urgent fixes.
2. **No force-push** to shared/reviewed branches.
3. **Pull-rebase** before claiming a task or opening a PR.
4. **Session shards + handoffs are committed** so branches are resumable by any dev.
5. **FHE captures stay in the FHE brain** — never leak to PureProfit/TLE/personal.
6. **One canonical migrations repo** for `esasqrcxnktvojcxyxqs`: `ally-event-pipeline` (umbrella CLAUDE.md rule #8).
7. **Client/customer PII is never committed.**

---

## 14. Scaling Up Later

When the team outgrows per-repo collaborator grants, migrate to a GitHub **Team**
(`FirstHealthEnrollment/developers` with Write). Needs `admin:org` scope —
`gh auth refresh -s admin:org,write:org` first. The PR-gateway model above stays identical.
