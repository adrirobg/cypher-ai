# Project Rules Directory

Este directorio contiene reglas y convenciones específicas del proyecto que los agentes AI deben conocer y seguir.

## ¿Qué es project-rules?

Es un directorio donde se documentan las convenciones, workflows y decisiones específicas de ESTE proyecto que no son parte del framework Cypher en sí, sino de cómo este equipo ha decidido usarlo.

## Estructura

```
cypher/project-rules/
├── README.md                    # Este archivo
├── git-workflow.md             # Convenciones de git y branching
├── code-style.md               # Estándares de código (si difieren)
├── testing-strategy.md         # Estrategia de testing específica
└── deployment-process.md       # Proceso de deployment (si aplica)
```

## Cómo Funciona

1. **Para Humanos**: Documentación de referencia sobre convenciones del proyecto
2. **Para AI Agents**: Se pueden importar en CLAUDE.md o GEMINI.md usando:
   ```markdown
   # imports
   - cypher/project-rules/git-workflow.md
   - cypher/project-rules/code-style.md
   ```

## Principios

- **Específico del Proyecto**: Solo reglas de ESTE proyecto, no generalidades de Cypher
- **Evolutivo**: Se actualiza conforme el equipo toma decisiones
- **Opcional**: No todos los proyectos necesitan todas las reglas
- **Pragmático**: Solo documentar lo que realmente se usa

## Ejemplo de Uso

Cuando un AI agent necesita hacer un commit:
1. Lee `git-workflow.md` para conocer las convenciones
2. Aplica el formato correcto: `[task-123] feat: descripción`
3. Documenta el commit en `cypher/cdd/task-123/implementation.md`

## Diferencia con cypher/prompts/

- `cypher/prompts/`: Guías universales de CÓMO hacer las cosas (metodología)
- `cypher/project-rules/`: Convenciones específicas de ESTE proyecto (implementación)

La combinación de ambos permite que los AI agents trabajen de manera consistente con el equipo humano.