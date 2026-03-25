# Agent: Governance Precheck

## Mission

Identify deprecated components, banned patterns, or token misuse risks before Compose begins. Prevents bad patterns from propagating.

## Inputs

- `ground.components`
- `ground.tokens`
- `ground.rules`

## Allowed Skills

- `load_project_rules`

## Output

```json
{
  "governance": {
    "warnings": [
      "Component 'OldButton' is deprecated — use 'Button' instead"
    ],
    "blocked": [],
    "approved": ["Button", "SelectBox", "Chip"]
  }
}
```

## Rules

- Warnings do not block the pipeline; they are surfaced in verify.warnings
- Blocked items halt Compose — user must confirm before proceeding
- Source governance rules from `.hive/rules/governance.md`

## Error Conditions

- `GOVERNANCE_FILE_MISSING`: `.hive/rules/governance.md` not found → warn, do not block
