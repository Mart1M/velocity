# Velocity DS — Semantic Token Reference

Tokens are applied as **Tailwind utility classes**. They resolve to CSS custom properties.  
Dark mode activates via `data-theme="dark"` on `<html>` or `<body>`.

> **Rule**: Never use raw hex (`text-[#4e4e4e]`), opacity modifiers on colors (`text-black/50`), or Tailwind core palette (`text-gray-600`). Always use semantic tokens.

---

## Content (Text Colors)

| Token class | Light value | Dark value | When to use |
|-------------|------------|------------|-------------|
| `text-content-primary` | `#0d0d0d` (gray-950) | `#ffffff` | Headings, primary body, labels |
| `text-content-secondary` | `#4e4e4e` (gray-600) | `#c9c9c9` (gray-300) | Supporting text, descriptions |
| `text-content-tertiary` | `#6e6e6e` (gray-500) | `#6e6e6e` | Placeholders, meta, captions |
| `text-content-brand` | `#e03700` (primary-600) | `#fd6531` (primary-400) | Brand-accented text, active links |
| `text-content-inverse` | `#ffffff` | `#141414` | Text on dark/inverted backgrounds |
| `text-content-disabled` | `#9e9e9e` (gray-400) | `#4e4e4e` (gray-600) | Disabled controls |

---

## Background

| Token class | Light | Dark | When to use |
|-------------|-------|------|-------------|
| `bg-background-primary` | `#ffffff` | `#0d0d0d` (gray-950) | Page background |
| `bg-background-secondary` | `#f9f9f9` (gray-50) | `#141414` (gray-900) | Section backgrounds |
| `bg-background-tertiary` | `#f2f2f2` (gray-100) | `#242424` (gray-800) | Nested sections |
| `bg-background-brand` | `#fc4c02` (primary-500) | `#fc4c02` | Brand-colored backgrounds |
| `bg-background-inverse` | `#0d0d0d` | `#ffffff` | Inverted regions |

---

## Surface

| Token class | Light | Dark | When to use |
|-------------|-------|------|-------------|
| `bg-surface-primary` | `#ffffff` | `#141414` (gray-900) | Cards, panels, dialogs |
| `bg-surface-secondary` | `#f9f9f9` | `#1a1a1a` (gray-850) | Secondary panels |
| `bg-surface-tertiary` | `#f2f2f2` | `#242424` | Tertiary surfaces |
| `bg-surface-hover` | `#f2f2f2` | `#242424` | Hover state background |
| `bg-surface-active` | `#e5e5e5` | `#2e2e2e` | Active/pressed state |
| `bg-surface-elevated` | `#ffffff` | `#141414` | Elevated (dropdown, tooltip) |
| `bg-surface-overlay` | `rgba(0,0,0,0.4)` | `rgba(0,0,0,0.6)` | Dialog backdrop |

---

## Border

| Token class | Light | Dark | When to use |
|-------------|-------|------|-------------|
| `border-border-default` | `#e5e5e5` (gray-200) | `#242424` (gray-800) | Input, card borders |
| `border-border-subtle` | `#f2f2f2` (gray-100) | `#1a1a1a` (gray-850) | Dividers, accordion separators |
| `border-border-strong` | `#c9c9c9` (gray-300) | `#363636` (gray-700) | Emphasized borders |
| `border-border-brand` | `#fc4c02` (primary-500) | `#fc4c02` | Brand-colored borders |
| `border-border-focus` | `#fc4c02` (primary-500) | `#fd6531` (primary-400) | Focus rings (`ring-border-focus`) |

---

## Accent & Brand

