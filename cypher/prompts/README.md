# Archetypal Guides - System Intelligence

## Purpose

This directory contains the living guides that teach HOW to execute processes optimally. These are not scripts that run automatically - they are teachers that guide human-AI collaboration.

## Guide Principles

1. **Guide, Don't Execute**: Present knowledge, facilitate dialogue
2. **Evolve Through Use**: Each use can improve the guide
3. **Project-Specific**: Prioritize THIS project's patterns over generic knowledge
4. **Token-Based Customization**: Use `{{tokens}}` for task-specific content

## Required Structure

Every guide MUST follow this structure:

```markdown
---
version: 1.0.0
lastUpdated: 2025-01-18
ownerCommand: plan|context|learn|validate
changelog:
  - version: 1.0.0
    date: 2025-01-18
    changes: "Initial version"
    source: "EKP v2 implementation"
---

# CRITICAL: Context Priority

[Priority override block - MANDATORY]

# Guide Title for Task {{task.id}}: {{task.title}}

[Guide content with sections, processes, examples]

## Feedback Section

[How to improve this guide]
```

## Available Tokens

- `{{task.id}}` - Current task identifier
- `{{task.title}}` - Task title
- `{{task.description}}` - Full task description
- `{{keywords}}` - Extracted keywords for searches
- `{{date}}` - Current date
- `{{plan_content}}` - Content from plan.md (for learn command)
- `{{retrospective_content}}` - Content from retrospective.md (for learn command)

## Guide Lifecycle

1. **Creation**: Based on roadmap specifications
2. **Usage**: Presented by commands, customized with tokens
3. **Feedback**: Users note improvements during use
4. **Evolution**: `cypher learn` incorporates improvements
5. **Versioning**: Semantic versioning tracks changes

## Current Guides

- `planning-guide.md` - Collaborative planning process
- `context-guide.md` - Context construction techniques  
- `learning-guide.md` - Knowledge extraction process
- `validation-guide.md` - Exhaustive validation methodology

## Adding New Guides

1. Follow the required structure exactly
2. Include comprehensive examples from THIS project
3. Add anti-patterns to prevent common mistakes
4. Test with real tasks before committing
5. Update this README with the new guide

## Remember

These guides are the intelligence of the system. They should be rich, detailed, and constantly improving. A good guide teaches not just what to do, but why and how to think about the problem.