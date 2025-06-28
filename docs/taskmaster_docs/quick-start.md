# Task Master - Quick Start (5 minutes)

Get AI-driven task management working in 5 minutes.

## 1. Setup (1 minute)

```bash
npm i -g task-master-ai
task-master init
```

Add your PRD to `.taskmaster/docs/prd.txt`:
```
# Todo App
Build a todo app with user authentication

## Features
- User registration/login
- Create/edit todos
- Mark complete
- Search todos

## Tech Stack
- React frontend
- Node.js + Express API
- PostgreSQL database
```

## 2. Generate & Analyze (2 minutes)

```bash
# Generate initial tasks from PRD
task-master parse-prd .taskmaster/docs/prd.txt

# See what was created
task-master list

# Break complex tasks into subtasks with AI research
task-master expand --all --research
```

## 3. Smart Development (2 minutes)

```bash
# Get next task to work on
task-master next

# See task details
task-master show 1

# Research best practices before implementing
task-master research "React authentication best practices 2024" --id=1

# Mark in progress and work
task-master set-status --id=1 --status=in-progress

# When done
task-master set-status --id=1 --status=done
```

## 4. Adaptive Planning

```bash
# Client wants different tech? Update all future tasks
task-master update --from=3 --prompt="Use MongoDB instead of PostgreSQL" --research

# Need more detail on a task?
task-master expand --id=5 --prompt="Focus on security aspects" --research
```

## Why This Works

- **AI parses** your PRD into actionable tasks
- **Research integration** gives current best practices  
- **Adaptive updates** handle scope changes intelligently
- **Smart expansion** breaks complex work into manageable pieces

**Next:** Read [full tutorial](tutorial.md) for MCP integration, git workflows, and advanced features.

## Key Commands
```bash
task-master list                    # Show all tasks
task-master next                    # Get next task  
task-master show <id>               # Task details
task-master expand --id=<id> --research    # Break into subtasks
task-master research "query" --id=<id>     # Get best practices
task-master update --from=<id> --prompt="changes" --research  # Update future tasks
task-master set-status --id=<id> --status=done                # Mark complete
```