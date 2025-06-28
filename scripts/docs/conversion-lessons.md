# Conversion Lessons Learned

Real problems encountered and their solutions during Task Master workflow conversions.

## SDK & Authentication Issues

### Problem: Claude Code CLI not installed
**Symptom**: `Error: command not found: claude`  
**Solution**: 
```bash
npm install -g @anthropic-ai/claude-code
claude login
```

### Problem: SDK timeout on long operations
**Symptom**: Script stops after 2 minutes with timeout error  
**Solution**: Increase timeout in Bash tool calls
```typescript
// For specific long operations
for await (const message of query({
  prompt: "Run analysis...",
  options: { 
    maxTurns: 30  // Increase from default 10
  }
}))
```

## Tool Usage Issues

### Problem: Claude tries to use TodoWrite instead of Bash
**Symptom**: Claude attempts to manage its own todos instead of executing commands  
**Solution**: Be explicit about tools in prompt
```typescript
prompt: `
  Use the Bash tool to execute: npx task-master list
  Use the Write tool to create report.md
`
```

### Problem: Context7 MCP tools not working
**Symptom**: `mcp__context7__resolve-library-id` not found  
**Solution**: Ensure correct tool names
```typescript
allowedTools: [
  'mcp__context7__get-library-docs',     // Correct
  'mcp__context7__resolve-library-id'    // Correct
  // NOT 'context7' or 'Context7'
]
```

## Prompt Engineering

### Problem: Claude provides summaries instead of executing
**Symptom**: Claude explains what it would do instead of doing it  
**Solution**: Use action-oriented language
```typescript
// Bad
prompt: "Analyze tasks and create a report"

// Good  
prompt: "Execute: npx task-master list. Then create report.md with results."
```

### Problem: Inconsistent output formats
**Symptom**: Different JSON structures on each run  
**Solution**: Provide explicit schema in prompt
```typescript
prompt: `
  Generate JSON with this exact structure:
  {
    "meta": { "taskId": "...", "timestamp": "..." },
    "data": { ... }
  }
`
```

## Performance & Efficiency

### Problem: Unnecessary Context7 searches
**Symptom**: Claude searches Context7 for every minor decision  
**Solution**: Specify when to use Context7
```typescript
prompt: `
  [Phase 3] ONLY for technologies in the task, search Context7 for:
  - Implementation patterns
  - Best practices
  Do NOT search for general concepts.
`
```

### Problem: Multiple reads of same file
**Symptom**: Claude reads tasks.json repeatedly  
**Solution**: Structure workflow to minimize re-reads
```typescript
prompt: `
  1. Read all necessary data ONCE
  2. Process in memory
  3. Write output ONCE
`
```

## Output & Artifacts

### Problem: Overwrites existing files without warning
**Symptom**: Previous analysis lost  
**Solution**: Add timestamp or check existence
```typescript
const filename = `analysis-${new Date().toISOString().split('T')[0]}.json`;
// OR
prompt: "Check if file exists before writing"
```

### Problem: Output too verbose for practical use
**Symptom**: 50KB JSON files with redundant information  
**Solution**: Specify essential fields only
```typescript
prompt: `
  Include only:
  - Task ID and title
  - Key findings (max 5)
  - Actionable recommendations (max 3)
`
```

## Claude Behavior Quirks

### Problem: Claude adds unnecessary features
**Symptom**: Simple script becomes complex with error classes, logging, etc.  
**Solution**: Explicitly state simplicity requirement
```typescript
prompt: `
  Keep implementation minimal:
  - No custom error classes
  - No complex logging
  - Just execute the workflow
`
```

### Problem: Claude stops mid-workflow
**Symptom**: Execution ends without completing all phases  
**Solution**: Use clear phase markers and completion confirmation
```typescript
prompt: `
  [1/5] Phase 1...
  [2/5] Phase 2...
  ...
  [5/5] Final phase...
  
  After all phases, confirm: "✅ Workflow completed"
`
```

## Integration Patterns

### Problem: Task Master commands fail silently
**Symptom**: No error but no output from task-master commands  
**Solution**: Add explicit error checking
```typescript
prompt: `
  Execute: npx task-master list
  If no output or error, report the issue
`
```

### Problem: Working directory confusion
**Symptom**: Files created in wrong location  
**Solution**: Always use absolute paths or set cwd
```typescript
options: {
  cwd: process.cwd(),  // Explicitly set
  allowedTools: ['Bash', 'Read', 'Write']
}
```

## Best Practices Discovered

1. **Phase-based prompts** work better than narrative instructions
2. **Explicit tool mentions** prevent wrong tool usage
3. **Progress markers** help track execution
4. **Simple schemas** are more reliable than complex ones
5. **One workflow per script** maintains clarity

## Common Patterns That Work

### Successful Workflow Structure
```typescript
prompt: `
  [Setup] Verify environment
  [Phase 1] Gather data
  [Phase 2] Process/analyze  
  [Phase 3] Generate AI-first output
  [Cleanup] Validate artifact is AI-consumable
`
```

### AI-First Output Validation
Always end workflows with:
```typescript
prompt: `
  Verify the output is:
  - Token-efficient
  - Implementation-focused
  - Self-contained
  - Machine-parseable
`
```

### Reliable Error Handling
```typescript
} catch (error) {
  if (error.message?.includes('specific known issue')) {
    console.error('Helpful error message');
  }
  // Let other errors bubble up
}
```

---

*This document will grow as more conversions are implemented. Each lesson learned makes future conversions smoother.*