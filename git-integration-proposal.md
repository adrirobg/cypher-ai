# Propuesta: Integración Git + Cypher

## Contexto
Durante Phase 3, identificamos que Cypher pierde información valiosa: los commits. Esta propuesta busca integrar el flujo de git de manera minimalista y orgánica.

## Propuesta

### 1. Captura Natural de Commits
Añadir `implementation.md` a los artefactos CDD:

```
cypher/cdd/task-123/
├── plan.md
├── context.md
├── implementation.md  (NUEVO)
└── retrospective.md
```

Contenido de implementation.md:
```markdown
# Implementation Log - Task 123

## Git Branch
`task-123-auth-implementation`

## Commits
- `abc123`: Initial auth service structure
- `def456`: Add JWT validation
- `ghi789`: Fix session edge case

## Implementation Notes
[Decisiones tomadas durante el desarrollo]
```

### 2. Guías Actualizadas
Modificar `planning-guide.md` para incluir:
- Decisión de si necesita rama propia
- Convención de nombres de rama

### 3. Conocimiento del Proyecto
Crear `cypher/project-rules/git-workflow.md` con:
- Convenciones de commits
- Flujo de ramas
- Integración con tareas

### 4. Comando Opcional
```bash
cypher commit task-123
# Guía interactiva para commit con task-id
```

## Preguntas para Validar

1. ¿Es implementation.md el lugar correcto o contamina CDD?
2. ¿Deberíamos capturar commits en tasks.json?
3. ¿El comando `cypher commit` es útil o over-engineering?
4. ¿Cómo mantener esto simple y opcional?

## Principios
- No automatizar la decisión, solo la captura
- Mantener opcional pero valioso
- Información donde es más útil (junto a la implementación)