# /hive-run

Run the full HIVE pipeline on a task. Executes all five hubs in sequence — Intent → Ground → Compose → Verify → Deliver — and produces a final artifact.

## Usage

```
/hive-run <task description>
/hive-run --from ground <task description>
/hive-run --only intent,ground <task description>
/hive-run --output code <task description>
```

## Arguments

- `<task description>` (required): The task or goal to run through the HIVE pipeline
- `--from <hub>` (optional): Start the pipeline from a specific hub (skips earlier hubs). Valid values: `intent`, `ground`, `compose`, `verify`, `deliver`
- `--only <hubs>` (optional): Run only the specified hubs, comma-separated
- `--output <format>` (optional): Force a specific Deliver output format. Options: `code`, `markdown`, `json`, `ticket`, `all`

---

## Orchestration Logic

You are the **Main Orchestrator**. Your role is to control flow and state transitions — not to perform business logic yourself. Follow this sequence precisely:

### Step 1: Initialize State

Create the shared state object:

```json
{
  "request": {
    "id": "<generate a short UUID>",
    "source": "hive-run",
    "raw_input": "<the full task description provided by the user>",
    "timestamp": "<ISO 8601 datetime>"
  },
  "intent": {},
  "ground": {},
  "compose": {},
  "verify": {},
  "deliver": {},
  "meta": {
    "version": "1.0.0",
    "status": "initialized",
    "run_id": "<same as request.id>",
    "created_at": "<ISO 8601 datetime>",
    "updated_at": "<ISO 8601 datetime>"
  }
}
```

If `.hive/hive.config.json` exists in the project, read it to load domain, governance settings, and truth sources.

---

### Step 2: Run Intent Hub

Invoke the Intent Hub. Write results to `state.intent`.

**Entry condition**: `state.request.raw_input` must be non-empty.

**Expected output in `state.intent`**:
```json
{
  "goal": "...",
  "domain": "...",
  "constraints": [],
  "success_criteria": [],
  "scope": "..."
}
```

Update `state.meta.status` to `"intent_done"`.

If the intent cannot be resolved (ambiguous, contradictory, missing critical info), ask the user a single clarifying question and wait for input before proceeding.

---

### Step 3: Run Ground Hub

Invoke the Ground Hub. Write results to `state.ground`.

**Entry condition**: `state.intent` must contain a resolved `goal` and `domain`.

**Expected output in `state.ground`**:
```json
{
  "patterns": [],
  "components": [],
  "tokens": {},
  "rules": {},
  "docs": [],
  "examples": []
}
```

Read grounding sources from `.hive/hubs/ground/agents/` and `.hive/skills/registry.json` if present. If the project has documented components, patterns, or tokens, use them. If not, use general best practices for the domain.

Update `state.meta.status` to `"ground_done"`.

---

### Step 4: Run Compose Hub

Invoke the Compose Hub. Write results to `state.compose`.

**Entry condition**: `state.ground` must be non-empty.

**Expected output in `state.compose`**:
```json
{
  "blueprint": {},
  "layout": {},
  "components": [],
  "interactions": [],
  "state_map": {}
}
```

The composition must be grounded — every component, pattern, and token used must have been identified in `state.ground`. Do not introduce elements that were not grounded.

Update `state.meta.status` to `"compose_done"`.

---

### Step 5: Run Verify Hub

Invoke the Verify Hub. Write results to `state.verify`.

**Entry condition**: `state.compose` must contain a non-empty `blueprint`.

**Expected output in `state.verify`**:
```json
{
  "valid": true|false,
  "warnings": [],
  "issues": [],
  "fixes": []
}
```

Verify must check at minimum:
- Compliance with domain rules from `state.ground.rules`
- Accessibility requirements
- Technical feasibility
- Internal consistency of the composition

**Remediation loop**:
- If `state.verify.valid = false` AND `state.verify.fixes` is non-empty:
  - Run the Remediation Agent: apply each fix from `state.verify.fixes` to `state.compose`
  - Re-run Verify
  - If still `valid = false` after remediation, surface the issues to the user and halt (do not deliver)
- If `state.verify.valid = false` AND `state.verify.fixes` is empty:
  - Surface the issues to the user and halt

Update `state.meta.status` to `"verify_done"`.

---

### Step 6: Run Deliver Hub

**Entry condition**: `state.verify.valid` must be `true`.

Invoke the Deliver Hub. Write results to `state.deliver`.

Determine the output format from:
1. The `--output` argument if provided
2. `hive.config.json` `output_formats` if present
3. Default: produce `markdown` documentation + `json` blueprint

**Expected output in `state.deliver`**:
```json
{
  "artifacts": [],
  "format": "...",
  "output": {}
}
```

Update `state.meta.status` to `"delivered"`.

---

### Step 7: Present Results

After delivery, present the final output to the user. Include:
- The primary artifact(s) from `state.deliver.output`
- Any warnings from `state.verify.warnings` (non-blocking issues the user should know about)
- A brief summary: what was produced, which hubs ran, what decisions were made

Display `state.meta.status: "delivered"`.

---

## Orchestrator Rules

1. **Stay thin**: The orchestrator controls flow and state. It does not perform hub-level reasoning itself.
2. **Never skip Verify**: Even if the composition looks correct, the Verify Hub must always run.
3. **Never deliver if Verify failed**: Do not proceed to Deliver if `state.verify.valid = false`.
4. **Trace each transition**: Log when each hub starts and completes, and what it wrote to state.
5. **Read `.hive/` configuration if present**: Respect governance settings in `hive.config.json`.
6. **One task per run**: Each `/hive-run` invocation handles one task. For multiple tasks, invoke `/hive-run` multiple times.

---

## Example Run

```
/hive-run Create a checkout page with cart summary, payment form, and order confirmation
```

Expected flow:
1. State initialized with `raw_input: "Create a checkout page..."`
2. Intent Hub → `goal: "checkout page"`, `constraints: ["responsive", "accessible"]`, `success_criteria: ["DS compliant", "form validation"]`
3. Ground Hub → relevant components (Button, Input, Card, Modal), layout patterns (two-column checkout), tokens (spacing, color), accessibility rules
4. Compose Hub → blueprint with header, cart summary section, payment form section, CTA button, confirmation modal; component tree
5. Verify Hub → `valid: true`, `warnings: ["Consider lazy-loading order confirmation modal"]`
6. Deliver Hub → code scaffold + markdown specification
7. Output presented to user

---

## Error Handling

- If any hub fails to produce output, halt the pipeline and report which hub failed and why
- If state becomes inconsistent, do not continue — surface the inconsistency to the user
- If `.hive/` is missing, run with HIVE defaults (no domain-specific knowledge), but warn the user to run `/hive-init` first for best results
