# Figma Create Component — Reference

## Tool selection matrix

| User intent | Primary tool | Secondary |
|-------------|--------------|-----------|
| "Create Input in Figma" | `use_figma` (write) | `get_metadata`, `get_screenshot` |
| "What variables exist?" | `use_figma` (read) or `get_variable_defs` | — |
| "Is there already a Button?" | `search_design_system` | `use_figma` findAll on page |
| "Match this Figma frame in code" | `get_design_context` | `get_screenshot` |
| "Capture this Next.js page" | `generate_figma_design` + `use_figma` | not for DS atoms |
| "Map component to code" | `add_code_connect_map` | after component is stable |
| "Can't write to file" | `whoami` | try `user-Figma` server |

## use_figma return contract

Every write script must return:

```json
{
  "createdNodeIds": ["123:456"],
  "mutatedNodeIds": ["789:012"],
  "status": "optional human summary"
}
```

Pass returned IDs as string literals in the next call — never reconstruct from memory.

## Variable lookup helper

```js
async function getVar(name) {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  for (const c of collections) {
    for (const vid of c.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(vid);
      if (v && v.name === name) return v;
    }
  }
  return null;
}
```

## Text style mapping (Velocity)

| Tailwind | Figma text style |
|----------|------------------|
| `text-3xl font-bold` (title) | Stack Sans Headline Bold 30 |
| `text-lg` (description) | Inter Regular 18 |
| `text-sm` (body/input) | Inter Regular/Medium 14 |
| `text-xs` (caption/helper) | Inter Regular 12 |
| Overline labels | Inter Semi Bold 12, tracking 0.72px |

## Spacing from Tailwind → Figma

| Class | px |
|-------|-----|
| `gap-1.5` | 6 |
| `gap-1` / `p-1` | 4 |
| `px-3 py-1.5` | 12 / 6 |
| `pl-2.5` | 10 |
| `pl-3` | 12 |
| `pl-4` | 16 |
| `rounded-xl` | 12 |
| `rounded-full` | 999 |

## combineAsVariants pattern

```js
const variants = [base, ...clones];
base.name = 'Size=md, State=Default';
const set = figma.combineAsVariants(variants, parentFrame);
set.name = 'Input';
set.layoutMode = 'HORIZONTAL';
set.layoutWrap = 'WRAP';
set.itemSpacing = 24;
set.counterAxisSpacing = 24;
set.paddingTop = 24;
set.paddingBottom = 24;
set.paddingLeft = 24;
set.paddingRight = 24;
```

## Component property wiring

```js
const props = componentSet.componentPropertyDefinitions;
const labelKey = Object.keys(props).find(k => k.startsWith('Label#'));
const labelNode = defaultVariant.findOne(n => n.name === 'Label');
labelNode.componentPropertyReferences = {
  characters: labelKey,
  visible: Object.keys(props).find(k => k.startsWith('Show Label#')),
};
```

Instance override:

```js
instance.setProperties({
  [Object.keys(props).find(k => k.startsWith('Leading Icon#'))]: true,
  [Object.keys(props).find(k => k.startsWith('Placeholder#'))]: 'Search…',
});
```

## Documentation frame scaffold

```js
const doc = figma.createAutoLayout('VERTICAL', {
  name: 'Input / Documentation',
  itemSpacing: 48,
  paddingTop: 80, paddingBottom: 80,
  paddingLeft: 96, paddingRight: 96,
  cornerRadius: 16,
});
doc.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
doc.resize(1440, 100);
doc.primaryAxisSizingMode = 'AUTO';
doc.counterAxisSizingMode = 'FIXED';
```

Append children first, then set `layoutSizingHorizontal = 'FILL'` on children.

## Common errors → fixes

| Error | Fix |
|-------|-----|
| `layoutSizingHorizontal: node must be an auto-layout frame or child` | `appendChild` first, then set sizing |
| `counterAxisSizingMode: Expected FIXED \| AUTO, received FILL` | Use `AUTO` on frame axis, `FILL` only on child `layoutSizing*` |
| `Cannot write to node with unloaded font` | `await figma.loadFontAsync({ family, style })` before text edits |
| `no edit access` | `whoami` → use `user-Figma` MCP server |
| `setProperties: Could not find property` | Use full key with `#id` suffix |
| Indicator looks like full tab block | Line variant: separate 3px row below tabs, not `h-[var(--active-tab-height)]` |
| Doc frame height collapsed | `primaryAxisSizingMode = 'AUTO'` on root doc frame |

## Sequential execution

Run `use_figma` writes **sequentially** — wait for each call to complete before the next. Validate with `get_screenshot` between major steps.

## State to track between calls

```json
{
  "componentPageId": "396:629",
  "publicSetId": "399:785",
  "internalsFrameId": "398:2",
  "docFrameId": "402:2",
  "propertyKeys": { "label": "Label#399:0" }
}
```
