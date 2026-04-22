# Foundations — overview

This folder documents every design token category exposed by `velocity-ds`. Load the file that matches what you're about to style.

## When to read which file

| File | Read when you are about to... |
| --- | --- |
| [`color.md`](./color.md) | Pick a background, text, border, accent, state or status color |
| [`typography.md`](./typography.md) | Choose a font family, type scale, weight, or text utility |
| [`elevation.md`](./elevation.md) | Apply shadows to cards, popovers, modals |
| [`motion.md`](./motion.md) | Animate anything (durations, easing curves) |
| [`modes.md`](./modes.md) | Support light/dark mode, toggle themes |

## Spacing

Velocity does **not** define custom spacing tokens. Use the default Tailwind v4 scale directly (`p-*`, `m-*`, `gap-*`, `space-*`, `size-*`). Do not introduce custom pixel values.

## Radii

Use Tailwind defaults (`rounded`, `rounded-md`, `rounded-lg`, `rounded-full`). All Velocity components are consistent with this scale.

## Rules

- NEVER hardcode hex colors, pixel font sizes, arbitrary font families, or ad-hoc shadow values.
- ALWAYS consume tokens via their Tailwind utility class (`bg-background-primary`, `text-content-secondary`, `shadow-md`, `duration-normal`...).
- Core tokens (`gray-500`, `yellow-300`, `primary-500`, ...) are allowed **only inside the design system package itself**. Product code must use semantic tokens.
