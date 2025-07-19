# Prompt Optimization Patterns - Cypher Project

## Purpose
Actionable patterns extracted from AI Collaboration section optimization. Use as reference for optimizing all prompts in Cypher and future projects.

## Core Principles

### 1. Information Hierarchy
```
CORE (10-20%) → OPERATIONAL (60-70%) → REFERENCE (20-30%)
```
- **CORE**: Identity, role, fundamental philosophy
- **OPERATIONAL**: Workflows, patterns, decision matrices
- **REFERENCE**: Examples, specific cases, troubleshooting

### 2. Format Transformations

| From | To | Token Reduction |
|------|-----|-----------------|
| Explanatory paragraphs | Bullet lists | ~70% |
| Multiple examples | Single pattern + variants | ~80% |
| Descriptive prose | Tables/Matrices | ~60% |
| Specific cases | General principle | ~75% |
| Verbose commands | Inline code | ~50% |

### 3. Condensation Formula
```
CONCEPT: One-line what
PATTERN: `command example` 
WHEN: Usage context
```

**Applied Example**:
```markdown
**Code Review**: `cat file.ts | gemini -p "Find bugs"` - When need fresh eyes
```

### 4. The 80/20 Rule for Prompts
- 80% of value comes from 20% of content
- Identify that critical 20%
- Move remaining 80% to reference docs
- Link to details, don't embed them

### 5. Anti-Patterns to Avoid

❌ **Conceptual Redundancy**
```markdown
# BAD
- Use AI when you need help
- Consult AI for assistance  
- AI can help with tasks
- Leverage AI capabilities
```

✅ **Single Concept**
```markdown
# GOOD
- You decide, AIs advise
```

❌ **Over-Explanation**
```markdown
# BAD
To review code, you should first cat the file, then pipe it to gemini,
and specify that you want to find bugs...
```

✅ **Pattern-Based**
```markdown
# GOOD
**Code Review**: `cat file.ts | gemini -p "Find bugs"`
```

### 6. Optimal Command Structure
```markdown
**Name**: `command` | When to use
```
Don't explain HOW (obvious from command), only WHEN.

### 7. Universal Prompt Template

```markdown
---
version: 1.0.0
lastUpdated: YYYY-MM-DD
ownerCommand: [command_name] # e.g., plan, context, learn
changelog:
  - version: 1.0.0
    date: YYYY-MM-DD
    changes: "Initial version"
    source: "[Source of creation]"
---

# [PROMPT NAME] Guide

## My Purpose
[One line - who/what is this agent/guide]

## Core Principles
- [Principle 1]
- [Principle 2]
- [Principle 3 if critical]

## When NOT to Use This Process
[Optional: Scenarios where this guide/process is not applicable]

## My Conversational Toolkit
[Optional: Tools or commands the AI will use during the dialogue]

## Creating Artifacts
[Optional: What artifacts (e.g., context.md, plan.md) might be created]

## Connecting to the Ecosystem
[Optional: How this guide/process connects to other parts of the Cypher system]

## Remember
[Optional: A concluding thought or reminder]

```

### 8. Optimization Checklist

Before finalizing any prompt:

- [ ] Role understood in <5 seconds?
- [ ] Patterns cover 80% of use cases?
- [ ] Correct decision path obvious?
- [ ] Any duplicate information?
- [ ] All examples necessary?
- [ ] Can anything be moved to reference?
- [ ] Tables used for multi-option decisions?
- [ ] Commands shown inline with backticks?

### 9. Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Comprehension Time | <30 sec | Time to understand role & start |
| Token Efficiency | 50% reduction | Compare before/after |
| Operational Coverage | 80% | Common tasks covered by patterns |
| Decision Clarity | Instant | No ambiguity in choices |

### 10. The Delete Test
> If you can delete a line without losing operational effectiveness, delete it.

Apply recursively until every line is essential.

## Application Examples

### For Guide Commands
```markdown
# Instead of explaining what the command does
Analyze task complexity and generate report...

# Show the pattern for initiating a dialogue
**Plan**: `cypher plan <task-id>` - To initiate a collaborative planning dialogue
**Context**: `cypher context <task-id>` - To build or refine task context
**Learn**: `cypher learn <task-id>` - To extract and integrate new knowledge
**Validate**: `cypher validate <task-id>` - To check task structure and completeness
```

### For Role Definitions
```markdown
# Instead of paragraph
You are responsible for analyzing code quality, finding bugs, suggesting improvements...

# Use structured list
## Role: Code Quality Analyst
- Find bugs and anti-patterns
- Suggest improvements
- Validate against principles
```

### For Workflows
```markdown
# Instead of prose
First you should check the context, then plan your approach...

# Use numbered steps (as seen in EKP guides)
1. Initiate planning: `cypher plan <task-id>`
2. Build context: `cypher context <task-id>`
3. Implement solution
4. Capture learning: `cypher learn <task-id>`
```

## Quick Reference Card

### Transform This → Into This
- Paragraphs → Bullets
- Examples → Patterns  
- Prose → Tables
- Specific → General
- Explain → Show

### Keep Only
- Role (1 line)
- Philosophy (2-3 lines)
- Patterns (5-7 max)
- Workflow (numbered)
- Don'ts (5 max)

### Always Add
- Reference link to detailed docs
- Decision matrices for choices
- Inline code for commands
- When to use (not how)

## Usage Instructions

1. **For New Prompts**: Start with the Universal Template
2. **For Existing Prompts**: Apply the Optimization Checklist
3. **For Reviews**: Use the Delete Test recursively
4. **For Validation**: Check Success Metrics

Remember: The goal is operational clarity with minimal cognitive load.