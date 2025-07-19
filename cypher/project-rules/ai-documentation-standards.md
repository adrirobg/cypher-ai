# AI Documentation Standards

## Core Principle

**All Cypher documentation is written FOR AI consumption, not human reading.** This fundamentally changes how we write.

## Optimization Rules

### 1. Token Economy
- **Front-load critical info** - AI attention degrades with length
- **Use lists over paragraphs** - 30% less tokens, same information
- **Eliminate filler words** - "basically", "essentially", "in order to"
- **Compress examples** - Show pattern once, reference thereafter

### 2. Structure for AI Parsing
```markdown
## Section Title
Key point: [single sentence summary]
Details:
- Point 1
- Point 2
```

### 3. Technical Precision
- **Explicit > Implicit** - State assumptions
- **Concrete > Abstract** - Use specific examples
- **Actionable > Descriptive** - "Do X" not "X should be done"

### 4. Context Optimization

#### What to Include
- Direct dependencies
- Exact file paths
- Specific commands
- Error patterns

#### What to Exclude
- Historical context (unless critical)
- Alternative approaches (unless comparing)
- Meta-commentary
- Redundant explanations

### 5. Maintenance Protocol
- **Version in header** - AI needs to know doc freshness
- **Last-updated date** - Critical for time-sensitive info
- **Deprecation warnings** - At document TOP

### 6. Tone Guidelines
- **Imperative mood** - "Create X" not "You should create X"
- **Zero ambiguity** - If two interpretations exist, clarify
- **No anthropomorphization** - AIs don't need encouragement

## Document Templates

### For Guides (prompts/)
```markdown
---
version: 1.0.0
updated: 2025-01-19
---
# [Role/Task]

Objective: [One sentence]

## Process
1. [Step]
2. [Step]

## Context Required
- File: path/to/file
- Previous: [what must exist]

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

### For Patterns
```markdown
# Pattern: [Name]

Problem: [One sentence]
Solution: [Code/approach]
When: [Conditions]
When NOT: [Anti-conditions]

Example:
```code
[Minimal example]
```
```

### For Rules
```markdown
# Rule: [Name]

MUST: [Requirement]
MUST NOT: [Prohibition]
Verification: [How to check]
```

## Size Limits
- Guides: <500 lines
- Patterns: <100 lines
- Rules: <50 lines
- If larger, split into referenced sub-documents

## Manifest Requirement

Every documentation directory MUST contain a `manifest.md` file that:
- Lists all documents with one-line purpose
- Provides navigation guidance
- Groups documents by category/purpose
- Updated when new docs added

Example:
```markdown
# Directory Manifest
Version: 1.0.0
Purpose: Index for AI navigation

## Documents
- `file1.md` - Purpose of file1
- `file2.md` - Purpose of file2
```

## Anti-Patterns
1. **Human-friendly formatting** - No ASCII art, decorative separators
2. **Explanatory preambles** - Start with the meat
3. **Nested complexity** - Max 3 levels deep
4. **Cross-references without paths** - Always include exact location
5. **Directories without manifests** - Every dir needs navigation

## Validation Checklist
Before committing any documentation:
- [ ] Would an AI with no context understand this?
- [ ] Is every word necessary?
- [ ] Are all paths and commands exact?
- [ ] Is the structure scannable?
- [ ] Could this be 20% shorter?

## Meta
This document itself follows these rules. It's 40% shorter than a human-oriented version would be.