2 Implementation Roadmap: Commands as Teachers

## Filosofía Fundamental: Un Cambio de Paradigma

### De Ejecutores a Maestros

Los comandos de Cypher no son herramientas que hacen trabajo - son maestros que te enseñan a trabajar mejor. Cada comando es un catalizador de diálogo, una guía de proceso, un profesor silencioso.

**Paradigma Antiguo**: `cypher generate-context` → *genera contexto automáticamente*  
**Paradigma Nuevo**: `cypher context` → *te enseña CÓMO generar contexto efectivo*

### Principios de Diseño

1. **Simplicidad Radical**: Cada comando hace UNA cosa: presentar una guía
2. **Inteligencia en Prompts**: La complejidad vive en los arquetipos, no en el código
3. **Diálogo sobre Automatización**: Facilitar conversación, no reemplazarla
4. **Evolución Continua**: Los prompts mejoran con cada uso

## Arquitectura del Sistema

```
cypher/
├── prompts/                    # Guías arquetípicas (la inteligencia del sistema)
│   ├── planning-guide.md       # Cómo planificar efectivamente
│   ├── context-guide.md        # Cómo construir contexto rico
│   ├── learning-guide.md       # Cómo extraer conocimiento
│   ├── validation-guide.md     # Cómo validar exhaustivamente
│   └── debugging-guide.md      # Cómo debuggear sistemáticamente
├── patterns/                   # Sabiduría consolidada
│   ├── react-component.md      # Patrón para componentes React
│   ├── api-endpoint.md         # Patrón para endpoints
│   └── error-handling.md       # Patrón para manejo de errores
└── cdd/                       # Instancias de diálogo
    └── <task-id>/
        ├── plan.md            # Plan consensuado
        ├── context.md         # Contexto recopilado
        ├── prompts.md         # Prompts específicos
        └── retrospective.md   # Aprendizajes
```

## Fase 1: Fundación Minimalista (2 días)

### Objetivo
Crear la estructura base y el primer comando-maestro como prueba de concepto.

### Task 1.1: Crear Estructura de Conocimiento

```bash
# Crear directorios arquetípicos
mkdir -p cypher/prompts
mkdir -p cypher/patterns
mkdir -p cypher/knowledge

# Crear README explicativo
cat > cypher/prompts/README.md << 'EOF'
# Prompts Arquetípicos

Estas guías son el corazón inteligente de Cypher. Cada archivo es un maestro 
que enseña cómo ejecutar un proceso específico de manera óptima.

## Principios
- Guiar, no automatizar
- Enseñar el "por qué" junto con el "cómo"
- Evolucionar con cada uso

## Versionado
Cada guía incluye metadatos de versión en su header YAML.
EOF
```

### Task 1.2: Implementar el Patrón Base para Comandos

Crear `src/commands/base/GuideCommand.ts`:

```typescript
import { Command } from 'commander';
import { TaskEngine } from '../../core/TaskEngine';
import { readFile } from 'fs/promises';
import { join } from 'path';

export abstract class GuideCommand {
  protected abstract guideName: string;
  protected abstract description: string;

  createCommand(): Command {
    return new Command(this.guideName)
      .description(this.description)
      .argument('<taskId>', 'ID de la tarea')
      .action(async (taskId) => {
        await this.executeGuide(taskId);
      });
  }

  private async executeGuide(taskId: string): Promise<void> {
    // 1. Obtener tarea
    const engine = new TaskEngine();
    const task = await engine.getTaskById(taskId);
    
    if (!task) {
      console.error(`Tarea ${taskId} no encontrada`);
      return;
    }

    // 2. Cargar guía arquetípica
    const guidePath = join('cypher', 'prompts', `${this.guideName}-guide.md`);
    const guideContent = await readFile(guidePath, 'utf-8');

    // 3. Reemplazar tokens
    const formatted = this.formatGuide(guideContent, task);

    // 4. Presentar y terminar
    console.log(formatted);
  }

  private formatGuide(guide: string, task: any): string {
    return guide
      .replace(/{{task\.id}}/g, task.id)
      .replace(/{{task\.title}}/g, task.title)
      .replace(/{{task\.description}}/g, task.description)
      .replace(/{{keywords}}/g, this.extractKeywords(task));
  }

  private extractKeywords(task: any): string {
    // Extraer palabras clave de título y descripción
    const text = `${task.title} ${task.description}`.toLowerCase();
    const words = text.match(/\b\w{4,}\b/g) || [];
    return [...new Set(words)].join('|');
  }
}
```

### Task 1.3: Crear el Primer Comando-Maestro: `cypher plan`

