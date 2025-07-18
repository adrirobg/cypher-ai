---
version: 2.0.0
type: guide
command: learn
created: 2025-01-18
modified: 2025-01-18
tags: [core, evolution, knowledge-capture]
updates:
  - version: 2.0.0
    date: 2025-01-18
    changes: "Aligned with EKP v2 roadmap: added retrospective analysis, pattern markers, evolution log"
    source: EKP_v2_Commands_as_Teachers_Roadmap.md
---

# 🌱 Cypher Learn: Knowledge Evolution Guide

## Context
Task ID: {{task.id}}
Task Title: {{task.title}}
Dialogue Path: cypher/cdd/{{task.id}}/dialogue.md

## Your Mission: The Learning Cycle

Completing a task is the beginning, not the end. The true value lies in what we learn and how we evolve. You are about to extract wisdom from both the planning dialogue AND the retrospective to identify patterns, insights, and reusable knowledge that will make future tasks more effective.

## Materials for Analysis

### 1. Read the Original Plan
First, understand the initial strategy:
```
cypher/cdd/{{task.id}}/plan.md
```

### 2. Read the Retrospective
Then, analyze what actually happened:
```
cypher/cdd/{{task.id}}/retrospective.md
```

### 3. Review the Dialogue
Finally, understand the reasoning process:
```
cypher/cdd/{{task.id}}/dialogue.md
```

## Knowledge Distillation Process

### Phase 1: Identify Learning Candidates

**Actively search for:**
- **PATTERNS**: Reusable solutions discovered
- **MEJORAS (Improvements)**: More effective ways of doing things
- **ANTI-PATTERNS**: What definitely didn't work
- **GAPS**: What was missing in our planning

**Look for markers in the retrospective:**
- "Pattern:" → Candidate for cypher/patterns/
- "Mejora:" → Prompt update
- "Lección:" → Guide update
- "Problema:" → Anti-pattern to document

### Phase 2: Evaluate Impact and Applicability

For each candidate, ask:
1. Is it specific to this task or generalizable?
2. How many future tasks would benefit?
3. Does it contradict or improve existing knowledge?

### Phase 3: Propose Concrete Updates

#### For New Patterns:
```bash
# Create new pattern
echo "# Pattern: {{pattern_name}}" > cypher/patterns/{{pattern_name}}.md
# Document context, solution, when to apply, when NOT to apply
```

#### For Improving Existing Guides:
```bash
# Show proposed diff
diff cypher/prompts/planning-guide.md planning-guide-v2.md
```

#### For Evolving Role Prompts:
```yaml
# In file header
version: 1.1.0  # → 1.2.0
updates:
  - version: 1.2.0
    date: 2025-01-18
    changes: "Added validation step X based on task-{{task.id}}"
    source: task-{{task.id}}
```

### Phase 4: Document the Evolution

Create or update `cypher/knowledge/evolution-log.md`:
```markdown
## {{date}} - Task {{task.id}}
- Pattern extracted: {{pattern_name}}
- Guide improved: {{guide_name}} (v{{old}} → v{{new}})
- Key lesson: {{one_line_summary}}
```

## Learning Artifacts to Generate

### A. Pattern Documentation
If a reusable pattern emerged:
```
Path: cypher/patterns/[pattern-name].md
Content: 
  - Context where it applies
  - The solution approach
  - When to use it
  - When NOT to use it
  - Examples from this task
```

### B. Guide Updates
If an existing guide needs improvement:
```
Path: cypher/prompts/[guide-name].md
Action: 
  - Increment version
  - Add updates section in header
  - Integrate new insights into relevant sections
  - Preserve dialogue-first philosophy
```

### C. Learning Summary
Always create a comprehensive summary:
```
Path: cypher/cdd/{{task.id}}/learnings.md
Content: 
  - Key insights discovered
  - Patterns identified
  - Guide updates made
  - Anti-patterns to avoid
  - Future recommendations
```

## Examples

### Example 1: API Integration Pattern
After a task involving API integration, you might:
- Extract pattern: "Progressive API Integration" → `cypher/patterns/progressive-api-integration.md`
- Update `plan-guide.md` with API-specific planning considerations
- Log in `evolution-log.md`: "Discovered progressive integration reduces risk"
- Document in `learnings.md` the specific challenges and solutions

### Example 2: Complex Refactoring Strategy
After a major refactoring task:
- Extract pattern: "Incremental Refactoring with Safety Nets" → `cypher/patterns/safe-refactoring.md`
- Update `dialogue-template.md` with refactoring-specific questions
- Add anti-pattern: "Big Bang Refactoring" to patterns documentation
- Update evolution log with lessons about maintaining system stability

## Remember

- **Evolution, not revolution**: Small, incremental improvements compound over time
- **Practical over theoretical**: Focus on what actually helped in real execution
- **Context is king**: Always explain WHY something worked or didn't work
- **Test your updates**: Ensure guides remain clear, actionable, and dialogue-focused
- **Preserve the philosophy**: Maintain the collaborative, organic nature of Cypher

## Final Question

After completing your analysis and proposing updates:

"Is there any subtle lesson or insight we haven't captured? Any emergent wisdom from the dialogue itself?"

---

**Begin the analysis.** Present learning candidates for discussion, starting with the most impactful patterns you've identified.