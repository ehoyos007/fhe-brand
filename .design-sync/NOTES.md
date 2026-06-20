# design-sync NOTES — @fhe/brand

Repo-specific gotchas for future syncs. Read before re-syncing.

## Build setup (this repo is unusual)
- **No `dist/`.** `package.json` `main` points at `src/index.ts` and the build script is `tsc --noEmit` (emits nothing). The converter runs in **synth-entry mode**: pass `--entry ./src/index.ts`. esbuild compiles the TS/TSX source directly; ts-morph reads types from source.
- **`--node-modules ./node_modules`** (the package's own; react/react-dom/radix all present as devDeps).
- **CSS is compiled, not shipped.** The package ships no stylesheet — components use Tailwind v4 utilities + arbitrary `[var(--token)]` values, and the consumer app runs Tailwind. So before each build we compile a static stylesheet:
  - Input: `.design-sync/tw-input.css` — remote Google-Fonts `@import` (Inter/Poppins/JetBrains Mono) + `@import "../src/tokens/tokens.css"` (inlines all `--fhe-*`/`--n-*`/`--r-*`/etc. var DEFINITIONS into the closure) + `@import "tailwindcss"` + `@theme` fonts + `@source "../src/**/*.{ts,tsx}"`.
  - Command: `.ds-sync/node_modules/.bin/tailwindcss -i .design-sync/tw-input.css -o .design-sync/compiled.css`
  - `cfg.cssEntry` = `.design-sync/compiled.css`. **Re-run this compile whenever component class usage or tokens.css changes**, else new utilities/vars won't be in the bundle.
- **`tokensGlob`/`tokensPkg` do NOT apply** — `copyTokens` only ships tokens from a *node_modules package*, and our tokens live in-package (`src/tokens/`). Tokens reach the closure ONLY via the `@import` in tw-input.css above. (Empty `ds-bundle/tokens/` is expected.)
- Staged dep install adds `@tailwindcss/cli@^4` alongside esbuild/ts-morph/@types/react in `.ds-sync/`.

## Providers — none needed
- `useOverlayHistory` is NOOP-safe (`useContext(...) ?? NOOP`), so Drawer/Panel/Dialog render without `<OverlayHistoryProvider>`.
- Tooltip composes `<TooltipProvider>` inside its own preview; Sidebar/AppShell carry their own internal context. So **no global `cfg.provider`**.

## cardMode overrides (in config) — why each
- Open overlays rendered via `defaultOpen`, shown with `cardMode: single` + a viewport: Dialog, BandedDialog, Drawer, Panel, DropdownMenu, Popover, Tooltip, AppShell, Sidebar, SplitPane.
- Wide stacked components → `cardMode: column` (full-width per cell, no crop): DataTable, Board, Pagination, Skeleton, Tabs.

## Component API quirks (folded from authoring)
- **Input/Textarea/Select** `error` is a **boolean** (red border only); the error *message* lives on the parent `Field` (`error="..."`). `Input.leadingIcon` takes a **node** (`<Icon .../>`), not a name. `Select` renders its own chevron (`appearance-none`) — pass `<option>` children; `<option value="" disabled>` + `defaultValue=""` = prompt state.
- **Checkbox** (Radix) tri-state: `checked="indeterminate"` → navy + minus glyph. **Switch/Checkbox/RadioGroup** have no label slot — wrap in a `<label>` + span.
- **RadioGroup** compound: `RadioGroup` + `RadioGroupItem value=`; set `defaultValue`.
- **Badge** has NO `size` prop — only `tone` (neutral|info|success|warning|error|navy|soft) + `icon`. **Avatar** takes `size` (sm|md|lg|number) + `tone` + `name` (renders the string literally, no auto-initialing).
- **Logo** — single inlined SVG, props `width`/`decorative`/`title` (no light/mono variant; invert with a CSS filter on dark surfaces).
- **Icon** — unknown `name` silently falls back to `info`; validate names against `src/icons/paths.tsx`.
- **Tabs/Accordion** (Radix) need `defaultValue` (Accordion: `type="single" collapsible defaultValue=`) so a panel renders open in a static shot.
- **Pagination** is NOT Radix — controlled (`page`/`pageCount`/`onPageChange` required; a no-op callback is fine for previews); returns null when `pageCount<=1`.
- **PageHeader** is prop-driven (`title`/`description`/`breadcrumb`/`actions`), not children.
- **Board** is a controlled generic (`columns`/`items`/`getId`/`getColumnId`/`renderCard`), not compound parts; columns are 288px (4 cols ≈ wide).
- **Command** (cmdk) — render OPEN inline by wrapping a bare `<Command>` in a styled div; `CommandInput defaultValue` does not echo visibly (use controlled `value` if the query must show).
- **DatePicker** opens its calendar via internal state (no `open` prop) — the preview shows the trigger only; the month grid lives on the separate `Calendar` card.

## Known render warns (triaged legitimate)
- `[FONT_REMOTE]` Inter/Poppins/JetBrains Mono — expected; fonts load from the Google-Fonts `@import` (see Re-sync risks).
- `Toaster` ships as a **floor card** by design — sonner renders nothing without a runtime `toast()` call; not statically previewable.

## Surface shape
- 106 exports = the real public API. ~39 are meaningful components with authored previews; ~67 are Radix-style compound sub-parts (DialogTitle, DropdownMenuItem, PopoverContent, …) on floor cards, demonstrated inside their parent's authored composition. All importable + documented.

## Re-sync risks (watch-list)
- **Fonts are remote.** Previews depend on `fonts.googleapis.com` being reachable at render time. If offline/blocked, cards fall back to system fonts (no error). To make self-contained, ship woff2 + `@font-face` via `cfg.extraFonts` and drop the remote `@import`.
- **The Tailwind compile is a manual pre-step**, not part of the converter. A re-sync that skips it will ship a stale `compiled.css` (missing any newly-used utilities/tokens). Always re-run the compile before `package-build`/`resync`.
- **Token visualization**: tokens are shipped as CSS vars in the closure (functional) but there is no dedicated token-swatch card (no "Tokens" component exists to hang one on). A future polish item could author a foundations preview if a token-display component is added.
- Grades + authored previews carry forward via `.design-sync/previews/` (committed) + the uploaded `_ds_sync.json`; `.cache/` is gitignored working state.