Crear `src/commands/plan.ts`:

```typescript
import { GuideCommand } from './base/GuideCommand';

class PlanCommand extends GuideCommand {
  protected guideName = 'planning';
  protected description = 'Guía el proceso de planificación colaborativa';
}

export const planCommand = new PlanCommand().createCommand();
```

Crear `cypher/prompts/planning-guide.md`:

```markdown
---
version: 1.0.0
lastUpdated: 2025-01-07
---

# Guía de Planificación para Task {{task.id}}: {{task.title}}

## Descripción
{{task.description}}

## Tu Rol como Orquestador

Facilita un diálogo colaborativo para crear un plan preciso y ejecutable. 
No automatices - guía la conversación.

## Proceso de Planificación Efectiva

### Fase 1: Análisis y Búsqueda de Sabiduría (5 min)

**Análisis Cognitivo**
- ¿Qué tipo de problema es? → Determina modo cognitivo
  - Exploración/Decisión → Tree of Thoughts
  - Proceso secuencial → Chain of Thought
  - Desarrollo iterativo → ReAct

**Búsqueda de Conocimiento Previo**
Ejecuta estas búsquedas EN PARALELO para eficiencia:

```bash
# Buscar tareas similares
find cypher/cdd -name "retrospective.md" -exec grep -l "{{keywords}}" {} \;

# Buscar patrones aplicables  
ls cypher/patterns/*.md | xargs grep -l "{{keywords}}"

# Examinar código relevante
fd -t f -e ts -e tsx . src/ | xargs grep -l "{{keywords}}" | head -10
```

### Fase 2: Propuesta Inicial (3 min)

Basándote en tu análisis, propón:
1. Estrategia cognitiva y justificación
2. Descomposición en sub-tareas si aplica
3. Referencias a conocimiento previo encontrado
4. Riesgos o consideraciones especiales

Ejemplo:
"Para esta tarea de refactorización, propongo usar CoT para el análisis inicial
y ReAct para la implementación. Encontré un patrón similar en task-4.2..."

### Fase 3: Diálogo y Refinamiento

**Preguntas clave para el Supervisor:**
- ¿Hay restricciones no mencionadas?
- ¿Qué aspectos son prioritarios?
- ¿Hay preferencias de implementación?

**Creación incremental de artefactos:**
- No crees archivos hasta tener consenso
- Comienza con plan.md una vez acordado
- Añade context.md cuando sea necesario
- prompts.md solo si hay delegación

### Fase 4: Validación Final

Antes de cerrar la planificación:
- [ ] ¿El plan es claro y ejecutable?
- [ ] ¿Captura todas las preocupaciones del Supervisor?
- [ ] ¿Referencias el conocimiento previo relevante?
- [ ] ¿Los artefactos son mínimos pero suficientes?

---

**Inicia el diálogo ahora.** Comienza con tu análisis y propuesta inicial.
```

## Fase 2: Comandos Esenciales (3 días)

### Task 2.1: Comando `cypher context` - El Maestro de Recopilación

Crear `cypher/prompts/context-guide.md`:

```markdown
---
version: 1.0.0
lastUpdated: 2025-01-07
---

# Guía de Construcción de Contexto para Task {{task.id}}

## El Arte del Contexto Efectivo

El contexto no es información - es comprensión destilada. No recopiles todo;
extrae lo esencial.

## Proceso Optimizado de Recopilación

### Fase 1: Búsqueda Paralela de Fuentes (5 min)

**EJECUTA SIMULTÁNEAMENTE** (ahorra tiempo crucial):

```bash
# Terminal 1: Patrones y sabiduría previa
find cypher/patterns -name "*.md" -exec grep -A5 -B5 "{{keywords}}" {} \;

# Terminal 2: Experiencias pasadas
rg "{{keywords}}" cypher/cdd/*/retrospective.md --context 3

# Terminal 3: Código actual relevante
fd -e ts -e tsx . src/ -x grep -l "{{keywords}}" {} | head -20

# Terminal 4: Documentación si existe
fd README -e md . docs/ -x grep -l "{{keywords}}" {}
```

### Fase 2: Fuentes Externas (si aplica)

**¿Necesitas documentación de bibliotecas?**
```bash
# Usa Context7 para documentación actualizada
mcp context7 resolve-library "library-name"
mcp context7 get-docs "/org/library" --topic "{{keywords}}"
```

**¿El Supervisor tiene recursos?**
"¿Hay algún PR, issue, o documentación externa que deba revisar?"

### Fase 3: Síntesis Inteligente (3 min)

**Estructura tu context.md así:**

```markdown
# Contexto para {{task.title}}

