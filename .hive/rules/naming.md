# Naming Conventions — Velocity Design System

## Components

| Element          | Convention     | Example                        |
|------------------|----------------|--------------------------------|
| Component name   | PascalCase     | `SelectBox`, `NumberField`     |
| Component file   | PascalCase.tsx | `SelectBox.tsx`                |
| Stories file     | PascalCase.stories.tsx | `SelectBox.stories.tsx` |
| Barrel file      | lowercase      | `index.ts`                     |
| Component dir    | PascalCase     | `src/components/SelectBox/`    |

## Props

| Element          | Convention     | Example                         |
|------------------|----------------|---------------------------------|
| Prop names       | camelCase      | `onChange`, `defaultValue`      |
| Boolean props    | camelCase, no "is" prefix | `disabled`, `checked` |
| Event handlers   | `on` + PascalCase verb | `onChange`, `onFocus`  |
| Prop interface   | `<Name>Props`  | `SelectBoxProps`                |

## Tokens

| Element              | Convention          | Example                          |
|----------------------|---------------------|----------------------------------|
| CSS custom property  | `--category-variant`| `--color-bg-surface`             |
| Color tokens         | `--color-*`         | `--color-text-primary`           |
| Spacing tokens       | `--spacing-*`       | `--spacing-md`                   |
| Radius tokens        | `--radius-*`        | `--radius-sm`                    |
| Typography tokens    | `--font-*`          | `--font-label`                   |

## Files & Directories

| Element              | Convention     | Example                               |
|----------------------|----------------|---------------------------------------|
| Component directory  | PascalCase     | `src/components/Checkbox/`            |
| Token files          | kebab-case     | `src/tokens/color-tokens.css`         |
| Hook files           | camelCase      | `src/hooks/useControlledState.ts`     |
| Utility files        | camelCase      | `src/utils/formatNumber.ts`           |

## Storybook

- Story titles: `"Components/<ComponentName>"` (matching the directory path)
- Story export names: PascalCase, matching the variant (e.g., `Default`, `Disabled`, `WithError`)
