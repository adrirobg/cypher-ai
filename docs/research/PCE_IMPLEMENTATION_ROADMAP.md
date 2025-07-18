# PCE Implementation Roadmap: Del Concepto a la Realidad

## Resumen Ejecutivo

El Protocolo de Conocimiento Evolutivo (PCE) representa una evolución fundamental en Cypher: de gestión de tareas a gestión de conocimiento. Este documento detalla el plan técnico para implementar el PCE de manera incremental, manteniendo compatibilidad total con el sistema existente.

**Cambios principales**:
- Nueva estructura de directorios para arquetipos (`/prompts/`, `/patterns/`)
- Modificación del comando `cypher plan` para diálogo colaborativo
- Nuevo comando `cypher learn` para destilación de conocimiento
- Integración con comandos existentes para usar arquetipos

**Tiempo estimado**: 7-10 días de desarrollo

## 1. Análisis del Sistema Actual

### 1.1 Inventario de Componentes

#### Comandos que se mantienen sin cambios:
- `list` - Funcionalidad base intacta
- `show` - Funcionalidad base intacta
- `next` - Funcionalidad base intacta
- `validate` - Funcionalidad base intacta
- `update` - Funcionalidad base intacta
- `add-task` - Funcionalidad base intacta

#### Comandos a modificar:
- `plan` - Transformar en iniciador de diálogo
- `transmit` - Integrar búsqueda de arquetipos
- `delegate` - Usar prompts de `/prompts/` cuando existan
- `expand` - Referenciar patrones previos
- `research` - Documentar patrones descubiertos

#### Nuevos comandos necesarios:
- `learn` - Destilación formal de conocimiento

#### Core sin cambios:
- `TaskEngine.ts` - No requiere modificación (!)
- `TaskQueries.ts` - No requiere modificación

### 1.2 Estructuras a Crear

```
cypher/
├── prompts/                    # NUEVO - Arquetipos de prompts
│   ├── orchestrator-planning.md
│   ├── react-developer.md
│   ├── api-developer.md
│   ├── validator.md
│   └── README.md
├── patterns/                   # NUEVO - Patrones consolidados
│   ├── react-component.md
│   ├── api-endpoint.md
│   ├── command-refactoring.md
│   └── README.md
├── knowledge/                  # NUEVO - Metadatos de evolución
│   ├── evolution-log.md
│   ├── metrics.json
│   └── index.json
└── cdd/                       # EXISTE - Sin cambios estructurales
    └── <task-id>/
        ├── plan.md
        ├── context.md
        ├── prompts.md
        └── retrospective.md
```

### 1.3 Análisis de Impacto

**Riesgo bajo** - Todos los cambios son aditivos:
- No se rompe ninguna funcionalidad existente
- Los comandos actuales siguen funcionando
- La migración puede ser gradual

## 2. Plan de Implementación por Fases

### Fase 0: Preparación (0.5 días)

```typescript
// Tareas:
- [ ] Crear branch `feature/pce-implementation`
- [ ] Documentar estado actual con tests de regresión
- [ ] Backup de cypher/tasks.json
```

### Fase 1: Estructura Base de Arquetipos (1 día)

```bash
# Crear estructura de directorios
mkdir -p cypher/prompts
mkdir -p cypher/patterns  
mkdir -p cypher/knowledge

# Crear READMEs explicativos
echo "# Prompts Arquetípicos..." > cypher/prompts/README.md
echo "# Patrones Consolidados..." > cypher/patterns/README.md
```

**Contenido inicial de `cypher/prompts/orchestrator-planning.md`**:
```markdown
# Guía de Planificación para el Orquestador

## Tu Rol
Cuando se ejecute `cypher plan <task-id>`, tu rol es:
1. Analizar la tarea identificando modos cognitivos aplicables
2. Buscar conocimiento previo relevante
3. Proponer estrategia mediante diálogo
4. Generar artefactos mínimos pero precisos

## Proceso de Búsqueda de Conocimiento
```bash
# Buscar tareas similares
find cypher/cdd -name "retrospective.md" -exec grep -l "keyword" {} \;

