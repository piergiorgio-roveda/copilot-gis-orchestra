# Copilot GIS Orchestra: Machine-First GIS Development Framework

## Executive Summary

Copilot GIS Orchestra is a Node.js-based knowledge repository and
development framework for Geographic Information Systems (GIS), urban
planning, and AI-driven geospatial applications. The project implements
a novel "agent-first" architecture where JSON-LD structured data serves
as the single source of truth, enabling machine-readable code generation
and automated maintenance workflows.

**GitHub Repository**: https://github.com/piergiorgio-roveda/copilot-gis-orchestra

## Project Architecture

### Core Technology Stack

- **Runtime Platform**: Node.js >= 18.0.0
- **Language**: JavaScript (ES Modules)
- **Database**: PostgreSQL with PostGIS extension
- **GIS Tools**: QGIS 3.38+ with OGR2OGR utilities
- **Development**: ESLint 9.0, Prettier 3.0
- **Version Control**: Git (GitHub)

### Project Structure

```
copilot-gis-orchestra/
├── context/                    # JSON-LD source of truth
│   ├── workflow-jsonld.json    # Main workflow manifest
│   ├── coding-principles.jsonld
│   ├── project-principles.jsonld
│   ├── project-metadata.jsonld
│   ├── gis-tools.jsonld
│   ├── project-tools.jsonld
│   └── maintenance.jsonld
├── src/                        # Application source code
├── scripts/                    # Automation scripts
├── .github/                    # GitHub Copilot instructions
└── package.json               # Node.js project configuration
```

## JSON-LD as Source of Truth

### Architectural Philosophy

The project's distinguishing characteristic is its use of JSON-LD
(JavaScript Object Notation for Linked Data) as the authoritative
source of truth. This approach enables:

1. **Machine Readability**: All project configuration, tooling, and
   workflows are defined in structured, parseable formats
2. **Schema.org Compliance**: Leverages standardized vocabularies for
   consistent semantic meaning
3. **Agent-First Development**: GitHub Copilot and other AI agents can
   directly interpret project structure without human documentation

### Key JSON-LD Components

#### Workflow Manifest (`workflow-jsonld.json`)

Defines the project's operational context:

- Primary language and software requirements
- Project type and domain classification
- Component relationships and dependencies
- Workflow phases and status tracking
- Initialization and development lifecycle

```json
{
  "@type": "WorkflowManifest",
  "mode": "active",
  "primaryLanguage": "JavaScript",
  "softwareRequirements": "Node.js",
  "projectType": "content-management-system",
  "domain": "geospatial-urban-planning"
}
```

#### Coding Principles (`coding-principles.jsonld`)

Enforces seven core development principles using Schema.org
DefinedTermSet:

- **CODE_ONLY**: No human explanations, code-only output
- **AGENT_FIRST**: Documentation through machine-readable metadata
- **DRY**: Don't Repeat Yourself
- **SRP**: Single Responsibility Principle
- **SOC**: Separation of Concerns
- **COC**: Convention over Configuration
- **SECURITY_FIRST**: Environment variables for credentials, no
  hardcoded secrets

#### Project Principles (`project-principles.jsonld`)

Stack-specific guidelines organized into categories:

1. **Runtime & Stack**: Node.js native, minimal dependencies, async
   clarity
2. **Architecture**: Utility function purity, clear script organization
3. **Data Management**: Content immutability, Schema.org compliance
4. **Security**: Environment-based configuration, automated scanning

#### GIS Tools (`gis-tools.jsonld`)

Comprehensive tooling definition for geospatial operations:

- PostgreSQL/PostGIS integration
- QGIS and OGR2OGR configuration
- Vector data conversion workflows
- Spatial query execution
- Import/export automation

Each tool is defined as a Schema.org Action with:

- `@type`: Action classification
- `identifier`: Unique tool reference
- `target`: Execution entry points
- `instrument`: Required software
- `result`: Expected outputs
- `example`: Practical usage patterns

## Development Principles

### Agent-First Code Generation

The project enforces strict rules for machine-generated code:

