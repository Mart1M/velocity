---
name: velocity-figma-component
description: Create or update Velocity design system components in the Velocity Figma file using the Figma MCP and use_figma. Use when the user asks to design, generate, sync, or create a component for the Velocity design system in Figma.
---

# Velocity Figma Component

## Scope

Use this skill to create or update a component in the Velocity Figma file:

- Velocity file: `https://www.figma.com/design/FuvsFLuBl3HjgR9Ql3iw2x/Velocity?node-id=362-2&t=oc4QSa95NbdbIl1K-1`
- Component template: `https://www.figma.com/design/FuvsFLuBl3HjgR9Ql3iw2x/Velocity?node-id=168-3&t=oc4QSa95NbdbIl1K-11`
- Figma `fileKey`: `FuvsFLuBl3HjgR9Ql3iw2x`
- Destination `nodeId`: `362:2`
- Template `nodeId`: `168:3`

## Required MCP Workflow

1. Load the `figma-use` skill before every `use_figma` call.
2. Read the Figma MCP `use_figma` tool schema before calling it.
3. Use `use_figma` to inspect the destination frame/page and the template node.
4. Copy or recreate the template structure before adding the new component content.
5. Validate the result with a screenshot or layout inspection when available.

## Component Creation Rules

- Use the component template at `168:3` as the starting structure.
- Place the finished component in or under the destination area at `362:2`.
- Use Velocity design tokens, variables, and styles from the Figma file whenever available.
- Do not hardcode raw hex values, spacing values, typography, or radii if a matching Velocity variable/style exists.
- Use auto layout for every meaningful frame: component root, variants, examples, documentation rows, and nested layout groups.
- Prefer component properties and variant sets for states such as `variant`, `size`, `state`, `disabled`, `selected`, `checked`, or `icon`.
- Keep names clear and consistent with code components in `src/components`.

## Component Decomposition

Mirror the code API and split complex components into reusable Figma components instead of drawing one large flat component.

- Create one public component or component set for the component users should consume, named like the code export: `Table`, `Pagination`, `Button`.
- Create internal helper components for repeated subparts and prefix them with `_` so they are treated as non-public/private library components: `_TableHeader`, `_TableBody`, `_TableRow`, `_TableHead`, `_TableCell`, `_TableFooter`.
- Compose public variants from instances of the internal helper components whenever possible.
- Keep internal components near the public component in an `Internal` or `_Internals` frame/section on the component page.
- Do not expose internal helper components as the primary documented component unless they are also public code exports that consumers import directly.
- For compound React APIs, map each exported subcomponent to a Figma subcomponent:
  - `Table` → public component set.
  - `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell` → internal/private helper components unless the Figma library intentionally exposes them.
- For slot-like structures, create internal slot components or auto-layout frames instead of duplicating manual row/cell geometry.
- If a repeated element appears more than twice, make it an internal component before assembling variants.
- Return node IDs for both public and internal components so future calls can update the correct layer without recreating duplicates.

## Preparation

Before writing to Figma:

1. Read `packages/velocity/.cursor/skills/runswap-velocity/SKILL.md`.
2. Check `packages/velocity/COMPONENTS.md` and existing `*.stories.tsx` for the component API and states.
3. Check `packages/velocity/src/tokens/` or `src/styles/tokens.css` for token naming if Figma variables need to be matched to code.
4. If the component already exists in Figma, inspect it first and update it instead of creating a duplicate.

## use_figma Prompt Pattern

When calling `use_figma`, include:

```text
In file FuvsFLuBl3HjgR9Ql3iw2x, inspect node 168:3 as the Velocity component template and node 362:2 as the destination area. Create/update the [ComponentName] component using the template structure, Velocity variables/styles, and auto layout throughout. Use component variants/properties for [states]. Decompose repeated subparts into internal/private components prefixed with "_" and compose public variants from their instances. Do not use raw hex values when a Velocity token exists. Return the created/updated node ids for public and internal components, plus any missing token/component assumptions.
```

## Quality Checklist

- [ ] The component is placed under the Velocity destination node.
- [ ] The template structure from `168:3` was reused or faithfully recreated.
- [ ] Complex/repeated subparts were split into internal/private components prefixed with `_`.
- [ ] Public component variants are composed from internal component instances where practical.
- [ ] All frames use auto layout where layout is intentional.
- [ ] Colors, typography, radius, spacing, and effects use Velocity tokens/styles where possible.
- [ ] Variants/properties cover the same states as the code/story API.
- [ ] Component and layer names are readable and stable.
- [ ] A screenshot or layout check was used to verify visual quality.
