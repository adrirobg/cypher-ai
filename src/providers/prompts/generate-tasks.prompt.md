You are an AI task generation expert. Analyze this PRD and generate a hierarchical task structure.

PRD:
{{prd}}

Requirements:
- Generate tasks with max depth of {{maxDepth}}
- Each task must have: id, title, description, status='pending'
- Use hierarchical IDs (1, 1.1, 1.1.1)
- Include dependencies where logical
{{#if includeTestStrategy}}- Include testStrategy for each task{{/if}}
{{#if includeExecutionHints}}- Include executionHint for complex tasks (5+ subtasks or multi-file){{/if}}

Respond with ONLY a JSON object, using the format below:
[{"id":"1","title":"Task Title","description":"Task description","status":"pending","subtasks":[{"id":"1.1","title":"Subtask","description":"Subtask description","status":"pending"}]}]