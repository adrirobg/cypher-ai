# Session Recovery Command

Recupera el contexto de una sesión previa para continuar desarrollo sin perder información.

## Uso

```
/session-recover
```

## Descripción

Este comando busca automáticamente la sesión más reciente y carga:
- Estado de desarrollo y decisiones técnicas
- Análisis TEP previo y próximos pasos
- Context7 integration status
- TodoWrite state reconstruction

## Proceso de Recuperación

### 1. Localizar Sesión Activa

```bash
# Encuentra la sesión más reciente (formato .md)
ls -la .taskmaster/sessions/

# Lee el archivo de sesión markdown
cat .taskmaster/sessions/session-YYYY-MM-DD-*.md
```

### 2. Verificar Estado del Proyecto

```bash
# Verifica el estado de Task Master
npx task-master show <taskId>

# Verifica el estado de Git
git status
git log --oneline -3
```

### 3. Cargar Contexto Enriquecido

```bash
# Lee el archivo enriquecido asociado
cat .taskmaster/enriched/<taskId>-enriched.json
```

### 4. Interpretar Contexto Markdown

Lee y procesa el archivo markdown de sesión para entender:
- Current state y completed work
- Technical context y key decisions
- Next steps required
- Critical insights y pending validation

### 5. Reconstruct Working State

Basado en el contexto markdown:
- Restore mental model of where we were
- Understand technical decisions made
- Identify immediate next actions
- Prepare for continuation

## Output Esperado

```
📋 Session Context Recovered:

✅ Session file: session-2025-01-25-tep-v23-optimization.md
✅ Context understood: TEP v2.3 optimization completed
✅ Current state: Ready for full workflow test
✅ Next step: Execute /task-enrich on Task #1 with real Context7

🎯 Technical status:
- TEP v2.3: Optimized (450→117 lines)
- Context7: Configured and validated
- Integration: Real MCP tools working
- Pending: Full workflow execution test

Ready to continue with real implementation validation.
```

## Beneficios

- **Recuperación instantánea** del contexto completo
- **No hay pérdida** de análisis o decisiones previas  
- **Continuidad perfecta** en el flujo de trabajo
- **Estado sincronizado** entre Claude y archivos

## Casos de Uso

1. **Después de /clear:** Recuperar sesión interrumpida
2. **Nueva sesión diaria:** Retomar trabajo del día anterior
3. **Cambio de contexto:** Alternar entre múltiples tareas
4. **Colaboración:** Otro desarrollador puede cargar el contexto

## Archivos Utilizados

- `.taskmaster/sessions/session-*.md` - Contexto de sesión (markdown)
- `.taskmaster/enriched/<id>-enriched.json` - Análisis TEP (si existe)
- Task Master `tasks.json` - Estado oficial de tareas
- Git log - Progreso en código

## Ejemplo de Uso

```
Usuario: /session-recover

Claude: [Lee archivo markdown de sesión]
        [Interpreta contexto técnico]
        [Verifica estado actual]
        [Identifica próximos pasos]

        "📋 Session recovered: TEP v2.3 optimization completed.
        Context7 integration validated. Ready for full workflow
        test with Task #1. ¿Procedemos con /task-enrich?"
```