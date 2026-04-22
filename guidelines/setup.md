# Setup

How to install and configure the **Velocity Design System** (`velocity-ds`) in a React project, including in **Figma Make**.

---

## 1. Requirements

Velocity is built on top of:

- React 19
- Base UI (`@base-ui-components/react` ^1.0.0-alpha.8)
- Tailwind CSS v4 (using `@theme` CSS variables, not `tailwind.config.js`)
- `react-icons` (peer dependency for icon-based components)

Your project must use React 19 and a Tailwind v4–compatible build (Vite, Next.js 15+, or the Tailwind v4 CLI).

---

## 2. Install

```bash
npm install velocity-ds @base-ui-components/react react-icons
```

Velocity is published to a private registry. Add this to your `.npmrc` (project root, **do not commit**):

```
velocity-ds:registry=https://registry.figma.com/npm/<workspace-id>/registry/
//registry.figma.com/npm/<workspace-id>/registry/:_authToken=<your-token>
```

> Ask a Runswap maintainer if you need an auth token.

---

## 3. Import global styles

Velocity ships a **single CSS file** that exposes:

- Tailwind v4 via `@import "tailwindcss"`
- All design tokens as CSS custom properties (colors, typography, spacing, radii, shadows, motion)
- Typography utilities (`text-heading-1`, `text-body`, `text-caption`, etc.)
- Light theme by default and dark theme via `[data-theme="dark"]`

Import it **once**, at the top of your app entry (e.g. `main.tsx`, `_app.tsx`, `layout.tsx`):

```ts
import "velocity-ds/styles";
```

That single import is enough — you do **not** need a separate `tailwind.config.js`.

---

## 4. Providers

Some components require providers at the root of your app:

```tsx
import { ToastProvider, TooltipProvider } from "velocity-ds";

export function App({ children }) {
  return (
    <ToastProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </ToastProvider>
  );
}
```

- `ToastProvider` — required if you use `Toast` or `useToast()`
- `TooltipProvider` — recommended (shared delay/grouping across all tooltips)

---

## 5. Theming (light / dark)

Set the `data-theme` attribute on `<html>` or `<body>`:

```html
<html data-theme="dark">
```

Or toggle it at runtime:

```ts
document.documentElement.setAttribute("data-theme", "dark");
```

All semantic tokens (`--color-background-primary`, `--color-content-primary`, etc.) automatically switch.

---

## 6. First component

```tsx
import { Button } from "velocity-ds";

export function Demo() {
  return (
    <Button variant="solid" colorScheme="primary" size="md">
      Get started
    </Button>
  );
}
```

---

## 7. Using Velocity in Figma Make

When generating code with **Figma Make**:

1. Always import components from the top-level `velocity-ds` entry point.
2. Prefer the component API over raw Tailwind classes (e.g. use `<Button variant="solid" />` rather than a `<button class="…">`).
3. Use semantic tokens via Tailwind utilities (`bg-background-primary`, `text-content-primary`, `border-border-default`, etc.) — not raw hex values.
4. When a component offers compound parts (e.g. `Card`, `Form`, `Dialog`, `ProductCard`), use the compound API instead of flattening into a single `<div>` tree.

See:

- [`Guidelines.md`](./Guidelines.md) — top-level usage rules, reading order, workflows
- [`components.md`](./components.md) — component inventory and API highlights
- [`foundations/`](./foundations/overview.md) — all design tokens (color, typography, elevation, motion, modes)
- [`styles.md`](./styles.md) — consumer-facing stylesheet usage (typography utilities, theming)
