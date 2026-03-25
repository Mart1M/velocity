# Governance Rules — Velocity Design System

Defines deprecated elements, compliance requirements, and approval gates.

---

## Deprecated Components

Components listed here must not be used in new code. If referenced in a request, flag as a warning and substitute the replacement.

| Deprecated          | Replacement     | Notes                            |
|---------------------|-----------------|----------------------------------|
| *(none yet)*        | —               | Add entries as components evolve |

---

## Deprecated Tokens

| Deprecated Token         | Replacement Token            |
|--------------------------|------------------------------|
| *(none yet)*             | —                            |

---

## Blocked Patterns

These patterns are never allowed and will block delivery:

- Raw CSS values in component styles (hex, rgb, px for spacing) — use semantic tokens
- Default exports for components — use named exports only
- Direct HTML interactive elements (`<input>`, `<button>`, `<select>`) without a Base UI wrapper
- Installing new npm dependencies without explicit user confirmation

---

## Approval Gates

The following require explicit user confirmation before proceeding:

1. **New npm dependency**: any import not already in `package.json`
2. **Overwriting an existing file**: Deliver must confirm before overwriting
3. **Deprecated component usage**: user must acknowledge the deprecation warning
4. **Scope expansion**: if Compose determines the request requires touching more files than Intent specified

---

## Compliance Requirements

All components must:

- Meet WCAG 2.2 Level AA
- Work in both light and dark themes (via semantic tokens)
- Be exported from `src/index.ts`
- Have a Storybook story file

---

## Governance Review Triggers

Flag for governance review (non-blocking, but record in `verify.warnings`) when:

- A component introduces a new visual pattern not seen elsewhere in `src/components/`
- A new token category is proposed that doesn't exist in `src/tokens/`
- A component wraps a third-party library other than Base UI
