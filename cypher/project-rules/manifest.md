# Project Rules Manifest

Version: 1.0.0
Updated: 2025-01-19
Purpose: Index of operational rules and protocols

## Available Rules

### `git-workflow.md`
Git conventions, branching strategy, and commit standards. Essential for collaborative development.

### `ai-documentation-standards.md`
How to write documentation optimized for AI consumption. Critical for maintaining efficient AI-readable docs.

### `gemini-collaboration-protocol.md`
Integration protocol for Gemini CLI. Patterns for effective AI-to-AI collaboration.

### `context7-integration.md`
Setup and usage of Context7 MCP for real-time documentation access.

### `manifest.md`
This index file for navigation.

## Rule Categories

### Development Process
- `git-workflow.md` - Version control conventions

### Documentation Standards  
- `ai-documentation-standards.md` - Writing for AI
- Manifest requirements (all directories need one)

### Tool Integration
- `gemini-collaboration-protocol.md` - Gemini CLI usage
- `context7-integration.md` - Documentation access

## Adding New Rules

1. Create rule file in this directory
2. Follow ai-documentation-standards.md format
3. Update this manifest
4. Keep rules under 100 lines when possible

## Rule Enforcement

- Git hooks can check git-workflow compliance
- Documentation reviews should verify AI standards
- Tool integration should be tested during setup

## Quick Reference

### For Git Work
See: `git-workflow.md`

### For Writing Docs
See: `ai-documentation-standards.md`

### For AI Collaboration
See: `gemini-collaboration-protocol.md`

### For External Docs
See: `context7-integration.md`