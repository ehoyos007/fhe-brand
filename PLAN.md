# @fhe/brand — Design System Expansion Plan (Program A)

> Created: 2026-06-01
> Driver: Grid CRM company-wide rollout needs @fhe/brand as its SOLE design system.
> Source decisions: FHE SharedBrain (Grid rollout + DS captures), 2026-06-01 planning session.
> Status: IN PROGRESS — Phase A0 executing.
> Branch: `feat/expand-ds`

---

## Why this exists

Grid CRM is being rebranded onto `@fhe/brand` (pure brand, role-accent dropped, **light-mode only**).
Audit (2026-06-01) found brand ships only **5 primitives** (Btn, Field, Badge, Alert, Avatar) + Icon —
nowhere near enough for a 56-page CRM. Decision: **brand absorbs every gap and becomes the full FHE
design system.** Grid (and every other FHE frontend) then composes feature UI from brand.

This plan grows `@fhe/brand` from a token+micro-component layer into a CRM-grade component library
built on Radix headless primitives + brand tokens.

## Canonical-vs-consumer rule

- **Goes in @fhe/brand** (generic, reusable): tokens, primitives, Dialog, DropdownMenu, Tabs, Toast,
  Tooltip, DataTable, Board/Kanban, CommandPalette, DatePicker, AppShell/Sidebar, etc.
- **Stays in the consumer** (domain-specific, built FROM brand): Twilio dialer, lead script panel,
  plan-ammo, commission widgets, SCA call flyouts, cockpit compositions.

## Hard constraints

- **Light-mode only.** No dark token set in v0.2. (Matches fhe-hq / fhe-portal.)
- **peerDependencies for all React-context libs** (React, Radix, cmdk, sonner, dnd-kit, tanstack-table).
  Brand must NOT bundle a second copy of React/Radix — duplicate context breaks portals + hooks under
  file-link / transpilePackages consumption.
- **Ship raw TS** (consumers transpile via `transpilePackages`). Revisit a `tsup` build at A4 if needed.
- WCAG 2.2 AA contrast, visible `:focus-visible`, honor `prefers-reduced-motion`.

---

## Phases

### A0 — Tooling & foundation  *(executing)*
- Bump `0.1.0 → 0.2.0`.
- Declare peerDependencies: Radix set (dialog, dropdown-menu, select, tabs, tooltip, popover,
  accordion, checkbox, radio-group, switch, slot), `cmdk`, `sonner`, `@dnd-kit/*`,
  `@tanstack/react-table`, `date-fns`. Mirror as devDependencies for standalone dev/test.
- Add test harness: Vitest + Testing-Library + jsdom + `@vitejs/plugin-react`. Scripts: `test`, `test:watch`.
- Scaffold `src/components/primitives/` barrel for A1.
- Smoke test on existing Btn to prove the harness.
- **Build decision:** keep raw-TS ship for now.

### A1 — Foundational primitives  *(unblocks Grid B1)*
Radix + brand tokens, light-themed, tested:
Dialog/Modal · Drawer/Sheet · DropdownMenu · Select (rich) · Tabs · Tooltip · Popover ·
Accordion · Breadcrumb · Pagination · Checkbox · Radio · Switch · Skeleton · Spinner · Toast (sonner).

### A2 — Complex building blocks  *(unblocks Grid B2+)*
DataTable (generalize Grid's TanStack system: sort/filter/group/virtualize/column-prefs) ·
Board/Kanban (dnd-kit) · CommandPalette (cmdk) · DatePicker/Calendar · EmptyState · FilterBar/Toolbar.

### A3 — Layout shell
AppShell · Sidebar (brand-neutral, collapsible, grouped, searchable) · PageHeader · SplitPane.
Grid injects its `nav-config.ts` into these.

### A4 — Polish & release
Per-component tests + Storybook stories · a11y pass · update `DESIGN.md` · evaluate `tsup` build ·
tag releases (`v0.2.x`). Consumers pin the tag once published.

---

## Consumption by Grid (co-dev)

During active co-development Grid links brand via `file:../fhe-brand` (or a pushed `github:#feat/expand-ds`
ref if Turbopack rejects the file link — the documented "leaves filesystem root" panic). Once brand v0.2.0
is tagged, Grid pins `@fhe/brand@github:ehoyos007/fhe-brand#v0.2.0` per `DESIGN_SYSTEM.md`.

## Critical path

`A0 → A1 → (Grid B1) → A2/A3 → (Grid B2…B5)`. A0 may run parallel to Grid B0.
