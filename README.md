# @fhe/brand

**FirstHealth Enrollment shared brand design system — the portfolio default.**
Tokens (CSS variables + TS exports + Tailwind 4 preset), primitive components, and icons.

This is the **single source of truth**. Any FirstHealth frontend inherits this design
system by default unless the project declares its own (e.g. `fhe-grid-stream`).
See `~/Projects/FirstHealth/DESIGN_SYSTEM.md` for the full adoption recipe and the
exempt list, and `DESIGN.md` (in this repo) for the design rules the tokens enforce.

> Seeded from `fhe-hq/packages/brand` (the historical origin). Going forward, **this
> repo is canonical** — edits land here and propagate to consumers via version bump.

## Install (consumers)

```bash
npm i "@fhe/brand@github:ehoyos007/fhe-brand"
```

This package **ships raw TypeScript** (no build emit — `build` is `tsc --noEmit`), so
consuming apps must transpile it:

- **Next.js:** add `transpilePackages: ["@fhe/brand"]` to `next.config`.
- **Vite:** add `@fhe/brand` to `optimizeDeps.include` / `ssr.noExternal`.

A `github:` dependency installs a real copy into `node_modules` (not a symlink), so it
avoids the Turbopack "leaves filesystem root" panic that affects `file:`-linked copies.

## Usage

```css
/* globals.css */
@import "@fhe/brand/tokens.css";
@import "tailwindcss";

@theme inline {
  --color-primary: var(--fhe-navy);
  --color-accent: var(--fhe-blue);
  /* …map remaining tokens to --fhe-* / --n-* */
}
```

```ts
import { Btn, Badge, Field, Alert, Avatar, Icon, fheBrand } from "@fhe/brand";
import fhePreset from "@fhe/brand/tailwind.preset"; // Tailwind 3 preset style
```

## Layout

```
src/
├── tokens/
│   ├── tokens.css          # CSS variables — single source of truth
│   ├── index.ts            # TS token exports (fheBrand, fheNeutrals, fheSemantic, …)
│   └── tailwind.preset.ts  # Tailwind preset
├── components/             # Btn, Field/Input/Textarea/Select, Badge, Alert, Avatar
├── icons/                  # Icon component + paths
├── lib/cn.ts               # classname util
├── assets/                 # logo
└── index.ts                # barrel
DESIGN.md                   # authored design rules
docs/_bundle-source/        # original Claude Design handoff bundle (read-only reference)
```

Token edits go in `src/tokens/` — never in `docs/_bundle-source/`.

## Versioning

`0.1.0` — internal private package, distributed by `github:` ref. Consumers pin a tag
(`@github:ehoyos007/fhe-brand#v0.1.0`) and bump deliberately. A change here → tag a new
version → consumers bump.
