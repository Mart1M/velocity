# Motion

## When to use
Read this file any time you need to animate, transition, or delay.

## Tokens

### Duration
| Token | Value | Use |
| --- | --- | --- |
| `--duration-fast` | 100ms | Micro-feedback (hover, focus ring) |
| `--duration-normal` | 200ms | **Default** — most transitions |
| `--duration-slow` | 300ms | Mode changes, layout shifts, larger moves |

### Easing
| Token | Curve | Use |
| --- | --- | --- |
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | **Default** — in/out transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful pop-in (drawers, modals, toasts) |

These map to Tailwind utilities `duration-fast|normal|slow` and `ease-standard|spring` and to CSS custom properties `var(--duration-*)` / `var(--ease-*)`.

## Examples

### Hover on a card
```tsx
<div className="transition-colors duration-fast ease-standard hover:bg-surface-hover" />
```

### Accordion expand
```tsx
<div className="transition-[grid-template-rows] duration-normal ease-standard" />
```

### Toast slide-in
```tsx
<div className="animate-in slide-in-from-bottom duration-slow ease-spring" />
```

## Decision tree

```
┌─ "Which duration should I use?"
│
├─ Hover, focus, tiny color change?
│  └─ duration-fast (100ms)
│
├─ Default transition (opacity, color, small transform)?
│  └─ duration-normal (200ms)
│
└─ Large transform, layout shift, modal entry, theme change?
   └─ duration-slow (300ms)
```

```
┌─ "Which easing should I use?"
│
├─ Most UI transitions?
│  └─ ease-standard
│
└─ Drawer / modal / toast entry (playful pop)?
   └─ ease-spring
```

## Rules

- NEVER use arbitrary durations like `duration-[175ms]`. Pick `fast`, `normal`, or `slow`.
- NEVER inline custom cubic-beziers. Use `ease-standard` or `ease-spring`.
- KEEP transitions ≤ 300ms. Longer feels sluggish.
- PREFER `transition-colors`, `transition-transform`, `transition-opacity` over the catch-all `transition-all`.
- Respect `prefers-reduced-motion`: the design system respects it automatically for built-in components; reproduce the same behavior in custom code via `motion-safe:` / `motion-reduce:` Tailwind variants.
