---
version: 1.0.0
type: guide
command: validate
created: 2025-01-18
modified: 2025-01-18
tags: [core, quality-assurance, validation]
---

# Guía de Validación Exhaustiva - Task {{task.id}}

## Validación como Arte

Validar no es solo verificar que funciona - es asegurar que funciona 
correctamente, elegantemente, y continuará funcionando.

## Proceso de Validación Multi-Capa

### Capa 1: Validación Funcional (ReAct Loop)

**Ejecuta sistemáticamente:**

```bash
# 1. Tests unitarios
npm test -- --coverage

# 2. Tests de integración si existen  
npm run test:integration

# 3. Linting y formato
npm run lint
npm run format:check

# 4. Type checking
npm run typecheck
```

**Para cada fallo:**
- Analiza la causa raíz
- Corrige
- Re-ejecuta TODO (no solo el test que falló)

### Capa 2: Validación de Calidad

**Code Review Checklist:**
- [ ] ¿Sigue los patrones establecidos del proyecto?
- [ ] ¿Es consistente con código circundante?
- [ ] ¿Los nombres son claros y descriptivos?
- [ ] ¿Hay código duplicado que podría extraerse?
- [ ] ¿Los edge cases están manejados?

**Performance Check:**
```bash
# Si aplica, ejecuta benchmarks
npm run benchmark -- --compare
```

### Capa 3: Validación de Contexto

**Verifica contra el plan original:**
- [ ] ¿Se cumplieron todos los objetivos?
- [ ] ¿Se respetaron las restricciones?
- [ ] ¿Se implementaron las consideraciones especiales?

**Busca efectos secundarios:**
```bash
# Busca usos del código modificado
rg "{{modified_function}}" --type ts

# Verifica que no rompimos nada
npm run test:all
```

### Capa 4: Validación de Documentación

- [ ] ¿El código es auto-documentado?
- [ ] ¿Los cambios complejos tienen comentarios?
- [ ] ¿Se actualizó el README si fue necesario?
- [ ] ¿Los tipos TypeScript son informativos?

### Reporte de Validación

Estructura tu reporte así:
```markdown
## Validación Completa ✓

### Funcional
- Tests: 48/48 passing, 92% coverage
- Lint: 0 errores, 0 warnings
- Types: No errors

### Calidad  
- Patrones: Consistente con arquitectura
- Performance: Sin regresiones
- Seguridad: Sin vulnerabilidades detectadas

### Contexto
- Objetivos: 100% cumplidos
- Extras: Mejorado manejo de errores

### Documentación
- Código: Auto-explicativo con tipos claros
- README: Actualizado con nueva funcionalidad
```

### Proceso ReAct de Corrección

Si encuentras problemas:

```
THOUGHT: El test X falla porque espera Y pero recibe Z
ACTION: Revisar implementación de función F
OBSERVATION: La función no maneja el caso edge E
ACTION: Añadir manejo de caso edge
RESULT: Test pasa, verificar que no rompimos otros tests
```

### Pregunta Final de Validación

"¿Hay algún escenario, por improbable que sea, donde este código podría fallar?"

---

**Inicia la validación.** Ejecuta las verificaciones sistemáticamente y reporta hallazgos.