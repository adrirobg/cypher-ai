# Cypher Architecture Overview

Version: 1.0.0
Updated: 2025-01-19

## System Layers

### 1. Command Layer (Simple)
- Commands < 50 lines each
- Only job: Select and present guides
- Zero business logic
- Example: `plan.ts` → loads `planning-guide.md`

### 2. Knowledge Layer (Smart)
```
cypher/
├── prompts/        # Teaching guides
├── patterns/       # Proven solutions  
├── project-rules/  # Process rules
└── knowledge/      # Strategic wisdom
```

### 3. Dialogue Layer (Dynamic)
```
cypher/cdd/<task-id>/
├── plan.md         # Planning decisions
├── context.md      # Gathered information
├── prompts.md      # Task-specific guides
└── retrospective.md # Lessons learned
```

## The Knowledge Lifecycle

```
     prompts/ (Teachers)
          ↓
    User + AI Dialogue
          ↓
    cdd/ (Workspace)
          ↓
    learn Command
       ↙    ↘
patterns/  knowledge/
(Tactical) (Strategic)
```

## Key Components

### TaskEngine
- Reads/writes `tasks.json`
- Pure TypeScript, no dependencies
- ~100 lines of clean code

### GuideCommand Base Class
- Loads markdown guides
- Formats with task context
- Presents to user
- That's it

### Guide Files (The Intelligence)
- Markdown with structured sections
- Version controlled
- Evolve through `learn` command
- Contain all the "how to" knowledge

## Data Flow

1. **User** runs command (e.g., `cypher plan 1.1`)
2. **Command** loads guide from `prompts/`
3. **Guide** facilitates dialogue
4. **Dialogue** creates artifacts in `cdd/`
5. **Learn** extracts wisdom back to `patterns/` and `knowledge/`

## Integration Points

### Git Integration
- See `project-rules/git-workflow.md`
- Branches follow task structure
- Commits reference task IDs

### AI Tool Integration
- Gemini via CLI (see `project-rules/gemini-collaboration-protocol.md`)
- Context7 MCP for real-time docs
- Extensible for other AI tools

### IDE Integration
- Works with any editor
- No special plugins required
- Knowledge in markdown = universal

## Why This Architecture Works

1. **Simplicity**: Commands do one thing
2. **Flexibility**: Guides can evolve without code changes
3. **Portability**: Just markdown and JSON
4. **Learning**: Knowledge accumulates naturally
5. **Debugging**: Everything is readable text

## For Developers

### Adding a New Command
1. Create `src/commands/newcmd.ts` extending `GuideCommand`
2. Create `cypher/prompts/newcmd-guide.md`
3. That's it - no complex logic needed

### Improving the System
1. Use it for real tasks
2. Run `cypher learn` to capture insights
3. Patterns emerge from usage, not theory

The architecture's power isn't in the code - it's in the evolving knowledge layer.