# Git Protocol for AI Orchestrator

Version: 1.0.0
Updated: 2025-01-20

## Purpose
Define how the AI Orchestrator handles git operations within Cypher's philosophy.

## Commit Message Philosophy

### Standard Format
```bash
type(scope): clear, actionable title
```

### Narrative Format for Critical Changes
```bash
git commit -m "$(cat <<'EOF'
type(scope): clear, actionable title

CRITICAL: This change is foundational/breaking/architectural

Explanation of WHY this approach was chosen, what alternatives were
considered, and why this solution best aligns with Cypher's philosophy.

Changes:
- Specific modification 1
- Specific modification 2
- Files affected

Impact:
- System behavior changes
- What this enables
- Future implications

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## When to Use Rich Format

### ALWAYS for:
- Architectural decisions
- Breaking changes
- Foundation work (new core systems)
- Complex implementations spanning multiple files
- Changes to core philosophy/approach

### SIMPLE format for:
- Bug fixes with obvious solutions
- Documentation typos
- Dependency updates
- Single-file modifications

## Branch Strategy

### Naming as Intent Declaration
```bash
# Not: feature/tasks
# But: feature/task-definition-and-management

# Not: fix/bug
# But: fix/parser-ambiguity-handling
```

### When to Create New Branch
1. **Foundational work** - Always isolate
2. **Multi-phase implementation** - Dedicated context
3. **Experimental features** - Protect stability
4. **Breaking changes** - Clear separation

## Decision Points

### Before Major Operations
Consider:
- Is this change architectural?
- Does it need isolation?
- Will future sessions need this context?

### In Commit Messages
Document:
- **Why** over what (code shows what)
- **Trade-offs** considered
- **Philosophy alignment**
- **Future implications**

## Integration with Cypher

### Reference Patterns
```bash
# Link to roadmaps
Context: cypher/cdd/task-definition-management/roadmap.md

# Link to decisions
Decisions: cypher/cdd/task-definition-management/decisions.md

# NOT: Link to temporary consultations
# NOT: cypher/cdd/gemini-consultations/*
```

### Session Continuity
Each significant commit should enable:
- Understanding of system state
- Clear next steps
- Context for decisions made

## Anti-Patterns

### AVOID
- Generic messages ("update stuff", "fix bug")
- What without why ("add function X")
- References to ephemeral files
- Rushing commits without reflection

### EMBRACE
- Time investment in message crafting
- Future reader perspective
- Learning capture in commits
- Clear continuation points

## Examples

### Architectural Change
```bash
git commit -m "$(cat <<'EOF'
feat(core): implement minimal Task v0.1 structure

CRITICAL: This establishes the foundational data model for Cypher.

After research and analysis, implementing a minimal Task structure with only
essential fields. This approach follows the principle of "start simple, evolve
through use" rather than over-engineering upfront.

Changes:
- Create cypher/interfaces/task.ts with TaskV01
- Only 6 critical fields: id, title, description, status, dependencies, criteria
- Intentionally exclude: subtasks, priority, complexity (defer complexity)

Impact:
- Unblocks all command development (they now have a data model)
- Enables parser prototype development
- Sets foundation for iterative enhancement
- Maintains flexibility for future evolution

Design decisions documented in: cypher/cdd/task-definition-management/decisions.md

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

### Simple Fix
```bash
git commit -m "fix: correct TypeScript import path in TaskEngine"
```

## Remember
In Cypher, git commits are not just version markers - they're knowledge artifacts that teach and preserve wisdom.