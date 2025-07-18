# Consolidated Wisdom - Reusable Patterns

## Purpose

This directory contains proven patterns extracted from successful task completions. Each pattern represents crystallized knowledge about how to solve specific problems in THIS project.

## Pattern Principles

1. **Specificity Over Generality**: Patterns must be specific to this codebase
2. **Examples Over Abstractions**: Show actual code from the project
3. **Context Matters**: Document when to use AND when NOT to use
4. **Traceability**: Link back to originating tasks

## Required Structure

Every pattern MUST follow this structure:

```markdown
---
patternId: kebab-case-identifier
originatingTaskId: task-x.y.z
dateDiscovered: 2025-01-18
timesReused: 0
---

# Pattern: [Descriptive Name]

## Problem
[Specific problem this pattern solves]

## Solution
[The pattern implementation with code examples]

## When to Use
- [Specific condition 1]
- [Specific condition 2]

## When NOT to Use (Anti-Pattern)
- [Situation where this pattern is harmful]
- [Alternative approach for that situation]

## Example from Project
```language
[Actual code from the project demonstrating the pattern]
```

## References
- Task: [task-id where discovered]
- Related patterns: [pattern-ids]
```

## Pattern Categories

Patterns naturally organize into categories:

- **Architecture Patterns**: How to structure features
- **Error Handling Patterns**: Consistent error management
- **Testing Patterns**: Effective test strategies
- **Performance Patterns**: Optimization techniques
- **Security Patterns**: Security best practices

## Pattern Lifecycle

1. **Discovery**: Identified during task retrospective
2. **Documentation**: Created via `cypher learn`
3. **Validation**: Tested in new contexts
4. **Evolution**: Updated when improvements found
5. **Deprecation**: Marked obsolete when better patterns emerge

## Using Patterns

When planning or implementing tasks:

1. Search for relevant patterns by keywords
2. Verify pattern applicability to current context
3. Adapt pattern to specific needs (don't copy blindly)
4. Reference pattern ID in task artifacts
5. Update `timesReused` counter

## Anti-Pattern Documentation

Just as important as patterns are anti-patterns - approaches that seem reasonable but lead to problems. Document these with:

- Clear explanation of why it seems appealing
- Specific problems it causes
- Better alternatives
- Real examples of the problems

## Quality Criteria

A good pattern:
- Solves a real, recurring problem
- Has been successfully used at least twice
- Includes concrete, working code examples
- Clearly states its limitations
- References its origin for context

## Remember

Patterns are not rules to follow blindly. They are wisdom to apply thoughtfully. Each use should consider the specific context and adapt accordingly.