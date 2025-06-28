# Quick Start - Task Master Automation Scripts

Get your first AI-to-AI orchestration script running in 5 minutes.

**Remember**: These scripts generate artifacts for AI agents, not humans!

## Prerequisites

- Node.js 18+ installed
- Task Master project with tasks (`poc_taskmaster`)
- Terminal/command line access

## 1. Install Claude Code SDK (2 minutes)

```bash
# Install the SDK
npm install @anthropic-ai/claude-code

# Install Claude CLI globally
npm install -g @anthropic-ai/claude-code

# Authenticate (opens browser)
claude login
```

## 2. Verify Installation (30 seconds)

```bash
# Check Claude CLI
claude --version

# Should output: 1.0.35 (Claude Code) or similar
```

## 3. Run Your First Script (1 minute)

```bash
# Generate an AI-optimized task analysis report
npx tsx scripts/analyze-tasks.ts

# View the AI-first artifact
cat task-analysis-report.md
# Notice: Structured for AI parsing, not human reading!
```

## 4. Create Your Own Script (2 minutes)

```bash
# Copy the template
cp scripts/template-workflow.ts.example scripts/my-first-script.ts

# Edit with your favorite editor
# - Update WORKFLOW_NAME to "My First Automation"  
# - Update the prompt to: "Execute: npx task-master list"
# - Save the file

# Run it
npx tsx scripts/my-first-script.ts
```

## Common Patterns

### Running Task Master Commands
```typescript
prompt: `Execute: npx task-master list`
```

### Creating AI-First Reports
```typescript
prompt: `
  1. Execute: npx task-master list
  2. Create task-summary.md with results
  3. Structure output for AI consumption:
     - Minimal prose
     - Clear data structure
     - Implementation-focused
`
```

### Multi-Phase Workflows
```typescript
prompt: `
  [1/3] ANALYZE
  Execute: npx task-master complexity-report
  
  [2/3] RESEARCH  
  Find best practices for complex tasks
  
  [3/3] REPORT
  Create complexity-analysis.md
`
```

## Troubleshooting

### "command not found: claude"
```bash
npm install -g @anthropic-ai/claude-code
```

### "Invalid API key"
```bash
claude login
```

### Script times out
Add timeout option:
```typescript
options: {
  maxTurns: 30,  // Increase this
  // ... other options
}
```

### Can't find task-master
Make sure you're in the project directory:
```bash
cd /path/to/poc_taskmaster
```

## Next Steps

1. **Understand Core Principle**: Read [ai-first-artifacts.md](./ai-first-artifacts.md) - CRITICAL!
2. **Try TEP**: `npx tsx scripts/tep-analyze.ts 2` - See AI-first JSON output
3. **Study Examples**: Analyze how `tep-analyze.ts` creates AI-optimized artifacts
4. **Check Roadmap**: [conversion-roadmap.json](./conversion-roadmap.json) for AI-to-AI workflows
5. **Learn Patterns**: [conversion-lessons.md](./conversion-lessons.md) for common issues

## Quick Reference

### Essential Tools
```typescript
allowedTools: [
  'Bash',     // Run commands
  'Read',     // Read files
  'Write',    // Create files
]
```

### With Context7
```typescript
allowedTools: [
  'Bash', 'Read', 'Write',
  'mcp__context7__get-library-docs',
  'mcp__context7__resolve-library-id'
]
```

### Script Structure
```typescript
import { query } from '@anthropic-ai/claude-code';

async function myWorkflow() {
  for await (const message of query({
    prompt: "Your instructions here",
    options: { 
      maxTurns: 20,
      allowedTools: ['Bash', 'Read', 'Write'] 
    }
  })) {
    // Progress display
  }
}

myWorkflow();
```

---

## The Big Picture

You're not just automating workflows - you're building the middleware for AI-driven development:

```
Your Script → AI-Optimized Artifact → Claude Code → Working Software
```

**Ready to build the future of AI-to-AI development?** Start with understanding [ai-first-artifacts.md](./ai-first-artifacts.md), then check the [conversion roadmap](./conversion-roadmap.json) for high-value workflows!