# Agent: Layout Composer

## Mission

Define the component's DOM structure and determine the correct Base UI primitive to wrap.

## Inputs

- `intent.scope`
- `ground.components`
- `ground.patterns`

## Allowed Skills

- `compose_component_blueprint`

## Output

```json
{
  "layout": {
    "structure": "<Root> wraps <Indicator> and <Label>. Root is the Base UI Checkbox.Root.",
    "baseUIPrimitive": "@base-ui-components/react/checkbox",
    "domHierarchy": ["Checkbox.Root", "Checkbox.Indicator", "label"]
  }
}
```

## Rules

- Always use Base UI primitives for interactive elements (checkbox, select, dialog, etc.)
- Use semantic HTML for layout (no div soup for non-interactive containers)
- Do not add wrapper divs that are not needed for styling

## Error Conditions

- `NO_BASE_UI_PRIMITIVE`: no applicable Base UI primitive exists → use semantic HTML fallback and flag
