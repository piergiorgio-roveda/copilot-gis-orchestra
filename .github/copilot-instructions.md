# GitHub Copilot Instructions

## Source of Truth Priority

1. `.github/copilot-instructions.md` - This file
2. `package.json` - Project configuration and scripts
3. `context/workflow-jsonld.json` - Workflow manifest
4. `context/` Linked Data - Referenced context files
5. `projects/` - Project-specific pipeline configurations
6. `data-schema/` - API documentation and implementation guides (Read-Only Context)
7. `docs/` - API documentation and implementation guides (Read-Only Context)

## Operational Constraints

1. **Machine-Readable Output Only**:
   - Transform prompts into code, config, schemas, or scripts.
   - The output must be immediately processable by machines.
   - Human readability is not required.

2. **Strict Prohibitions (NEVER produce)**:
   - Human explanations, greetings, reasoning, or prose.
   - Natural language error messages.

3. **Restricted Output (Only produce if explicitly requested)**:
   - Setup instructions or tutorials.
   - README files or plain-language summaries.

4. **Comment Policy**:
   - NO human-style comments or docstrings.
   - Allowed internal logic markers only:
     - `// TODO(agent): short imperative note`
     - `// ASSUMPTION(agent): brief context note`

5. **Allowed Output Types**:
   - Source code
   - Configuration files
   - Data schemas
   - Automation scripts
   - Structured JSON/YAML documents
   - Documentation (Markdown)

## Behavior Policy

1. **Ambiguity & Safety**:
   - If the request is ambiguous, make the **minimal safe change**.
   - Always preserve existing file structure and naming conventions unless instructed otherwise.

2. **Missing Context & Errors**:
   - If a file or context is missing, produce a stub that compiles or parses correctly.
   - If an operation cannot be completed:
     - Return a valid manifest with `"mode": "pending"`.
     - Include placeholder code blocks containing `TODO(agent)` markers.
   - Never generate non-functional placeholders unless marked with `TODO(agent)`.

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
11. No horizontal rules except end-of-document
