# TASK {{current.id}}: {{current.title}}

**Goal**: {{current.description}}
{{#if current.details}}**Details**: {{current.details}}{{/if}}
{{#if current.testStrategy}}**Test**: {{current.testStrategy}}{{/if}}

{{#if parent}}
## Parent Context ({{parent.id}})
{{parent.description}}
{{/if}}

## Siblings
{{siblingContext}}

## Dependencies
{{dependenciesContext}}

{{#if executionHint}}
## Execution Hint
{{#if (eq executionHint.strategy "supervisor-executor")}}**Strategy**: Create parallel subagents for ~{{executionHint.estimatedFiles}} files{{else}}**Strategy**: {{executionHint.strategy}}{{/if}}
{{#if executionHint.parallelizable}}**Parallelizable**: Yes{{/if}}
{{/if}}

---
**ACTION**: Implement Task {{current.id}}