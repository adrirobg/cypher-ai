# Auditoría de Documentación Cypher - Solicitud para Gemini

## Contexto
Estamos consolidando la documentación de Cypher después de implementar EKP v2 "Commands as Teachers". Necesito tu ayuda para auditar TODA la documentación existente y determinar qué preservar, qué actualizar y qué deprecar.

## Directorios a Auditar

### 1. `/docs/research/`
Por favor revisa TODOS los archivos .md en este directorio y subdirectorios.

### 2. `/docs/cyper_docs/` (sí, con typo)
Revisa TODOS los archivos .md, prestando especial atención a:
- Documentación de arquitectura
- Guías de uso
- Documentación técnica
- Workflows

## Objetivo de la Auditoría

### A. Clasificar cada archivo en una de estas categorías:

1. **PRESERVAR EN `docs/cypher-core/`**
   - Documentación fundamental que define la filosofía del proyecto
   - Guías esenciales que siguen siendo válidas
   - Documentación de arquitectura core

2. **ACTUALIZAR**
   - Documentación que menciona comandos deprecados (delegate, transmit, expand)
   - Guías que no reflejan el paradigma "Commands as Teachers"
   - Referencias a workflows antiguos

3. **DEPRECAR**
   - Documentación obsoleta sin valor histórico
   - Guías de comandos eliminados
   - Documentación duplicada o contradictoria

4. **INVESTIGAR**
   - Documentación cuyo propósito o relevancia no está clara

### B. Para cada archivo que requiera ACTUALIZACIÓN, especifica:
- Qué secciones están desactualizadas
- Qué cambios son necesarios (ej: "Reemplazar referencias a 'delegate' con 'plan'")
- Prioridad de actualización (Alta/Media/Baja)

### C. Identifica GAPS en la documentación:
- ¿Falta documentación sobre los nuevos comandos (plan, context, learn, validate)?
- ¿Falta documentación sobre el paradigma EKP v2?
- ¿Qué guías nuevas necesitamos crear?

## Información de Contexto

### Comandos ELIMINADOS:
- `delegate` → funcionalidad absorbida por `plan`
- `transmit` → funcionalidad en `context`
- `expand` → parte del diálogo de `plan`
- `research` → transformado en `explore` (pendiente implementación)

### Comandos NUEVOS (EKP v2):
- `plan` - Facilita diálogo de planificación
- `context` - Guía recopilación de contexto
- `learn` - Extrae conocimiento de tareas
- `validate` - Validación multi-capa
- `explore` (próximamente) - Guía de investigación

### Filosofía actual:
- "Commands as Teachers" - los comandos enseñan, no ejecutan
- "Organic Over Systematic" - diálogo sobre automatización
- Guías arquetípicas en `cypher/prompts/`

## Formato de Salida Solicitado

Por favor genera un archivo `docs-audit-results.md` con esta estructura:

```markdown
# Resultados de Auditoría de Documentación Cypher

## 1. Archivos a PRESERVAR en docs/cypher-core/
- [ ] archivo1.md - [Razón breve]
- [ ] archivo2.md - [Razón breve]

## 2. Archivos a ACTUALIZAR
### Alta Prioridad
- [ ] archivo.md
  - Cambios necesarios: [lista específica]
  - Secciones afectadas: [lista]

### Media Prioridad
[...]

### Baja Prioridad
[...]

## 3. Archivos a DEPRECAR
- [ ] archivo.md - [Razón]

## 4. Archivos a INVESTIGAR
- [ ] archivo.md - [Qué necesita clarificación]

## 5. GAPS Identificados
### Documentación Faltante Crítica
- [ ] Guía de migración de comandos antiguos a nuevos
- [ ] [otros gaps]

### Documentación Deseable
- [ ] [lista]

## 6. Recomendaciones
[Tus recomendaciones estratégicas para la documentación]
```

## Nota Final
Esta auditoría es crucial para que la documentación refleje la evolución del proyecto. Tu perspectiva externa y análisis sistemático nos ayudará a crear una base documental coherente y actualizada.

Gracias por tu ayuda detallada.