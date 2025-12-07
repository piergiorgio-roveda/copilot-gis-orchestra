---
agent: agent
---

## Context Loading

Load project workflow configuration from:

- `.github/copilot-instructions.md`
- `context/workflow-jsonld.json`

## Operational Mode

- Follow JSON-LD component references in `workflow-jsonld.json`

## JSON-LD Component Map

```jsonld
{
  "workflow": "./context/workflow-jsonld.json",
  "projectMetadata": "./context/project-metadata.jsonld",
  "codingPrinciples": "./context/coding-principles.jsonld",
  "projectPrinciples": "./context/project-principles.jsonld",
  "projectTools": "./context/project-tools.jsonld",
  "appTools": "./context/app-tools.jsonld",
  "maintenanceConfig": "./context/maintenance.jsonld"
}
```

## Success Criteria

- Full compliance with loaded JSON-LD schema
