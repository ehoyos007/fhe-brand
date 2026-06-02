# Handoff — @fhe/brand expansion (`feat/expand-ds`)
Updated: 2026-06-02

## Status: A0–A3 + Logo COMPLETE · v0.5.1 @ `874423d` (LOCAL only — not pushed/merged). A4 remains.
32 components: 5 original (Btn, Field, Badge, Alert, Avatar) + 15 A1 primitives + 7 A2 blocks +
4 A3 shell + `Logo`. **29/29 tests, tsc clean.**

## What's here
- **A1 primitives:** Tooltip, Dialog, Drawer, Popover, DropdownMenu, Tabs, Accordion, Breadcrumb,
  Pagination, Checkbox, Radio, Switch, Toast, Skeleton, Spinner (Radix + brand tokens, light-only).
- **A2 blocks:** DataTable (TanStack), Board/Kanban (dnd-kit), Command + CommandDialog (cmdk),
  Calendar + DatePicker (date-fns), EmptyState, Toolbar.
- **A3 shell:** AppShell, Sidebar (brand-neutral, collapsible, `SidebarItem as={Link}`), PageHeader, SplitPane.
- **Logo:** vectorized from `src/assets/fhe-logo.png` (vtracer via `@neplex/vectorizer`) →
  color-flattened to 3 brand colors (sharp luminance buckets) → inlined as JSX in `src/components/logo.tsx`.
  Recipe: **quantize to palette, then trace**. Asset also at `src/assets/fhe-logo.svg`.

## Next: A4 polish (when prioritized)
Storybook stories · broaden tests · a11y pass · **exclude `*.test.*` from publish** (`.npmignore` —
they currently ride along in the copy) · evaluate `tsup` build · **tag a release** so Grid pins
`github:#v0.x` instead of the local copy. Optional A2.1: DataTable virtualization, cmdk Combobox,
Logo mark-only / `currentColor` variant for the collapsed sidebar.

## Co-dev
Editing brand requires a **version bump + `npm install ../fhe-brand` in Grid** to propagate
(real-copy, version-cached). peerDeps cover Radix/cmdk/sonner/dnd-kit/tanstack-table/date-fns.

## Active downstream
Grid `feat/brand-light-rebrand` (Program B) consumes this — **B1 (branded shell) is the primary thread.**
