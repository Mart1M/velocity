---
name: velocity-figma-component
description: Create or update Velocity design system components in the Velocity Figma file using the Figma MCP and use_figma. Use when the user asks to design, generate, sync, or create a component for the Velocity design system in Figma.
---

# Velocity Figma Component

> **Start here:** [`figma-create-component`](../figma-create-component/SKILL.md) — full MCP workflow, tools, phases, and checklists.

This file adds **Velocity-specific constants** only.

## File & template

| Item | Value |
|------|-------|
| fileKey | `FuvsFLuBl3HjgR9Ql3iw2x` |
| URL | `https://www.figma.com/design/FuvsFLuBl3HjgR9Ql3iw2x/Velocity` |
| Component template | node `168:3` |
| Legacy destination | node `362:2` (Table page — prefer dedicated component pages) |

## Before writing

1. [`sync-tokens`](../sync-tokens/SKILL.md) — sync variables if tokens changed
2. [`figma-create-component`](../figma-create-component/SKILL.md) — MCP workflow
3. [`runswap-velocity`](../runswap-velocity/SKILL.md) — code tokens & conventions
4. `src/components/[Name]/[Name].tsx` + `*.stories.tsx`
5. `src/styles/tokens.css` for token names

## Velocity conventions

- Page per component: `Button`, `Inputs`, `Tabs`, `Chip`…
- Public name = code export; internals prefixed `_`
- Semantic variables from collection `Semantic` (Light/Dark modes)
- Documentation title font: **Stack Sans Headline Bold**; body: **Inter**
- No raw hex when `surface/*`, `content/*`, `border/*`, `accent/*`, `state/*`, `feedback/*` exist

## use_figma prompt suffix

```text
In file FuvsFLuBl3HjgR9Ql3iw2x, on page [ComponentName], create/update [ComponentName]
using template 168:3, Velocity semantic variables, auto layout throughout.
Decompose into _-prefixed internal components. Return all node IDs.
Validate with get_screenshot.
```
