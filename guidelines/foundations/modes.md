# Light & dark modes

## When to use
Read this file whenever you need to support, toggle, or reason about dark mode.

## How it works

Velocity switches themes via a single attribute on the root element:

```html
<html data-theme="light"> <!-- default -->
<html data-theme="dark">
```

All semantic tokens (`--color-background-*`, `--color-content-*`, `--color-border-*`, `--color-surface-*`, `--color-brand-*`, `--shadow-*`, etc.) are redefined under `[data-theme="dark"]`. Consequence: **if your code uses semantic tokens, nothing else to do**. The entire UI flips automatically.

## Toggling at runtime

```ts
document.documentElement.setAttribute("data-theme", "dark");
document.documentElement.setAttribute("data-theme", "light");
```

Persist the choice in `localStorage` and restore it on app mount to avoid flash of wrong theme.

## What changes automatically in dark mode

- **Surfaces** flip from white / gray-50 stack to gray-900 / gray-850 stack.
- **Content** `text-content-primary` becomes white, `text-content-secondary` becomes gray-300.
- **Brand** shifts one step on the scale: `yellow-300` → `yellow-400` to reduce glare on dark backgrounds.
- **Focus / borders / accents** follow the same shift.
- **Shadows** get heavier opacity to stay visible on dark backgrounds.
- `text-content-on-brand` stays `gray-950` in both modes (yellow brand is light enough in both).
- `text-content-inverse` flips: `white` in light, `gray-900` in dark.

## Rules

- NEVER write `dark:` Tailwind variants against hardcoded colors (`dark:bg-gray-900`, `dark:text-white`). Use semantic tokens and the theme flips on its own.
- NEVER build a separate dark theme or override CSS variables in product code. All overrides live in `velocity-ds/styles`.
- ALWAYS activate dark mode via `data-theme="dark"` on `<html>` or `<body>`. Do not toggle classes like `.dark`.
- ALWAYS test both modes when building new screens. Use Storybook's theme switcher or toggle at runtime.
- If you need a color that must stay the same in both modes (e.g., always-dark footer), use `text-content-inverse` / `bg-background-inverse` explicitly.

## Example — theme toggle

```tsx
function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark"
      ? "light"
      : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };
  return (
    <Button onClick={toggle}>Toggle theme</Button>
  );
}
```
