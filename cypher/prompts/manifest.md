# Prompts Manifest

Version: 1.0.0
Updated: 2025-01-19
Purpose: Index of all guide prompts for AI command navigation

## Available Guides

### Process Commands
- `planning-guide.md` - Facilitates collaborative task planning with cognitive strategies (CoT/ToT/ReAct)
- `context-guide.md` - Teaches effective context construction through parallel searches and synthesis
- `learning-guide.md` - Extracts reusable patterns and knowledge from completed task dialogues
- `validation-guide.md` - Guides comprehensive multi-layer validation (functional, quality, context)
- `explore-guide.md` - Assists open-ended research and discovery tasks

### Future Guides (Planned)
- `debugging-guide.md` - Systematic debugging approach for complex issues
- `refactor-guide.md` - Safe refactoring strategies preserving functionality
- `review-guide.md` - Code review process focusing on patterns and principles

## Guide Selection Logic

### By Task Type
- **New features** → `planning-guide.md` → `context-guide.md`
- **Bug fixes** → `context-guide.md` → `validation-guide.md`
- **Research tasks** → `explore-guide.md`
- **Completed tasks** → `learning-guide.md`

### By Cognitive Mode
- **Sequential tasks** → Guides emphasizing Chain of Thought (CoT)
- **Complex decisions** → Guides using Tree of Thoughts (ToT)
- **Interactive tasks** → Guides implementing ReAct patterns

## Usage Pattern
```bash
cypher [command] [task-id]
# Command selects appropriate guide from this directory
# Guide is presented to AI for collaborative dialogue
```