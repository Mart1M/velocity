# Agent: Documentation Agent

## Mission

Update `src/index.ts` to export the new component, and write the component's `index.ts` barrel file.

## Inputs

- `compose.blueprint.filePaths`
- `compose.blueprint.componentName`
- `ground.rules.exportPattern`

## Allowed Skills

- `update_index_exports`

## Output

- Updated `src/index.ts` with new export line
- New `src/components/<Name>/index.ts` barrel

## Rules

- Export pattern: `export { ComponentName } from './ComponentName';`
- `src/index.ts` exports must stay alphabetically sorted
- Never remove existing exports

## Error Conditions

- `DUPLICATE_EXPORT`: component already exported in `src/index.ts` → skip and warn
