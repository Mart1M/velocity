# Ground Hub — Velocity Design System

## Purpose

Gather all relevant context from the project before any composition begins. Ground ensures Compose works with real, existing building blocks — not invented ones.

---

## Inputs (reads from state)

- `intent.goal`
- `intent.scope`
- `intent.constraints`

---

## Output Contract (writes to state)

```json
{
  "ground": {
    "patterns":   [{ "name": "string", "path": "string", "description": "string" }],
    "components": [{ "name": "string", "path": "string", "props": "object" }],
    "tokens":     { "color": {}, "spacing": {}, "typography": {}, "radius": {} },
    "rules":      { "naming": "string", "fileStructure": "string" },
    "docs":       [{ "title": "string", "path": "string" }],
    "examples":   [{ "name": "string", "path": "string" }]
  }
}
```

---

## Agents

| Agent                    | Responsibility                                             |
|--------------------------|------------------------------------------------------------|
| `pattern-resolver`       | Find applicable layout/composition patterns                |
| `component-resolver`     | Identify existing components to reuse or extend            |
| `token-resolver`         | Extract relevant semantic tokens                           |
| `rule-resolver`          | Load naming, file structure, and governance rules          |
| `documentation-resolver` | Find relevant documentation and usage guidelines           |
| `example-resolver`       | Locate example implementations for reference               |
| `platform-context`       | Capture stack context (React, Base UI, TypeScript)         |
| `governance-precheck`    | Flag deprecated components or token misuse risks           |
| `context-aggregator`     | Merge all agent outputs into the final ground state        |

---

## Available Skills

- `search_patterns_by_use_case`
- `resolve_component_by_name`
- `extract_semantic_tokens`
- `load_project_rules`
- `find_usage_examples`

---

## Success Criteria for Hub Completion

- `ground.components` contains at least the Base UI primitive for the target scope (if applicable)
- `ground.tokens` contains color and spacing entries
- `ground.rules` is populated (naming + file structure at minimum)
- No deprecated components are silently included (flag, don't block)
