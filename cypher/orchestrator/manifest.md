# Orchestrator Protocols Manifest

Version: 1.0.0
Updated: 2025-01-20
Purpose: AI Orchestrator operational protocols and standards

## Documents

### `git-protocol.md`
How the Orchestrator handles git operations. Defines commit philosophy, branch strategy, and knowledge preservation through version control.

### `documentation-protocol.md`
Standards for writing AI-optimized documentation. Token economy, structure patterns, and maintenance guidelines.

### `gemini-collaboration.md`
Protocol for collaborating with Gemini. Command syntax, patterns, and integration points.

### `manifest.md`
This index file for efficient protocol navigation.

## Usage Context

These protocols are imported by CLAUDE.md and define HOW the Orchestrator operates within Cypher. They are:
- Operational guidelines (not project rules)
- AI-specific (not human team conventions)
- Core to Orchestrator function

## Relationship to Project

```
cypher/
├── orchestrator/        # How AI operates (this directory)
├── project-rules/       # How humans organize
├── prompts/            # What AI teaches
└── patterns/           # What AI learns
```

## For Future Agents

These protocols can be imported by specialized agents (e.g., frontend/CLAUDE.md) to inherit Orchestrator standards while adding domain-specific rules.