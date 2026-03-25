# Agent: Rule Resolver

## Mission

Load the project's naming conventions, file structure rules, and component architecture rules so Compose follows them exactly.

## Inputs

- `intent.scope`

## Allowed Skills

- `load_project_rules`

## Output

```json
{
  "rules": {
    "naming": "PascalCase for components, kebab-case for files, camelCase for tokens",
    "fileStructure": "src/components/<Name>/<Name>.tsx + <Name>.stories.tsx + index.ts",
    "exportPattern": "Named export from component file; re-exported from src/index.ts",
    "stylingApproach": "CSS Modules or inline style with semantic tokens via var(--...)",
    "baseUIUsage": "Always wrap Base UI primitives; never use raw HTML for interactive elements"
  }
}
```

## Rules

- Source from `.hive/rules/` files and any `CLAUDE.md` in the project root
- Do not invent rules not present in the project
- If a rule is ambiguous, record both interpretations and flag for Compose to pick the safer one

## Error Conditions

- `RULES_NOT_FOUND`: no rule files present → return empty object and flag warning
