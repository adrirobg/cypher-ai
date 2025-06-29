# EXECUTION PATTERNS: Mejores Prácticas para Implementación

## Cuándo Usar Cada Patrón

### Direct Execution (Default)
- Tareas de 1-2 archivos
- Cambios simples en archivos existentes
- Tareas de análisis o lectura

### Supervisor-Executor Pattern
- Tareas de 3+ archivos
- Creación de múltiples comandos
- Implementación de features completas
- Cuando ves subtareas paralelizables

## Ejemplo Práctico

### Task Complexity Analysis
```
Files a crear/modificar: 5
Dependencias entre archivos: Baja
Trabajo paralelizable: Sí
→ Usar: supervisor-executor
```

### Prompt para Supervisor
```
You are a SUPERVISOR. Your role:
1. Analyze the task
2. Create subagents for implementation
3. Parallelize where possible
4. Integrate results

DO NOT implement directly. DELEGATE all file operations.
```

## Anti-Patterns
- ❌ Supervisor leyendo/escribiendo archivos
- ❌ Re-implementar lo que subagentes crearon
- ❌ Crear subagentes para tareas triviales
- ❌ No paralelizar trabajo independiente

## Quick Reference
| Complejidad | Archivos | Patrón |
|------------|----------|---------|
| Simple | 1-2 | Direct |
| Media | 3-5 | Supervisor opcional |
| Alta | 5+ | Supervisor recomendado |