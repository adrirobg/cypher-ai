Implementa la siguiente tarea actuando como Supervisor y creando sub-agentes con Task.

## ARQUITECTURA SUPERVISOR + SUB-AGENTES

Como **SUPERVISOR** (agente principal), debes:

1. **ANALIZAR** la tarea actual
2. **BUSCAR** en Context7 los recursos necesarios  
3. **CREAR** sub-agentes para implementar
4. **VALIDAR** el trabajo de los sub-agentes
5. **COMPLETAR** la tarea en Task Master

## FLUJO DE TRABAJO

### 1. Preparación (Supervisor)
```bash
npx task-master next
# Leer .taskmaster/tasks/task_XXX.txt
# Buscar en Context7 patrones necesarios
```

### 2. Crear Sub-agente CODER
```javascript
Task(description: "Implementar [descripción específica]",
     prompt: "Implementa [tarea] usando estos recursos de Context7:
              - [snippet 1]
              - [snippet 2]
              Requisitos: [detalles de la tarea]
              Cita fuentes con # From L[num]")
```

### 3. Crear Sub-agente REVIEWER
```javascript
Task(description: "Revisar código de [tarea]",
     prompt: "Verifica que:
              1. Se usaron los recursos de Context7
              2. Cumple requisitos: [lista]
              3. Sin sobre-ingeniería")
```

### 4. Finalizar (Supervisor)
```bash
npx task-master set-status --id=<id> --status=done
```

## PRINCIPIOS

- **Supervisor coordina**: Tú (Opus) analizas, buscas y diriges
- **Sub-agentes ejecutan**: Task (Sonnet) implementa y revisa
- **Context7 primero**: Buscar antes de crear sub-agentes
- **Contexto explícito**: Pasar recursos encontrados a sub-agentes
- **Proporcionalidad**: Solo lo que pide la tarea

## EJEMPLO MÍNIMO

```javascript
// Supervisor busca en Context7
context7.get_library_docs("/fastapi", "database setup")

// Supervisor crea sub-agente con recursos
Task(description: "Implementar conexión SQLite",
     prompt: "Crea database.py usando:
              [snippets de Context7]
              Con WAL mode habilitado")
// Supervisor valida usando la información de context7
```