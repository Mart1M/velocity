# Elevation

## When to use
Read this file before applying any shadow (card, popover, dialog, drawer, floating toolbar).

## Tokens

| Utility | Shadow | Use |
| --- | --- | --- |
| `shadow-sm` | 1px subtle | Hover cards, small elevations |
| `shadow-md` | 4px soft | Cards, popovers, dropdown menus |
| `shadow-lg` | 8px deep | Modals, drawers, floating overlays |

Dark mode: shadow opacities are automatically increased by the theme, so the same class (`shadow-md`) renders heavier on `data-theme="dark"`. You never need to override.

## Decision tree

```
┌─ "What elevation should I use?"
│
├─ Subtle hover effect on a card?
│  └─ shadow-sm
│
├─ Default card / panel / popover / dropdown / tooltip?
│  └─ shadow-md
│
├─ Modal / drawer / sheet / floating toolbar?
│  └─ shadow-lg
│
└─ Flat inline element (inside a card, badge, chip)?
   └─ no shadow
```

## Component-level shadows

Button variants have dedicated shadow tokens that should not be overridden:

- `--shadow-button-primary`
- `--shadow-button-success`
- `--shadow-button-warning`
- `--shadow-button-danger`
- `--shadow-button-neutral`

These are applied inside the `Button` component. Do not reproduce them manually.

## Rules

- NEVER compose custom shadows with `shadow-[0_4px_12px_rgba(...)]`. Use `shadow-sm` / `shadow-md` / `shadow-lg`.
- NEVER stack multiple `shadow-*` classes. Pick one.
- ONE shadow level per "layer": cards use `shadow-md`, their popovers use `shadow-md` (not `shadow-lg`), modals use `shadow-lg`.
- Borders and shadows are complementary, not redundant. Cards usually have `border` + `shadow-md`.
