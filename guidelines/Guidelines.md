# Velocity Design System — Guidelines

Velocity is the production design system for **Runswap** (running / cycling e-commerce). It is a React 19 library built on Base UI primitives and Tailwind CSS v4 semantic tokens.

## Product character

- **Category**: B2C e-commerce for running & cycling products.
- **Tone**: energetic, sporty, trustworthy, slightly premium.
- **UI style**: clean, high contrast, generous whitespace, lime-yellow brand accents.
- **Brand color**: lime-yellow `#d0f400`. Used sparingly (CTAs, active states, highlights). NOT orange.
- **Surface strategy**: neutral-dominant (~90% white / gray surfaces), brand used as accent only.

## Reading order

**MUST READ before writing any code, in this order:**

1. This file (`Guidelines.md`) — product character, rules, workflows
2. [`setup.md`](./setup.md) — installation, providers, CSS imports, build configuration
3. [`foundations/overview.md`](./foundations/overview.md) — router for every token file
4. [`foundations/color.md`](./foundations/color.md) · [`typography.md`](./foundations/typography.md) · [`elevation.md`](./foundations/elevation.md) · [`motion.md`](./foundations/motion.md) · [`modes.md`](./foundations/modes.md)
5. [`components/overview.md`](./components/overview.md) — component catalogue with alt names + decision trees
6. `components/<area>.md` — per-area component docs (button / inputs / form / data-display / navigation / overlays / banners / ecommerce)

**Read on demand:**
- Any `foundations/*.md` when picking tokens.
- `components/<area>.md` BEFORE using a component you haven't used yet.

## Token source files — `src/imports/`

The **ground truth for every token value** is inside `src/imports/`. When the `foundations/*.md` file is not enough (you need the exact hex, the exact shadow value, the exact duration, the dark-mode override), open the matching file in `src/imports/` and read the raw values.

```
src/imports/
├── color.ts          // core palette (gray, yellow, primary, green, orange, red, blue)
├── typography.ts     // font families, sizes, line-heights, weights, tracking
├── elevation.ts      // shadow-sm / md / lg (light + dark)
├── motion.ts         // durations, easings
├── modes.ts          // semantic token overrides for light & dark
└── semantic/         // semantic → core token mappings (background, content, border, surface, state, brand…)
```

Rules for `src/imports/`:

- READ from `src/imports/*` when you need the exact value a semantic token resolves to.
- NEVER hardcode values that exist in `src/imports/` — always go through the matching semantic Tailwind utility (`bg-background-primary`, `shadow-md`, `duration-normal`, ...).
- NEVER duplicate or re-export these files from product code. They are the single source of truth.
- When updating tokens, edit the file in `src/imports/` and the corresponding `foundations/*.md` in the same change.

## Core rules

### Components
- ALWAYS import from the top-level `velocity-ds` entry point.
  ```tsx
  import { Button, Card, CardContent } from "velocity-ds";
  ```
- NEVER import from `velocity-ds/dist/...` or `velocity-ds/src/...`.
- NEVER re-implement a component with raw HTML + Tailwind when Velocity provides it. Use `<Button>` not `<button>`, `<Select>` not `<select>`, `<Input>` not `<input>`.
- ALWAYS use compound parts when the component provides them (`Card` → `CardHeader` / `CardContent` / `CardFooter`, `Dialog` → `DialogTrigger` / `DialogPopup`, `Form` → `FormField` / `FormLabel` / `FormMessage`...). Never flatten a compound into a single `<div>`.

### Tokens
- ALWAYS use semantic Tailwind utilities (`bg-background-*`, `text-content-*`, `border-border-*`, `bg-surface-*`, `text-state-*`, `shadow-*`, `duration-*`).
- ALWAYS use composite text utilities (`text-heading-*`, `text-body*`, `text-caption`, `text-overline`).
- NEVER hardcode hex values, pixel font sizes, or inline `style={{ color, background, fontSize }}` except for genuinely dynamic values.
- NEVER use raw Tailwind color scales (`bg-orange-500`, `text-gray-700`, `border-zinc-300`) in product code.
- On yellow brand surfaces, ALWAYS pair `bg-brand-*` / `bg-background-brand` with `text-content-on-brand`.

### Styling & structure
- Use Tailwind v4 default spacing (`p-*`, `m-*`, `gap-*`) — no custom spacing scale.
- Use Tailwind defaults for radii (`rounded`, `rounded-md`, `rounded-lg`, `rounded-full`).
- No `tailwind.config.js`. Velocity configures Tailwind entirely through `@theme` in its CSS.
- Never add `@source` rules for `velocity-ds` in consumer Tailwind configs — the package ships pre-compiled utility CSS.

### Theming
- Toggle dark mode via `document.documentElement.setAttribute("data-theme", "dark")`.
- NEVER write `dark:` variants against hardcoded colors. Use semantic tokens and the theme follows.

### Accessibility
- Every icon-only control requires `aria-label`.
- Use `<Form>` + `<FormField>` + `<FormLabel>` to wire `id` / `aria-*` automatically.
- Use `TooltipProvider` at the app root; wrap overlays (`Dialog`, `Drawer`, `Tooltip`, `Popover`) with their `Trigger` + `Popup` parts so focus and keyboard behavior work.
- Use semantic HTML (`<h1>`, `<nav>`, `<main>`). Typography utilities are visual only.
- Disabled content uses `text-content-disabled`, never `text-content-primary` at lowered opacity.

### Motion
- Stick to `duration-fast | normal | slow` and `ease-standard | spring`.
- Transitions ≤ 300ms. Prefer `transition-colors` / `transition-transform` / `transition-opacity` over `transition-all`.

## Workflows

### Before using a component
1. Open [`components/overview.md`](./components/overview.md) and find the component or its alt name.
2. Jump to the per-area file it links to (e.g. `components/button.md`).
3. Read its props and variant table, then use the documented props. Don't invent new variants.

### Before picking a color
1. Open [`foundations/color.md`](./foundations/color.md).
2. Use the decision trees (background / text) to pick the right semantic token.
3. Never reach for raw color scales.

### Before writing any text
1. Pick a composite utility from [`foundations/typography.md`](./foundations/typography.md) (`text-heading-1`, `text-body`, `text-caption`, ...).
2. Pair with the right `text-content-*` token.

### Before applying a shadow
1. Pick `shadow-sm` / `shadow-md` / `shadow-lg` from [`foundations/elevation.md`](./foundations/elevation.md).
2. Do not compose arbitrary shadows.

### Before hardcoding a value
1. If you're about to type a hex, pixel size, duration, or shadow — STOP.
2. Find the matching semantic token in `foundations/*.md` or `src/imports/`.
3. Use the Tailwind utility that maps to it. If none exists, it's a missing token, not a license to hardcode.

## Don'ts

- ❌ No hex colors, no `#fff`, no hardcoded `Inter` / `Sora`.
- ❌ No raw Tailwind color scales in product code (`bg-yellow-300`, `text-gray-700`).
- ❌ No inline `style={{ color, background, fontSize, fontFamily }}`.
- ❌ No new `tailwind.config.js`.
- ❌ No direct imports from `velocity-ds/dist/...` or `velocity-ds/src/...`.
- ❌ No re-implementation of existing components with custom markup.
- ❌ No custom dark theme. Use `data-theme="dark"`.
- ❌ No native `<select>` / `<input type="checkbox">` / `<button>` when Velocity provides them.
