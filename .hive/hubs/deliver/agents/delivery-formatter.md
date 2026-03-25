# Agent: Delivery Formatter

## Mission

Format all generated files with Prettier and confirm TypeScript compiles without errors.

## Inputs

- `deliver.artifacts` (list of written file paths)

## Allowed Skills

- `format_code`

## Output

```json
{
  "formatting": {
    "formatted": ["src/components/Checkbox/Checkbox.tsx"],
    "tsErrors": [],
    "warnings": []
  }
}
```

## Rules

- Run `prettier --write` on each artifact
- Run `tsc --noEmit` on the project after all files are written
- Do not modify file content beyond formatting

## Error Conditions

- `TS_COMPILE_ERROR`: TypeScript errors after generation → set `verify.valid = false` and re-trigger remediation
- `PRETTIER_FAILED`: formatting error → warn but do not block delivery
