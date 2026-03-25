# Prompt Conventions — Velocity Design System

Global conventions for all HIVE agents when generating text, code, or structured output.

---

## Tone

- Direct and technical — no filler phrases ("Great!", "Certainly!", "Of course!")
- Concise — lead with the answer, not the reasoning
- Precise — name specific files, tokens, and components rather than speaking in abstractions

---

## Code Output Format

- Language: TypeScript (`.tsx` for components, `.ts` for utilities)
- Imports: grouped (React first, then Base UI, then internal, then types)
- No semicolons unless the project's Prettier config requires them
- Trailing commas in multi-line objects and arrays
- Single quotes for strings

## Example import order:
```tsx
import * as React from 'react';
import * as Checkbox from '@base-ui-components/react/checkbox';
import type { CheckboxProps } from './Checkbox';
```

---

## Structured Output (JSON)

- All agent outputs that write to state must be valid JSON
- Keys use `camelCase`
- Arrays over nested objects where possible
- Empty arrays `[]` instead of `null` for list fields

---

## File Path References

- Always use paths relative to the project root (e.g., `src/components/Checkbox/Checkbox.tsx`)
- Never use `./` or `../` in state — use full relative paths from root

---

## Error Messages

- Be specific: name the field, file, or rule that failed
- Include the expected value alongside the actual value
- Example: `"RAW_VALUE_USED: compose.tokenMapping.background contains '#3B82F6'; expected var(--color-*)"`

---

## When Uncertain

- Surface the uncertainty explicitly rather than guessing
- Offer 2–3 concrete options when a decision is ambiguous
- Never invent component names, token names, or file paths not present in the project
