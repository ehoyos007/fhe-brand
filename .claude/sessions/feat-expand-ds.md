
### A0 + A1 — @fhe/brand expansion — 2026-06-02
- A0: bump 0.2.0→0.3.0, peerDeps (Radix set, cmdk, sonner, dnd-kit, tanstack-table, date-fns), Vitest harness, primitives scaffold.
- A1: 15 primitives on @radix-ui/* + brand tokens (Tooltip, Dialog, Drawer, Popover, DropdownMenu, Tabs, Accordion, Breadcrumb, Pagination, Checkbox, Radio, Switch, Toast, Skeleton, Spinner) per fhe-hq DESIGN.md. 17/17 tests, tsc clean.

### A2 + A3 — blocks + shell — 2026-06-02
- A2 blocks: DataTable (TanStack, sortable), Board (dnd-kit kanban, controlled), Command palette (cmdk) + CommandDialog, Calendar + DatePicker (date-fns), EmptyState, Toolbar.
- A3 shell: AppShell, Sidebar (brand-neutral collapsible, navy active — role-accent retired), PageHeader, SplitPane.
- v0.4.0. 29/29 tests, tsc clean. jsdom stubs (ResizeObserver, scrollIntoView) for cmdk.

### Logo — vectorized brand lockup — 2026-06-02
- Traced fhe-logo.png -> SVG (vtracer via @neplex/vectorizer) + svgo (25KB->9.4KB, 43 paths).
- Inlined as JSX in src/components/logo.tsx (ships via transpilePackages, no asset loader). Kept src/assets/fhe-logo.svg.
- <Logo width decorative title>; height auto from 900:162. v0.5.0. tsc clean, 29/29 tests.
- Note: auto-trace produced anti-alias color bands (43 fills), not 3 flat brand colors — future color-flatten polish.
