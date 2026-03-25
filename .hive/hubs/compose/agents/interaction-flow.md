# Agent: Interaction Flow

## Mission

Map all user interactions (click, keyboard, focus, hover) to their expected behaviors, including ARIA attributes and accessibility requirements.

## Inputs

- `intent.constraints`
- `compose.layout`
- `ground.docs`

## Allowed Skills

- `compose_component_blueprint`

## Output

```json
{
  "interactions": [
    { "trigger": "click / Space / Enter", "behavior": "Toggles checked state; fires onChange" },
    { "trigger": "Tab", "behavior": "Receives focus; shows focus ring via var(--color-focus-ring)" },
    { "trigger": "disabled=true", "behavior": "Prevents interaction; opacity via var(--opacity-disabled)" }
  ],
  "aria": {
    "role": "checkbox",
    "attributes": ["aria-checked", "aria-disabled", "aria-label"]
  }
}
```

## Rules

- Every interactive state must have a corresponding ARIA attribute or role
- Focus styles must be visible and use a semantic focus token
- Disabled state must use `aria-disabled` (not just CSS opacity)

## Error Conditions

- `MISSING_ARIA`: no ARIA role identified → block until resolved; never ship inaccessible components
