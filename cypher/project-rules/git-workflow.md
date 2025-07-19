# Git Workflow para Proyecto Cypher

## Convenciones de Branches

### Nomenclatura
- **Features**: `feature/<descripcion-corta>`
- **Tareas específicas**: `task-<id>-<descripcion>` (para tareas complejas)
- **Fixes**: `fix/<descripcion-del-bug>`
- **Docs**: `docs/<que-se-documenta>`
- **Refactor**: `refactor/<que-se-refactoriza>`

### Ejemplos
```bash
feature/add-explore-command
task-123-implement-auth-flow
fix/task-engine-null-check
docs/update-architecture
refactor/simplify-cli-commands
```

## Convenciones de Commits

### Formato Básico
```
tipo: descripción concisa

[Cuerpo opcional con más detalles]

[Referencias a tareas si aplica]
```

### Tipos de Commit
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `refactor`: Cambios que no añaden features ni arreglan bugs
- `docs`: Solo documentación
- `test`: Solo tests
- `chore`: Tareas de mantenimiento (deps, config, etc)

### Commits con Task ID
Cuando trabajas en una tarea específica:
```
[task-123] feat: implement JWT validation

- Added token validation middleware
- Updated auth service tests
- Fixed edge case with expired tokens
```

## Integración con Cypher CDD

### Documentar Implementación
Al trabajar en una tarea, crear/actualizar:
`cypher/cdd/task-<id>/implementation.md`

```markdown
# Implementation Log - Task 123

## Git Branch
`task-123-auth-implementation`

## Commits
- `abc123`: Initial auth service structure
- `def456`: Add JWT validation
- `ghi789`: Fix session edge case

## Implementation Notes
- Decidí usar bcrypt en lugar de argon2 por compatibilidad
- El middleware se aplica globalmente excepto en /health
```

## Flujo de Trabajo Típico

### 1. Iniciar Tarea
```bash
# Para tareas simples
git checkout -b feature/nombre-descriptivo

# Para tareas complejas con múltiples commits esperados
git checkout -b task-123-auth-implementation
```

### 2. Durante el Desarrollo
- Commits atómicos y frecuentes
- Mensajes descriptivos
- Actualizar implementation.md con commits importantes

### 3. Finalizar Tarea
```bash
# Asegurar que implementation.md está actualizado
# Hacer push de la rama
git push origin task-123-auth-implementation

# Crear PR con referencia a la tarea
```

## Reglas Específicas del Proyecto

1. **No reescribir historia** una vez pushed (no rebase, no amend)
2. **Commits atómicos**: Cada commit debe ser funcional por sí mismo
3. **Documentar decisiones**: Si un commit toma una decisión importante, explicar en el mensaje
4. **Tests con features**: Los features nuevos deben incluir tests en el mismo commit o el siguiente

## Para AI Agents

Al trabajar en una tarea:
1. Verificar si necesita su propia rama (>3 commits esperados)
2. Usar nomenclatura consistente
3. Documentar commits en implementation.md
4. Incluir task ID en mensajes cuando sea relevante