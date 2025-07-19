---
version: 1.0.0
lastUpdated: 2025-01-19
---

# Guía de Exploración Multidimensional para {{task.title}}

## El Arte de la Investigación Moderna

La investigación efectiva no es buscar exhaustivamente - es saber dónde y cómo buscar. No automatices la curiosidad; guíala inteligentemente.

## Dimensiones de Exploración

### 1. Análisis del Problema (2 min)
Antes de buscar, comprende:
- ¿Qué estás realmente buscando? (implementación, patrón, solución a error)
- ¿Cuál es el contexto? (nueva feature, debug, refactor)
- ¿Qué nivel de actualidad necesitas? (últimas prácticas vs código estable)

### 2. Exploración Local - Tu Codebase (5 min)

**Estrategia en capas:**

```bash
# Capa 1: Búsqueda directa
glob "**/*{{keyword}}*" --exclude="node_modules,dist,build"

# Capa 2: Búsqueda semántica
grep -r "{{concepto}}" --include="*.ts" --include="*.js" -B2 -A2

# Capa 3: Búsqueda por patrones
# Si buscas validación: "**/validators/**" o "validate|validation"
# Si buscas API: "**/api/**" o "endpoint|route|controller"
# Si buscas tests: "*.test.ts" o "*.spec.ts"
```

**Preguntas guía:**
- ¿Ya existe algo similar en el proyecto?
- ¿Hay patrones establecidos que debas seguir?
- ¿Qué decisiones previas se tomaron sobre esto?

### 3. Conocimiento Actualizado - La Web (5 min)

**Búsqueda inteligente:**
```
"{{tecnología}} {{concepto}} best practices {{año_actual}}"
"{{tecnología}} {{versión}} breaking changes"
"{{problema}} site:stackoverflow.com answered:{{último_año}}"
```

**Fuentes prioritarias:**
1. Documentación oficial (siempre primero)
2. GitHub issues del proyecto
3. Blog posts de los maintainers
4. Stack Overflow (filtrar por fecha)

### 4. Documentación Profunda - MCP Context7 (3 min)

Para tecnologías soportadas, obtén:
- Snippets de código actualizados
- Configuraciones recomendadas
- Patrones y anti-patrones
- Migraciones y deprecaciones

### 5. Síntesis y Validación (5 min)

**Consolida tu investigación:**

```markdown
## Resumen de Exploración: {{tema}}

### Hallazgos Locales
- Implementaciones existentes: [lista]
- Patrones identificados: [lista]
- Decisiones previas relevantes: [lista]

### Estado Actual de la Tecnología
- Versión recomendada: X.Y.Z
- Approach moderno: [descripción]
- Deprecaciones importantes: [lista]

### Recomendación
[Tu síntesis: qué approach seguir y por qué]

### Próximos Pasos
1. [Acción concreta]
2. [Validación necesaria]
```

## Ejemplo de Exploración Efectiva

**Tarea**: "Implementar autenticación con JWT en Next.js"

```bash
# 1. Exploración local
> grep -r "auth\|Auth" --include="*.ts" 
# Encontrado: Ya hay un AuthContext básico

# 2. Búsqueda web actualizada
"Next.js 14 JWT authentication 2025"
# Descubrimiento: Next.js 14 recomienda NextAuth.js v5

# 3. Documentación oficial via MCP
# Confirmado: Nuevo patrón con App Router

# 4. Síntesis
- Tenemos base de auth que podemos extender
- NextAuth.js v5 es el estándar actual
- Necesitamos migrar de pages/ a app/
```

## Anti-Patrones a Evitar

- ❌ Buscar sin contexto ("authentication" → demasiado amplio)
- ❌ Ignorar el código existente (reinventar la rueda)
- ❌ Usar información desactualizada (tutoriales de 2020)
- ❌ Copiar sin entender (Stack Overflow sin análisis)

## Pregunta Final

"¿He encontrado no solo CÓMO implementar, sino POR QUÉ esta es la mejor opción para este proyecto específico?"

---

**Recuerda**: La mejor investigación no es la más exhaustiva, sino la más inteligente. Busca con propósito, no por completitud.