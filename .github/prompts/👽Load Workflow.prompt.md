---
mode: agent
---

## Context Loading

Load project workflow configuration from:

- `.github/copilot-instructions.md`
- `context/workflow-jsonld.json`

## Operational Mode

Execute as coding agent per loaded instructions:

- Output: machine-readable code/config only
- No human explanations or setup instructions
- Comments: `TODO(agent)` and `ASSUMPTION(agent)` only
- Follow JSON-LD component references in `workflow-jsonld.json`

## JSON-LD Component Map

```jsonld
{
  "projectMetadata": "./context/project-metadata.jsonld",
  "codingPrinciples": "./context/coding-principles.jsonld",
  "projectPrinciples": "./context/project-principles.jsonld",
  "projectTools": "./context/project-tools.jsonld",
  "contentTools": "./context/gis-tools.jsonld",
  "maintenanceConfig": "./context/maintenance.jsonld"
}
```

## Behavior Constraints

- Ambiguous requests: minimal safe change
- Missing context: valid stub with `TODO(agent)` markers
- Preserve existing structure and naming conventions
- No placeholders without `TODO(agent)` annotation

## Success Criteria

- All output immediately processable by machines
- Full compliance with loaded JSON-LD schema
- Zero human-readable documentation artifacts
- Valid code/config with proper syntax