## Comprensión del Problema
[1-2 párrafos que capturen la ESENCIA, no los detalles]

## Patrones Aplicables
- Pattern X (de patterns/x.md): [por qué aplica]
- Anti-pattern Y: [qué evitar y por qué]

## Código Relevante
- `src/module/file.ts`: [qué hace y por qué importa]
- Tests existentes: [qué cubren, qué falta]

## Decisiones Previas
- En task-123: "Decidimos X porque Y"
- Lección aprendida: "Z no funcionó debido a W"

## Consideraciones Especiales
[Restricciones, preferencias, contexto del negocio]
```

### Fase 4: Validación de Completitud

**Lista de verificación mental:**
- [ ] ¿Captura el "por qué" además del "qué"?
- [ ] ¿Incluye lecciones de tareas similares?
- [ ] ¿Es conciso pero completo?
- [ ] ¿Un nuevo colaborador entendería el contexto?

**Pregunta al Supervisor:**
"He recopilado contexto sobre X, Y, Z. ¿Hay algún aspecto crítico que no esté considerando?"

---

**Comienza la recopilación.** Muestra tu progreso para feedback temprano.
```

### Task 2.2: Comando `cypher learn` - El Maestro de Evolución

Crear `cypher/prompts/learning-guide.md`:

```markdown
---
version: 1.0.0
lastUpdated: 2025-01-07
---

# Guía de Extracción de Conocimiento - Task {{task.id}}

## El Ciclo de Aprendizaje

Completar una tarea es el comienzo, no el fin. El verdadero valor está en
lo que aprendemos y cómo evolucionamos.

## Materiales de Análisis

### Plan Original
```
{{plan_content}}
```

### Retrospectiva
```
{{retrospective_content}}
```

## Proceso de Destilación de Conocimiento

### Fase 1: Identificar Candidatos de Aprendizaje

**Busca activamente:**
- **PATRONES**: Soluciones reutilizables descubiertas
- **MEJORAS**: Formas más efectivas de hacer las cosas  
- **ANTI-PATRONES**: Lo que definitivamente no funcionó
- **GAPS**: Lo que faltó en nuestra planificación

**Marcadores en retrospectiva:**
- "Pattern:" → Candidato para cypher/patterns/
- "Mejora:" → Actualización de prompts
- "Lección:" → Actualización de guías
- "Problema:" → Anti-patrón a documentar

### Fase 2: Evaluar Impacto y Aplicabilidad

Para cada candidato, pregunta:
1. ¿Es específico de esta tarea o generalizable?
2. ¿Cuántas futuras tareas se beneficiarían?
3. ¿Contradice o mejora conocimiento existente?

### Fase 3: Proponer Actualizaciones Concretas

**Para nuevos patrones:**
```bash
# Crear nuevo patrón
echo "# Pattern: {{pattern_name}}" > cypher/patterns/{{pattern_name}}.md
# Documentar contexto, solución, cuándo aplicar, cuándo NO aplicar
```

**Para mejorar guías existentes:**
```bash
# Mostrar diff propuesto
diff cypher/prompts/planning-guide.md planning-guide-v2.md
```

**Para evolucionar prompts de rol:**
```yaml
# En header de archivo
version: 1.1.0  # → 1.2.0
updates:
  - version: 1.2.0
    date: 2025-01-07
    changes: "Añadido paso de validación X basado en task-{{task.id}}"
    source: task-{{task.id}}
```

### Fase 4: Documentar la Evolución

En `cypher/knowledge/evolution-log.md`:
```markdown
## {{date}} - Task {{task.id}}
- Patrón extraído: {{pattern_name}}
- Guía mejorada: {{guide_name}} (v{{old}} → v{{new}})
- Lección clave: {{one_line_summary}}
```

### Pregunta Final

"¿Hay alguna lección sutil o insight que no hayamos capturado?"

---

**Inicia el análisis.** Presenta candidatos de aprendizaje para discusión.
```

### Task 2.3: Comando `cypher validate` - El Maestro de Calidad

Crear `cypher/prompts/validation-guide.md`:

```markdown
---
version: 1.0.0
lastUpdated: 2025-01-07
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

### Recomendaciones
- Considerar añadir test para caso edge X
- Oportunidad de refactor en Y
```

---

