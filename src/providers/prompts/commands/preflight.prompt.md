# CONTEXTO DE IMPLEMENTACIÓN PARA LA TAREA: {{current.id}}

## 1. TU TAREA ESPECÍFICA: {{current.title}}
- **Descripción:** {{current.description}}
{{#if current.details}}
- **Detalles Técnicos:** {{current.details}}
{{/if}}
{{#if current.testStrategy}}
- **Estrategia de Test:** {{current.testStrategy}}
{{/if}}

---

{{#if parent}}
## 2. OBJETIVO PRINCIPAL (Tarea Padre: {{parent.id}} - {{parent.title}})
- **Descripción General:** {{parent.description}}

---
{{/if}}

## 3. CONTEXTO DEL PROYECTO (Tareas Hermanas)
{{siblingContext}}

---

## 4. DEPENDENCIAS (Input para tu tarea)
{{dependenciesContext}}

---

{{#if executionHint}}
## EXECUTION PATTERN HINT

{{#if executionHint.strategy}}
**Recommended Strategy**: {{executionHint.strategy}}
{{/if}}

{{#if (eq executionHint.strategy "supervisor-executor")}}
For optimal execution:
1. Act as SUPERVISOR, not direct implementer
2. Create subagents for file operations
3. Parallelize independent work
4. Trust subagent outputs
{{/if}}

{{#if executionHint.parallelizable}}
**Parallelizable**: This task can be broken into parallel phases
{{/if}}

{{#if executionHint.estimatedFiles}}
**Estimated Files**: ~{{executionHint.estimatedFiles}} files
{{/if}}
{{/if}}

---

**INSTRUCCIÓN:** Procede a implementar la Tarea {{current.id}}.
