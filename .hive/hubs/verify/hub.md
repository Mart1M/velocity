# Verify Hub — Velocity Design System

## Purpose

Validate the composed blueprint and any generated artifacts against all constraints, accessibility requirements, technical feasibility, and design system consistency. Verify is the last gate before Deliver.

---

## Inputs (reads from state)

- `intent.constraints`
- `intent.success_criteria`
- `compose` (full object)
- `ground.tokens`
- `ground.rules`

---

## Output Contract (writes to state)

```json
{
  "verify": {
    "valid": true,
    "warnings": ["string"],
    "issues": ["string — each is a blocking problem"],
    "fixes": ["string — remediation actions for Remediation Agent"]
  }
}
```

---

## Agents

| Agent                    | Responsibility                                             |
|--------------------------|------------------------------------------------------------|
| `compliance-agent`       | Check constraints and success criteria are met             |
| `accessibility-agent`    | Verify WCAG 2.2 AA compliance, ARIA, keyboard nav          |
| `technical-feasibility`  | Confirm TypeScript validity and no dependency issues       |
| `consistency-agent`      | Check token usage and naming consistency with the system   |
| `remediation-agent`      | Produce fix instructions when `valid === false`            |

---

## Available Skills

- `check_token_usage`
- `validate_prop_types`
- `audit_accessibility`
- `lint_naming_conventions`

---

## Success Criteria for Hub Completion

- `verify.valid === true` OR remediation has been attempted 3 times (surface to user)
- All `intent.success_criteria` are addressed in verify results
- No blocking issues remain unaddressed

---

## Remediation Protocol

If `verify.valid === false`:
1. `remediation-agent` generates `verify.fixes`
2. Orchestrator applies fixes to `compose` blueprint
3. Verify hub re-runs (max 3 iterations)
4. On 3rd failure, halt and escalate to user
