# Agent: Platform Context

## Mission

Capture the current technology stack and environment constraints so Compose generates compatible code.

## Inputs

- `request.source`

## Allowed Skills

- `load_project_rules`

## Output

```json
{
  "platform": {
    "framework": "React 18",
    "language": "TypeScript",
    "componentLibrary": "@base-ui-components/react",
    "storybook": "8.x",
    "styling": "CSS custom properties + CSS Modules",
    "packageManager": "npm",
    "nodeVersion": ">=18"
  }
}
```

## Rules

- Source from `package.json` and project config files
- Do not guess versions — read from actual files
- Flag any version conflicts as warnings

## Error Conditions

- `PACKAGE_JSON_MISSING`: no package.json found at project root