**Allowed**:
- Source code and configuration files
- Data schemas and automation scripts
- Structured JSON/YAML documents
- Two comment types:
  - `// TODO(agent): short imperative note`
  - `// ASSUMPTION(agent): brief context note`

**Prohibited**:
- Human explanations or tutorials
- Setup instructions
- README files (except project overview)
- Natural language error messages

### Error Handling Strategy

When operations cannot be completed:

1. Return valid manifest with `"mode": "pending"`
2. Include placeholder code blocks with `TODO(agent)` markers
3. Never emit natural language errors
4. Ensure output is immediately processable by machines

### Node.js First Philosophy

All automation must be Node.js native. The project avoids:

- Platform-specific script directories (`scripts_ps/`, `scripts_py/`)
- Build tools or transpilation
- Framework bloat

Exception: Platform-specific scripts only when Node.js fundamentally
cannot accomplish the task.

## GIS Integration

### PostgreSQL/PostGIS Stack

The project leverages PostgreSQL with PostGIS for spatial data
management:

**Capabilities**:
- Spatial data types (geometry, geography)
- Spatial indexing (GiST, SP-GiST)
- Coordinate transformations
- Raster data support
- Topology management
- Vector tile generation

**VS Code Integration**:
- Extension: `ms-ossdata.vscode-pgsql`
- Database connection management
- SQL query execution with IntelliSense
- Spatial data visualization
- Export to CSV, JSON, Excel formats

### OGR2OGR Integration

OGR2OGR (part of QGIS/GDAL) provides vector data conversion:

**Key Operations**:
- Format conversion (Shapefile, GeoJSON, KML, etc.)
- Coordinate system transformation
- Spatial filtering and clipping
- Direct PostGIS import/export
- Batch processing

**Node.js Integration Pattern**:

OGR2OGR is executed from Node.js using the child_process module's spawn
function. The process requires environment variables GDAL_DATA and
PROJ_LIB to be set, pointing to QGIS installation directories for
coordinate system definitions and projection libraries. Arguments are
passed as an array to specify input/output formats, file paths, and
transformation parameters.

**Common Use Cases**:

1. **Shapefile to GeoJSON**:
   ```bash
   ogr2ogr -f GeoJSON output.geojson input.shp
   ```

2. **Import to PostGIS**:
   ```bash
   ogr2ogr -f PostgreSQL PG:"dbname=mydb" input.shp -nln table_name
   ```

3. **Transform CRS**:
   ```bash
   ogr2ogr -t_srs EPSG:4326 -s_srs EPSG:3857 output.shp input.shp
   ```

## Quality Assurance

### Automated Validation

The project implements a comprehensive validation pipeline via
`npm run validate`:

1. **Code Formatting** (`prettier --check .`)
   - 80-character line width
   - Consistent code style
   - Markdown formatting rules

2. **Code Quality** (`eslint .`)
   - ES2022 syntax validation
   - Node.js globals
   - Prefer const, no var
   - Unused variable detection

3. **Security Scanning** (`security-check.js`)
   - Hardcoded credential detection
   - API key exposure scanning
   - Database connection string validation
   - Private key detection
   - AWS credential checks

### Security Patterns

**Secret Detection Patterns**:
- `password|passwd|pwd = "..."`
- `api_key|apikey = "..."`
- `secret|token = "..."`
- Database connection strings
- Private key headers
- AWS credentials

**Exclusions**:
- `node_modules/`, `.git/`, `dist/`, `build/`
- `.gitkeep`, `package-lock.json`
- Security check script itself

### Environment Configuration

Credentials managed via `.env` file (template in `.env.example`):

```bash
OPENAI_API_KEY=YOUR-API-KEY-HERE
DB_HOST=localhost
DB_PORT=5432
DB_NAME=YOUR-DATABASE-NAME
DB_USER=YOUR-USERNAME-HERE
DB_PASSWORD=YOUR-PASSWORD-HERE
PGSQL_CONNECTION_STRING=postgresql://${DB_USER}:${DB_PASSWORD}@...

QGIS_DIR=C:\Program Files\QGIS 3.38.3
OGR2OGR_PATH=${QGIS_DIR}\bin\ogr2ogr.exe
GDAL_DATA=${QGIS_DIR}\share\gdal
PROJ_LIB=${QGIS_DIR}\share\proj
```

