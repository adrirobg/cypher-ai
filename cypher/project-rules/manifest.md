# Project Rules Manifest

Version: 1.1.0
Updated: 2025-01-20
Purpose: Index of team conventions and project standards

## Available Rules

### `git-workflow.md`
Git conventions, branching strategy, and commit standards for the development team.

### `context7-integration.md`
Setup and usage of Context7 MCP for real-time documentation access.

### `claude-md-best-practices.md`
Best practices for creating and maintaining CLAUDE.md files.

### `manifest.md`
This index file for navigation.

## Moved to Orchestrator Protocols

The following AI-specific protocols have been relocated to `cypher/orchestrator/`:
- `ai-documentation-standards.md` → `orchestrator/documentation-protocol.md`
- `gemini-collaboration-protocol.md` → `orchestrator/gemini-collaboration.md`

These define AI operational behavior and are imported directly by CLAUDE.md.

## Rule Categories

### Development Process
- `git-workflow.md` - Team version control conventions

### Tool Integration
- `context7-integration.md` - Documentation access setup
- `claude-md-best-practices.md` - AI memory file guidelines

## Distinction from Orchestrator

```
project-rules/     # Human team conventions
orchestrator/      # AI operational protocols
```

This directory contains rules for human developers. AI-specific protocols live in orchestrator/.