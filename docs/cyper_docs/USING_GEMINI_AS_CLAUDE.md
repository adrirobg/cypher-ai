# Gemini CLI Integration Guide

Version: 2.0.0  
Updated: 2025-01-19  
Optimized for: AI consumption per cypher/project-rules/ai-documentation-standards.md

## Core Facts
- Gemini = stateless AI tool
- Reads GEMINI.md from CWD automatically
- No memory between calls
- Use @ for file references (NEW)

## When to Invoke
- Bug analysis
- Architecture validation  
- Code review
- Research delegation


## Invocation Patterns

### Pattern 1: File Analysis (UPDATED)
```bash
# NEW: Use @ references
gemini -p "Review @src/core/TaskEngine.ts for: 1) Type safety, 2) Error handling"

# OLD: Avoid piping
cat src/core/TaskEngine.ts | gemini -p "Review"
```

### Pattern 2: Error Diagnosis
```bash
gemini -p "Error: [details]. Context: @src/file.ts line 45. Suggest fixes."
```

### Pattern 3: Architecture Decision
```bash
gemini -p "Considering X pattern for Y. Check against @cypher/patterns/. Downsides?"
```

### Pattern 4: Output to File
```bash
gemini -p "Task: X. Output: @cypher/cdd/gemini-consultations/analysis.md"
```

## Context Rules
- Each call is isolated
- Include all necessary context
- Reference files with @
- Specify output location

## Integration with Cypher Commands

### During `cypher plan`
```bash
gemini -p "Validate approach: @cypher/cdd/task-X/plan.md against @cypher/patterns/"
```

### During `cypher context`  
```bash
gemini -p "Find dependencies for: [feature]. Check: @src/"
```

### During `cypher learn`
```bash
gemini -p "Extract patterns from: @cypher/cdd/task-X/retrospective.md"
```

## Anti-Patterns
- Piping large files (use @)
- Open-ended questions
- Assuming memory
- Re-explaining project context
- Multiple unrelated queries

## Quick Reference

```bash
# Most common
gemini -p "Review @file. Focus: X. Output: @path/out.md"

# With context
gemini -p "Error at @file:45. Suggest fix."

# Pattern check
gemini -p "Validate @plan.md against @cypher/patterns/"
```

## See Also
- cypher/project-rules/gemini-collaboration-protocol.md
- cypher/project-rules/ai-documentation-standards.md