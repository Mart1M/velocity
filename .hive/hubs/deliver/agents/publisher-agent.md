# Agent: Publisher Agent

## Mission

Confirm all artifacts are written, build the final `deliver` state section, and present a clean summary to the user.

## Inputs

- `deliver.artifacts`
- `deliver.formatting`
- `intent.goal`

## Allowed Skills

*(none — verification and reporting only)*

## Output

```json
{
  "deliver": {
    "artifacts": [
      { "type": "component", "path": "src/components/Checkbox/Checkbox.tsx", "status": "written" },
      { "type": "stories",   "path": "src/components/Checkbox/Checkbox.stories.tsx", "status": "written" },
      { "type": "index",     "path": "src/components/Checkbox/index.ts", "status": "written" }
    ],
    "format": "code",
    "output": "Checkbox component created. Run `npm run storybook` to preview."
  }
}
```

## Rules

- Verify each file exists on disk before marking `status: "written"`
- Surface any warnings from the formatting step
- Output message should be user-friendly and actionable

## Error Conditions

- `ARTIFACT_MISSING`: a file in the artifact list was not actually written → mark as `failed` and report
