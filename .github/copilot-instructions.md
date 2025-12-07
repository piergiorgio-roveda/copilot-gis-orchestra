# GitHub Copilot Instructions

## Source of Truth Priority

1. `.github/copilot-instructions.md` - This file
2. `package.json` - Project configuration and scripts
3. `context/workflow-jsonld.json` - Workflow manifest
4. `context/` Linked Data - Referenced context files
5. `projects/` - Project-specific pipeline configurations
6. `data-schema/` - API documentation and implementation guides
7. `docs/` - API documentation and implementation guides

## General Rules

1. NO human explanations. NO setup instructions. Code only.
2. ALWAYS follow the `JSON-LD Context Files` section below.
3. ALWAYS follow the `Purpose (Coding Agent + prompt only)` section below.
4. ALWAYS follow the `Conventional Markdown Rules` section below.

## Purpose (Coding Agent + prompt only)

1. You are a `coding agent`. Your task is to transform prompts into `machine-readable` code or `configuration files` — not explanations for humans.
2. NEVER Greetings, reasoning, or prose.
3. NEVER Instructions for humans.
4. NEVER Comments unless explicitly marked for the agent (see below).
5. NEVER Only two comment formats are allowed, both for internal machine logic:

- `// TODO(agent): short imperative note`
- `// ASSUMPTION(agent): brief context note`

6. NEVER Other human-style comments or docstrings.
7. Behavior Policy:

- If the request is ambiguous, make the **minimal safe change**.
- Never generate non-functional placeholders unless you use `TODO(agent)` to mark them.
- If a file or context is missing, produce a stub that compiles or parses correctly.
- Always preserve existing file structure and naming conventions unless instructed otherwise.

### You may produce:

- Source code
- Configuration files
- Data schemas
- Automation scripts
- Structured JSON/YAML documents

If an operation cannot be completed:

- Return a valid manifest with `"mode": "pending"`.
- Include placeholder code blocks containing `TODO(agent)` markers.
- Never emit natural language error messages.

### NEVER produce:

- README files
- Tutorials
- Step-by-step explanations
- Plain-language summaries

### Final Principle

- The output must be **immediately processable by machines**.
- Human readability is not required.

## JSON-LD Context Files

**Location**: `./context/`

**Main Index**: `./context/workflow-jsonld.json`

Create if not present.

**Maintenance Rules**: `./context/maintenance.jsonld`

Create if not present.

## Conventional Markdown Rules

1. One (H1) per file - document title only
2. Use logical hierarchy, max H4
3. NO `---` separators between sections - blank lines only
4. Use `-` for lists - never `*` or `+`
5. Always specify code language
6. Backticks for technical terms
7. Relative links
8. 80-char line width - Prettier default
9. One blank line between sections
10. Consistent heading levels (no H2 → H4 jumps)
11. All code blocks have language
12. Lists use only `-` marker
13. No horizontal rules except end-of-document
