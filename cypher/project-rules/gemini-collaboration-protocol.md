# Gemini Collaboration Protocol

Version: 1.0.0
Updated: 2025-01-19

## Core Concept
Gemini = stateless AI colleague. No memory between calls. Reads GEMINI.md from CWD.

## Invocation Syntax

### Basic
```bash
gemini -p "prompt"
```

### With File References
```bash
# @ references files relative to CWD
gemini -p "Review @src/commands/plan.ts for optimization"
```

### With Output File
```bash
# Direct Gemini to save response
gemini -p "Analyze @docs/architecture.md. Save analysis to @gemini-output.md"
```

## Consultation Directory
```
cypher/cdd/gemini-consultations/
├── query-{timestamp}.md      # Your questions
└── response-{timestamp}.md   # Gemini responses
```

## Optimal Patterns

### 1. Architecture Review
```bash
gemini -p "Review @docs/cyper_docs/ARCHITECTURE.md section X. Focus: [specific concern]. Output: @cypher/cdd/gemini-consultations/arch-review.md"
```

### 2. Code Quality Check
```bash
gemini -p "Audit @src/commands/*.ts for: 1) Complexity, 2) EKP alignment, 3) One improvement each. Table format."
```

### 3. Documentation Consolidation
```bash
gemini -p "Merge @file1.md and @file2.md. Preserve: [list]. Remove: [list]. Output structure: [define]."
```

### 4. Pattern Extraction
```bash
gemini -p "Extract reusable patterns from @cypher/cdd/task-*/retrospective.md. Format as @cypher/patterns/extracted.md"
```

## Context Optimization

### DO
- Reference files with @ instead of cat/piping
- Specify exact output format
- Use numbered lists for multiple asks
- Request specific sections, not entire analysis

### DON'T
- Pipe large files
- Ask open-ended questions
- Request multiple unrelated analyses
- Assume previous conversation context

## Integration Points

### With EKP Workflow
1. During `cypher plan`: Validate approach
2. During `cypher context`: Find missing dependencies
3. During `cypher learn`: Extract patterns
4. During `cypher validate`: Security/performance check

### Output Standards
Request Gemini follow @cypher/project-rules/ai-documentation-standards.md

## Error Handling
```bash
# If no response file created
gemini -p "Previous query. Ensure output saved to: @path/to/output.md"
```

## Quick Reference
```bash
# Most common usage
gemini -p "Task. Context: @file. Focus: X. Output: @path/out.md"
```