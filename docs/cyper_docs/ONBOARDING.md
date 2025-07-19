# ONBOARDING: Cypher Project

## Essential Reading Order

1. **`/CLAUDE.md`** - Project instructions (CRITICAL - read first)
2. **`docs/cyper_docs/MANIFESTO.md`** - Core vision and principles
3. **`docs/cyper_docs/INTERFACES.md`** - Task data structure
4. **`docs/cyper_docs/ROADMAP.md`** - Implementation phases
5. **`/cypher/tasks.json`** - Current project status

## Quick Start: The EKP v2 Workflow

The new workflow is a dialogue facilitated by "Commands as Teachers".

```bash
# 1. See what tasks are available
npx tsx src/cli.ts list

# 2. Start the planning dialogue for a task
npx tsx src/cli.ts plan <task-id>

# 3. The plan guide will appear. Follow it to build context and a plan.
# This involves using other commands like:
npx tsx src/cli.ts context <task-id>

# 4. Validate the task structure (optional, but recommended)
npx tsx src/cli.ts validate <task-id>

# 5. Once the task is done, capture the knowledge
npx tsx src/cli.ts learn <task-id>
```

## Key Files to Know

- **Configuration**: `/package.json`, `/tsconfig.json`, `/jest.config.js`
- **Core Code**: `/src/core/TaskEngine.ts`
- **Commands**: `/src/commands/` (especially `base/GuideCommand.ts`)
- **Command Guides**: `/cypher/prompts/` (The intelligence of the system)

Start with CLAUDE.md, then follow the reading order above.