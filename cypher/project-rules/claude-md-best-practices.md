# CLAUDE.md Best Practices

Version: 1.0.0
Updated: 2025-01-19

## Core Concept

CLAUDE.md = project context file that Claude Code automatically loads. Provides AI with project-specific instructions, structure, and guidelines.

## File Placement Strategy

### Location Hierarchy (precedence order)
1. **Project**: `./CLAUDE.md` (recommended - version in git)
2. **Local**: `./CLAUDE.local.md` (gitignored for personal settings)
3. **Monorepo**: `./subproject/CLAUDE.md` (inherits from parent)
4. **Global**: `~/.claude/CLAUDE.md` (applies to all sessions)

### Best Practice
- Use project-level CLAUDE.md for team-shared context
- Use CLAUDE.local.md for personal preferences
- Commit CLAUDE.md to git for consistency

## Import System

### Syntax
```markdown
@path/to/file.md
@README.md
@docs/architecture.md
@package.json
```

### Import Rules
- Maximum 5 levels of depth
- Supports relative and absolute paths
- Not evaluated inside code blocks
- Processes recursively

### Modular Organization
```markdown
# Main CLAUDE.md (concise)
## Project Context
@docs/project-overview.md

## Development Standards
@docs/coding-standards.md

## Commands
@docs/commands.md
```

## Required Structure

### 1. Tech Stack Declaration
```markdown
## Tech Stack
- Node.js 20+
- TypeScript 5.3
- Framework: [specific version]
```

### 2. Quick Commands
```markdown
## Commands
- `npm run build` - Build project
- `npm run test` - Run tests
- `npm run dev` - Development server
```

### 3. Code Standards
```markdown
## Code Style
- Use ES modules (import/export)
- 2-space indentation
- Prefer destructuring imports
```

### 4. Project Structure
```markdown
## Structure
- src/components - Reusable UI elements
- src/lib - Core business logic
- docs/ - Documentation
```

## Content Guidelines

### DO
- Be specific: "Use 2-space indentation" not "Format properly"
- Use bullet points for individual instructions
- Group related instructions under headings
- Keep main file concise (use imports for detail)
- Update regularly to maintain relevance

### DON'T
- Add extensive content without iteration
- Use vague instructions
- Duplicate information across files
- Ignore file size - Claude loads this with every request

## Integration Commands

### Built-in Commands
```bash
/memory          # View loaded memory files
/init            # Auto-generate CLAUDE.md
# [instruction]  # Add content to CLAUDE.md dynamically
```

### Usage Pattern
1. Start session: Claude loads CLAUDE.md automatically
2. During work: Use `#` to add instructions
3. End session: Commit CLAUDE.md updates

## Example Templates

### Minimal Template
```markdown
# [Project Name]

## Tech Stack
@docs/tech-stack.md

## Commands
@docs/commands.md

## Code Style
@docs/coding-standards.md
```

### Comprehensive Template
```markdown
# [Project Name]

## Project Context
@README.md

## Tech Stack
- Language: [version]
- Framework: [version]
- Key dependencies: [list]

## Quick Commands
- `command` - Description

## Code Standards
- Formatting rules
- Naming conventions
- Architecture patterns

## Project Structure
@docs/structure.md

## Workflow
@docs/workflow.md

## Specific Guidelines
@docs/guidelines.md
```

## Cypher Integration

### Recommended Structure for Cypher
```markdown
# Cypher Framework - AI Orchestrator

## Identity & Purpose
@GEMINI.md

## Project Rules
@cypher/project-rules/README.md

## Collaboration Protocols  
@cypher/project-rules/gemini-collaboration-protocol.md

## Documentation Standards
@cypher/project-rules/ai-documentation-standards.md

## Git Workflow
@cypher/project-rules/git-workflow.md
```

## Maintenance Protocol

### Regular Tasks
- Review monthly for relevance
- Remove outdated instructions
- Refactor when file grows beyond 100 lines
- Test effectiveness with new team members

### Success Criteria
- [ ] New developers can start immediately
- [ ] Claude follows project conventions consistently
- [ ] Instructions are specific and actionable
- [ ] File loads quickly (under 50KB recommended)

## Anti-Patterns

### Avoid These Mistakes
```markdown
# ❌ Too verbose
## Complete API Documentation
[1000 lines of docs...]

# ✅ Use imports instead
## API Documentation
@docs/api.md

# ❌ Vague instructions
"Code should be clean"

# ✅ Specific instructions  
"Use TypeScript strict mode, prefer const over let"
```

## Advanced Features

### Conditional Loading
- Different CLAUDE.md files for different contexts
- Use CLAUDE.local.md for environment-specific settings

### Team Collaboration
- Include CLAUDE.md in code reviews
- Document team decisions in imports
- Use consistent structure across projects

## Quick Reference

```bash
# Generate new CLAUDE.md
/init

# View current memory files
/memory

# Add instruction dynamically
# Use prefer arrow functions over function declarations

# Import syntax
@path/to/file.md
```

## Meta
This document follows Cypher AI documentation standards. Optimized for AI consumption while remaining human-readable.