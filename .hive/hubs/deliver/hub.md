# Deliver Hub — Velocity Design System

## Purpose

Translate the verified blueprint into production-ready artifacts: component code, Storybook stories, type definitions, and documentation. Deliver writes files to disk and exports the final output.

---

## Inputs (reads from state)

- `compose` (full object)
- `intent.success_criteria`
- `ground.rules`
- `ground.tokens`
- `verify.valid` (must be `true`)

---

## Output Contract (writes to state)

```json
{
  "deliver": {
    "artifacts": [
      { "type": "component", "path": "src/components/Checkbox/Checkbox.tsx", "status": "written" },
      { "type": "stories",   "path": "src/components/Checkbox/Checkbox.stories.tsx", "status": "written" },
      { "type": "index",     "path": "src/components/Checkbox/index.ts", "status": "written" }
    ],
    "format": "code",
    "output": "Component created at src/components/Checkbox/"
  }
}
```

---

## Agents

| Agent                   | Responsibility                                           |
|-------------------------|----------------------------------------------------------|
| `code-generator`        | Write the component `.tsx` file                         |
| `specification-writer`  | Write the Storybook `.stories.tsx` file                 |
| `documentation-agent`   | Update `src/index.ts` exports and any inline docs       |
| `delivery-formatter`    | Format and validate output files (Prettier, TS check)   |
| `publisher-agent`       | Confirm files written; report artifact list to state    |

---

## Available Skills

- `write_component_file`
- `write_stories_file`
- `update_index_exports`
- `format_code`

---

## Success Criteria for Hub Completion

- All `compose.blueprint.filePaths` have been written to disk
- `src/index.ts` exports the new component
- No TypeScript errors in generated files
- `deliver.artifacts` lists all written files with `status: "written"`

---

## Rules

- Never write files that were not specified in `compose.blueprint.filePaths`
- If a file already exists, confirm with the user before overwriting
- Always run code formatting after writing
