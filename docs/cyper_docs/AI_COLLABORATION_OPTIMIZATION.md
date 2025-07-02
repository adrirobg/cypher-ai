# AI Collaboration: Resource Optimization Guide

## The Challenge

We've discovered powerful AI-AI collaboration patterns, but hit rate limits quickly. This guide optimizes resource usage while maintaining collaboration quality.

## Model Selection Strategy

### 1. Task-Based Model Selection
```bash
# Heavy analysis → Use pro models sparingly
echo "Complex architectural review..." | gemini --model gemini-2.5-pro

# Quick checks → Use flash models
echo "Is this syntax correct?" | gemini --model gemini-2.5-flash

# Simple validation → Use claude
echo "What is 2+2?" | claude
```

### 2. Model Capabilities

**Gemini CLI Models**

**Gemini 2.5 Pro** (`--model gemini-2.5-pro`)
- Best for: Complex reasoning, architecture decisions
- Cost: Higher, strict rate limits
- Use when: Critical decisions, deep analysis

**Gemini 2.5 Flash** (`--model gemini-2.5-flash`)
- Best for: Quick checks, syntax validation, simple reviews
- Cost: Lower, more generous limits
- Use when: Routine tasks, initial passes

**Claude CLI Models**

**Claude Opus** (`--model opus`)
- Best for: Deep reasoning, planning, architectural decisions
- Cost: Highest, very strict limits
- Use when: Complex analysis, critical decisions

**Claude Sonnet** (`--model sonnet`)
- Best for: Balanced performance, general tasks
- Cost: Medium, reasonable limits
- Use when: Standard development tasks

**Claude Haiku** (`--model haiku`)
- Best for: Fast responses, simple tasks
- Cost: Lowest, generous limits
- Use when: Quick checks, basic validation (when available)

**Model Hierarchy**:
- Claude Code (Opus): The orchestrator - plans, analyzes, delegates
- Claude/Gemini CLI: Specialized workers for specific tasks
- Flash/Haiku: High-volume, simple operations

### 3. Collaboration Patterns by Cost

**Pattern 1: Flash First, Pro Verify**
```bash
# Initial review with flash
echo "Review this code" | gemini --model gemini-2.5-flash

# If issues found, verify with pro
echo "Validate these security concerns..." | gemini --model gemini-2.5-pro
```

**Pattern 2: Claude Primary, Gemini Secondary**
```bash
# Main work with Claude
echo "Generate implementation" | claude

# Quick validation with Gemini Flash
echo "Check this implementation" | gemini --model gemini-2.5-flash
```

**Pattern 3: Batched Queries**
```bash
# Instead of multiple calls, batch questions
cat <<EOF | gemini --model gemini-2.5-flash -p "Answer all questions"
1. Is the syntax correct?
2. Any security issues?
3. Performance concerns?
EOF
```

### 4. Anti-patterns to Avoid

**❌ Recursive Loops**
```bash
# BAD: Can burn through quota instantly
while true; do
  echo "..." | gemini | gemini | claude
done
```

**❌ Using Pro for Simple Tasks**
```bash
# BAD: Waste of premium resources
echo "Format this JSON" | gemini --model gemini-2.5-pro
```

**❌ Parallel Flooding**
```bash
# BAD: Triggers rate limits
for file in *.ts; do
  echo "Review $file" | gemini &
done
```

### 5. Smart Caching Strategies

**Local Context Files**
```bash
# Cache analysis results
echo "Analyze architecture" | gemini > .analysis-cache/architecture.md

# Reuse instead of re-querying
cat .analysis-cache/architecture.md
```

**Decision Logs**
```bash
# Log important decisions
echo "Security review result..." >> decisions.log
```

### 6. Rate Limit Recovery

When hitting limits:
1. Switch models: `gemini-2.5-pro` → `gemini-2.5-flash`
2. Switch tools: `gemini` → `claude`
3. Use cached results
4. Implement exponential backoff
5. Batch future queries

### 7. Practical Workflow

**Morning (Fresh Quota)**
- Complex architectural decisions with Pro
- Deep security analysis
- Critical path work

**Afternoon (Conserve Quota)**
- Routine checks with Flash
- Use Claude for generation
- Reference morning's analysis

**Evening (Quota Exhausted)**
- Work from cached decisions
- Manual implementation
- Prepare batched queries for tomorrow

### 8. Emergency Fallbacks

When all AI tools are rate-limited:
1. Use local search: `rg`, `fd`, `grep`
2. Leverage IDE features
3. Reference documentation
4. Plan queries for when quota resets

## Key Principles

**Quality > Quantity**: One well-crafted query to the right model beats ten hasty queries. Think before you pipe.

**The Orchestrator Pattern**: Claude Code (Opus) acts as "The Chosen One" - the master orchestrator who:
1. Plans the overall strategy
2. Delegates specific tasks to appropriate models
3. Synthesizes results from multiple sources
4. Makes critical architectural decisions

This is why Opus limits are so strict - it's meant for orchestration, not execution.

## Integration with Cypher

Future Cypher commands could implement smart routing:
```bash
# Hypothetical future feature
cypher collaborate --auto-route "Review this code"
# Automatically picks best available model
```

Until then, we use these patterns manually, learning what works best for each use case.