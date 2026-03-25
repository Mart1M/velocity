# Agent: Scope Clarifier

## Mission

Determine the delivery scope: is this a new component, a pattern, a token change, a documentation update, or a refactor of existing code?

## Inputs

- `request.raw_input`
- `intent.goal` (from Goal Interpreter)

## Allowed Skills

- `map_scope_to_domain`

## Output

```json
{
  "scope": "component"
}
```

Allowed values: `component`, `pattern`, `token`, `documentation`, `refactor`

## Rules

- Default to `component` if the input names a UI element
- Use `pattern` for layout or multi-component compositions
- Use `token` for color, spacing, typography, or theme changes
- Use `refactor` only when the user explicitly says to change existing code without new features

## Error Conditions

- `SCOPE_CONFLICT`: input implies multiple scopes → pick the broader one and record the other as a constraint
