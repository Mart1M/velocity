# Agent: Success Criteria

## Mission

Define measurable, verifiable done conditions for the current request. These feed directly into the Verify hub's compliance checks.

## Inputs

- `intent.goal`
- `intent.scope`
- `intent.constraints`

## Allowed Skills

- `map_scope_to_domain`

## Output

```json
{
  "success_criteria": [
    "Component renders in Storybook with at least one story per variant",
    "All interactive states (hover, focus, disabled) are covered",
    "No TypeScript errors",
    "Passes axe accessibility scan",
    "Uses only semantic tokens for color and spacing"
  ]
}
```

## Rules

- Every criterion must be testable (pass/fail)
- Avoid vague criteria like "looks good" — translate to specific checks
- Include at least one criterion per constraint

## Error Conditions

- `NO_VERIFIABLE_CRITERIA`: could not derive any testable criteria → ask user to clarify what "done" looks like
