---
name: fix-component
description: Sync a Velocity component between Figma and code. Use this skill whenever the user wants to align a component with its Figma design or vice versa — "fix the Button", "sync with Figma", "align Figma and code", "update component from Figma", "Figma changed, update the code", "push my code changes to Figma". Trigger for any bidirectional Figma↔Code sync request, even if the user just says "fix" with a component name.
---

# Fix / Sync a Velocity Component

This skill aligns a Velocity component between its **Figma design spec** and its **TypeScript implementation**.

It works in both directions:
- **Figma → Code** — Figma changed; bring the code up to date
- **Code → Figma** — Code changed; push the updates back to Figma

---

## Step 1 — Identify component and direction

From the user's message, determine:
1. **Which component?** (e.g. "Button", "Table", "Tabs")
2. **Which direction?** — infer from context:
   - "I updated Figma / Figma changed" → Figma → Code
   - "I updated the code / push to Figma" → Code → Figma
   - Ambiguous → ask: *"Should I update the code to match Figma, or push code changes to Figma?"*

---

## Step 2 — Read both sides (always do both in parallel)

**Code side:**
- Read `src/components/<Name>/<Name>.tsx`
- Read `src/components/<Name>/<Name>.stories.tsx`
- Note: current props, variants, all Tailwind classes used, tokens referenced

**Figma side:**
- Call `figma_search_components` with the component name
- If found, call `figma_get_component_for_development_deep` on the best match
- Also call `figma_get_token_values` and `figma_get_variables` to understand the token/variable mapping

If Figma returns nothing, ask the user to select the component in Figma or provide the node ID, then call `figma_get_selection`.

Build a clear mental diff of the two sides before making any change.

---

## Step 3A — Figma → Code

Compare Figma spec to code and fix each difference:

| What to check | How to update |
|---|---|
| Token mismatch (e.g. Figma uses `surface/secondary`, code uses `surface/primary`) | Update the Tailwind class to the correct semantic token |
| Missing variant in code (e.g. Figma has a `pill` size) | Add the variant to the type, style map, and stories |
| Missing state in code (e.g. Figma defines an `error` state) | Add the `data-[...]` Tailwind rule |
| Sizing difference (padding, radius, height) | Update the size class map |
| Icon/slot change | Update the sub-component or slot |

**Rules:**
- Change only what actually differs — don't reformat or restructure unrelated code
- Preserve all existing patterns: `forwardRef`, `.displayName`, style map records, class array `.filter(Boolean).join(' ')`
- Never remove existing public props or variants — only add or update
- If Figma is ambiguous (a value that could map to two tokens), surface it and ask before picking

After changes:
1. `npx tsc --noEmit` — fix all errors
2. Update stories if new variants/states were added

---

## Step 3B — Code → Figma

Identify what changed in the code and reflect it in Figma:

- **Token/color changes** → call `figma_batch_update_variables` to update the matching Figma variables, or `figma_set_fills` on specific nodes
- **New variants** → use `figma_get_component` to find the component set, then add/update variant properties
- **Removed or renamed props** → update Figma component properties accordingly

Always call `figma_get_variables` first to understand the existing Figma variable structure before writing anything.

---

## Step 4 — Report the diff

Always end with a structured summary:

```
## Sync summary — <ComponentName> (<direction>)

### Changed
- [what changed and why, referencing token names or prop names]

### Unchanged
- [what already matched and was left alone]

### Not synced / needs follow-up
- [ambiguities left open, things outside scope, manual Figma work needed]
```

Keep it factual and actionable. If the user needs to do something in Figma manually, say so explicitly.

---

## Guardrails

- **Never change the public API** (prop names/types) unless the user explicitly asked
- **Never delete existing variants or props** — only add or update
- **Never reformat unrelated code** — surgical edits only
- If `figma_search_components` returns no match, stop and ask the user to either select the component in Figma or provide the node ID — don't guess
- If there's a conflict between Figma and code that isn't covered by the stated direction, surface it rather than silently picking one side
