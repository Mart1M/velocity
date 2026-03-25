# Compose Hub — Velocity Design System

## Purpose

Design the complete implementation blueprint using only the grounded context. Compose produces a detailed, structured plan that the Deliver hub translates into code — no raw values, no invented components, no ungrounded decisions.

---

## Inputs (reads from state)

- `intent` (full object)
- `ground` (full object)

---

## Output Contract (writes to state)

```json
{
  "compose": {
    "blueprint": {
      "componentName": "string",
      "filePaths": { "component": "string", "stories": "string", "index": "string" },
      "props": [{ "name": "string", "type": "string", "required": "boolean", "description": "string" }],
      "variants": ["string"],
      "states": ["default", "hover", "focus", "disabled", "error"]
    },
    "layout": {
      "structure": "string — description of DOM/component tree",
      "baseUIPrimitive": "string"
    },
    "components": [{ "name": "string", "role": "string" }],
    "interactions": [{ "trigger": "string", "behavior": "string" }],
    "state_map": { "controlled": "boolean", "stateVariables": [] }
  }
}
```

---

## Agents

| Agent                 | Responsibility                                          |
|-----------------------|---------------------------------------------------------|
| `layout-composer`     | Define component DOM structure and Base UI primitive    |
| `component-composer`  | Specify props, variants, and token application          |
| `interaction-flow`    | Map user interactions to behavior                       |
| `state-mapper`        | Define controlled/uncontrolled state variables          |
| `blueprint-agent`     | Assemble final blueprint from all composer outputs      |

---

## Available Skills

- `compose_component_blueprint`
- `map_tokens_to_props`
- `generate_prop_interface`

---

## Success Criteria for Hub Completion

- `compose.blueprint.componentName` is set
- `compose.blueprint.filePaths` are all defined
- All colors and spacing reference `ground.tokens` (no raw values)
- All components reference `ground.components` (no invented primitives)
- `compose.blueprint.props` has at least one entry
