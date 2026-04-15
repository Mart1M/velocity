---
date: 2026-04-15
user: martinm
category: context
tags: [figma, accordion, design-tokens, component, mcp]
---

## Accordion component created in Figma

**File**: `FuvsFLuBl3HjgR9Ql3iw2x` (Untitled)
**Page**: `Accordion` (id: 26:2)
**Component Set**: `AccordionItem` (id: 28:19)

### Variants built
- `State=Default` (id: 28:2) — 480×53px — trigger (chevron ↓) + separator
- `State=Open` (id: 28:7) — 480×89px — trigger (chevron ↑) + panel + separator
- `State=Disabled` (id: 28:14) — 480×53px — same as Default at 50% opacity

### Component properties
- `Label` (TEXT, shared across all states) → linked to trigger Label text node
- `Show Icon` (BOOLEAN, default true) → linked to Chevron vector visibility
- `Content` (TEXT, Open variant only) → linked to Panel Content text node

### Token bindings (Semantic collection)
- Trigger Label fill → `content/primary` (VariableID:2:204)
- Chevron stroke → `content/secondary` (VariableID:2:205)
- Separator fill → `border/subtle` (VariableID:2:211)
- Panel Content fill → `content/secondary` (VariableID:2:205)
- Usage frame fill → `surface/primary` (VariableID:2:198)

### Chevron icon
- Uses real Remix Icon: `arrow-down-s-line 1` (COMPONENT id: 30:1234, key: 64a52153ef460b4829b5f7516d2383833db00529, on Page 1)
- Instances resized to 16×16px; Open state rotated 180° to point up
- Inner Vector fill bound to `content/secondary` (VariableID:2:205)
- Show Icon BOOLEAN property linked to instance visibility via key `Show Icon#28:8`
- Matches `RiArrowDownSLine` used in the React code (design-to-code alignment ✓)

### Key lessons
- `textAutoResize = 'HEIGHT'` must be set AFTER `frame.appendChild(textNode)` + `layoutSizingHorizontal = 'FILL'` to avoid text wrapping at 0-width creating excessively tall frames.
- Component properties must be added to variants BEFORE `combineAsVariants`.
- Disabled state: use 50% opacity on the component directly rather than separate color bindings.
- `combineAsVariants` can silently drop vector nodes from some variants — always verify node counts after combining.
- For cross-page component instances: get the component node BEFORE switching pages (Page 1 is the default at script start); `createInstance()` works from any page context.
