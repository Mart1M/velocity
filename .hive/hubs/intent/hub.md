# Intent Hub — Velocity Design System

## Purpose

Translate a raw user request into a structured, unambiguous intent that downstream hubs can act on without guessing. For the design system domain, this means identifying *what component or pattern* the user wants, *why*, and *what done looks like*.

---

## Inputs (reads from state)

- `request.raw_input`
- `request.source`

---

## Output Contract (writes to state)

```json
{
  "intent": {
    "goal": "string — one-sentence description of the primary outcome",
    "domain": "design-system",
    "scope": "component | pattern | token | documentation | refactor",
    "constraints": ["array of hard constraints, e.g. 'must use Base UI', 'no new dependencies'"],
    "success_criteria": ["array of measurable done conditions"]
  }
}
```

---

## Agents

| Agent                  | Responsibility                                             |
|------------------------|------------------------------------------------------------|
| `goal-interpreter`     | Extract the primary goal from raw input                    |
| `scope-clarifier`      | Determine if scope is a component, pattern, token, or docs |
| `constraint-extractor` | Identify hard limits (API, tokens, accessibility, etc.)    |
| `success-criteria`     | Define what "done" looks like for this request             |

---

## Available Skills

- `parse_natural_language_request`
- `detect_component_references`
- `map_scope_to_domain`

---

## Success Criteria for Hub Completion

- `intent.goal` is a non-empty string
- `intent.scope` is one of the allowed enum values
- `intent.success_criteria` has at least one entry
- No ambiguity that would cause Ground to fetch irrelevant context