| Token class | Value | When to use |
|-------------|-------|-------------|
| `bg-accent-primary` | primary-500 | Primary fill (Button solid, Checkbox checked) |
| `bg-accent-secondary` | primary-300 | Lighter accent |
| `bg-accent-tertiary` | primary-200 | Subtle accent |
| `bg-brand-primary` | primary-500 | Brand identity |
| `bg-brand-secondary` | secondary-300 (#d0f400) | Secondary brand |

---

## State & Feedback

| Token class | Value | When to use |
|-------------|-------|-------------|
| `text-state-success` / `bg-state-success` | green-500 | Success messages |
| `text-state-warning` / `bg-state-warning` | orange-500 | Warnings |
| `text-state-error` / `bg-state-error` | red-500 | Error states |
| `text-state-info` / `bg-state-info` | blue-500 | Informational |
| `text-feedback-positive` / `bg-feedback-positive` | green-400 | Positive feedback |
| `text-feedback-negative` / `bg-feedback-negative` | red-400 | Error text, required asterisks |
| `text-feedback-caution` / `bg-feedback-caution` | orange-400 | Caution |
| `text-feedback-neutral` / `bg-feedback-neutral` | blue-400 | Neutral feedback |

---

## Elevation (Shadows)

| Token | Value | When to use |
|-------|-------|-------------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation (inputs, badges) |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Cards, dropdowns |
| `shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Dialogs, modals |

*Dark mode shadows use higher opacity (0.4 → 0.5 → 0.6).*

---

## Typography Utilities

Apply as Tailwind utilities:

| Utility | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| `text-heading-1` | Sora Bold | 36px | 700 | 1.25 |
| `text-heading-2` | Sora Bold | 30px | 700 | 1.25 |
| `text-heading-3` | Sora SemiBold | 24px | 600 | 1.375 |
| `text-heading-4` | Sora SemiBold | 20px | 600 | 1.375 |
| `text-body-lg` | Inter Regular | 18px | 400 | 1.625 |
| `text-body` | Inter Regular | 16px | 400 | 1.5 |
| `text-body-sm` | Inter Regular | 14px | 400 | 1.5 |
| `text-caption` | Inter Medium | 12px | 500 | 1.5 |
| `text-overline` | Inter SemiBold | 12px | 600 | 1.25 · letter-spacing wide |

**Fonts**: Headings → `font-heading` (Sora) · Body → `font-sans` (Inter) · Code → `font-mono` (JetBrains Mono)

---

## Spacing (Tailwind scale on 8px grid)

Standard spacings used in components:

| Class | Value | Usage |
|-------|-------|-------|
| `gap-1` / `p-1` | 4px | Tight internal spacing |
| `gap-1.5` | 6px | Label → input gap (FormField default) |
| `gap-2` / `p-2` | 8px | Icon padding |
| `gap-3` | 12px | Accordion trigger gap |
| `gap-4` / `p-4` | 16px | Card sm padding, inter-section gap |
| `gap-5` / `p-5` | 20px | Card md padding |
| `gap-6` | 24px | Form inter-field gap |
| `p-6` / `p-8` | 24px/32px | Card lg / auth form card padding |

---

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded` | 4px | Badges, chips |
| `rounded-lg` | 8px | Buttons sm, inputs |
| `rounded-xl` | 12px | Buttons md/lg, tabs |
| `rounded-2xl` | 16px | Cards, dialogs |
| `rounded-full` | 9999px | Avatars, pills |

---

## Motion

| CSS var | Value | Usage |
|---------|-------|-------|
| `duration-fast` (100ms) | `duration-[100ms]` | Quick feedback (badge, indicator) |
| `duration-normal` (200ms) | `duration-[200ms]` | Standard transitions (buttons, inputs, accordion) |
| `duration-slow` (300ms) | `duration-[300ms]` | Heavier transitions (dialogs, drawers) |
| `ease-standard` | `cubic-bezier(0.4,0,0.2,1)` | Default easing |
| `ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Bouncy/spring effects |

---

## CSS Custom Properties

All tokens resolve to `var(--color-*)` in Tailwind v4. You can use them in custom CSS:

```css
.custom-element {
  color: var(--color-content-primary);
  background: var(--color-surface-primary);
  border: 1px solid var(--color-border-default);
}
```

For JavaScript (e.g., inline styles or canvas):
```ts
// Read computed value
const primary = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-content-primary').trim();
```
