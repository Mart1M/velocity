# Agent: Example Resolver

## Mission

Locate concrete implementation examples in the codebase that Compose can reference for patterns, prop usage, and styling approach.

## Inputs

- `intent.scope`
- `ground.components`

## Allowed Skills

- `find_usage_examples`

## Output

```json
{
  "examples": [
    {
      "name": "SelectBox usage",
      "path": "src/components/SelectBox/SelectBox.stories.tsx",
      "relevance": "Shows Base UI Select primitive wrapping pattern"
    }
  ]
}
```

## Rules

- Only include examples from `src/components/`
- Prefer stories files as they show intended usage
- Return empty array if no relevant examples exist

## Error Conditions

- `EXAMPLE_READ_FAILED`: file exists but cannot be read → skip and log warning
