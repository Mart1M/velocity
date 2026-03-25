# Verification Rules — Velocity Design System

Defines what constitutes a passing Verify result and the criteria each agent checks.

---

## Passing Threshold

`verify.valid = true` requires ALL of the following to pass:

1. **Compliance** — every `intent.constraint` is satisfied
2. **Accessibility** — zero blocking accessibility issues
3. **Technical** — TypeScript types are valid, no unknown imports
4. **Consistency** — no naming violations, no raw CSS values

Warnings do not affect `verify.valid`.

---

## Blocking Issues (set `verify.valid = false`)

| Category      | Issue                                                        |
|---------------|--------------------------------------------------------------|
| Compliance    | Any `intent.constraint` not satisfied by the blueprint       |
| Accessibility | Missing ARIA role or required attribute                      |
| Accessibility | No keyboard interaction defined for interactive component    |
| Technical     | TypeScript type error in prop interface                      |
| Technical     | Import reference not found in `ground.components` or platform|
| Technical     | New npm dependency without user confirmation                 |
| Consistency   | Component or file name violates naming rules                 |
| Consistency   | Raw hex/rgb/px value in `compose.tokenMapping` or inline styles |

---

## Warnings (non-blocking)

| Category      | Warning                                                      |
|---------------|--------------------------------------------------------------|
| Compliance    | `intent.success_criteria` entry not checkable                |
| Accessibility | Missing `aria-describedby` for helper text                   |
| Technical     | TypeScript `any` type used                                   |
| Consistency   | Prop name deviates from convention in similar components     |
| Governance    | Deprecated component referenced (but not blocked)            |

---

## Accessibility Checklist (WCAG 2.2 AA)

Every interactive component must pass:

- [ ] Has a semantic ARIA role (explicit or inherited)
- [ ] All interactive states have visible focus indicators
- [ ] Keyboard operation follows WAI-ARIA Authoring Practices
- [ ] `disabled` uses `aria-disabled` attribute
- [ ] No information conveyed by color alone
- [ ] Color contrast: 4.5:1 for text, 3:1 for UI components

---

## Token Compliance Checklist

- [ ] All `background` values: `var(--color-*)`
- [ ] All `color` (text) values: `var(--color-*)`
- [ ] All `border` values: `var(--color-border-*)` or `var(--radius-*)`
- [ ] All `padding`/`margin` values: `var(--spacing-*)`
- [ ] All `border-radius` values: `var(--radius-*)`
- [ ] No raw `#hex`, `rgb()`, `px` values in styling props
