---
name: FirstHealth HQ
description: Light-themed orchestration cockpit for the FirstHealth Enrollment ecosystem. Inherits the FHE Brand Design System.
colors:
  brand:
    navy: "#0B1D3A"
    navy-700: "#122A52"
    navy-600: "#1A3A6E"
    blue: "#2563EB"
    blue-600: "#1D4FCB"
    blue-400: "#4D7DF0"
    light-blue: "#9EC5FF"
    soft-blue: "#E8F1FF"
    off-white: "#F6F8FA"
  neutrals:
    n-0: "#FFFFFF"
    n-25: "#FAFBFC"
    n-50: "#F4F6F8"
    n-100: "#E7EBF0"
    n-200: "#D4DAE2"
    n-300: "#B6BFCC"
    n-400: "#8C97A8"
    n-500: "#69748A"
    n-600: "#4D5870"
    n-700: "#353F55"
    n-800: "#1F2940"
    n-900: "#0F172E"
  semantic:
    success: { 50: "#ECFDF3", 100: "#D1FADF", 500: "#12B76A", 700: "#027A48" }
    warning: { 50: "#FFFAEB", 100: "#FEF0C7", 500: "#F79009", 700: "#B54708" }
    error:   { 50: "#FEF3F2", 100: "#FEE4E2", 500: "#EF4444", 700: "#B42318" }
    info:    { 50: "#EFF6FF", 100: "#DBEAFE", 500: "#2563EB", 700: "#1849A9" }
typography:
  display: { family: "Poppins", weight: 600, size: "clamp(40px, 6vw, 72px)", line-height: 1.02, tracking: "-0.025em" }
  h1:      { family: "Poppins", weight: 600, size: "44px", line-height: 1.08, tracking: "-0.02em" }
  h2:      { family: "Poppins", weight: 600, size: "32px", line-height: 1.15, tracking: "-0.015em" }
  h3:      { family: "Poppins", weight: 600, size: "24px", line-height: 1.2,  tracking: "-0.01em" }
  h4:      { family: "Poppins", weight: 600, size: "18px", line-height: 1.3,  tracking: "-0.005em" }
  body-lg: { family: "Inter",   weight: 400, size: "17px", line-height: 1.6 }
  body:    { family: "Inter",   weight: 400, size: "15px", line-height: 1.55 }
  small:   { family: "Inter",   weight: 400, size: "13px", line-height: 1.5 }
  micro:   { family: "Inter",   weight: 600, size: "11.5px", line-height: 1.45, tracking: "0.04em", transform: "uppercase" }
  mono:    { family: "JetBrains Mono", weight: 400, size: "12-13px" }
rounded:
  xs: 4
  sm: 6
  md: 8
  lg: 12
  xl: 16
  "2xl": 20
  pill: 999
spacing:
  base: 4
  scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
components:
  Btn:        { variants: [primary, secondary, blue, outline, ghost, danger, subtle], sizes: [sm, md, lg] }
  Field:      { states: [default, focus, error, disabled] }
  Badge:      { tones: [neutral, info, success, warning, error, navy, soft] }
  Alert:      { tones: [info, success, warning, error] }
  Toast:      { tones: [success, info, error] }
  Avatar:     { tones: [soft, blue, navy, light], sizes: [sm, md, lg] }
  Tabs:       { variant: underline-navy }
  Breadcrumb: { separator: chevron }
  Pagination: { active-style: navy-fill }
  Accordion:  { disclosure: chevron-rotate }
  Tooltip:    { tone: navy-on-white }
  Icon:       { stroke: 1.6, viewBox: "24x24", caps: rounded, count: 40 }
  LeadCard:           { register: operational }
  CallStatusBar:      { register: operational }
  ApplicationChecklist: { register: operational }
  DocRequestCard:     { register: operational }
  ComplianceAlert:    { register: operational }
  PolicyCard:         { register: operational }
  CustomerProfile:    { register: operational }
---

# Design System: FirstHealth HQ

## 1. Overview

FirstHealth HQ is the **orchestration layer** above five live FHE projects. Its visual identity is sourced from the FHE Brand Design System (authored 2026-04-29) — Deep Navy authority, blue trust, off-white clarity, Poppins display, Inter body, healthcare iconography — and adapted for an internal operator audience.

