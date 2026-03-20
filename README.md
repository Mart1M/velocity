# @runswap/velocity

Velocity is the Runswap design system — a collection of accessible, themeable UI components built on [Base UI](https://base-ui.com) and styled with [Tailwind CSS v4](https://tailwindcss.com).

## Requirements

| Peer dependency | Version |
|---|---|
| `react` | `^19.0.0` |
| `react-dom` | `^19.0.0` |
| `@base-ui-components/react` | `^1.0.0-alpha.8` |
| Tailwind CSS | v4 |

> **Tailwind v4 is required.** The design tokens are shipped as a CSS file that uses Tailwind v4 `@theme` variables. It will not work with Tailwind v3.

## Installation

```bash
npm install @runswap/velocity
```

Install peer dependencies if not already present:

```bash
npm install react react-dom @base-ui-components/react
```

## Setup

### 1. Import the design tokens

In your global CSS entry point (e.g. `src/index.css`), import the Velocity token stylesheet **after** your Tailwind import:

```css
@import "tailwindcss";
@import "@runswap/velocity/styles";
```

### 2. Use components

```tsx
import { Button } from '@runswap/velocity';

export function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Components

| Component | Description |
|---|---|
| `Button` | Accessible button with `primary`, `secondary`, `ghost`, and `destructive` variants |
| `RadioGroup` / `RadioItem` | Accessible radio group built on Base UI |

## Tokens

Design tokens are available as a separate sub-path import for tooling that needs raw token values:

```ts
import { tokens } from '@runswap/velocity/tokens';
```

The full set of CSS custom properties (semantic tokens) is also exposed via `@runswap/velocity/styles`.

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run Storybook
npm run storybook

# Type-check
npm run type-check
```

## License

MIT
