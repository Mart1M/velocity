---
name: figma-create-component
description: >-
  Create or update design system components in Figma via the Figma MCP (use_figma,
  get_metadata, get_screenshot, search_design_system). Use when the user asks to
  create, sync, generate, or document a component in Figma from code, stories, or
  tokens — especially for Velocity (velocity-ds).
---

# Figma Create Component (MCP)

Workflow for creating production-quality Figma components from code using the Figma MCP. **Never one-shot** — expect 5–15+ `use_figma` calls per component.

## Mandatory companion skills

Load **before every `use_figma` call** (pass in `skillNames`):

1. `figma-use` — Plugin API rules (return pattern, fonts, auto-layout, page switching)
2. `figma-generate-library` — design-system phases, variable bindings, variant matrices

For Velocity-specific file keys and template nodes, also read [`velocity-figma-component`](../velocity-figma-component/SKILL.md).

## MCP server & tools

| Tool | When to use |
|------|-------------|
| `whoami` | First call if writes fail — confirm edit access |
| `get_metadata` | Read-only structure discovery (pages, hierarchy, counts) |
| `get_design_context` | Understand template/layout reference from a node |
| `get_screenshot` | Visual validation after each major step |
| `get_variable_defs` | Map Figma variable names → code tokens |
| `search_design_system` | Find existing components/icons/variables before creating |
| `use_figma` | **All writes** — create nodes, variants, bindings, docs |
| `generate_figma_design` | **Only** first-time web page capture — not for DS components |

**Server:** Prefer `user-Figma` for `use_figma` writes. If `plugin-figma-figma` returns "no edit access", switch servers.

**Always** read the tool JSON schema in `mcps/user-Figma/tools/` before calling.

## Phase 0 — Discovery (read-only)

Do not write until discovery is done.

1. **Code** — read `src/components/[Name]/[Name].tsx`, `*.stories.tsx`, `src/styles/tokens.css`
2. **Figma** — `use_figma` read script: pages, existing component sets, variables, text styles
3. **Reuse** — `search_design_system` for Button, Chip, Icons, etc.
4. **Gap analysis** — print to chat: states in code vs Figma, naming conflicts, missing tokens
5. **Scope** — list exact variants/properties to build (from stories + props)

```js
// Discovery script pattern
const page = figma.root.children.find(p => p.name === 'Inputs');
await figma.setCurrentPageAsync(page);
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const components = page.findAllWithCriteria({ types: ['COMPONENT_SET'] });
return { page: page?.name, collections: collections.map(c => c.name), components: components.map(c => c.name) };
```

## Phase 1 — Plan decomposition

Mirror the **code API**, not a flat drawing.

| Code pattern | Figma pattern |
|--------------|---------------|
| `Button` | Public `Button` component set |
| `TableRow`, `TableCell` | Internal `_TableRow`, `_TableCell` |
| `TabsTab`, `TabsIndicator` | Internal `_TabsTab`, `_TabsIndicator` |
| `Input` + icons/addons | Public set + boolean props |

Rules:

- Public component name = code export (`Input`, `Tabs`, `Button`)
- Internal helpers prefixed `_` (`_InputField`, `_TabsTab`)
- Group internals in `_Internals / [Component]` frame on the component page
- Repeated element >2× → internal component before variants
- Return **all** created node IDs every call

## Phase 2 — Build (incremental `use_figma`)

**One focused mutation per call** (~10 logical operations max). Order:

```
1. Create page (if missing) — figma.createPage()
2. Create _Internals frame
3. Build smallest internal atom (e.g. _TabsTab base)
4. Clone + combineAsVariants for internal sets
5. Compose _List / _Row from instances
6. Build public component from instances
7. combineAsVariants for public set
8. Add component properties (TEXT, BOOLEAN, INSTANCE_SWAP)
9. Wire componentPropertyReferences on default variant
10. Build documentation frame from template
11. Place examples (instances with setProperties)
12. get_screenshot validation
```

### Auto-layout rules (common failures)

- Use `figma.createAutoLayout()` for structural containers
- **`appendChild` before** `layoutSizingHorizontal/Vertical = 'HUG'|'FILL'`
- `counterAxisSizingMode` / `primaryAxisSizingMode` → only `'FIXED' | 'AUTO'` (never `'FILL'`)
- `layoutSizingHorizontal/Vertical` on children → `'FIXED' | 'HUG' | 'FILL'`
- Text: `await figma.loadFontAsync()` → mutate → return IDs (Inter: `"Semi Bold"` not `"SemiBold"`)

