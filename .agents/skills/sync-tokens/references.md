# Sync Tokens — Reference

## Flatten JSON tokens (read in Node or inline)

Reuse the same logic as `scripts/build-tokens.ts`:

```ts
type RawToken = { $value: string; $type?: string };
type RawTokenTree = { [key: string]: RawTokenTree | RawToken };

function flattenTokens(node: RawTokenTree, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      result[path] = String((value as RawToken).$value);
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenTokens(value as RawTokenTree, path));
    }
  }
  return result;
}
```

## code path → Figma name

```js
function toFigmaName(codePath, layer) {
  if (layer === 'core') {
    // color.gray.50 → gray/50
    // font.size.base → font/size/base
    const parts = codePath.split('.');
    parts.shift(); // remove color | font
    return parts.join('/');
  }
  if (layer === 'semantic') {
    // velocity.surface.primary → surface/primary
    const parts = codePath.split('.');
    parts.shift(); // remove velocity
    return parts.join('/');
  }
  return codePath.replace(/\./g, '/');
}
```

## code path → CSS variable (for codeSyntax)

```js
function toCssVar(codePath, layer) {
  if (layer === 'core') {
    // color.gray.50 → --color-gray-50
    return `var(--${codePath.replace(/\./g, '-')})`;
  }
  if (layer === 'semantic') {
    // velocity.surface.primary → --color-surface-primary
    const parts = codePath.split('.');
    parts.shift(); // velocity
    const group = parts[0]; // surface, content, border…
    const rest = parts.slice(1).join('-');
    return `var(--color-${group}-${rest})`;
  }
}
```

## Create or update color variable

```js
async function upsertColorVariable(collection, name, modeId, value, scopes) {
  const existing = (await figma.variables.getLocalVariablesAsync())
    .find(v => v.name === name && v.variableCollectionId === collection.id);

  let variable = existing;
  if (!variable) {
    variable = figma.variables.createVariable(name, collection, 'COLOR');
    variable.scopes = scopes;
  }

  if (value.aliasId) {
    variable.setValueForMode(modeId, { type: 'VARIABLE_ALIAS', id: value.aliasId });
  } else if (value.hex) {
    variable.setValueForMode(modeId, {
      r: value.rgb.r, g: value.rgb.g, b: value.rgb.b,
      a: value.opacity ?? 1,
    });
  }

  variable.setVariableCodeSyntax('WEB', value.codeSyntax);
  return variable;
}
```

## Resolve reference string

```js
function resolveReference(ref, coreFlat, coreVarByName) {
  // {color.gray.950} → alias to gray/950
  const inner = ref.replace(/^\{|\}$/g, '');
  if (inner.startsWith('color.')) {
    const figmaName = toFigmaName(inner, 'core');
    const v = coreVarByName.get(figmaName);
    if (!v) throw new Error(`Missing core variable for ${ref}`);
    return { aliasId: v.id };
  }
  return null; // rgba literals, etc. — use raw value
}
```

## Semantic groups sync order

Sync in dependency-friendly batches:

1. `surface/*`, `background/*`
2. `content/*`
3. `border/*`
4. `accent/*`, `brand/*`
5. `state/*`, `feedback/*`
6. `elevation/*` (may need FLOAT or custom handling)
7. `motion/*`

## Variable scopes reference

| Figma scope | Use for |
|-------------|---------|
| `FRAME_FILL` | Background fills on frames |
| `SHAPE_FILL` | Rectangle/vector fills |
| `TEXT_FILL` | Text color |
| `STROKE_COLOR` | Borders, dividers |
| `GAP` | Auto-layout spacing |
| `CORNER_RADIUS` | Border radius |
| `WIDTH_HEIGHT` | Sizing (rare for color tokens) |
| `[]` | Primitives — hide from most pickers |

## Read Figma state script

```js
async function auditVariables() {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const out = [];
  for (const c of collections) {
    for (const vid of c.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(vid);
      if (!v) continue;
      const values = {};
      for (const mode of c.modes) {
        values[mode.name] = v.valuesByMode[mode.modeId];
      }
      out.push({
        collection: c.name,
        name: v.name,
        resolvedType: v.resolvedType,
        scopes: v.scopes,
        codeSyntax: v.codeSyntax,
        values,
      });
    }
  }
  return out;
}
```

## Diff script pattern

```js
// Compare code flat map vs Figma names
const codeSemantic = flattenTokens(loadJson('semantic-light.json'));
const figmaNames = new Set(figmaSemanticVars.map(v => v.name));

const missingInFigma = [];
const extraInFigma = [];

for (const [path, value] of Object.entries(codeSemantic)) {
  const name = toFigmaName(path, 'semantic');
  if (!figmaNames.has(name)) missingInFigma.push({ name, value });
}

return { missingInFigma, count: missingInFigma.length };
```

## Tokens that need special handling

| Type | Code example | Figma approach |
|------|--------------|----------------|
| RGBA literal | `rgb(59 130 246 / 0.10)` | Raw COLOR with opacity |
| Alias | `{color.gray.950}` | VARIABLE_ALIAS → Core |
| Shadow | `0 4px 12px rgba(...)` | Effect style, not COLOR variable |
| Duration | `200ms` | FLOAT variable or skip |
| Easing | `cubic-bezier(...)` | STRING or skip |
| Typography composite | `velocity.typography.body` | Text style, not single variable |

## Batch size

| Batch | ~Count | Example |
|-------|--------|---------|
| Core colors | ~50 | one `use_figma` call |
| Core typography | ~30 | one call |
| Semantic per group | ~10–20 | `surface/*` one call |
| Full sync | 80–100 vars | 6–10 calls total |

## After sync

1. Spot-check with `get_variable_defs` on a component node
2. Re-bind any components that still use hardcoded fills
3. Run `figma-create-component` for new components

## Velocity semantic variables (current inventory)

Groups expected in Figma `Semantic` collection:

- `surface/*` — primary, secondary, tertiary, hover, active, elevated, overlay, info, success, warning, error, brand-tint, *-emphasis
- `content/*` — primary, secondary, tertiary, brand, inverse, disabled, on-brand
- `border/*` — default, subtle, strong, brand, focus
- `accent/*` — primary, secondary, tertiary
- `brand/*` — primary, secondary
- `state/*` — success, warning, error, info
- `feedback/*` — positive, neutral, caution, negative
- `background/*` — primary, secondary, tertiary, brand, inverse

Core collection: palette scales (`gray/*`, `yellow/*`, `primary/*`, `green/*`, `red/*`, `blue/*`, `orange/*`, `mint/*`) + `font/*` typography primitives.