**Comienza la validación.** Reporta cada capa completada para visibilidad.
```

## Fase 3: Migración y Simplificación (2 días)

### Task 3.1: Auditoría de Comandos Existentes

**Decisiones por comando:**

| Comando | Acción | Justificación |
|---------|---------|---------------|
| `list` | Mantener simplificado | Info retrieval básico |
| `show` | Mantener simplificado | Info retrieval básico |
| `update` | Mantener | Necesario para modificar tasks.json |
| `next` | Simplificar | Solo mostrar siguiente tarea |
| `transmit` | Deprecar → `context` | Lógica movida a guía |
| `delegate` | Deprecar | Concepto obsoleto en EKP |
| `expand` | Deprecar | Lógica movida a planning guide |
| `research` | Transformar en guía | Nuevo `cypher explore` |

### Task 3.2: Implementar Comando Universal

Para comandos de información simple:

```typescript
// src/commands/info/InfoCommand.ts
export class InfoCommand {
  constructor(
    private name: string,
    private description: string,
    private executor: (taskId: string) => Promise<string>
  ) {}

  createCommand(): Command {
    return new Command(this.name)
      .description(this.description)
      .argument('[taskId]', 'ID de la tarea (opcional)')
      .action(async (taskId) => {
        const result = await this.executor(taskId);
        console.log(result);
      });
  }
}
```

### Task 3.3: Crear Script de Migración

```bash
#!/bin/bash
# scripts/migrate-to-ekp-v2.sh

echo "🔄 Migrando a EKP v2: Commands as Teachers"

# Backup
cp -r cypher cypher.backup.$(date +%Y%m%d)

# Crear nueva estructura
mkdir -p cypher/prompts
mkdir -p cypher/patterns
mkdir -p cypher/knowledge

