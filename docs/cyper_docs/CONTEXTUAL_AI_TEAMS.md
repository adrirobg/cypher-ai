# Contextual AI Teams: Directory-Based Specialization Discovery

## The Discovery

Gemini CLI loads `GEMINI.md` from the **current working directory**, not just project root. This enables directory-based AI specialization without any code or architecture.

## Core Mechanics

```bash
cd /project          # Loads /project/GEMINI.md (general collaborator)
cd /project/tests    # Loads /project/tests/GEMINI.md (test specialist)
cd /project/docs     # Loads /project/docs/GEMINI.md (documentation expert)
```

Each directory can have its own AI personality while **inheriting** project knowledge.

## Proven Experiments

### 1. Basic Context Switch
```bash
# From project root
echo "What is your role?" | gemini -p "One word"
# Output: "Collaborator"

# From docs directory with specialized GEMINI.md
cd docs && echo "What is your role?" | gemini -p "One word"  
# Output: "Specialist"
```

### 2. Knowledge Inheritance
Specialized Gemini retains project knowledge while adding domain expertise:
```bash
cd /project/src  # Has own GEMINI.md
echo "What project are you working on?" | gemini
# Still knows: "Cypher"
```

### 3. Multi-Perspective Analysis
Same question, different contexts, different insights:
```bash
# Implementation perspective
cd /src && echo "Main risk in updateTask?" | gemini
# "Race condition in read-modify-write pattern"

# Testing perspective  
cd /tests && echo "Main risk in updateTask?" | gemini
# "Silent data loss hard to detect in tests"
```

## High-Value Patterns (No Overengineering)

### 1. Natural Team Structure
```
/project/
├── GEMINI.md              # General collaborator
├── src/
│   └── GEMINI.md         # Implementation expert
├── tests/
│   └── GEMINI.md         # Edge case hunter
└── docs/
    └── GEMINI.md         # Clarity guardian
```

### 2. Temporary Specialists
```bash
# Create ad-hoc specialist
mkdir /tmp/security-audit
echo '<role>OWASP security auditor</role>' > /tmp/security-audit/GEMINI.md
cd /tmp/security-audit
# Use for specific task...
rm -rf /tmp/security-audit  # Clean up
```

### 3. Progressive Specialization
- `/src` - General implementation
- `/src/core` - Critical architecture
- `/src/core/security` - Security-specific concerns

## The Golden Rules

### DO:
- ✅ One GEMINI.md per major concern
- ✅ Keep roles focused but not overly specific
- ✅ Use temporary contexts for one-off tasks
- ✅ Let team structure emerge from project structure

### DON'T:
- ❌ Create GEMINI.md in every directory
- ❌ Build complex inheritance hierarchies
- ❌ Systematize which roles go where
- ❌ Over-specialize ("left-padding-optimizer")

## Real Example for Cypher

```bash
# Core engine specialist
echo '<role>Guardian of TaskEngine and data integrity</role>' > core/GEMINI.md

# Test architect
echo '<role>Edge case hunter focused on what breaks</role>' > tests/GEMINI.md

# Documentation guardian  
echo '<role>Keeper of project principles and specifications</role>' > docs/cyper_docs/GEMINI.md
```

## Revolutionary Implications

### 1. Zero-Configuration Teams
- No team management system
- No role definition framework
- Structure defines function

### 2. Organic Collaboration Scaling
```bash
# Multi-perspective code review
for dir in src tests security performance; do
  cd $dir && echo "$code" | gemini -p "Review from your perspective"
done
```

### 3. Project-Adapted Intelligence
The AI team naturally matches project structure. A microservices project would have different specialists than a monolith.

### 4. Cost-Free Experimentation
Creating a specialist costs nothing. Delete the GEMINI.md and they're gone. No cleanup, no configuration debt.

## Meta-Discovery: Team Architects

A GEMINI.md in `/team` directory could act as "team formation advisor":
```xml
<role>
Suggest optimal AI team structure based on project needs.
Prevent over-specialization.
</role>
```

## Integration with Claude Code

When using Claude Code with Gemini available:
```bash
# Get specialized perspective
cd /project/tests && echo "Generate test cases for TaskEngine" | gemini

# Use output in implementation
# Claude focuses on implementation while Gemini provided test scenarios
```

## Critical Insight

This isn't about "having multiple AIs". It's about:
1. **Cognitive diversity** emerging from structure
2. **Zero orchestration** overhead
3. **Context as configuration**
4. **Teams that adapt** to projects, not vice versa

## Anti-Overengineering Commitment

We will NOT create:
- Team management frameworks
- Role inheritance systems  
- Configuration generators
- Collaboration protocols

We WILL:
- Use organically when valuable
- Let structure guide specialization
- Keep roles simple and focused
- Delete specialists when done

---

**Bottom Line**: Directory-based AI specialization enables emergent, zero-overhead cognitive teams that scale with project complexity while maintaining complete simplicity.