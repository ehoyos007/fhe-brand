# @fhe/brand — Design System Expansion Plan (Program A)

> Created: 2026-06-01
> Driver: Grid CRM company-wide rollout needs @fhe/brand as its SOLE design system.
> Source decisions: FHE SharedBrain (Grid rollout + DS captures), 2026-06-01 planning session.
> Status: **A0–A3 COMPLETE** (2026-06-02, v0.5.1). A4 (polish/release) remains.
> Branch: `feat/expand-ds` @ `874423d` (LOCAL only — not pushed/merged).
>
> **Shipped:** 32 components — 5 original + 15 A1 primitives + 7 A2 blocks + 4 A3 shell + `Logo`.
> 29/29 tests, tsc clean. Logo vectorized from PNG + color-flattened to 3 brand colors.

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

### A0 — Tooling & foundation  ✅ COMPLETE
- Bump `0.1.0 → 0.2.0`.
- Declare peerDependencies: Radix set (dialog, dropdown-menu, select, tabs, tooltip, popover,
  accordion, checkbox, radio-group, switch, slot), `cmdk`, `sonner`, `@dnd-kit/*`,
  `@tanstack/react-table`, `date-fns`. Mirror as devDependencies for standalone dev/test.
- Add test harness: Vitest + Testing-Library + jsdom + `@vitejs/plugin-react`. Scripts: `test`, `test:watch`.
- Scaffold `src/components/primitives/` barrel for A1.
- Smoke test on existing Btn to prove the harness.
- **Build decision:** keep raw-TS ship for now.

### A1 — Foundational primitives  ✅ COMPLETE (15)
Radix + brand tokens, light-themed, tested:
Dialog/Modal · Drawer/Sheet · DropdownMenu · Tabs · Tooltip · Popover ·
Accordion · Breadcrumb · Pagination · Checkbox · Radio · Switch · Skeleton · Spinner · Toast (sonner).
Note: native `Select` already shipped (field.tsx); rich/searchable **Combobox deferred to A2.1** (cmdk-based).

### A2 — Complex building blocks  ✅ COMPLETE (7)
DataTable (TanStack, sortable; virtualization deferred to A2.1) · Board/Kanban (dnd-kit, controlled) ·
CommandPalette + CommandDialog (cmdk) · Calendar + DatePicker (date-fns) · EmptyState · Toolbar/FilterBar.

### A3 — Layout shell  ✅ COMPLETE (4)
AppShell · Sidebar (brand-neutral, collapsible, grouped; `SidebarItem as={Link}`) · PageHeader · SplitPane.
Plus `Logo` (vectorized lockup, 3 flat brand colors). Grid injects its `nav-config.ts` into these.

### A4 — Polish & release  ⬜ REMAINING
Per-component Storybook stories · broaden tests · a11y pass · exclude test files from publish
(`.npmignore`) · evaluate `tsup` build · color-quantize source assets · tag a release so Grid can
pin `@fhe/brand@github:#v0.x` instead of the local copy. Optional: A2.1 = DataTable virtualization +
cmdk Combobox + Logo mark-only/`currentColor` variant for the collapsed sidebar.

---

## Consumption by Grid (co-dev)

Grid consumes brand as a **real copy** (not a symlink): `.npmrc` sets `install-links=true` +
`legacy-peer-deps=true` (Turbopack rejects the file-symlink — the "leaves filesystem root" panic).
**⚠️ Co-dev resync caveat:** npm caches the copy by version, so after editing brand you MUST
`npm version <bump>` in fhe-brand, then `npm install ../fhe-brand` in Grid — otherwise Grid keeps the
stale copy. Once A4 tags a release, switch Grid to pin `@fhe/brand@github:ehoyos007/fhe-brand#v0.x`.

## Critical path

`A0 → A1 → A2/A3 → Logo` ✅ done → **`(Grid B1)`** next → `(Grid B2…B6)`.