## Maintenance Configuration

The `maintenance.jsonld` file defines operational rules:

### Code Generation Mode

```json
{
  "codeGeneration": {
    "mode": "machine-readable-only",
    "allowedComments": ["TODO(agent)", "ASSUMPTION(agent)"],
    "prohibitedOutput": ["explanations", "tutorials", "setup-instructions"],
    "targetRuntime": "nodejs"
  }
}
```

### File Structure Policy

```json
{
  "fileStructure": {
    "preserveExisting": true,
    "contextDirectory": "./context",
    "sourceDirectory": "./src",
    "buildDirectory": "./build",
    "sourceOfTruth": "json-ld"
  }
}
```

### Quality Assurance

```json
{
  "qualityAssurance": {
    "codeStyle": "eslint",
    "formatting": "prettier",
    "testing": "automated",
    "security": "vulnerability-scan"
  }
}
```

### Markdown Conventions

```json
{
  "markdown": {
    "maxHeadingLevel": 4,
    "listMarker": "-",
    "lineWidth": 80,
    "codeBlocks": "always-specify-language"
  }
}
```

### Automation Schedules

```json
{
  "automation": {
    "schedules": {
      "dependencyUpdates": "weekly",
      "securityScans": "daily",
      "codeQuality": "on-commit"
    }
  }
}
```

## Initialization Process

The project includes a comprehensive initialization checklist in
`initialization.jsonld` with 23 completed tasks:

### Foundation Tasks (init-001 to init-017)

1. Project folder and naming selection
2. VSCode workspace configuration
3. README.md creation
4. GitHub Copilot instructions setup
5. JSON-LD context file initialization
6. Workflow configuration
7. Programming language definition
8. Maintenance rules creation
9. Coding principles validation
10. Project principles adaptation
11. Metadata configuration
12. GIS tools setup
13. Project tools definition
14. Git repository initialization with security checks

### Blocking Issue Resolution (blocking-001 to blocking-006)

1. Directory structure creation
2. Build entry point implementation
3. Theme detection implementation
4. Development dependencies installation
5. GIS tools implementation
6. Environment template creation

### Adaptation Tasks (adaptation-006)

1. VSCode tasks configuration for quality checks

### Project Readiness

```json
{
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "blocking_issues_resolved",
      "value": "true"
    },
    {
      "@type": "PropertyValue",
      "name": "project_readiness",
      "value": "ready"
    }
  ]
}
```

## VS Code Integration

### Tasks Configuration

The project provides predefined tasks for common operations:

1. **Security Check**: `npm run security:check`
2. **Lint**: `npm run lint`
3. **Format**: `npm run format`
4. **Format Check**: `npm run format:check`
5. **Validate**: `npm run validate` (default test task)

### Extension Requirements

- **PostgreSQL for VS Code** (`ms-ossdata.vscode-pgsql`): Database
  management
- **Project Manager** (`alefragnani.project-manager`): Workspace
  organization

## Use Cases and Applications

### Primary Applications

1. **GIS Knowledge Repository**: Structured storage of geospatial
   methodologies
2. **Urban Planning Analysis**: Data-driven city planning workflows
3. **AI-Driven Geospatial Processing**: Machine learning integration
   with spatial data
4. **Content Management**: Automated article generation and publishing
5. **Spatial Data Pipeline**: ETL workflows for geographic datasets

### Example Workflows

#### 1. Import Shapefile to PostGIS

The import process spawns an OGR2OGR child process with PostgreSQL as
the output format. Arguments specify the database connection string,
input shapefile path, target table name, geometry column name, and
spatial index type (GIST). Environment variables are set to enable
GDAL and PROJ library access for coordinate system handling.

#### 2. Export PostGIS Query to GeoJSON

