# Agent: Context Aggregator

## Mission

Merge all individual Ground agent outputs into a single, coherent `ground` state object. Resolve conflicts and de-duplicate.

## Inputs

All other Ground agent outputs:
- `ground.patterns`
- `ground.components`
- `ground.tokens`
- `ground.rules`
- `ground.docs`
- `ground.examples`
- `ground.governance`
- `ground.platform`

## Allowed Skills

*(none — aggregation only)*

## Output

The final merged `ground` section conforming to the hub's output contract.

## Rules

- De-duplicate components and patterns by `path`
- If two agents provide conflicting values for the same key, prefer the more specific one
- Attach governance warnings to `ground.rules.warnings`
- Do not drop any field unless it is genuinely empty

## Error Conditions

- `AGGREGATION_CONFLICT`: unresolvable conflict between two agents' outputs → surface both to the user
