## Cypher Project Documentation

This directory contains core documentation for the Cypher AI-to-AI orchestration system.

### Core Documentation Files:
- `MANIFESTO_v2.md`: The current vision and "Commands as Teachers" philosophy (START HERE).
- `THE_CYPHER_EVOLUTION.md`: Essential reading to understand the "why" behind the EKP v2 architecture.
- `EKP_v2_Commands_as_Teachers_Roadmap.md`: The technical roadmap for the current EKP v2 implementation.
- `ARCHITECTURE.md`: System architecture (needs update to reflect EKP).
- `INTERFACES.md`: Core data structures (Task interface).

### Project Configuration:
- `/CLAUDE.md`: Claude Code instructions (IMPORTANT: AI agents should read this)
- `/package.json`: Project dependencies and scripts
- `/jest.config.js`: Test configuration
- `/tsconfig.json`: TypeScript configuration
- `/cypher/tasks.json`: Current project tasks and status

### Implementation Notes:
- **Command intelligence lives in `cypher/prompts/`**. These are the markdown guides for the EKP commands.
- Core command logic is in `/src/commands/`. Note the `base/GuideCommand.ts` for the new EKP commands.
- Core TaskEngine is in `/src/core/TaskEngine.ts`.