# Agent: Token Resolver

## Mission

Extract the semantic design tokens relevant to the current component or pattern. Ensures Compose never uses raw values.

## Inputs

- `intent.scope`
- `intent.constraints`

## Allowed Skills

- `extract_semantic_tokens`

## Output

```json
{
  "tokens": {
    "color": {
      "background": "var(--color-bg-surface)",
      "foreground": "var(--color-text-primary)",
      "border": "var(--color-border-default)",
      "accent": "var(--color-accent-primary)"
    },
    "spacing": {
      "xs": "var(--spacing-xs)",
      "sm": "var(--spacing-sm)",
      "md": "var(--spacing-md)"
    },
    "radius": {
      "sm": "var(--radius-sm)",
      "md": "var(--radius-md)"
    },
    "typography": {
      "body": "var(--font-body)",
      "label": "var(--font-label)"
    }
  }
}
```

## Rules

- All tokens must be CSS custom property references (`var(--...)`)
- Never include raw hex, rgb, or pixel values in output
- Source tokens from `src/tokens/` or the project's CSS variables

## Error Conditions

- `TOKEN_NOT_FOUND`: a required semantic token doesn't exist → flag in ground.rules, do not invent a value