# Revisar patrones existentes
cat cypher/patterns/*.md | grep -i "relevant-term"
```

## Estructura de Diálogo
1. Presenta análisis inicial
2. Propón estrategia con justificación
3. Solicita feedback específico
4. Itera hasta consenso
5. Genera artefactos

## Anti-patrones
- No generar archivos hasta consenso
- Evitar sobre-ingeniería
- Mantener prompts concisos
```

### Fase 2: Comando `cypher plan` Renovado (2 días)

**Modificar `src/commands/plan.ts`**:

```typescript
import { Command } from 'commander';
import { TaskEngine } from '../core/TaskEngine';
import { readFile, mkdir, exists } from 'fs/promises';
import { join } from 'path';

export const planCommand = new Command('plan')
  .description('Iniciar planificación colaborativa para una tarea')
  .argument('<taskId>', 'ID de la tarea a planificar')
  .option('--resume', 'Continuar planificación existente')
  .action(async (taskId, options) => {
    const engine = new TaskEngine();
    const task = await engine.getTaskById(taskId);
    
    if (!task) {
      console.error(`Tarea ${taskId} no encontrada`);
      return;
    }

    // Crear directorio CDD si no existe
    const cddPath = join('cypher', 'cdd', taskId);
    if (!await exists(cddPath)) {
      await mkdir(cddPath, { recursive: true });
    }

    // Cargar guía del orquestador
    const orchestratorGuide = await readFile(
      'cypher/prompts/orchestrator-planning.md', 
      'utf-8'
    );

    // Presentar contexto para iniciar diálogo
    console.log(`## Iniciando planificación para Task ${taskId}`);
    console.log(`\n**${task.title}**`);
    console.log(task.description);
    
    if (task.details) {
      console.log(`\nDetalles: ${task.details}`);
    }

    console.log('\n---');
    console.log('Guía de planificación cargada.');
    console.log('El diálogo de planificación puede comenzar.\n');

    // El diálogo real ocurre fuera del comando
    // Los artefactos se crean durante la conversación
  });
```

### Fase 3: Comando `cypher learn` (3 días)

**Crear `src/commands/learn.ts`**:

```typescript
import { Command } from 'commander';
import { readFile, writeFile, appendFile } from 'fs/promises';
import { glob } from 'glob';

interface LearningCandidate {
  type: 'pattern' | 'prompt-improvement' | 'anti-pattern';
  content: string;
  source: string;
  impact: 'high' | 'medium' | 'low';
}

export const learnCommand = new Command('learn')
  .description('Extraer y consolidar aprendizajes de una tarea completada')
  .argument('<taskId>', 'ID de la tarea a analizar')
  .action(async (taskId) => {
    // Leer retrospectiva
    const retroPath = `cypher/cdd/${taskId}/retrospective.md`;
    const retrospective = await readFile(retroPath, 'utf-8');

    // Analizar contenido para patrones
    const candidates = extractLearningCandidates(retrospective);

    console.log(`## Analizando aprendizajes de Task ${taskId}\n`);
    
    // Presentar candidatos
    for (const candidate of candidates) {
      console.log(`### ${candidate.type}: ${candidate.impact} impact`);
      console.log(candidate.content);
      console.log(`Fuente: ${candidate.source}\n`);
    }

    // Iniciar diálogo de consolidación
    console.log('### Propuestas de actualización:\n');
    
    // Sugerir actualizaciones basadas en análisis
    suggestArchetypeUpdates(candidates);

    // Log de evolución
    await appendFile(
      'cypher/knowledge/evolution-log.md',
      `\n## ${new Date().toISOString()} - Task ${taskId}\n`
    );
  });

function extractLearningCandidates(content: string): LearningCandidate[] {
  // Lógica de extracción basada en marcadores
  const candidates: LearningCandidate[] = [];
  
  // Buscar secciones clave
  if (content.includes('Pattern:')) {
    // Extraer patrón identificado
  }
  
  if (content.includes('Mejora:')) {
    // Extraer mejora de prompt
  }
  
  return candidates;
}

function suggestArchetypeUpdates(candidates: LearningCandidate[]) {
  // Generar sugerencias concretas
  for (const candidate of candidates) {
    if (candidate.type === 'pattern') {
      console.log(`- Crear/actualizar patterns/${candidate.source}.md`);
    } else if (candidate.type === 'prompt-improvement') {
      console.log(`- Mejorar prompts/${candidate.source}.md`);
    }
  }
}
```

### Fase 4: Integración con Comandos Existentes (2 días)

#### 4.1 Modificar `transmit` para usar arquetipos:

```typescript
// En src/commands/transmit.ts
async function generateContext(task: Task): Promise<string> {
  // Buscar patrones relevantes
  const patterns = await findRelevantPatterns(task);
  
  // Buscar contextos previos similares
  const previousContexts = await findSimilarContexts(task);
  
  // Generar contexto enriquecido
  return buildEnrichedContext(task, patterns, previousContexts);
}
```

#### 4.2 Modificar `delegate` para referenciar arquetipos:

```typescript
// En src/commands/delegate.ts
async function generateDelegationPrompt(task: Task, role: string): Promise<string> {
  // Buscar arquetipo de rol si existe
  const archetypePath = `cypher/prompts/${role}.md`;
  if (await exists(archetypePath)) {
    const archetype = await readFile(archetypePath, 'utf-8');
    // Fusionar con prompt específico de tarea
  }
  
  // Continuar con generación normal
}
```

### Fase 5: Testing y Validación (1 día)

```typescript
// Tests críticos a implementar

describe('PCE Integration', () => {
  it('should maintain backward compatibility', async () => {
    // Verificar que comandos existentes siguen funcionando
  });

  it('should create archetype directories on first run', async () => {
    // Verificar creación de estructura
  });

  it('should initiate planning dialogue', async () => {
    // Verificar comando plan renovado
  });

  it('should extract learning candidates', async () => {
    // Verificar comando learn
  });
});
```

### Fase 6: Migración de Conocimiento Existente (1 día)

```bash
# Script de migración
for task in cypher/cdd/*; do
  if [ -f "$task/retrospective.md" ]; then
    echo "Analizando $task para patrones..."
    # Extraer y proponer arquetipos iniciales
  fi
done
```

## 3. Decisiones Técnicas Detalladas

### 3.1 Versionado de Arquetipos

```typescript
interface ArchetypeMetadata {
  version: string;           // semver: 1.0.0
  lastUpdated: Date;
  updates: {
    version: string;
    date: Date;
    changes: string;
    source: string;         // task-id que motivó el cambio
  }[];
}

// Almacenar en header de cada archivo markdown
/*
---
version: 2.1.0
lastUpdated: 2025-01-06
updates:
  - version: 2.1.0
    date: 2025-01-06
    changes: "Añadido check de --help para CLI"
    source: task-7.1.1.1
---
*/
```

### 3.2 Sistema de Búsqueda de Conocimiento

```typescript
// Implementación simple pero efectiva
class KnowledgeSearch {
  async findSimilarTasks(description: string): Promise<string[]> {
    // 1. Tokenizar descripción
    const keywords = this.extractKeywords(description);
    
    // 2. Buscar con ripgrep
    const matches = await this.searchWithRipgrep(keywords);
    
    // 3. Rankear por relevancia
    return this.rankByRelevance(matches, keywords);
  }

