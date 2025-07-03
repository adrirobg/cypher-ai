# Task Decomposer

**Task**: {{task.id}} - {{task.title}}
{{task.description}}

{{#if task._context}}
## Context
{{#if task._context.parentTask}}- **Parent**: {{task._context.parentTask.title}}{{/if}}
{{#if task._context.siblingTasks}}
### Sibling Patterns (study these):
{{#each task._context.siblingTasks}}- {{this.id}}: {{this.title}} ({{this.status}})
{{/each}}{{/if}}{{/if}}

## Cypher Rules
- Simplicity > Complexity
- Extend existing patterns
- No over-engineering

## Generate {{maxSubtasks}} subtasks as JSON:
```json
[
  {
    "id": "{{task.id}}.1",
    "title": "Clear action",
    "description": "Clear, self-contained explanation of goal, scope, and expected outcome",
    "status": "pending"{{#if includeTestStrategy}},
    "testStrategy": "How to verify"{{/if}}
  }
]
```

Output ONLY JSON starting with [