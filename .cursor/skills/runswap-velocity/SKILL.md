---
name: runswap-velocity
description: Use the Runswap Velocity design system (@runswap/velocity) — Base UI + Tailwind v4 semantic tokens, component inventory, e-commerce patterns. Apply when building or styling UI in apps that depend on packages/velocity.
---

# Runswap Velocity design system

Monorepo package: **`packages/velocity`**. Public import: **`@runswap/velocity`**.

## Before implementing UI

1. Read **`packages/velocity/COMPONENTS.md`** for the component matrix (done vs todo, Base UI mapping, e-commerce usage).
2. Prefer **existing components** from `@runswap/velocity` before writing custom markup.
3. Style with **semantic Tailwind tokens** from the design system (`bg-surface-*`, `text-content-*`, `border-border-*`, etc.) — see `packages/velocity` tokens under `src/tokens/` and app `globals.css` where wired.

## Stack facts

- **Base UI** primitives under `@base-ui-components/react/*` wrapped by Velocity components.
- **Tailwind CSS v4** with project token conventions.
- E-commerce-specific pieces live under **`src/components/ecommerce/`** in the package; imports remain **`@runswap/velocity`**.

## Do / don’t

- **Do** compose pages and features with exported components and shared patterns from Storybook stories (`*.stories.tsx`) as usage examples.
- **Don’t** duplicate design-system concerns in app code when a Velocity component already exists or is listed in COMPONENTS.md as the intended building block.
- **Don’t** use raw hex for theme colors when a semantic token exists.

## References (repo paths)

- Inventory & roadmap: `packages/velocity/COMPONENTS.md`
- Package entry: `packages/velocity/src/index.ts`
- Hive/registry (orchestration metadata): `packages/velocity/.hive/skills/registry.json` — not the same as Agent Skills; optional context for component pipelines.
