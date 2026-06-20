# Building with @fhe/brand (GRID v2)

FirstHealth Enrollment's design system — a light-mode, navy/blue health-insurance CRM kit. Poppins display + Inter body. Every component is a real React component on `window.FheBrand.*` (the bundle is loaded for you); each `<Name>.prompt.md` shows its props and a usage example.

## Setup — no provider needed
Components are self-contained: just render them. `styles.css` (already linked) carries the full token system + the components' compiled styles. No theme/context wrapper is required. One exception you compose yourself: `Tooltip` must be wrapped in `<TooltipProvider>` (see `Tooltip.prompt.md`).

## Styling idiom — components + CSS-variable tokens
1. **Use the library components for all UI** — `Btn`, `Field`/`Input`/`Select`, `Badge`, `Alert`, `Dialog`, `DataTable`, `Sidebar`, `AppShell`, etc. They are fully styled; don't rebuild them.
2. **For your own layout glue, style with the design tokens as CSS variables via `style={{}}`** — NOT new Tailwind utility classes. Only the utilities the components already use are compiled, so a fresh class like `bg-blue-500` won't resolve; `var(--*)` tokens always do.

Token vocabulary (all defined in `styles.css`):
- **Brand:** `--fhe-navy` `--fhe-navy-700` `--fhe-navy-600` `--fhe-blue` `--fhe-blue-600` `--fhe-blue-400` `--fhe-light-blue` `--fhe-soft-blue` `--fhe-off-white`
- **Neutrals (cool gray):** `--n-0` `--n-25` `--n-50` `--n-100` `--n-200` `--n-300` `--n-400` `--n-500` `--n-600` `--n-700` `--n-800` `--n-900`
- **Semantic (50/100/500/700 each):** `--success-*` `--warning-*` `--error-*` `--info-*`
- **Radii:** `--r-xs` `--r-sm` `--r-md` `--r-lg` `--r-xl` `--r-2xl` `--r-pill`
- **Shadows:** `--shadow-xs` `--shadow-sm` `--shadow-md` `--shadow-lg` `--shadow-xl` `--shadow-focus` `--shadow-panel`
- **Spacing (4px base):** `--s-1` `--s-2` `--s-3` `--s-4` `--s-5` `--s-6` `--s-8` `--s-10` `--s-12` `--s-16` `--s-20` `--s-24`
- **Fonts:** `--font-head` (Poppins, headings) · `--font-body` (Inter, body) · `--font-mono`

Rules of the brand: light surfaces (white cards on `--fhe-off-white`/`--n-25`); one primary `Btn` per surface (navy); blue is for links/active; semantic colors mean state (success/warning/error/info), brand colors mean voice. Numbers use `tabular-nums`.

## Where the truth lives
- `styles.css` — the token definitions + compiled component styles (read it for exact values).
- `components/<group>/<Name>/<Name>.prompt.md` — per-component props + usage example. `<Name>.d.ts` — the typed prop contract. Read these before using a component.

## Idiomatic example
```jsx
const { Btn, Badge, Field, Input } = window.FheBrand;

function EnrollPanel() {
  return (
    <div style={{
      background: 'var(--n-0)',
      border: '1px solid var(--n-200)',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-md)',
      padding: 'var(--s-6)',
      fontFamily: 'var(--font-body)',
    }}>
      <h2 style={{ margin: 0, color: 'var(--fhe-navy)', fontFamily: 'var(--font-head)' }}>
        Enroll member
      </h2>
      <div style={{ marginTop: 'var(--s-2)' }}><Badge tone="success">Subsidy eligible</Badge></div>
      <div style={{ marginTop: 'var(--s-4)' }}>
        <Field label="Member name" htmlFor="m" required><Input id="m" defaultValue="Maria Gonzalez" /></Field>
      </div>
      <div style={{ marginTop: 'var(--s-5)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--s-2)' }}>
        <Btn variant="ghost">Cancel</Btn>
        <Btn variant="primary" icon="check">Submit application</Btn>
      </div>
    </div>
  );
}
```
