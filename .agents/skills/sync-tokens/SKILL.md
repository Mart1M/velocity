---
name: sync-tokens
description: >-
  Sync Velocity design tokens from code (src/tokens JSON + tokens.css) to Figma
  variables via the Figma MCP (use_figma, get_variable_defs). Use when the user
  asks to sync, push, update, or align tokens/variables between code and Figma,
  or before creating components that need up-to-date Figma variables.
---

# Sync Tokens → Figma (MCP)

Push design tokens from **code** to **Figma variables** in the Velocity file. Code is the source of truth unless the user explicitly says otherwise.

## Companion skills

Load before `use_figma` writes:

1. `figma-use` — Plugin API rules
2. `figma-generate-library` — variable foundations (Phase 1)

For component work after sync: [`figma-create-component`](../figma-create-component/SKILL.md).

## Velocity file

| Item | Value |
|------|-------|
| fileKey | `FuvsFLuBl3HjgR9Ql3iw2x` |
| URL | `https://www.figma.com/design/FuvsFLuBl3HjgR9Ql3iw2x/Velocity` |
| MCP server | `user-Figma` (prefer for writes) |

## Source of truth (code)

| Layer | Files | Role |
|-------|-------|------|
| **Core** | `src/tokens/core/color.json`, `typography.json` | Primitives — hex, font sizes |
| **Semantic shared** | `src/tokens/semantic/semantic-shared.json` | Mode-agnostic semantics |
| **Semantic light** | `src/tokens/semantic/semantic-light.json` | Light mode values |
| **Semantic dark** | `src/tokens/semantic/semantic-dark.json` | Dark mode values |
| **Generated CSS** | `src/styles/tokens.css` | Built by `npm run build:tokens` — use to verify resolved values |

**Always read JSON sources first.** Run `npm run build:tokens` if JSON changed and you need resolved CSS values for validation.

## Figma target structure

| Collection | Modes | Content |
|------------|-------|---------|
| `Core` | `Value` (single) | Primitives: `gray/50`, `yellow/300`, `font/size/base`… |
| `Semantic` | `Light`, `Dark` | Semantics: `surface/primary`, `content/primary`, `border/default`… |

Naming: **slash-separated paths** (`surface/primary`), not CSS dashes (`surface-primary`).

## Name mapping

### Core (JSON → Figma)

| Code path | Figma variable |
|-----------|----------------|
| `color.gray.50` | `gray/50` |
| `color.yellow.300` | `yellow/300` |
| `font.size.base` | `font/size/base` |
| `font.weight.bold` | `font/weight/bold` |

Strip the `color.` / `font.` prefix; join remaining segments with `/`.

### Semantic (JSON → Figma)

| Code path | Figma variable |
|-----------|----------------|
| `velocity.surface.primary` | `surface/primary` |
| `velocity.content.on-brand` | `content/on-brand` |
| `velocity.border.focus` | `border/focus` |

Strip the `velocity.` prefix; join with `/`.

### CSS ↔ Figma (for codeSyntax & validation)

| CSS variable | Figma variable |
|--------------|----------------|
| `--color-gray-50` | `gray/50` (Core) |
| `--color-surface-primary` | `surface/primary` (Semantic) |
| `--color-content-primary` | `content/primary` |
| `--color-accent-primary` | `accent/primary` |

Tailwind class `bg-surface-primary` → CSS `--color-surface-primary` → Figma `surface/primary`.

## MCP tools

| Tool | When |
|------|------|
| `use_figma` (read) | List collections, variables, modes, values |
| `use_figma` (write) | Create/update collections, variables, aliases, scopes |
| `get_variable_defs` | Quick read of resolved values on a node |
| `whoami` | Diagnose edit-access failures |

Read tool schema in `mcps/user-Figma/tools/` before calling.

## Workflow

### Phase 0 — Discovery (read-only)

```text
- [ ] 0a. Read src/tokens/**/*.json + note $value / $type / references
- [ ] 0b. Run npm run build:tokens if JSON was recently edited
- [ ] 0c. use_figma: list collections, modes, variable counts
- [ ] 0d. Build diff: tokens in code but missing in Figma, renamed, value drift
- [ ] 0e. Print gap analysis to chat before any write
```

Discovery script pattern:

```js
const collections = await figma.variables.getLocalVariableCollectionsAsync();
const report = [];
for (const c of collections) {
  const vars = await Promise.all(c.variableIds.map(id => figma.variables.getVariableByIdAsync(id)));
  report.push({
    name: c.name, id: c.id,
    modes: c.modes.map(m => ({ id: m.modeId, name: m.name })),
    variables: vars.filter(Boolean).map(v => v.name),
  });
}
return report;
```