### Variables (Velocity Semantic collection)

Bind fills/strokes — never hardcode hex when a variable exists:

| Token | Figma variable |
|-------|----------------|
| `bg-surface-primary` | `surface/primary` |
| `bg-surface-secondary` | `surface/secondary` |
| `text-content-primary` | `content/primary` |
| `text-content-secondary` | `content/secondary` |
| `text-content-tertiary` | `content/tertiary` |
| `border-border-default` | `border/default` |
| `border-border-brand` | `border/brand` |
| `border-border-focus` | `border/focus` |
| `bg-accent-primary` | `accent/primary` |
| `text-feedback-negative` | `feedback/negative` |
| `border-state-error` | `state/error` |

```js
async function bindFill(node, variable) {
  node.fills = [figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', variable
  )];
}
```

### Variants & properties

- Variant axes match code: `Size` (sm/md/lg), `State` (Default/Error/Disabled/Focus), `Variant` (line/pill)
- `figma.combineAsVariants(nodes, parent)` then grid-layout (wrap, spacing 16–24)
- Properties: `addComponentProperty('Label', 'TEXT', 'Default')`
- Wire refs: `node.componentPropertyReferences = { characters: 'Label#399:0', visible: 'Show Label#399:39' }`
- `setProperties` needs **full keys** with `#` suffix from `componentPropertyDefinitions`

### Documentation frame

Clone structure from Component Template (`168:3`):

- `Header` — Stack Sans Headline Bold title + Inter Regular description (from stories docs)
- `Divider` — `border/subtle`
- `Preview` — `surface/secondary` bg, dashed slot, component instance
- `Examples` — one instance per story variant
- `Usage notes` — API props + token list

## Phase 3 — Validate

After each build step:

| Check | Tool |
|-------|------|
| Hierarchy, variant count, names | `get_metadata` |
| Visual (clipping, indicator, spacing) | `get_screenshot` |
| Token bindings | read-only `use_figma` on `boundVariables` |

**Stop on error** — `use_figma` is atomic. Read error, fix script, retry. Never guess node IDs.

## Velocity file constants

| Item | Value |
|------|-------|
| fileKey | `FuvsFLuBl3HjgR9Ql3iw2x` |
| Component template | `168:3` |
| URL | `https://www.figma.com/design/FuvsFLuBl3HjgR9Ql3iw2x/Velocity` |

Page naming: match code component (`Inputs`, `Tabs`, `Button`). Create page if missing.

## use_figma call template

```text
skillNames: "figma-use,figma-generate-library"

description: "Step N: [what this call does]"

code: |
  await figma.setCurrentPageAsync(targetPage);
  // ... mutations ...
  return { createdNodeIds: [...], mutatedNodeIds: [...] };
```

## Quality checklist

- [ ] Discovery done — no duplicate component on canvas
- [ ] Variables bound (no raw hex for semantic colors)
- [ ] Auto-layout on all intentional layout frames
- [ ] Internal `_` components for repeated parts
- [ ] Public variants cover all story states
- [ ] Component properties wired to layers
- [ ] Documentation frame with examples
- [ ] Screenshots reviewed — indicators, text clipping, disabled opacity
- [ ] Node IDs returned and reused in follow-up calls

## Anti-patterns

| Don't | Do instead |
|-------|------------|
| One 200-line `use_figma` creating everything | 5–15 small sequential calls |
| Absolute positioning for line underlines | Separate indicator row below tabs |
| `h-[var(--active-tab-height)]` + `h-[3px]` in same class string (code) | Split conditional classes per variant |
| Loop `setCurrentPageAsync` across pages in one script | One page per `use_figma` call |
| `setProperties({ 'Show Label': false })` | Use full key `Show Label#399:39` |
| Recreate component when it exists | Inspect + update in place |

## Additional reference

- Plugin API gotchas & snippets: [references.md](references.md)
- Velocity file/template specifics: [velocity-figma-component](../velocity-figma-component/SKILL.md)
- Code conventions: [runswap-velocity](../runswap-velocity/SKILL.md)
