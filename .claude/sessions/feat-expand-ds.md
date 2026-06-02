
### A0 + A1 — @fhe/brand expansion — 2026-06-02
- A0: bump 0.2.0→0.3.0, peerDeps (Radix set, cmdk, sonner, dnd-kit, tanstack-table, date-fns), Vitest harness, primitives scaffold.
- A1: 15 primitives on @radix-ui/* + brand tokens (Tooltip, Dialog, Drawer, Popover, DropdownMenu, Tabs, Accordion, Breadcrumb, Pagination, Checkbox, Radio, Switch, Toast, Skeleton, Spinner) per fhe-hq DESIGN.md. 17/17 tests, tsc clean.

### A2 + A3 — blocks + shell — 2026-06-02
- A2 blocks: DataTable (TanStack, sortable), Board (dnd-kit kanban, controlled), Command palette (cmdk) + CommandDialog, Calendar + DatePicker (date-fns), EmptyState, Toolbar.
- A3 shell: AppShell, Sidebar (brand-neutral collapsible, navy active — role-accent retired), PageHeader, SplitPane.
- v0.4.0. 29/29 tests, tsc clean. jsdom stubs (ResizeObserver, scrollIntoView) for cmdk.