  private async searchWithRipgrep(keywords: string[]): Promise<SearchResult[]> {
    const pattern = keywords.join('|');
    const { stdout } = await exec(`rg -i "${pattern}" cypher/cdd/*/retrospective.md`);
    return this.parseRgOutput(stdout);
  }
}
```

### 3.3 Métricas de Evolución

```typescript
interface EvolutionMetrics {
  archetypeVersion: Map<string, number>;    // Versiones de cada arquetipo
  taskCompletionTime: Map<string, number>;  // Tiempo por tipo de tarea
  revisionRate: Map<string, number>;        // Revisiones necesarias
  patternReuse: Map<string, number>;        // Veces que se usa cada patrón
}

// Actualizar automáticamente en cypher/knowledge/metrics.json
```

## 4. Plan de Rollout

### Semana 1: Foundation
- Día 1-2: Fases 0-1 (Estructura base)
- Día 3-4: Fase 2 (Comando plan)
- Día 5: Testing inicial

### Semana 2: Evolution
- Día 1-3: Fase 3 (Comando learn)
- Día 4: Fase 4 (Integraciones)
- Día 5: Fase 5-6 (Testing final y migración)

## 5. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Arquetipos demasiado rígidos | Media | Alto | Versionado semántico, revisión regular |
| Resistencia al cambio | Baja | Medio | Cambios son aditivos, no disruptivos |
| Complejidad en búsqueda | Media | Bajo | Comenzar simple, optimizar después |
| Pérdida de conocimiento | Baja | Alto | Backups, versionado con git |

## 6. Criterios de Éxito

### Cuantitativos
- [ ] 0 regresiones en funcionalidad existente
- [ ] < 500ms para búsqueda de conocimiento
- [ ] > 80% cobertura de tests

### Cualitativos
- [ ] Reducción observable en revisiones necesarias
- [ ] Arquetipos evolucionan naturalmente
- [ ] Adopción orgánica por parte del equipo

## 7. Próximos Pasos Inmediatos

1. **Validar plan con Supervisor**
2. **Crear branch de feature**
3. **Implementar Fase 1 (estructura base)**
4. **Crear PR inicial para revisión temprana**

## Apéndice A: Ejemplos de Código Completos

### A.1 Arquetipo react-developer.md completo

```markdown
---
version: 1.0.0
lastUpdated: 2025-01-06
---

# React Developer Guide

## Cognitive Mode
- Analysis: CoT for understanding requirements
- Implementation: ReAct for iterative development
- Validation: ReAct for testing

## Context Requirements
Always gather:
1. Similar components in codebase
2. Design system tokens
3. Available custom hooks
4. Testing patterns

## Process
1. Analyze with CoT
2. Implement following patterns
3. Test with ReAct loop
4. Document decisions

## Known Patterns
- Prefer composition over inheritance
- Use custom hooks for logic
- Keep components pure when possible
```

### A.2 Estructura de retrospective.md mejorada

```markdown
# Retrospective: Task 7.1.1.1

## Summary
Refactored transmit command to context successfully.

## What Worked
- Pattern: Using alias for backward compatibility
- Tool: TaskQueries simplified implementation

## What We Learned
- LEARNING[pattern]: Command aliases better than deprecation
- LEARNING[prompt]: Validator must check CLI help text
- LEARNING[context]: Include previous refactoring examples

## Metrics
- Time to completion: 2 hours
- Revisions needed: 1 (missing --help update)
- Confidence: High

## For Future Tasks
Consider alias pattern early for any command refactoring.
```

---

*Este roadmap está diseñado para implementación incremental y segura del PCE.*
*Revisión y feedback bienvenidos antes de comenzar implementación.*