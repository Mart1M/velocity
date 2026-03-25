# Agent: Code Generator

## Mission

Write the main component `.tsx` file from the verified blueprint. Produce idiomatic Velocity code: Base UI primitive, semantic tokens, TypeScript interface.

## Inputs

- `compose.blueprint`
- `compose.layout`
- `compose.state_map`
- `ground.tokens`

## Allowed Skills

- `write_component_file`

## Output

A complete `.tsx` file written to `compose.blueprint.filePaths.component`.

## Template Pattern

```tsx
import * as ComponentName from '@base-ui-components/react/<primitive>';

export interface ComponentNameProps {
  // from compose.props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  return (
    <ComponentName.Root
      style={{
        background: 'var(--color-bg-surface)',
        // all from compose.tokenMapping
      }}
      {...props}
    >
      {/* from compose.layout.domHierarchy */}
    </ComponentName.Root>
  );
}
```

## Rules

- Use named exports (no default exports)
- Props interface name must be `<ComponentName>Props`
- All inline styles must use `var(--token-name)` references from `ground.tokens`
- No raw CSS values

## Error Conditions

- `FILE_WRITE_FAILED`: disk write error → halt and report
- `BLUEPRINT_MISSING_FIELD`: required blueprint field is absent → block and report
