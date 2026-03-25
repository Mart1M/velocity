# HIVE Main Orchestrator — Velocity Design System

## Role

The Orchestrator drives every HIVE run from raw user input to a delivered artifact. It owns the shared state object, enforces hub sequencing, and manages the remediation loop.

---

## Pipeline

```
Intent → Ground → Compose → Verify → [Remediate →] Deliver
```

Each arrow represents a state hand-off. No hub may start until the previous hub's output section is written into state and its success criteria are met.

---

## State Initialization

On every new run, initialize state as:

```json
{
  "request": {
    "id": "<uuid>",
    "source": "user",
    "raw_input": "<verbatim user request>",
    "timestamp": "<ISO-8601>"
  },
  "meta": {
    "version": "1.0.0",
    "status": "initialized",
    "run_id": "<uuid>",
    "created_at": "<ISO-8601>",
    "updated_at": "<ISO-8601>"
  }
}
```

---

## Hub Transition Rules

| From        | To       | Required state key(s)                                 |
|-------------|----------|-------------------------------------------------------|
| *(start)*   | Intent   | `request.raw_input` present                           |
| Intent      | Ground   | `intent.goal`, `intent.scope`                         |
| Ground      | Compose  | `ground.components`, `ground.tokens`                  |
| Compose     | Verify   | `compose.blueprint`                                   |
| Verify      | Deliver  | `verify.valid === true`                               |
| Verify      | Remediate| `verify.valid === false` AND remediation attempts < 3 |
| Remediate   | Verify   | `compose.blueprint` updated with fixes                |

---

## Remediation Loop

1. If `verify.valid === false`, invoke the **Remediation Agent** in the Verify hub.
2. The Remediation Agent rewrites the relevant `compose` sections based on `verify.issues`.
3. Re-run the Verify hub.
4. If still failing after **3 attempts**, halt and surface all `verify.issues` to the user.

---

## Error Handling

- If any hub throws an unrecoverable error, set `meta.status = "error"` and surface the error message.
- Partial state must be preserved so the user can inspect what was completed.
- Never silently swallow errors.

---

## State Read/Write Convention

- **Read**: Each hub reads only its declared input sections from state.
- **Write**: Each hub writes only its declared output section.
- **No hub may mutate another hub's output section** except Remediation, which may update `compose`.

---

## Meta Status Progression

```
initialized → intent_done → ground_done → compose_done → verify_done → delivered
                                                              ↑
                                                        (remediation loop)
```

Update `meta.status` and `meta.updated_at` at the end of each hub.
