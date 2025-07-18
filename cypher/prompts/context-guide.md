---
version: 1.0.0
type: guide
command: context
created: 2025-01-18
modified: 2025-01-18
tags: [core, context-building, execution-prep]
---

# Guía de Construcción de Contexto para Task {{task.id}}

## El Arte del Contexto Efectivo

El contexto no es información - es comprensión destilada. No recopiles todo;
extrae lo esencial.

## Proceso Optimizado de Recopilación

### Fase 1: Búsqueda Paralela de Fuentes (5 min)

**EJECUTA SIMULTÁNEAMENTE** (ahorra tiempo crucial):

```bash
# Terminal 1: Patrones y sabiduría previa
find cypher/patterns -name "*.md" -exec grep -A5 -B5 "{{keywords}}" {} \;

# Terminal 2: Experiencias pasadas
rg "{{keywords}}" cypher/cdd/*/retrospective.md --context 3

# Terminal 3: Código actual relevante
fd -e ts -e tsx . src/ -x grep -l "{{keywords}}" {} | head -20

# Terminal 4: Documentación si existe
fd README -e md . docs/ -x grep -l "{{keywords}}" {}
```

### Fase 2: Fuentes Externas (si aplica)

**¿Necesitas documentación de bibliotecas?**
```bash
# Usa Context7 para documentación actualizada
mcp context7 resolve-library "library-name"
mcp context7 get-docs "/org/library" --topic "{{keywords}}"
```

**¿El Supervisor tiene recursos?**
"¿Hay algún PR, issue, o documentación externa que deba revisar?"

### Fase 3: Síntesis Inteligente (3 min)

**Estructura tu context.md así:**

```markdown
# Contexto para {{task.title}}

## Comprensión del Problema
[1-2 párrafos que capturen la ESENCIA, no los detalles]

## Patrones Aplicables
- Pattern X (de patterns/x.md): [por qué aplica]
- Anti-pattern Y: [qué evitar y por qué]

## Código Relevante
- `src/module/file.ts`: [qué hace y por qué importa]
- Tests existentes: [qué cubren, qué falta]

## Decisiones Previas
- En task-123: "Decidimos X porque Y"
- Lección aprendida: "Z no funcionó debido a W"

## Consideraciones Especiales
[Restricciones, preferencias, contexto del negocio]
```

### Fase 4: Validación de Completitud

**Lista de verificación mental:**
- [ ] ¿Captura el "por qué" además del "qué"?
- [ ] ¿Incluye lecciones de tareas similares?
- [ ] ¿Es conciso pero completo?
- [ ] ¿Un nuevo colaborador entendería el contexto?

**Pregunta al Supervisor:**
"He recopilado contexto sobre X, Y, Z. ¿Hay algún aspecto crítico que no esté considerando?"

---

**Comienza la recopilación.** Muestra tu progreso para feedback temprano.