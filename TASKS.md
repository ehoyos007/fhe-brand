# TASKS — @fhe/brand (Program A: design-system expansion)

Branch: `feat/expand-ds` @ `874423d` (LOCAL only — not pushed/merged) · v0.5.1

## Done ✅
- [x] A0 — tooling: peerDeps (Radix/cmdk/sonner/dnd-kit/tanstack-table/date-fns), Vitest harness, scaffold
- [x] A1 — 15 foundational primitives (Tooltip, Dialog, Drawer, Popover, DropdownMenu, Tabs, Accordion, Breadcrumb, Pagination, Checkbox, Radio, Switch, Toast, Skeleton, Spinner)
- [x] A2 — 7 blocks (DataTable, Board/Kanban, Command+CommandDialog, Calendar, DatePicker, EmptyState, Toolbar)
- [x] A3 — 4 shell (AppShell, Sidebar, PageHeader, SplitPane)
- [x] Logo — vectorized from PNG (vtracer) + color-flattened to 3 brand colors
- [x] 32 components total · 29/29 tests · tsc clean

## Next / remaining
- [ ] A4 — polish: Storybook stories, broaden tests, a11y pass, exclude `*.test.*` from publish (`.npmignore`), evaluate `tsup` build, **tag a release** so Grid pins `github:#v0.x` instead of the local copy
- [ ] A2.1 (optional) — DataTable virtualization, cmdk Combobox (rich searchable select), Logo mark-only / `currentColor` variant for collapsed sidebar

## Notes
- **Co-dev resync:** after editing brand, `npm version <bump>` here + `npm install ../fhe-brand` in Grid (real-copy, version-cached).
- Primary downstream consumer = Grid `feat/brand-light-rebrand` (Program B, B1 next).
