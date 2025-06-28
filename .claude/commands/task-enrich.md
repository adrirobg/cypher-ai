# /task-enrich

Enriquece la tarea actual de Task Master con consideraciones avanzadas para optimizar tu implementación.

**MODO DE PENSAMIENTO: Activa "think hard" para este análisis.**

## Principios de Enriquecimiento
- **Práctico sobre teórico**: Enfócate en lo que se necesita ahora, no en el futuro
- **Específico sobre genérico**: Topics de Context7 precisos, no genéricos
- **Simple sobre complejo**: Si dudas entre dos enfoques, elige el más simple
- **80/20**: Identifica el 20% de trabajo que dará 80% del valor

## Uso

```
/task-enrich
```

## Proceso

1. **Obtén la tarea actual**
   - Ejecuta `task-master show <id>` para ver los detalles de la tarea
   - Lee cuidadosamente la descripción y requisitos

2. **Reflexiona sobre estos aspectos clave**
   - ¿Qué tecnologías principales están involucradas?
   - ¿Qué documentación Context7 será útil? (usa `mcp__context7__resolve-library-id` para encontrar IDs)
   - ¿Cómo aplicarías TDD para esta tarea?
   - ¿Qué partes se pueden implementar en paralelo?

3. **Genera un artefacto enriquecido**
   - Crea un archivo en `.taskmaster/enriched/<task-id>-enriched.md`
   - Usa un formato markdown natural y legible
   - Incluye IDs de Context7, enfoque TDD y oportunidades de paralelización

4. **Usa el artefacto como fuente de código**
   - Ejecuta las consultas Context7 ANTES de escribir código
   - Copia y adapta los snippets obtenidos
   - No uses tu conocimiento base si Context7 tiene una versión más actual

## Formato Sugerido del Artefacto

```markdown
# Task Enrichment: [Título de la tarea]

## Análisis de la Tarea
[Breve resumen de lo que entiendes que hay que hacer]

## Tecnologías Identificadas
- [Tecnología 1]: `[Context7 ID]`
- [Tecnología 2]: `[Context7 ID]`

## Código a Obtener de Context7
Para implementar cada componente, PRIMERO obtén código actualizado:
- Para [componente]: Context7 `[ID]` topic: "[tema específico]" → Usa ese código
- Para [otro componente]: Context7 `[ID]` topic: "[tema específico]" → Usa ese código

## Enfoque TDD
1. **Tests primero**
   - [Test 1]: [qué debe verificar]
   - [Test 2]: [qué debe verificar]

2. **Implementación mínima**
   - [Qué implementar para pasar los tests]

3. **Refactoring**
   - [Mejoras a considerar después]

## Oportunidades de Paralelización
Después del setup inicial:
- **Agent A**: [Qué puede hacer en paralelo]
- **Agent B**: [Qué puede hacer en paralelo]
- **Punto de sincronización**: [Cuándo reunir resultados]
```

**Nota:** No añadas secciones adicionales. El artefacto termina en "Oportunidades de Paralelización".

## Recordatorio Importante

**Este es un momento de planificación y reflexión.** No implementes código todavía, solo genera el plan enriquecido que te guiará durante la implementación real.

El objetivo es que cuando llegue el momento de implementar, tengas un mapa claro con:
- Las mejores fuentes de documentación identificadas
- Un enfoque TDD estructurado
- Oportunidades de optimización mediante paralelización

Recuerda: "El TEP es una guía para el LLM, no una herramienta determinista."