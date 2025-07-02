# Contextual Claude: Extending the Directory-Based AI Pattern

## Discovery

Just as we discovered that Gemini CLI loads `GEMINI.md` from the current working directory, we propose extending this pattern to Claude Code itself. This creates **symmetric AI teams** where both Claude and Gemini can be specialized by directory context.

## Core Concept

```
Directory-Based AI Specialization:
├── src/
│   ├── CLAUDE.md    # "You are an implementation expert..."
│   └── GEMINI.md    # "Focus on code execution and testing..."
├── docs/
│   ├── CLAUDE.md    # "You are a technical writer..."
│   └── GEMINI.md    # "Help with examples and clarity..."
└── tests/
    ├── CLAUDE.md    # "You are a test architect..."
    └── GEMINI.md    # "Execute tests and verify coverage..."
```

## Patterns (Simplicity Emergence)

### 1. Hyper-localized Context (Cellular Specialization)
Each AI agent instantly specializes based on its working directory. A Claude in `src/core/` has different directives than one in `docs/`. Maximum relevance, minimum noise.

### 2. Symmetric Collaboration (Dialectic Teams)
Claude (thinker/reviewer) + Gemini (doer/executor) form natural teams. No orchestration needed - just organic tool usage based on local context.

### 3. Architecture by Convention (Zero Framework)
Simple rule: `if (exists('./CLAUDE.md')) use(it) else use('../CLAUDE.md')`. No registries, no configuration, just files.

## Anti-patterns to Avoid

### 1. Context Fragmentation (Tunnel Vision)
- **Risk**: Hyper-local agents lose global perspective
- **Mitigation**: Cascade pattern - local contexts extend, not replace

### 2. Configuration Drift
- **Risk**: Multiple CLAUDE.md files diverge over time
- **Mitigation**: Root as "constitution", locals as specializations

### 3. Over-specialization
- **Risk**: CLAUDE.md proliferation for every tiny directory
- **Mitigation**: Only create when true specialization needed

## Implementation Principles

### 1. Cascade Fallback
```
1. Check ./CLAUDE.md
2. Check ../CLAUDE.md
3. Continue up to root
4. Use root CLAUDE.md as base
```

### 2. Operational Transparency
Always declare which context is being used:
```
INFO: Using context from /project/src/core/CLAUDE.md
```

### 3. Root as Constitution
Root CLAUDE.md contains non-negotiable principles. Local files focus on directory-specific "how".

### 4. Simple Tooling
- `cypher check-contexts` - Audit coherence
- No complex sync mechanisms
- Let usage patterns emerge

## Practical Example

```bash
# In /src/providers/
echo "Reviewing provider architecture..." | gemini
# Uses /src/providers/GEMINI.md context

# Claude could similarly use /src/providers/CLAUDE.md
# Creating truly specialized AI teams per directory
```

## Why This Matters

This isn't just a technical change - it's a paradigm shift toward **organic computational systems**. Like a colony of ants building complex structures from simple local rules, our AI agents can form sophisticated collaboration patterns without central orchestration.

The beauty: it requires almost no code changes, just a simple path resolution update. The complexity emerges from usage, not architecture.

## Integration with Cypher

This pattern aligns perfectly with Cypher's philosophy:
- **Build, Don't Wrap**: We're not wrapping AI, we're composing it
- **AI-First**: Optimized for machine collaboration
- **Simplicity**: Convention over configuration

## Future Implications

1. **Recursive Collaboration**: A Claude in /docs could consult a Claude in /src
2. **Emergent Expertise**: Specialization happens through usage, not design
3. **Self-Organizing Teams**: AI agents form working relationships based on proximity

Remember: The goal isn't to build a framework. It's to establish a simple convention that allows complex behavior to emerge naturally.