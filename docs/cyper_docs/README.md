## Cypher Project Documentation

This directory contains core documentation for the Cypher AI-to-AI orchestration system.

### Core Documentation Files:
- `MANIFESTO.md`: Vision, problem statement, and guiding principles (START HERE)
- `ARCHITECTURE.md`: System architecture and components overview
- `INTERFACES.md`: Core data structures and TypeScript interfaces (Task interface)
- `ROADMAP.md`: Phased implementation plan for the Cypher system
- `TECHNICAL_NOTES.md`: In-depth technical details and best practices
- `UI_STRATEGY.md`: User interface strategy, AI-first design and CLI interaction
- `COLLABORATION_PLAN.md`: Multi-perspective AI collaboration patterns

### Project Configuration:
- `/CLAUDE.md`: Claude Code instructions (IMPORTANT: AI agents should read this)
- `/package.json`: Project dependencies and scripts
- `/jest.config.js`: Test configuration
- `/tsconfig.json`: TypeScript configuration
- `/.cypher/tasks.json`: Current project tasks and status

### Implementation Notes:
- Prompt templates are now in `/src/providers/prompts/` (versioned with Git)
- Commands are in `/src/commands/`
- Core TaskEngine is in `/src/core/TaskEngine.ts`