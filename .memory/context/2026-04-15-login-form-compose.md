---
date: 2026-04-15
category: context
tags: [hive-compose, login-form, form-components, authentication-ui]
---

# Login Form — Hive Compose Session

**State file**: `.hive/state.json` — status: `compose_done`

## Goal
Login Form built from Velocity DS components: email field, password field (with show/hide), remember-me checkbox, primary submit button.

## Components grounded
| Component | Usage |
|---|---|
| `Form` | Root form element, `layout="vertical"` |
| `FormField` | Wraps each field; `invalid` prop drives error visibility |
| `FormLabel` | `required={true}` shows `*` (aria-hidden) |
| `FormMessage` | Inline error via `Field.Error`; only visible when `FormField invalid` |
| `FormActions` | Row container for checkbox row and submit button |
| `Input` | Email (`type="email"`) + Password (`type="password"/"text"` toggle) |
| `Button` | Submit: `variant="solid" colorScheme="primary" fullWidth type="submit" loading` |
| `Checkbox` | Remember me — `onCheckedChange` controlled |

## Grounding gaps
1. **No `Card` component** → use `div` with `bg-surface-primary border border-border-default rounded-2xl shadow-sm p-8`
2. **No IconButton-inside-Input pattern** → pass a plain `<button>` with `aria-label` as `trailingIcon` on password Input

## State shape
```ts
{ email, password, showPassword, rememberMe, isLoading, errors: { email?, password? } }
```

## Key patterns established
- FormField wrapping is required for FormMessage (Field.Error) to work
- Forgot-password link: `Button variant="link" colorScheme="primary" size="sm" type="button"`
- Password toggle button needs `aria-label` that changes with `showPassword` state
- Full-width submit: `Button fullWidth type="submit" loading={isLoading}`