### Phase 1 — Sync Core primitives

One collection, one mode. Raw values only (no aliases to semantic).

```text
- [ ] 1a. Ensure `Core` collection exists (mode: Value)
- [ ] 1b. For each primitive in core/*.json: create or update variable
- [ ] 1c. Set scopes (primitives: narrow or hidden — see references.md)
- [ ] 1d. Set codeSyntax: WEB → `var(--color-gray-50)` format
- [ ] 1e. Validate sample values vs tokens.css
```

### Phase 2 — Sync Semantic variables

Two modes: **Light** and **Dark**.

```text
- [ ] 2a. Ensure `Semantic` collection with modes Light + Dark
- [ ] 2b. Sync semantic-shared (same value in both modes unless overridden)
- [ ] 2c. Sync semantic-light.json → Light mode
- [ ] 2d. Sync semantic-dark.json → Dark mode
- [ ] 2e. Resolve {color.gray.950} references → VARIABLE_ALIAS to Core
- [ ] 2f. Set scopes per variable role (TEXT_FILL, FRAME_FILL, STROKE_COLOR…)
- [ ] 2g. Set codeSyntax on every semantic variable
```

### Phase 3 — Text & effect styles (optional)

If typography tokens changed:

```text
- [ ] 3a. Map semantic-typography.json roles → Figma text styles (Heading/H1…)
- [ ] 3b. Map elevation tokens → Figma effect styles
- [ ] 3c. get_screenshot of Foundations page if it exists
```

### Phase 4 — Report

```markdown
## Token sync summary

### Created
- [variable names]

### Updated
- [variable names + old → new value]

### Unchanged
- count

### Skipped / manual review
- [aliases that couldn't resolve, rgba tokens, multi-layer shadows]
```

## Value conversion

```js
// Hex → Figma RGB (0–1)
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

// rgb(R G B / A) → { color, opacity }
function parseRgb(value) {
  const m = value.match(/rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)/);
  if (!m) return null;
  return {
    color: { r: +m[1]/255, g: +m[2]/255, b: +m[3]/255 },
    opacity: +m[4],
  };
}
```

## Alias resolution

When JSON has `"$value": "{color.gray.950}"`:

1. Resolve Core variable `gray/950`
2. Set semantic value as `{ type: 'VARIABLE_ALIAS', id: coreVar.id }` for that mode
3. Never duplicate hex in Semantic if Core exists

```js
await variable.setValueForMode(modeId, {
  type: 'VARIABLE_ALIAS',
  id: coreVariable.id,
});
```

## Incremental writes

- **One collection or one semantic group per `use_figma` call** (e.g. all `surface/*`, then all `content/*`)
- Return `{ createdVariableIds, updatedVariableIds, collectionIds }`
- On error: stop, fix, retry — scripts are atomic
- Never guess variable IDs — use discovery return values

## Scopes (required)

Never leave `ALL_SCOPES`. Examples:

| Role | Scopes |
|------|--------|
| Surface/background fills | `FRAME_FILL`, `SHAPE_FILL` |
| Text/content colors | `TEXT_FILL` |
| Borders | `STROKE_COLOR` |
| Spacing/gap | `GAP` |
| Radius | `CORNER_RADIUS` |
| Core primitives | `[]` (hidden from irrelevant pickers) |

## codeSyntax (required)

WEB format must wrap in `var()`:

```js
variable.setVariableCodeSyntax('WEB', 'var(--color-surface-primary)');
```

Match the name in `tokens.css`, not the Figma slash name.

## Quality checklist

- [ ] Gap analysis printed before writes
- [ ] Core primitives exist before semantic aliases
- [ ] Light and Dark modes both updated
- [ ] No raw hex duplicated in Semantic when alias is possible
- [ ] All variables have scopes + codeSyntax
- [ ] Sample spot-check: `surface/primary`, `content/primary`, `accent/primary` match tokens.css
- [ ] Node/variable IDs returned for follow-up calls

## Anti-patterns

| Don't | Do |
|-------|-----|
| Edit `tokens.css` manually | Edit JSON + `npm run build:tokens` |
| Create variables during component build | Run `sync-tokens` first |
| Use slash names in codeSyntax | Use CSS `var(--color-surface-primary)` |
| One giant script for 100+ variables | Batch by collection/group |
| Hardcode Figma hex when variable exists | Bind components to variables |

## Additional reference

- Conversion helpers, scope list, batch script templates: [references.md](references.md)
- Figma component binding after sync: [figma-create-component](../figma-create-component/SKILL.md)