The export operation executes OGR2OGR with GeoJSON format, PostgreSQL
database connection, and an SQL query to filter cities by population.
The result is a GeoJSON file containing only cities with population
exceeding 100,000.

#### 3. Security Validation

The security check script scans the entire codebase for:
- Hardcoded passwords
- API keys in source
- Database credentials
- Private keys
- AWS secrets

## Design Patterns

### Separation of Concerns

1. **Context Layer** (`./context/`): JSON-LD definitions and schemas
2. **Source Layer** (`./src/`): Application logic
3. **Scripts Layer** (`./scripts/`): Automation and tooling
4. **Configuration Layer**: Environment variables and settings

### Convention over Configuration

- ES module usage via `package.json` `"type": "module"`
- Default directories for build, source, context
- Standardized npm scripts naming
- Consistent file extension conventions

### Security First

- `.env` for all credentials
- `.env.example` as template
- Automated secret scanning
- No credentials in commits
- Pre-push security validation

## Project Metadata

### Repository Information

- **Name**: copilot-gis-orchestra
- **Owner**: piergiorgio-roveda
- **Repository**: https://github.com/piergiorgio-roveda/cp-copilot-gis-orchestra
- **License**: ISC
- **Version**: 1.0.0
- **Node.js Requirement**: >= 18.0.0

### Dependencies

**Runtime**:
- `dotenv`: ^16.0.0 (environment variable management)
- `pg`: ^8.11.0 (PostgreSQL client)

**Development**:
- `@eslint/js`: ^9.0.0
- `eslint`: ^9.0.0
- `eslint-config-prettier`: ^9.0.0
- `eslint-plugin-prettier`: ^5.0.0
- `globals`: ^15.0.0
- `prettier`: ^3.0.0

## Future Directions

### Planned Enhancements

Based on the JSON-LD structure and initialization checklist:

1. **Build System**: Content transformation pipeline from `content/` to
   `dist-prod/`
2. **Theme Detection**: Dynamic UI theme selection
3. **Article Generation**: Automated GIS content creation
4. **Spatial Analytics**: Advanced PostGIS query automation
5. **Raster Processing**: GeoTIFF and satellite imagery workflows
6. **API Integration**: External geospatial service connections

### Extensibility

The JSON-LD architecture enables:

- Dynamic tool addition via `gis-tools.jsonld`
- Custom workflow phases in `workflow-jsonld.json`
- Principle extension in principle files
- Action-based automation patterns

## Conclusion

Copilot GIS Orchestra represents a paradigm shift in GIS development
by treating machine-readable metadata as the primary documentation
format. This approach enables:

1. **Reduced Documentation Burden**: JSON-LD replaces human-written docs
2. **Automated Code Generation**: AI agents generate code from schemas
3. **Consistent Development**: Enforced principles and conventions
4. **Security by Design**: Automated credential scanning
5. **Geospatial Integration**: Native PostGIS and QGIS support

The project demonstrates that complex GIS workflows can be managed
through structured data definitions, enabling both human developers
and AI agents to collaborate effectively on geospatial applications.

## Technical Specifications Summary

| Aspect | Specification |
|--------|--------------|
| Runtime | Node.js >= 18.0.0 |
| Language | JavaScript (ES Modules) |
| Database | PostgreSQL + PostGIS 3.0+ |
| GIS Tools | QGIS 3.38+, OGR2OGR |
| Code Quality | ESLint 9.0, Prettier 3.0 |
| Architecture | JSON-LD source of truth |
| Security | Automated secret scanning |
| Documentation | Machine-readable metadata |
| Version Control | Git (GitHub) |
| Development Model | Agent-first, code-only |
| License | ISC |
| Project Status | Ready (initialization complete) |

## References

- **JSON-LD Specification**: https://json-ld.org/
- **Schema.org**: https://schema.org/
- **PostGIS**: https://postgis.net/
- **QGIS**: https://qgis.org/
- **Node.js**: https://nodejs.org/
- **PostgreSQL**: https://www.postgresql.org/