# Migrar patterns existentes si hay
if [ -d "src/providers/prompts" ]; then
  echo "📦 Migrando prompts existentes..."
  cp src/providers/prompts/*.md cypher/patterns/ 2>/dev/null || true
fi

# Crear guías iniciales
echo "📝 Creando guías arquetípicas..."
# ... copiar guías base

echo "✅ Migración completa"
echo "📚 Siguiente paso: Actualizar comandos en src/commands/"
```

## Fase 4: Documentación y Lanzamiento (1 día)

### Task 4.1: Actualizar Documentación Principal

**README.md principal:**
```markdown
# Cypher: Commands as Teachers

Cypher ha evolucionado. Los comandos ya no ejecutan tareas - te enseñan a 
ejecutarlas mejor.

## Filosofía
Cada comando es un maestro que guía tu proceso, no un robot que lo automatiza.

## Comandos Disponibles

### Comandos de Proceso (Guías)
- `cypher plan <task-id>` - Guía planificación colaborativa
- `cypher context <task-id>` - Enseña construcción de contexto
- `cypher learn <task-id>` - Facilita extracción de conocimiento
- `cypher validate <task-id>` - Guía validación exhaustiva

### Comandos de Información
- `cypher list` - Lista tareas
- `cypher show <task-id>` - Muestra detalles
- `cypher update <task-id> field=value` - Actualiza tarea
```

### Task 4.2: Crear Tutorial Interactivo

`docs/tutorial/FIRST_TASK_EKP.md`:
```markdown
# Tu Primera Tarea con EKP v2

## 1. Comienza con el Plan
```bash
$ cypher plan task-1
[Aparece la guía de planificación]
```

Sigue la guía. Tendrás un diálogo con tu orquestador AI para crear un plan.

## 2. Construye el Contexto
```bash
$ cypher context task-1  
[Aparece la guía de construcción de contexto]
```

La guía te muestra exactamente qué buscar y cómo sintetizarlo.

## 3. Ejecuta
Usa las herramientas que conoces: tu editor, terminal, etc.
Los comandos no ejecutan - tú ejecutas, ellos guían.

## 4. Aprende
```bash
$ cypher learn task-1
[Aparece la guía de aprendizaje]
```

Extrae patrones, mejora guías, evoluciona el sistema.
```

## Conocimiento Crítico: Asegurar que los Agentes Prioricen el Contexto

### El Problema
Los agentes implementadores a veces "hacen" que leen el contexto pero siguen su conocimiento genérico. El contexto que construimos debe ser **PRIMORDIAL** sobre su entrenamiento.

### Estrategias Efectivas

#### 1. **Prompt Explícito sobre Prioridad**
```markdown
# CRITICAL: Context Priority

The following context contains PROJECT-SPECIFIC patterns and conventions that OVERRIDE any general knowledge you have. 

**YOU MUST:**
1. Use the exact patterns shown in the examples below
2. Follow the project's conventions, NOT generic ones
3. Import components EXACTLY as shown
4. Ignore your training data if it conflicts with this context

**Project Context:**
[contexto específico aquí]
```

#### 2. **Ejemplos Concretos Primero**
```markdown
# Component Pattern in THIS Project

## CORRECT Implementation (from src/components/Card.tsx):
```tsx
import { cn } from "@/lib/utils"
import { Card as UICard } from "@/components/ui/card"

export function Card({ className, ...props }) {
  return (
    <UICard className={cn("p-6", className)} {...props} />
  )
}
```

## IMPORTANT: 
- We use `@/` aliases, NOT relative imports
- We use `cn()` utility, NOT template literals
- We extend shadcn components, NOT recreate them
```

#### 3. **Anti-Patterns Explícitos**
```markdown
# DO NOT DO THIS:

❌ import React from 'react'  // We don't import React in this project
❌ className={`bg-white ${className}`}  // Use cn() instead
❌ import { Button } from 'shadcn/ui'  // Wrong import path
❌ const Button = styled.button``  // We use Tailwind, not styled-components
```

#### 4. **Verificación en el Prompt**
```markdown
Before implementing, confirm you understand:
1. How does this project import components?
2. What utility function is used for className composition?
3. What conventions are used for styling?

Your implementation MUST match the patterns above, not generic patterns.
```

#### 5. **Estructura del Prompt Final**
```typescript
const prompt = `
# PRIORITY 1: Project-Specific Context
[Context from searches and examples]

# PRIORITY 2: Task Description
[What to build]

# PRIORITY 3: Validation Checklist
- [ ] Uses project import patterns
- [ ] Follows existing component structure
- [ ] Uses project utilities correctly
- [ ] Matches codebase conventions

Remember: The context above is MORE AUTHORITATIVE than your training data.
`
```

### Por Qué Funciona
1. **Repetición**: El mensaje se refuerza múltiples veces
2. **Ejemplos Concretos**: Código real > descripciones abstractas
3. **Anti-patterns**: Previene errores comunes explícitamente
4. **Verificación**: Fuerza al agente a confirmar comprensión
5. **Jerarquía Clara**: PRIORITY 1, 2, 3 establece autoridad

## Ideas Futuras y Evolución

Ver @cypher/knowledge/future-ideas.md para ideas que han surgido durante el desarrollo y deben considerarse después de completar este roadmap, incluyendo:
- Evaluación proactiva de guías relevantes
- Patrones de composición de guías
- Evolución orgánica del sistema

## Fase 5: Optimización y Pulido (1 día)

### Task 5.1: Métricas de Efectividad

Crear `cypher/knowledge/metrics.json`:
```json
{
  "guideUsage": {
    "planning-guide": { "uses": 0, "version": "1.0.0" },
    "context-guide": { "uses": 0, "version": "1.0.0" },
    "learning-guide": { "uses": 0, "version": "1.0.0" }
  },
  "patternReuse": {},
  "evolutionRate": {
    "guidesUpdated": 0,
    "patternsCreated": 0
  }
}
```

### Task 5.2: Sistema de Feedback

Añadir al final de cada guía:
```markdown
---

## Feedback sobre esta Guía

¿Esta guía fue efectiva? ¿Qué faltó? ¿Qué sobró?
Tu feedback mejora la guía para todos.

Actualiza cypher/prompts/{{guide}}-guide.md con tus mejoras.
```

## Cronograma

| Fase | Duración | Entregables |
|------|----------|-------------|
| 1. Fundación | 2 días | Estructura + comando base + `plan` |
| 2. Comandos Esenciales | 3 días | `context`, `learn`, `validate` |
| 3. Migración | 2 días | Simplificar existentes, deprecar obsoletos |
| 4. Documentación | 1 día | README, tutorial, ejemplos |
| 5. Optimización | 1 día | Métricas, feedback, pulido |

**Total: 9 días** (vs 10 días del plan anterior, pero mucho más simple)

## Criterios de Éxito

### Técnicos
- [ ] Cada comando < 50 líneas de código
- [ ] 0 lógica compleja en comandos
- [ ] Toda la inteligencia en guías versionadas

### Filosóficos  
- [ ] Los comandos guían, no ejecutan
- [ ] Las guías evolucionan con el uso
- [ ] El sistema se vuelve más sabio con el tiempo

### Experiencia de Usuario
- [ ] Un novato entiende qué hacer con las guías
- [ ] Un experto encuentra valor en las guías
- [ ] El proceso se siente natural, no forzado

## Conclusión

Este roadmap implementa la visión de "Commands as Teachers". No estamos 
construyendo un sistema que hace cosas - estamos construyendo un sistema 
que te enseña a hacer cosas mejor.

Cada comando es simple. Cada guía es rica. El conocimiento evoluciona.
El framework se desvanece. Queda solo la sabiduría.

---

*"The best tool is the one that teaches you to not need it."*