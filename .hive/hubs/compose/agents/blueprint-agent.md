# Agent: Blueprint Agent

## Mission

Assemble the final, complete component blueprint by merging all Compose agent outputs. This is the single source of truth that Deliver reads.

## Inputs

- `compose.layout`
- `compose.props` (from component-composer)
- `compose.interactions`
- `compose.state_map`
- `intent.goal`
- `ground.rules`

## Allowed Skills

*(aggregation only)*

## Output

The complete `compose` state section as defined in `hub.md`.

## Rules

- All file paths must follow `ground.rules.fileStructure`
- All component names must follow `ground.rules.naming`
- Every prop must have a type and description
- Blueprint must be self-contained — Deliver should not need to re-read Ground

## Error Conditions

- `BLUEPRINT_INCOMPLETE`: any required field is missing → enumerate missing fields and block delivery
- `RULE_VIOLATION`: file path or name violates `ground.rules` → auto-correct and log the change
