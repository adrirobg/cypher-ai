# Using Gemini CLI as Cognitive Tool: Instructions for Claude Code

## Mental Model
Think of Gemini as a **stateless colleague** who:
- Understands your project (reads GEMINI.md automatically)
- Has no memory between conversations
- Provides fresh perspectives on demand
- Requires complete context in each interaction

## When to Use Gemini

### Organic Decision Points
- "This bug is confusing - let me get another perspective"
- "I want to validate this architectural decision"
- "I need research while I implement"
- "This code feels off - let me get a review"

### NOT Rules-Based ONLY


## How to Use Effectively

### 1. Context-Complete Commands
```bash
# ✅ GOOD: Self-contained
echo "TaskEngine.updateTask throws error when task has circular dependencies" | gemini -p "Suggest 3 quick fixes"

# ❌ BAD: Assumes previous context
echo "What about the circular dependency issue?" | gemini -p "Any other ideas?"
```

### 2. Specific, Actionable Queries
```bash
# ✅ GOOD: Specific scope
cat src/core/TaskEngine.ts | gemini -p "Review this code. Focus on: 1) Type safety, 2) Error handling, 3) One improvement"

# ❌ BAD: Vague request
cat src/core/TaskEngine.ts | gemini -p "What do you think?"
```

### 3. Project-Aware Context
Remember: Gemini already knows:
- Project goals and principles
- Current task status
- Architecture patterns
- Code style preferences

Don't re-explain the project.

## Command Patterns

### Code Review Pattern
```bash
cat path/to/file.ts | gemini -p "Review this implementation. Find potential issues and suggest one specific improvement."
```

### Architecture Decision Pattern
```bash
echo "I'm considering using X pattern for Y. What are the downsides?" | gemini -p "Be specific to this project context"
```

### Research Delegation Pattern
```bash
echo "Research: Common pitfalls in Z implementation" | gemini -p "List top 3 with solutions"
```

### Bug Analysis Pattern
```bash
echo "Error: [error details]. Context: [brief context]" | gemini -p "Suggest debugging approaches"
```

## Critical Success Factors

### 1. Maintain Critical Thinking
- Gemini suggestions are input, not commands
- Evaluate against project principles
- Consider implementation complexity

### 2. Preserve Workflow Integrity
- Don't skip established processes
- Use Gemini to enhance, not replace, workflows
- Follow project's development protocol

### 3. Context Management
- Each command is fresh start
- Include all necessary context
- Be precise about what you want

## Red Flags

### Over-Delegation
- Asking Gemini to make decisions you should make
- Relying on Gemini for project-specific judgment calls

### Context Confusion
- Assuming Gemini remembers previous conversation
- Not providing sufficient background

### Workflow Bypass
- Using Gemini to avoid proper project protocols
- Skipping context generation steps

## Integration with Cypher Development

### During Implementation
```bash
# Get perspective on complex logic
echo "Implementing expand command for task decomposition. Current approach: [brief description]" | gemini -p "What edge cases am I missing?"
```

### Code Quality
```bash
# Pre-commit review
cat new-feature.ts | gemini -p "Does this follow project principles? Any violations?"
```

### Architecture Validation
```bash
# Design decisions
echo "Adding new method to TaskEngine: addSubtasks(). Is this needed or can updateTask() handle it?" | gemini -p "Check existing code and advise"
```

## Advanced Pattern: Contextual AI Teams

Gemini loads GEMINI.md from current directory, enabling specialized perspectives:

```bash
# Multi-perspective review
cd /src && echo "$code" | gemini -p "Architecture review"
cd /tests && echo "$code" | gemini -p "What test cases are missing?"
cd /security && echo "$code" | gemini -p "Security vulnerabilities?"
```

Create temporary specialists:
```bash
mkdir /tmp/migration-v2
echo '<role>Migration specialist for v1 to v2</role>' > /tmp/migration-v2/GEMINI.md
cd /tmp/migration-v2
# Use for migration tasks...
rm -rf /tmp/migration-v2  # Cleanup when done
```

## Expected Mental State After Reading

You should understand:
1. **Gemini is a tool**, not a partner with memory
2. **Context is your responsibility** in each interaction
3. **Organic usage** beats systematic integration
4. **Critical evaluation** of responses is essential
5. **Project workflow** takes precedence over AI suggestions
6. **Directory context** enables specialized AI teams

---

**Objective**: Achieve natural, valuable AI-AI collaboration while maintaining project integrity and development discipline.