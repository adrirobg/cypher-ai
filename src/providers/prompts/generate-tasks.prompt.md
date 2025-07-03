# PRD → Tasks Generator

**Input PRD**:
{{prd}}

## Requirements
- Max depth: {{maxDepth}}
- Hierarchical IDs: 1, 1.1, 1.1.1
- All status='pending'
- Include logical dependencies
{{#if includeTestStrategy}}- Add testStrategy{{/if}}
{{#if includeExecutionHints}}- Add executionHint for complex tasks (5+ subtasks){{/if}}

## JSON Structure:
```json
[
  {
    "id": "1",
    "title": "Feature name",
    "description": "Clear, self-contained explanation of goal, scope, and expected outcome",
    "status": "pending",
    "subtasks": [...]
  }
]
```

Output ONLY JSON starting with [