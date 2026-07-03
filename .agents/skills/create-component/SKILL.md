---
name: create-component
description: Create a new Velocity design system component. Use this skill whenever the user asks to create, add, or build a new UI component — "create a Checkbox", "add a Select", "build a Badge", "I need a Stepper", "make a Progress bar". Trigger even if the user doesn't say "component" but is clearly asking for a new reusable UI piece in the Velocity design system.
---

# Create Velocity Component

You are a component author for the **Velocity Design System** — Base UI primitives + Tailwind v4 + semantic tokens.

## Step 1 — Research (run in parallel)

**A. Fetch the Base UI docs**
```
https://base-ui.com/react/components/<component-name-lowercase>
```
Read the full page: sub-components, props, all `data-[...]` attributes, ARIA/keyboard behaviour.
If Base UI has no matching primitive, note it — you'll use a native element instead.

**B. Read a similar existing component**
Pick the closest existing component as a style reference (e.g. creating Radio → read `src/components/Checkbox/Checkbox.tsx`; creating Badge → read `src/components/Chip/Chip.tsx`).
Always also read `src/styles/tokens.css` lines 1–120 for the full token list.

**C. Check Figma (if the MCP is available)**
Call `figma_search_components` with the component name.
If a match is found, call `figma_get_component_for_development_deep` to get the full design spec: variants, token values, sizing, states.
If Figma is unavailable or returns no match, proceed without it and note it.

## Step 2 — Plan

Before writing code, briefly tell the user:
- The props API you plan (variants, sizes, states)
- Which Base UI sub-components you'll use
- Any ambiguity (missing Figma spec, unclear variant naming, etc.)

Wait for confirmation only if there's a real ambiguity that would affect the API. Otherwise proceed.

## Step 3 — Implement

**File:** `src/components/<Name>/<Name>.tsx`

Follow this structure:

```tsx
import * as React from 'react';
import { ComponentName as BaseComponentName } from '@base-ui-components/react/component-name';

// ── Types ──────────────────────────────────────────────────────────────────

export type ComponentNameSize = 'sm' | 'md' | 'lg';

export interface ComponentNameProps {
  /** JSDoc every public prop */
  size?: ComponentNameSize;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

// ── Style maps ─────────────────────────────────────────────────────────────

const sizeClasses: Record<ComponentNameSize, string> = {
  sm: '...',
  md: '...',
  lg: '...',
};

// ── Component ──────────────────────────────────────────────────────────────

export const ComponentName = React.forwardRef<HTMLElement, ComponentNameProps>(
  function ComponentName({ size = 'md', disabled, className, children }, ref) {
    return (
      <BaseComponentName.Root
        ref={ref}
        disabled={disabled}
        className={[
          'cursor-pointer transition-colors duration-[200ms]',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-border-focus focus-visible:ring-offset-2',
          'focus-visible:ring-offset-background-primary',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
          sizeClasses[size],
          className,
        ].filter(Boolean).join(' ')}
      >
        {children}
      </BaseComponentName.Root>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

**Semantic token reference** — never use raw hex or non-semantic Tailwind colours:

| Category   | Classes |
|------------|---------|
| Surface     | `bg-surface-primary` · `bg-surface-secondary` · `bg-surface-hover` · `bg-surface-active` |
| Background  | `bg-background-primary` · `bg-background-secondary` · `bg-background-brand` |
| Content     | `text-content-primary` · `text-content-secondary` · `text-content-tertiary` · `text-content-brand` · `text-content-disabled` · `text-content-on-brand` · `text-content-inverse` |
| Border      | `border-border-default` · `border-border-subtle` · `border-border-strong` · `border-border-brand` · `border-border-focus` |
| Accent      | `bg-accent-primary` · `bg-accent-secondary` · `bg-accent-tertiary` |
| State       | `bg-state-success` · `bg-state-warning` · `bg-state-error` · `bg-state-info` |
| Feedback    | `text-feedback-positive` · `text-feedback-caution` · `text-feedback-negative` |

**Coding rules:**
- TypeScript strict — no `any`, no `// @ts-ignore`, JSDoc on every public prop
- Base UI data attributes directly in Tailwind: `data-[open]:opacity-100`, `data-[checked]:bg-accent-primary`
- Always `duration-[200ms]` for transitions
- `React.forwardRef` + `.displayName` on every component
- Compound components (Tabs, Select…): export each sub-component individually and use a shared context for coordination

## Step 4 — Stories

**File:** `src/components/<Name>/<Name>.stories.tsx`

Minimum required stories:
- `Default` — args-driven, base state
- One story per key variant/state (Disabled, Loading, each named variant…)
- `Overview` — full visual grid of all variants + states on a `bg-surface-primary` container

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: { description: { component: 'One-liner. Built on Base UI.' } },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: { size: 'md', disabled: false },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-primary">
      {/* all variants + states */}
    </div>
  ),
  parameters: { layout: 'padded' },
};
```

## Step 5 — Barrel + main export

**`src/components/<Name>/index.ts`**
```ts
export { ComponentName } from './ComponentName';
export type { ComponentNameProps, ComponentNameSize } from './ComponentName';
```

**`src/index.ts`** — add at the end of the components block:
```ts
export { ComponentName } from './components/ComponentName';
export type { ComponentNameProps, ComponentNameSize } from './components/ComponentName';
```

## Step 6 — Type check

```bash
npx tsc --noEmit
```

Fix all errors. Zero errors required before declaring done.

## Step 7 — Accessibility audit

Spawn the `accessibility-component-auditor` subagent with the component file path and name. Apply any concrete fixes it surfaces.

## Done checklist

- [ ] Base UI docs fetched
- [ ] Reference component read + tokens checked
- [ ] Figma spec checked (or noted unavailable)
- [ ] `src/components/<Name>/<Name>.tsx` created
- [ ] `src/components/<Name>/<Name>.stories.tsx` created
- [ ] `src/components/<Name>/index.ts` created
- [ ] `src/index.ts` updated
- [ ] `npx tsc --noEmit` — zero errors
- [ ] Accessibility audit passed
