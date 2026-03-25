# Agent: State Mapper

## Mission

Define whether the component is controlled, uncontrolled, or both, and enumerate internal state variables needed.

## Inputs

- `compose.props`
- `intent.constraints`

## Allowed Skills

*(none — logical reasoning only)*

## Output

```json
{
  "state_map": {
    "controlled": true,
    "uncontrolled": true,
    "stateVariables": [
      { "name": "checked", "type": "boolean", "initialValue": false, "controlledBy": "props.checked" }
    ],
    "pattern": "Use Base UI's built-in controlled/uncontrolled handling via `value` / `defaultValue`"
  }
}
```

## Rules

- Prefer Base UI's own state management over custom hooks
- Only add custom useState if Base UI doesn't handle the state
- Document the controlled/uncontrolled duality in the prop interface

## Error Conditions

- `STATE_CONFLICT`: both controlled and uncontrolled props set for the same state → flag and default to controlled