**Color strategy: Restrained.** Off-white (`--n-25`) backgrounds and tinted neutrals carry the surface; one accent (`--fhe-blue`) appears at no more than ~10% of the screen, used for links, focus rings, secondary CTAs. Deep Navy (`--fhe-navy`) is the primary CTA color and primary text color — it's not an accent, it's the voice.

**Theme: Light, deliberate.** The decision is forced by physical scene: an engineer at a desk in a well-lit room, scanning the state of five projects between meetings, dropping into Grid/SCA (which are dark) and back out. HQ's lightness signals "you're above the apps, not inside one." Dark mode is **not in v1** — it would dilute that signal and reintroduce sameness with Grid.

**Layout philosophy:**
- Persistent left sidebar (240px, collapsible groups). Top bar above main content. Top bar auto-hides on focus inside an embedded app under `/apps/*`.
- Mission Control and dashboards use 12-column responsive grids; content surfaces use single-column reading widths capped at 75ch.
- Cards are flat at rest; elevation arrives only via hover or interaction. Nested cards are forbidden.
- Spacing rhythm comes from the 4px scale; same padding everywhere is a smell.

**Motion:**
- Default duration: 150–200ms.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for enters, `cubic-bezier(0.4, 0, 0.2, 1)` for exits.
- Hover lifts: `translateY(-1px)` to `-2px`, never more.
- Reduced motion: all motion respects `prefers-reduced-motion`. Splash falls back to instant.

