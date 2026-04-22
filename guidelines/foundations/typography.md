# Typography

## When to use
Read this file before writing any headline, body text, caption, button label, or form label.

## Families

| Token | Family | Usage |
| --- | --- | --- |
| `--font-sans` | `Inter` | **All UI text** — body, labels, inputs, captions |
| `--font-heading` | `Sora` | Headings (`text-heading-*` utilities) |
| `--font-mono` | `JetBrains Mono` | Code, numeric tables |

## Composite text utilities (use these)

Velocity ships ready-made text utilities that bundle `font-family + size + line-height + weight + tracking`. **Always prefer these over stacking `text-[size] font-[weight] leading-[lh]`.**

| Utility | Size | Weight | Purpose |
| --- | --- | --- | --- |
| `text-heading-1` | 2.25rem (36px) | 700 bold | Page hero, H1 |
| `text-heading-2` | 1.875rem (30px) | 700 bold | Section H2 |
| `text-heading-3` | 1.5rem (24px) | 600 semibold | Sub-section H3 |
| `text-heading-4` | 1.25rem (20px) | 600 semibold | H4 |
| `text-body-lg` | 1.125rem (18px) | 400 regular | Emphasized body copy |
| `text-body` | 1rem (16px) | 400 regular | **Default body copy** |
| `text-body-sm` | 0.875rem (14px) | 400 regular | Secondary body copy |
| `text-caption` | 0.75rem (12px) | 500 medium | Captions, metadata, helper text |
| `text-overline` | 0.75rem (12px) | 600 semibold, wide tracking | Eyebrows, uppercase labels |

## Raw primitives (reference — rarely use directly)

Only use these if you need a combination the composite utilities don't cover.

### Sizes
`text-xs` (0.75rem) · `text-sm` (0.875rem) · `text-base` (1rem) · `text-lg` (1.125rem) · `text-xl` (1.25rem) · `text-2xl` (1.5rem) · `text-3xl` (1.875rem) · `text-4xl` (2.25rem)

### Weights
`font-normal` (400) · `font-medium` (500) · `font-semibold` (600) · `font-bold` (700)

### Line heights
`leading-tight` (1.25) · `leading-snug` (1.375) · `leading-normal` (1.5) · `leading-relaxed` (1.625)

### Letter spacing
`tracking-tight` (-0.02em) · `tracking-normal` (0) · `tracking-wide` (0.06em)

## Decision tree

```
┌─ "What text utility should I use?"
│
├─ Page hero / landing title?
│  └─ text-heading-1
│
├─ Section title (H2)?
│  └─ text-heading-2
│
├─ Sub-section (H3)?
│  └─ text-heading-3
│
├─ Card title / modal title (H4)?
│  └─ text-heading-4
│
├─ Emphasized lead paragraph?
│  └─ text-body-lg
│
├─ Default paragraph / body?
│  └─ text-body
│
├─ Secondary / smaller body?
│  └─ text-body-sm
│
├─ Form label / button label?
│  └─ text-body-sm font-medium
│
├─ Caption, helper text, metadata?
│  └─ text-caption
│
└─ Eyebrow / uppercase label?
   └─ text-overline
```

## Examples

### Page header
```tsx
<h1 className="text-heading-1 text-content-primary">Runswap orders</h1>
<p className="text-body text-content-secondary mt-2">
  Manage and track every order in one place.
</p>
```

### Card
```tsx
<h3 className="text-heading-4 text-content-primary">Order #1024</h3>
<p className="text-body-sm text-content-secondary">Placed on 12 April</p>
<span className="text-overline text-content-tertiary">Shipped</span>
```

### Caption
```tsx
<p className="text-caption text-content-tertiary">
  Free delivery on orders above €50.
</p>
```

## Rules

- ALWAYS use composite `text-*` utilities (`text-heading-*`, `text-body*`, `text-caption`, `text-overline`) instead of stacking primitives.
- Typography utilities do NOT replace semantic HTML. Use `<h1>` / `<h2>` / `<nav>` / `<main>` correctly and pair them with the right `text-heading-*` class.
- NEVER hardcode pixel font-sizes (`text-[17px]`, inline `style={{ fontSize: 17 }}`).
- NEVER override `font-family` inline. Stick to `Inter` / `Sora` / `JetBrains Mono` through the typography tokens.
- Reduce importance by going **smaller or secondary color**, not by lowering opacity.
