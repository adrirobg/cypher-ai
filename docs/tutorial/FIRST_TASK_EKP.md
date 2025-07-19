# Your First Task with Cypher: Commands as Teachers

Welcome to the evolved Cypher experience. This tutorial will walk you through completing your first task using our "Commands as Teachers" philosophy.

## What's Different?

Traditional tools automate tasks. Cypher teaches you to execute them better through guided collaboration with AI.

## Prerequisites

1. Cypher installed and initialized in your project
2. An AI assistant (Claude, GPT, Gemini, etc.)
3. A task in your `cypher/tasks.json`

## Step 1: Start with Planning

Instead of jumping straight into coding, begin with collaborative planning:

```bash
$ cypher plan 1.1
```

What happens:
- Cypher presents you with a planning guide
- The guide includes search queries to find relevant patterns
- You and your AI orchestrator have a dialogue
- Together, you create a `cypher/cdd/1.1/plan.md`

**Key Insight**: The plan isn't generated FOR you - you create it TOGETHER with AI guidance.

### Example Planning Dialogue

```
AI: "I've analyzed task 1.1 'Create user authentication'. This appears to be a sequential implementation task, so I propose using Chain of Thought (CoT) approach. I found similar patterns in task-3.2 where JWT auth was implemented. Should we follow that pattern or do you have specific requirements?"

You: "Yes, but we need to support OAuth2 as well this time."

AI: "Understood. Let me update the plan to include both JWT and OAuth2 flows..."
```

## Step 2: Build Rich Context

Context is crucial for AI implementation. Don't skip this:

```bash
$ cypher context 1.1
```

The guide teaches you:
- What searches to run (in parallel for efficiency)
- How to synthesize findings
- What questions to ask
- How to structure the context document

### Pro Tips for Context Building

1. **Run searches in parallel** - The guide shows multiple search commands. Run them simultaneously in different terminals.

2. **Look for anti-patterns** - Previous retrospectives often contain "what NOT to do"

3. **Ask clarifying questions** - "Are there any security requirements not mentioned in the task?"

## Step 3: Execute Implementation

This is where you use your normal development tools. Cypher doesn't replace your workflow - it enhances it.

The context you built ensures:
- Your AI assistant understands project conventions
- Patterns from similar tasks are reused
- Past mistakes aren't repeated

### Making AI Prioritize Your Context

When working with your AI assistant, structure your prompt like this:

```markdown
# PRIORITY 1: Project-Specific Context
[Paste your context.md here]

# PRIORITY 2: Task Implementation
Please implement the user authentication system following the patterns above.

# IMPORTANT
The context above contains PROJECT-SPECIFIC patterns that OVERRIDE any general knowledge. Use the exact patterns shown, not generic implementations.
```

## Step 4: Validate Thoroughly

Don't just check if it works - ensure it works correctly:

```bash
$ cypher validate 1.1
```

The validation guide walks you through:
- Functional testing (unit, integration, lint, types)
- Quality checks (patterns, performance, security)
- Context verification (did we meet all objectives?)
- Documentation review

### Validation is a Loop

```
Run tests → Find issue → Fix → Re-run ALL tests → Repeat
```

Never run just the failing test - always validate the full suite.

## Step 5: Extract Knowledge

This is where Cypher truly shines - learning from every task:

```bash
$ cypher learn 1.1
```

The guide helps you:
- Identify reusable patterns
- Update existing guides with new insights
- Document lessons learned
- Evolve the system

### What Makes a Good Pattern?

Ask yourself:
- Will I face this situation again?
- Is this solution better than what we had?
- Can it be generalized beyond this specific case?

## Step 6: Research When Needed

For exploratory tasks, use the explore command:

```bash
$ cypher explore "OAuth2 implementation strategies"
```

This initiates a guided research session where you and AI:
- Identify authoritative sources
- Compare different approaches
- Document findings
- Create decision matrices

## Example: Complete Task Flow

Let's say you're implementing a user settings page:

```bash
# 1. Plan collaboratively
$ cypher plan 2.3
# → Creates cypher/cdd/2.3/plan.md through dialogue

# 2. Build context
$ cypher context 2.3
# → Searches for React patterns, existing components, design system
# → Creates cypher/cdd/2.3/context.md

# 3. Implement
# Use your IDE with the context to guide AI assistance

# 4. Validate
$ cypher validate 2.3
# → Run tests, check patterns, verify requirements

# 5. Update task
$ cypher update 2.3 status=done

# 6. Learn
$ cypher learn 2.3
# → Extract "Settings Page Pattern" to cypher/patterns/
# → Update React guide with new insights
```

## Common Pitfalls to Avoid

### 1. Skipping Context Building
"I'll just tell the AI what to build" → Generic, non-idiomatic code

### 2. Not Running Parallel Searches
Sequential searching takes 5x longer and breaks flow

### 3. Ignoring Past Lessons
The same mistakes repeated because retrospectives weren't consulted

### 4. Validating Only Happy Path
"It works on my machine" → Production issues

### 5. Not Extracting Patterns
Missing the opportunity to make the next task easier

## The Cypher Mindset

Remember:
- **Commands guide, they don't do** - You're in control
- **Context is king** - Invest time here
- **Learn continuously** - Every task improves the system
- **Collaborate, don't delegate** - Work WITH your AI, not through it

## Next Steps

1. Try the commands with a real task
2. Read the guides thoroughly - they contain deep wisdom
3. Contribute patterns back when you discover them
4. Share your retrospectives - they help everyone

## Getting Help

- Run `cypher plan` without arguments to see the planning guide
- Check `cypher/prompts/` for all available guides
- Read retrospectives in `cypher/cdd/*/retrospective.md` for real examples

Welcome to a new way of working - where every task makes you and the system smarter.

---

*"The best teacher is not the one who knows most, but the one who helps you discover most."*