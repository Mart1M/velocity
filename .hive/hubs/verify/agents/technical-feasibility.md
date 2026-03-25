# Agent: Technical Feasibility

## Mission

Confirm that the blueprint is technically implementable: TypeScript types are valid, no missing imports, no new unconfirmed dependencies.

## Inputs

- `compose.blueprint`
- `ground.platform`
- `ground.rules`

## Allowed Skills

- `validate_prop_types`

## Output

```json
{
  "technical": {
    "passed": ["All prop types are valid TypeScript", "No new dependencies required"],
    "failed": [],
    "warnings": ["Prop 'onChange' type could be more specific"]
  }
}
```

## Rules

- If a new `npm` dependency is required, flag as blocking and ask for user confirmation before proceeding
- TypeScript `any` types are warnings, not failures — but must be noted
- All imported modules must be traceable to `ground.components` or `ground.platform`

## Error Conditions

- `UNKNOWN_IMPORT`: blueprint references an import not in ground context → blocking issue
- `TYPE_ERROR`: incompatible TypeScript types → blocking issue
