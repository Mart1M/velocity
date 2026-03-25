# Preset: Design System

Domain-specific defaults for Velocity and similar component library projects.

## Default Constraints

- Must use Base UI primitives for interactive elements
- All colors via semantic CSS custom properties
- Every component ships with a Storybook story
- TypeScript strict mode
- WCAG 2.2 AA required

## Default Output Formats

- `code` — React component + Storybook stories
- `markdown` — component documentation stub

## Default Truth Sources

- `src/components/` — existing components
- `src/tokens/` — design tokens
- `src/index.ts` — public API surface

## Default Success Criteria Template

For any new component:
1. Renders in Storybook with Default story
2. All variants covered by named stories
3. Passes TypeScript compilation
4. No raw CSS values in styles
5. Accessible (ARIA role, keyboard nav, focus ring)
6. Exported from `src/index.ts`
