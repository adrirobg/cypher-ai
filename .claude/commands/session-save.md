# Session Save Command

Guarda el contexto actual completo antes de /clear para poder recuperarlo después.

## Uso

```
/session-save
```

## Descripción

Este comando crea un archivo markdown de sesión que preserva:
- Contexto técnico y decisiones críticas
- Estado actual del desarrollo
- Próximos pasos y validaciones pendientes
- Context7 integration status
- Referencias a archivos clave

## Cuándo Usar

- **Antes de /clear:** Preservar contexto cuando se alcanza límite
- **Al finalizar sesión:** Guardar progreso para continuar mañana
- **Antes de cambiar tareas:** Preservar estado de tarea actual
- **Checkpoint importante:** Guardar estado tras análisis complejo

## Proceso de Guardado

### 1. Detectar Contexto Actual

```bash
# Identifica la tarea activa en Task Master
npx task-master next
npx task-master show <currentTaskId>

# Verifica estado del workspace
git status
git log --oneline -3
```

### 2. Capturar Contexto Técnico

- Current state y completed work
- Technical context y key decisions
- Context7 integration status
- Critical insights y pending validation

### 3. Documentar Estado Actual

- Files created/modified
- Next steps required
- Implementation gaps identified
- Validation points needed

### 4. Crear Archivo de Sesión

**Ubicación:** `.taskmaster/sessions/session-<timestamp>-<description>.md`

**Formato Markdown:**
```markdown
# Session Context: [Description]
**Date:** YYYY-MM-DD
**Focus:** [Main objective]

## Current State
- [Key technical status]
- [Integration points]
- [Completed work summary]

## Critical Insights
- [Key discoveries]
- [Technical decisions made]
- [Implementation gaps found]

## Next Steps Required
- [Immediate actions]
- [Validation points]
- [Testing requirements]

## Technical Context
- [Files modified/created]
- [Configuration changes]
- [Integration status]

## Session Recovery Instructions
[Specific guidance for LLM to continue work]
```

## Output del Comando

```
💾 Guardando contexto de sesión...

✅ Contexto capturado:
- Focus: TEP v2.3 optimization and Context7 integration
- Status: Optimization completed, ready for full test
- Key files: .claude/commands/task-enrich.md (optimized)
- Integration: Context7 MCP validated and working

📄 Sesión guardada: .taskmaster/sessions/session-2025-01-25-tep-v23-optimization.md

🎯 Para recuperar después de /clear:
   Usa: /session-recover

⚠️  Archivo markdown diseñado para consumo LLM
```

## Verificaciones Previas

Antes de guardar, el comando verifica:

1. **TodoWrite activos:** ¿Hay todos en memoria?
2. **TEP analysis:** ¿Existe archivo enriquecido?
3. **Task Master state:** ¿Cuál es la tarea actual?
4. **Git clean:** ¿Hay cambios sin commitear?
5. **Directorio sessions:** ¿Existe la estructura?

## Mejores Prácticas

### Antes de Guardar
```bash
# Commit cambios importantes
git add -A && git commit -m "WIP: progress checkpoint"

# Actualizar Task Master si es necesario
task-master update-subtask --id=X --prompt="current progress"
```

### Nombramiento de Sesiones
- **Automático:** `session-YYYY-MM-DD-HH:MM-task-<id>`
- **Descriptivo:** Include task number and status
- **Único:** Timestamp prevents conflicts

### Limpieza de Sesiones
```bash
# Limpiar sesiones antiguas (opcional)
find .taskmaster/sessions -name "*.json" -mtime +7 -delete
```

## Integración con Context Recovery

La sesión guardada debe ser compatible con `/context-recover`:
- **Formato estándar** para facilitar parsing
- **Información completa** para recuperación sin pérdida
- **Referencias válidas** a archivos TEP y Task Master
- **Instrucciones claras** para retomar el trabajo

## Casos de Uso Específicos

### 1. Análisis Largo Completado
```
Usuario: He terminado el análisis TEP, necesito /clear
Claude: /session-save
         "Sesión guardada. Análisis TEP preservado para implementación."
Usuario: /clear
```

### 2. Implementación a Medias
```
Usuario: Voy a tomar un descanso, guarda el progreso
Claude: /session-save
         "17 todos preservados, 5 completados. Estado listo para recuperar."
```

### 3. Cambio de Contexto
```
Usuario: Necesito cambiar a otra tarea urgente
Claude: /session-save
         "Contexto de Task 1 guardado. Puedes usar /context-recover después."
```

## Seguridad y Backup

- **No incluir** API keys o secretos
- **Referencias relativas** a archivos del proyecto
- **Backup automático** en git (si sessions/ está en .gitignore)
- **Compresión** para sesiones muy grandes (futuro enhancement)

---

**Objetivo:** Nunca perder progreso por límites de contexto.