**Anti-references** (cited from PRODUCT.md, enforced in §6):
1. Generic SaaS sameness (Vercel-clone hero metric grids, purple gradients).
2. Dark CRM aesthetic (`#0a0a0f` + blue) — that's Grid's territory.
3. AI-tool glassmorphism (frosted cards, animated borders, pink/magenta accents) — that's `fhe-2026`'s identity, replaced.
4. Notion/Airtable density (we're not a database tool).
5. Admin-panel maximalism (47-widget dashboards).
6. Customer-facing FHE marketing surfaces (LandingHero, EmailTemplate are reference, not template).
7. Notification spam (engagement badges, unread counters as decoration).
8. Loud onboarding (tutorial overlays, illustrated empty states).

---

## 2. Colors

### Core brand
| Token | Hex | Role |
|---|---|---|
| `--fhe-navy` | `#0B1D3A` | Primary text · Primary CTA · Authority |
| `--fhe-navy-700` | `#122A52` | Navy hover |
| `--fhe-navy-600` | `#1A3A6E` | Navy pressed |
| `--fhe-blue` | `#2563EB` | Links · Focus rings · Secondary CTA · Info state |
| `--fhe-blue-600` | `#1D4FCB` | Blue hover |
| `--fhe-blue-400` | `#4D7DF0` | Blue tertiary |
| `--fhe-light-blue` | `#9EC5FF` | Secondary button background · Hero accents |
| `--fhe-soft-blue` | `#E8F1FF` | Notice tiles · Subtle button background · Avatar tone |
| `--fhe-off-white` | `#F6F8FA` | Section backgrounds (rarely; prefer `--n-25`) |

### Neutral ramp (cool gray, navy-tinted)
12 stops from `--n-0` (`#FFFFFF`) to `--n-900` (`#0F172E`). Page background defaults to `--n-25` (`#FAFBFC`) — not pure white. Dividers use `--n-100`; secondary borders `--n-200`; muted text `--n-500`.

### Semantic
Each role has 4 stops (50/100/500/700) for surface/border/icon/text:

| Role | Use case | 500 hex |
|---|---|---|
| `--success-*` | Eligibility confirmed · App submitted · Task completed | `#12B76A` |
| `--warning-*` | Docs required · Expiring window · Stale data | `#F79009` |
| `--error-*` | Compliance issue · Rejected document · Failed deploy | `#EF4444` |
| `--info-*` | Informational notice · System status · Brain capture confirmation | `#2563EB` |

### Color rules
- **Pure black/white forbidden.** Backgrounds tint toward navy (`--n-25` not `#fff`); text tints similarly.
- **Brand color is voice.** Navy + blue carry hierarchy and identity. They never communicate state.
- **Semantic color is state.** Success/warning/error/info ONLY signal status. They never carry hierarchy or decorate marketing surfaces.
- **Light blue + soft blue are register markers.** Used for non-state accents (avatar tones, hero highlights, subtle button backgrounds). Don't apply them to body text or critical CTAs.
- **One accent ≤ ~10% of surface.** Soft blue and blue accents stay restrained; navy carries the weight.

### Verified contrast pairs
- Navy on White → 16.4:1 (AAA)
- Blue on White → 5.1:1 (AA)
- Navy on Soft Blue → 13.8:1 (AAA)
- White on Navy → 16.4:1 (AAA — for primary CTAs)
- Mid Ash (`--n-500`) on White → 4.6:1 (AA)

---

## 3. Typography

### Font stack
- **Display / Headlines:** Poppins (Google Fonts, weights 500/600/700) — `var(--font-head)`
- **Body / UI:** Inter (Google Fonts, weights 400/500/600/700) — `var(--font-body)`
- **Numbers / Code / Metadata:** JetBrains Mono (weights 400/500) — `var(--font-mono)`

### Hierarchy

| Token | Font | Weight | Size | Line height | Tracking | Use |
|---|---|---|---|---|---|---|
| `display` | Poppins | 600 | `clamp(40px, 6vw, 72px)` | 1.02 | `-0.025em` | Mission Control hero · Brand Kit page heading · Marketing-adjacent surfaces |
| `h1` | Poppins | 600 | 44px | 1.08 | `-0.02em` | Page titles |
| `h2` | Poppins | 600 | 32px | 1.15 | `-0.015em` | Section headers |
| `h3` | Poppins | 600 | 24px | 1.2 | `-0.01em` | Subsections, card titles in dense surfaces |
| `h4` | Poppins | 600 | 18px | 1.3 | `-0.005em` | Inline headings |
| `body-lg` | Inter | 400 | 17px | 1.6 | 0 | Lead paragraphs |
| `body` | Inter | 400 | 15px | 1.55 | 0 | Default body. **Minimum size on web.** |
| `small` | Inter | 400 | 13px | 1.5 | 0 | Legal · footnotes only |
| `micro` | Inter | 600 | 11.5px | 1.45 | `0.04em` UPPERCASE | Eyebrow labels · table headers |
| `mono` | JetBrains Mono | 400 | 12–13px | — | — | Numeric metrics · code · timestamps |

### Typographic rules
- **Cap body line length at 65–75ch.** Forced reading widths on Notes and long-form surfaces.
- **Hierarchy through scale + weight, ≥1.25 ratio between steps.** No flat scales.
- **Italic is voice, not emphasis.** Body emphasis uses weight only (semibold or bold).
- **Tabular numbers everywhere a column aligns.** `font-variant-numeric: tabular-nums` on Mission Control health grid, Inbox times, all metric chips.
- **No all-caps body.** Only `micro` is uppercase; never lift it to body or headings.
- **Drop caps, ligatures, weird OpenType — off by default.** `cv11` and `ss01` are enabled in body for clarity, no decorative features.

---

## 4. Elevation

### Shadow scale (all tinted navy, alpha ≤ 0.16)

| Token | CSS | Use |
|---|---|---|
| `--shadow-xs` | `0 1px 2px rgba(11,29,58,0.06)` | Hairline borders on inputs · subtle separation |
| `--shadow-sm` | `0 1px 3px rgba(11,29,58,0.08), 0 1px 2px rgba(11,29,58,0.04)` | Default card resting state |
| `--shadow-md` | `0 4px 12px rgba(11,29,58,0.08), 0 2px 4px rgba(11,29,58,0.04)` | Popovers · floating elements |
| `--shadow-lg` | `0 12px 28px rgba(11,29,58,0.12), 0 4px 8px rgba(11,29,58,0.05)` | Modals · dropdowns |
| `--shadow-xl` | `0 24px 48px rgba(11,29,58,0.16)` | Drawers · full-screen overlays |
| `--shadow-focus` | `0 0 0 4px rgba(37,99,235,0.18)` | Focus rings (universal) |

### Elevation rules
- **Cards are flat at rest.** Borders + tone shifts before shadows.
- **Shadows mark interaction, not hierarchy.** A card lifts on hover, a button lifts on press, a dropdown floats. Static surfaces stay flat.
- **All shadow alphas ≤ 0.16.** Higher = the 2014 Material Design tell. Never appropriate for HQ.
- **Tinted shadows only.** Black shadows are forbidden — always reach for the navy-tinted scale (`rgba(11, 29, 58, ...)`).
- **No nested shadows.** A card with a shadow does not contain a card with a shadow.
- **Focus rings always visible on keyboard nav.** `--shadow-focus` is non-negotiable; suppress only when the interaction is mouse-clicked (`:focus-visible`).

### Border + tone (used before shadow)
- Default border: `1px solid var(--n-100)`.
- Input border: `1px solid var(--n-200)` resting; `var(--fhe-blue)` on focus.
- Section dividers: dashed `1px var(--n-100)` (subsection breaks); solid `1px var(--n-100)` (between sections).

---

## 5. Components

Components are sourced from the FHE Brand Design System bundle. They will be ported to `@fhe/brand` (workspace package) as React + TypeScript + Tailwind 4 implementations during Phase 1.

### Foundation primitives

**Btn** (the only button component)
- 7 variants: `primary` (navy-on-white), `secondary` (navy on light-blue), `blue` (white on blue), `outline` (blue on white with blue border), `ghost` (transparent, navy text), `danger` (white on error-500), `subtle` (navy on soft-blue).
- 3 sizes: `sm` (32px h, 13px text), `md` (40px h, 14px text), `lg` (48px h, 15px text).
- Optional leading + trailing icons. `full` prop for full-width.
- Disabled state: opacity 0.55, `cursor: not-allowed`.
- Hover: subtle background shift; transitions on background, color, border, box-shadow at 120ms.

**Field** (form primitive — Field + inputStyle)
- Composed pattern: label + input + hint/error.
- States: default · focus (blue border + focus shadow) · error (red border + red helper) · disabled.
- Heights: 40px desktop · 48px mobile.
- Required marker: red asterisk in label.
- Error helper text gets a leading `x-circle` icon — never red text alone.
- Variants: text input · select · textarea · radio · checkbox · toggle.

**Badge** (state-only)
- 7 tones matching color rules: `neutral` · `info` · `success` · `warning` · `error` · `navy` · `soft`.
- Optional leading icon (12px).
- Pill shape (`border-radius: 999px`), 3px–10px padding, 11.5px text, weight 600.

**Alert** (banner-style with action slot)
- 4 tones: `info` · `success` · `warning` · `error`.
- Required: leading icon, title, body. Optional: trailing action (a Btn).
- 10px border radius, tone-specific bg + border, 16px padding.
- Use only when there's a real next step or compliance signal — must be dismissable or actionable.

**Toast**
- Pattern: navy-tinted card with left-border accent in semantic color.
- 280px min width, `--shadow-md`, leading icon, title + body.

### Navigation primitives

**Tabs**
- Underline pattern: navy 2px underline on active, transparent on inactive.
- Active text: navy, weight 600. Inactive: `--n-500`.
- Optional badge after label (e.g., "Documents · 2").

**Breadcrumb**
- Chevron separators (`Icon name="chevron"`, 12px, `--n-300`).
- Trail text: `--n-500`. Leaf: navy, weight 600.

**Pagination**
- Numbered. Active page: navy fill, white text. Others: white bg, `--n-200` border, `--n-700` text.
- Min button: 32×32px, 6px radius.

**Accordion**
- Disclosure with rotating chevron. Expanded chevron at `rotate(180deg)`, transition 200ms.
- Used for FAQs, settings groups, dense forms with optional sections.

**Tooltip**
- Navy bg, white text, 12px, 8/10 padding, 6px radius.
- 220px max width, side arrow.

### Operational components (sourced from bundle)

These ship as ready-to-use compounds and are domain-specific to FHE workflows. HQ embeds may use them; HQ chrome generally does not.

| Component | Purpose | HQ usage |
|---|---|---|
| `Avatar` | Initials disc, 4 tones | Heavy use in People, Roster, Inbox |
| `LeadCard` | Lead summary with actions | Reference only — Grid owns this surface |
| `CallStatusBar` | Live "On call" navy bar | Reference only — Grid owns it |
| `ApplicationChecklist` | Progress bar + step list | Adapted for HQ task progression in Notes/Forms |
| `DocRequestCard` | Document upload state | Used in `/forms` submissions inbox |
| `ComplianceAlert` | Flagged-call pattern | Used in `/inbox` SCA alerts |
| `PolicyCard` | Policy summary | Reference only |
| `CustomerProfile` | Full profile layout | Reference only |

### Iconography

Single `Icon` component, 24×24 viewBox, 1.6px stroke, rounded caps + joins. 40+ icons covering:
- **Healthcare:** `shield`, `shieldcheck`, `stethoscope`, `pill`, `heartbeat`, `piggy`, `doc-search`, `id-card`
- **People + comm:** `user`, `users`, `user-plus`, `phone`, `phone-incoming`, `mail`, `chat`
- **Workflow:** `calendar`, `clock`, `doc`, `upload`, `download`, `list`, `inbox`, `flag`
- **Status + UI:** `check-circle`, `x-circle`, `info`, `alert`, `bell`, `search`, `filter`, `settings`
- **Other:** `home`, `eye`, `lock`, `chevron`, `chev-down`, `arrow-right`, `refresh`, `sparkle`, `layers`, `bookmark`, `star`, `plus`, `minus`, `x`, `check`

Sizes: 14, 16, 20, 24, 32, 40px. Default 20px in body, 16px inside buttons.

### Component composition rules

- **Cards are the lazy answer.** Use them only when they're truly the best affordance. Reach for borders, tone shifts, or full-width sections first.
- **Nested cards are always wrong.** A card containing a card is a refactor.
- **One Btn primary per surface.** Never stack two `primary` (navy) CTAs side by side. Pair primary with secondary, outline, or ghost.
- **Color is state, never decoration.** Repeat after me: a green badge means "succeeded," not "this is nice."
- **Operational components stay in operational contexts.** Don't import `LeadCard` into Mission Control just because it's pretty.

---

## 6. Do's and Don'ts

### Do

- **Do** use `--n-25` as the page background. Pure white (`--n-0`) is reserved for elevated surfaces (cards, panels, modals).
- **Do** ship one Btn `primary` per surface, paired with `secondary` / `outline` / `ghost` for support actions.
- **Do** use Poppins for headlines and Inter for everything else. Mono is for numbers, code, timestamps — not for body copy or "look at this it's a tech product" decoration.
- **Do** keep cards flat at rest. Lift with `--shadow-sm` only on hover or when the card is actively interactive.
- **Do** include a leading icon on every Alert and the relevant Toast. Color alone never communicates state.
- **Do** show empty states honestly. "No errors today" beats a celebratory checkmark with no context.
- **Do** keep the FHE brand voice pillars present in HQ copy: Trusted, Clear, Personal, Straightforward.
- **Do** respect `prefers-reduced-motion`. Splash, hovers, transitions all collapse to instant under reduced-motion.
- **Do** use tabular numbers everywhere a column aligns.
- **Do** cap body line length at 65–75ch.

### Don't (cited from PRODUCT.md anti-references)

- **Don't** build generic SaaS sameness — no Vercel-clone hero metric grids, no purple gradient headers, no stock illustrations. *(Anti-reference 1)*
- **Don't** mimic the Grid CRM dark aesthetic in HQ chrome. Grid is dark; HQ is light. The boundary is the point. *(Anti-reference 2)*
- **Don't** use glassmorphism — frosted cards, animated gradient borders, pink/magenta accents. That's `fhe-2026`'s identity, not HQ's. *(Anti-reference 3)*
- **Don't** turn HQ into a database tool. Notes are notes; we don't ship Airtable-style multi-property views in v1. *(Anti-reference 4)*
- **Don't** ship 47-widget dashboards. If a widget doesn't surface state Enzo would act on, cut it. *(Anti-reference 5)*
- **Don't** import the bundle's `LandingHero` or `EmailTemplate` into HQ surfaces. They are customer-facing. HQ uses the tokens, not the layouts. *(Anti-reference 6)*
- **Don't** add streaks, badges, or unread counters that exist for engagement. The Inbox surfaces things that need response, then goes silent. *(Anti-reference 7)*
- **Don't** ship loud onboarding overlays or illustrated empty states with three CTAs. Empty states are honest sentences. *(Anti-reference 8)*
- **Don't** stack two navy Btn `primary` CTAs side by side. One per surface.
- **Don't** use pure black or pure white. All neutrals tint toward navy.
- **Don't** use brand color (navy, blue, light/soft blue) to communicate state. Use semantic.
- **Don't** use semantic color (success, warning, error, info) as decoration. Use it for state.
- **Don't** nest cards inside cards. Refactor the layout instead.
- **Don't** skip focus rings. `--shadow-focus` is the universal keyboard nav signal — suppress it only with `:focus-visible`.
- **Don't** use shadows with alpha > 0.16. Anything heavier reads as the 2014 Material Design tell.
- **Don't** use italic for body emphasis. Italic is display voice. Body emphasis uses weight.
- **Don't** put body copy below 15px. 13px is reserved for legal and footnotes.
