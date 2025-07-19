# Phase 3: Auditoría de Comandos Existentes

## Inventario Completo de Comandos

### Categoría 1: Comandos Heredados (El Pasado)
Representan el paradigma "orquestación automatizada" - incompatibles con EKP v2

| Comando | Archivo | Propósito Actual | Acción | Justificación |
|---------|---------|------------------|---------|---------------|
| `delegate` | `delegate.ts` | Delegar trabajo a otro agente | **Deprecar** | Elimina el diálogo colaborativo |
| `transmit` | `transmit.ts` | Transmitir contexto/prompts | **Deprecar** | Modelo transaccional vs conversacional |
| `expand` | `expand.ts` | Expandir tarea en subtareas | **Deprecar** | Lógica movida a planning guide |
| `research` | `research.ts` | Investigar con herramientas | **Transformar** → `explore` | Convertir en guía de exploración |

### Categoría 2: Comandos Guía (El Futuro - EKP)
Encarnación perfecta de "Commands as Teachers"

| Comando | Archivo | Propósito | Estado | Observaciones |
|---------|---------|-----------|---------|---------------|
| `plan` | `plan.ts` | Facilitar diálogo de planificación | ✅ Implementado | Núcleo del EKP |
| `context` | `context.ts` | Guiar recopilación de contexto | ✅ Implementado | Co-creación de contexto |
| `learn` | `learn.ts` | Extraer conocimiento de tareas | ✅ Implementado | Evolución del sistema |
| `validate` | `validate.ts` | Validación multi-capa | ✅ Implementado | Calidad exhaustiva |

### Categoría 3: Comandos de Soporte (Neutrales)
Utilidades básicas necesarias para el funcionamiento

| Comando | Archivo | Propósito | Acción | Justificación |
|---------|---------|-----------|---------|---------------|
| `add-task` | `add-task.ts` | Crear nueva tarea | **Mantener** | CRUD básico necesario |
| `list` | `list.ts` | Listar tareas | **Simplificar** | Info retrieval básico |
| `show` | `show.ts` | Mostrar detalle de tarea | **Simplificar** | Info retrieval básico |
| `update` | `update.ts` | Actualizar tarea | **Mantener** | Modificación necesaria |
| `next` | `next.ts` | Mostrar siguiente tarea | **Simplificar** | Solo mostrar siguiente |
| `validate-structure` | `validate-structure.ts` | Validar estructura del proyecto | **Mantener** | Herramienta de mantenimiento |
| `setup-project` | `setup-project.ts` | Inicializar proyecto Cypher | **Mantener** | Bootstrapping necesario |

### Categoría 4: Infraestructura
| Archivo | Propósito | Estado |
|---------|-----------|---------|
| `base/GuideCommand.ts` | Clase base para comandos guía | ✅ Implementado |

## Plan de Acción

### 1. Comandos a Deprecar (con ceremonia)
- [ ] Crear `cypher/legacy/` para preservar el código
- [ ] Documentar lecciones aprendidas de cada comando
- [ ] Crear guías de migración para usuarios

### 2. Nuevo Comando `explore` 
Transformar `research` en comando guía:
```typescript
// src/commands/explore.ts
export class ExploreCommand extends GuideCommand {
  protected guideName = 'explore';
  protected description = 'Guía para exploración contextual de código';
}
```

### 3. Simplificación de Comandos Info
Implementar `InfoCommand` universal para:
- `list`, `show`, `next`

### 4. Timeline
- **Día 1**: Deprecación ceremonial + comando `explore`
- **Día 2**: Simplificación comandos info + script migración

## Métricas de Éxito
- ✅ Claridad filosófica: Todos los comandos siguen EKP v2
- ✅ Preservación del conocimiento: Lecciones documentadas
- ✅ Transición suave: Guías de migración disponibles