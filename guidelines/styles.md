# Styles

Velocity ships a single stylesheet at `velocity-ds/styles` that provides:

1. Tailwind CSS v4 (core)
2. All design tokens as CSS variables (see [`foundations/`](./foundations/overview.md))
3. Typography utilities (`text-*`)
4. Light theme by default, dark theme via `[data-theme="dark"]`

Import it **once** in your app entry:

```ts
import "velocity-ds/styles";
```

> There is **no `tailwind.config.js`**. Tailwind v4 is configured entirely from `@theme` in this CSS file.

---

## Typography utilities

Velocity exposes opinionated text utilities built from typography primitives. Prefer these over stacking `font-size`, `font-weight`, `leading`, etc.

| Utility | Intended use |
| --- | --- |
| `text-heading-1` | Page hero / H1 |
| `text-heading-2` | Section H2 |
| `text-heading-3` | Sub-section H3 |
| `text-heading-4` | H4 |
| `text-body-lg` | Emphasized body copy |
| `text-body` | Default body copy |
| `text-body-sm` | Secondary body copy |
| `text-caption` | Captions, metadata, helper text |
| `text-overline` | Eyebrows / ALL-CAPS labels |

Example:

```tsx
<h1 className="text-heading-1 text-content-primary">Velocity</h1>
<p className="text-body text-content-secondary">
  A design system for Runswap products.
</p>
<span className="text-overline text-content-tertiary">New</span>
```

Each utility bundles: `font-family`, `font-size`, `line-height`, `font-weight`, `letter-spacing`.

Headings use the **`Sora`** font family. Body/UI/caption/overline use **`Inter`**.

---

## Layout & spacing

Use Tailwind v4 spacing utilities (`p-*`, `m-*`, `gap-*`, `space-*`) and its responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`). Velocity does not add custom spacing tokens — defaults match the Tailwind 4 scale.

---

## Colors in classes

Use semantic tokens, not core scales:

```tsx
<div className="bg-background-primary text-content-primary" />
<button className="bg-brand-primary text-content-on-brand" />
<div className="border border-border-default" />
<span className="text-state-error">Error</span>
```

> The brand color is a light lime-green (`yellow-300`). Always pair brand/accent surfaces with `text-content-on-brand` (= `gray-950`) for contrast. Use `text-content-inverse` only on `bg-background-inverse` / dark surfaces.

See [`foundations/color.md`](./foundations/color.md) for the full list.

---

## Radii

Use Tailwind defaults (`rounded`, `rounded-md`, `rounded-lg`, `rounded-full`). Velocity components use these consistently.

---

## Shadows

- `shadow-sm` — small elevation (hover cards)
- `shadow-md` — cards, popovers, dropdowns
- `shadow-lg` — modals, drawers

Dark mode shadows are automatically stronger.

---

## Motion

Use the CSS variables via `var(--duration-*)` / `var(--ease-*)`, or the matching Tailwind utilities:

```tsx
<div className="transition-colors duration-200 ease-standard" />
```

---

## Dark mode

Activate by setting `data-theme="dark"` on `<html>` or `<body>`:

```tsx
document.documentElement.setAttribute("data-theme", "dark");
```

All semantic tokens switch automatically. You should never write `dark:` variants against hardcoded colors — just use semantic tokens and the theme will follow.

---

## Rules for Figma Make / code generation

- Always import styles via `import "velocity-ds/styles";` (once).
- Always use **Velocity components** (`Button`, `Card`, `Input`, …) instead of re-implementing.
- Always use **semantic token classes** (`bg-background-*`, `text-content-*`, `border-border-*`).
- Never hardcode hex colors, pixel font sizes, or per-component fonts — use `text-*` utilities and tokens.
- Never introduce a `tailwind.config.js`. Extend via `@theme` only if strictly needed inside the design system itself.
