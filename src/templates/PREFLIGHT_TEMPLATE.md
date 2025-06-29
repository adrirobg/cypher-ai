# TEMPLATE: Artefacto de Contexto Pre-Vuelo (Pre-flight Check)

Esta es la plantilla exacta para el artefacto de contexto que se genera para un agente de IA antes de que comience la implementación de una tarea.

**Objetivo de Diseño:** Máxima comprensión con el mínimo de tokens (~500 tokens). Estructura predecible y fácilmente parseable.

---

`# CONTEXTO DE IMPLEMENTACIÓN PARA LA TAREA: {{current.id}}`

`## 1. TU TAREA ESPECÍFICA: {{current.title}}`
`- **Descripción:** {{current.description}}`
`{{#if current.details}}`
`- **Detalles Técnicos:** {{current.details}}`
`{{/if}}`
`{{#if current.testStrategy}}`
`- **Estrategia de Test:** {{current.testStrategy}}`
`{{/if}}`

`---`

`## 2. OBJETIVO PRINCIPAL (Tarea Padre: {{parent.id}} - {{parent.title}})`
`- **Descripción General:** {{parent.description}}`

`---`

`## 3. CONTEXTO DEL PROYECTO (Tareas Hermanas)`
`{{#each parent.subtasks}}`
`{{#if (not (eq this.id ../current.id))}}`
`- **{{this.id}} - {{this.title}} (Status: {{this.status}})`
`{{/if}}`
`{{/each}}`

`---`

`## 4. DEPENDENCIAS (Input para tu tarea)`
`{{#if current.dependencies}}`
`{{#each current.dependencies}}`
`- **Depende de {{this}}:** Debes asumir que la funcionalidad de esta tarea ya está completada y disponible.`
`{{/each}}`
`{{else}}`
`- **Sin dependencias directas.** Eres el punto de partida para esta sección del trabajo.`
`{{/if}}`

`---`

`{{#if executionHint}}`
`## EXECUTION PATTERN HINT`

`{{#if executionHint.strategy}}`
`**Recommended Strategy**: {{executionHint.strategy}}`
`{{/if}}`

`{{#if (eq executionHint.strategy "supervisor-executor")}}`
`For optimal execution:`
`1. Act as SUPERVISOR, not direct implementer`
`2. Create subagents for file operations`
`3. Parallelize independent work`
`4. Trust subagent outputs`
`{{/if}}`

`{{#if executionHint.parallelizable}}`
`**Parallelizable**: This task can be broken into parallel phases`
`{{/if}}`

`{{#if executionHint.estimatedFiles}}`
`**Estimated Files**: ~{{executionHint.estimatedFiles}} files`
`{{/if}}`
`{{/if}}`

`---`

`**INSTRUCCIÓN:** Procede a implementar la Tarea {{current.id}}.`
