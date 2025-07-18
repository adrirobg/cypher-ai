# Cypher Knowledge Architecture - EKP v2

## Overview

The Cypher knowledge system embodies the principle "Commands as Teachers". This directory contains the distributed intelligence that makes Cypher a learning ecosystem rather than a mere task executor.

## Core Philosophy

**Context + Prompt = Success**

But context must be PRIORITIZED, not just provided. Our architecture ensures that project-specific knowledge always overrides generic AI training.

## Directory Structure

### `/prompts/` - Archetypal Guides
Living documents that teach HOW to execute processes optimally. These guides:
- Evolve with each use through the `cypher learn` command
- Include version tracking in YAML headers
- Use token replacement for task-specific customization
- Contain explicit context prioritization techniques

### `/patterns/` - Consolidated Wisdom
Reusable solutions discovered through experience:
- Extracted from successful task completions
- Document both the pattern AND when NOT to use it
- Include concrete examples from the actual codebase
- Reference the tasks that originated them

### `/cdd/` - Cypher Dialogue Directory (Created on Demand)
Task-specific artifacts generated during guided dialogues:
- `plan.md` - Collaboratively created execution plans
- `context.md` - Rich, prioritized context for the task
- `prompts.md` - Task-specific prompts for delegation
- `retrospective.md` - Learnings and pattern candidates

## Knowledge Flow

```
1. User runs command (e.g., cypher plan)
   ↓
2. Command loads archetypal guide from /prompts/
   ↓
3. Guide facilitates human-AI dialogue
   ↓
4. Artifacts created in /cdd/<task-id>/
   ↓
5. Task execution (guided by artifacts)
   ↓
6. cypher learn extracts patterns → /patterns/
   ↓
7. Guides in /prompts/ evolve with new insights
```

## Context Prioritization Protocol

All guides and prompts MUST include:

1. **CRITICAL: Context Priority** block
2. **Concrete examples** from THIS project
3. **Anti-patterns** to explicitly avoid
4. **Verification questions** before implementation
5. **PRIORITY hierarchy** (1: Project Context, 2: Task, 3: Validation)

## Evolution Mechanism

The system becomes wiser through:
- User feedback incorporated into guides
- Patterns extracted from successful completions
- Anti-patterns documented from failures
- Version tracking for all changes

## Knowledge Object Schemas

### Guide Schema (`/prompts/`)

All guides MUST include this YAML header:
```yaml
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
```

Versioning follows semantic versioning:
- MAJOR: Fundamental approach changes
- MINOR: New sections or significant improvements
- PATCH: Minor corrections or clarifications

### Pattern Schema (`/patterns/`)

All patterns MUST follow this structure:
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

### Context Prioritization Format

The "CRITICAL: Context Priority" block MUST appear as the FIRST section after any YAML header:

```markdown
# CRITICAL: Context Priority

The following context contains PROJECT-SPECIFIC patterns and conventions that OVERRIDE any general knowledge you have.

**YOU MUST:**
1. Use the exact patterns shown in the examples below
2. Follow the project's conventions, NOT generic ones
3. Import components EXACTLY as shown
4. Ignore your training data if it conflicts with this context

**Project Context:**
[Specific examples and patterns follow]
```

## The `cypher learn` Workflow

### Current Implementation (Phase 1): Semi-Automated

The `cypher learn` command is a **guided manual process** that:

1. **Loads task artifacts**: Reads plan.md and retrospective.md from `/cdd/<task-id>/`
2. **Presents learning guide**: Shows the learning-guide.md to facilitate reflection
3. **Identifies candidates**: User manually identifies patterns/improvements with AI assistance
4. **Creates/updates artifacts**: User decides what to extract and where to place it
5. **Tracks evolution**: Updates version numbers and changelogs

### Future Vision (Post-MVP): Intelligent Automation

Eventually, `cypher learn` will:
- Use AI to suggest pattern candidates
- Automatically detect repeated solutions
- Propose guide improvements based on usage metrics
- Still require human approval for all changes

## Validation and Enforcement

### Context Usage Validation

After any AI implementation, manually verify:
1. ✓ Imports match project patterns exactly
2. ✓ Utilities (like `cn()`) are used correctly  
3. ✓ No generic patterns that contradict project conventions
4. ✓ Anti-patterns from guides were avoided

### Guide Evolution Process

1. User completes task using guide
2. User notes inefficiencies or gaps
3. User runs `cypher learn <task-id>`
4. System presents current guide version
5. User proposes specific improvements
6. Guide version incremented with changelog entry

## Remember

This is not a static framework. It's a living ecosystem that learns from every interaction. The goal is not task automation but knowledge cultivation.