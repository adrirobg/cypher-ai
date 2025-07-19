# Cypher Quickstart

Version: 1.0.0
Updated: 2025-01-19

## First Task in 5 Minutes

### 0. Prerequisites
You need a `cypher/tasks.json` file with your project tasks. 
See `cypher/core-docs/prd-to-tasks.md` for guidance on creating this from your requirements.

### 1. View Your Tasks
```bash
cypher list
```

### 2. Start Planning
```bash
cypher plan 1.1
```
- Cypher presents a planning guide
- You and AI collaborate to create a plan
- Plan saved to `cypher/cdd/1.1/plan.md`

### 3. Build Context
```bash
cypher context 1.1
```
- Guide teaches you what to search for
- Run searches in parallel (multiple terminals)
- Context saved to `cypher/cdd/1.1/context.md`

### 4. Execute
Use your normal tools (IDE, terminal). The context ensures AI understands:
- Project conventions
- Existing patterns
- What to avoid

### 5. Validate
```bash
cypher validate 1.1
```
- Multi-layer validation guide
- Tests, quality, requirements
- Fix issues iteratively

### 6. Learn
```bash
cypher learn 1.1
```
- Extract patterns for future use
- Update guides with new insights
- System gets smarter

## Key Differences

### ❌ NOT This
```bash
cypher generate-code 1.1  # Automated generation
cypher delegate 1.1       # Hand off to AI
```

### ✅ This
```bash
cypher plan 1.1          # Collaborative planning
cypher context 1.1       # Guided context building
```

## Essential Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `plan` | Planning dialogue | `cdd/<id>/plan.md` |
| `context` | Context building | `cdd/<id>/context.md` |
| `learn` | Knowledge extraction | Updates patterns/guides |
| `validate` | Quality assurance | Validation report |
| `explore` | Open research | Research findings |

## Directory Structure
```
cypher/
├── prompts/        # Guides (the teachers)
├── patterns/       # Reusable solutions
├── project-rules/  # How to work
├── knowledge/      # Accumulated wisdom
└── cdd/           # Task dialogues
```

## Pro Tips

1. **Run searches in parallel** - Context guide shows multiple searches
2. **Reference patterns** - Use @ to reference existing patterns
3. **Update immediately** - Run `learn` right after task completion
4. **Trust the process** - Let dialogue guide discovery

## Next Steps

1. Read `cypher/core-docs/philosophy.md` - Understand the why
2. Try `cypher plan` on a real task - Experience the difference
3. Explore `cypher/prompts/` - See the guides directly

Remember: **The command teaches, you execute.**