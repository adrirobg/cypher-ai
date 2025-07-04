# ONBOARDING: Cypher Project

## Essential Reading Order

1. **`/CLAUDE.md`** - Project instructions (CRITICAL - read first)
2. **`docs/cyper_docs/MANIFESTO.md`** - Core vision and principles
3. **`docs/cyper_docs/INTERFACES.md`** - Task data structure
4. **`docs/cyper_docs/ROADMAP.md`** - Implementation phases
5. **`/cypher/tasks.json`** - Current project status

## Quick Start

```bash
# List all tasks
npx tsx src/cli.ts list

# Show detailed task information
npx tsx src/cli.ts show <task-id>

# Get task context
npx tsx src/cli.ts transmit <task-id>
```

## Key Files to Know

- **Configuration**: `/package.json`, `/tsconfig.json`, `/jest.config.js`
- **Core Code**: `/src/core/TaskEngine.ts`
- **Commands**: `/src/commands/`
- **Prompts**: `/src/providers/prompts/`

Start with CLAUDE.md, then follow the reading order above.