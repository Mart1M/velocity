# Hub Handoff Rules — Velocity Design System

Defines what must be present in state before each hub begins, and what each hub guarantees on exit.

---

## Intent Hub

**Pre-conditions (must be true before Intent runs):**
- `request.raw_input` is a non-empty string

**Post-conditions (guaranteed on Intent exit):**
- `intent.goal` — non-empty string
- `intent.scope` — one of: `component`, `pattern`, `token`, `documentation`, `refactor`
- `intent.constraints` — array (may be empty)
- `intent.success_criteria` — array with at least one entry
- `meta.status` = `"intent_done"`

---

## Ground Hub

**Pre-conditions:**
- All Intent post-conditions met
- `meta.status === "intent_done"`

**Post-conditions:**
- `ground.components` — array (may be empty if scope is `token`)
- `ground.tokens.color` — non-empty object
- `ground.tokens.spacing` — non-empty object
- `ground.rules.naming` — non-empty string
- `ground.rules.fileStructure` — non-empty string
- `meta.status` = `"ground_done"`

---

## Compose Hub

**Pre-conditions:**
- All Ground post-conditions met
- `meta.status === "ground_done"`
- `ground.governance.blocked` is empty (or user has explicitly approved)

**Post-conditions:**
- `compose.blueprint.componentName` — non-empty string
- `compose.blueprint.filePaths.component` — valid path string
- `compose.blueprint.filePaths.stories` — valid path string
- `compose.blueprint.props` — array with at least one entry
- `compose.layout.baseUIPrimitive` — string or null (null only if no primitive exists)
- `meta.status` = `"compose_done"`

---

## Verify Hub

**Pre-conditions:**
- All Compose post-conditions met
- `meta.status === "compose_done"`

**Post-conditions:**
- `verify.valid` — boolean (required)
- `verify.issues` — array (empty if valid)
- `verify.warnings` — array (may be populated even if valid)
- If `verify.valid === false`: `verify.fixes` — array with one entry per issue
- `meta.status` = `"verify_done"` (only if valid) OR `meta.status` = `"compose_done"` (if remediation needed)

---

## Deliver Hub

**Pre-conditions:**
- `verify.valid === true`
- `meta.status === "verify_done"`

**Post-conditions:**
- All `compose.blueprint.filePaths` exist on disk
- `deliver.artifacts` lists all written files
- `src/index.ts` updated with new export
- `meta.status` = `"delivered"`

---

## Remediation Loop

- Triggered when: `verify.valid === false`
- Maximum iterations: 3
- On max exceeded: halt, set `meta.status = "error"`, surface all `verify.issues` to user
- Remediation modifies `compose` only — it may not modify `ground` or `intent`
