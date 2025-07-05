# Command Refactoring Tasks

## Análisis de Mejoras Detectadas

### 🎯 Refactorizaciones Prioritarias

#### 1. **TaskQueries - Eliminar Duplicación** ⭐ ALTA PRIORIDAD
**Problema**: Funciones duplicadas en múltiples comandos
- `findTaskById` en list.ts, show.ts
- `getParentTask` en delegate.ts, transmit.ts  
- `flattenTasks` en varios archivos
- validate.ts tiene sus propias implementaciones

**Solución Cypher**:
```typescript
// src/core/TaskQueries.ts
export class TaskQueries {
  static findById(tasks: Task[], id: string): Task | null
  static getParent(tasks: Task[], taskId: string): Task | null
  static getSiblings(tasks: Task[], taskId: string): Task[]
  static flatten(tasks: Task[]): Task[]
  static traverseWithVisitor<T>(tasks: Task[], visitor: TaskVisitor<T>): T[]
}
```

**Comandos Afectados**: list, show, delegate, transmit, next, validate

---

#### 2. **ContextBuilder - Unificar delegate/transmit** ⭐ ALTA PRIORIDAD
**Problema**: delegate.ts y transmit.ts comparten ~80% de lógica
- Ambos construyen contexto (padre, hermanos, dependencias)
- delegate = transmit + prompt generation

**Solución Cypher**:
```typescript
// src/core/ContextBuilder.ts
export class ContextBuilder {
  async buildTaskContext(taskId: string): Promise<TaskContext>
  formatAsMarkdown(context: TaskContext): string
}
```

**Tareas Relacionadas**: 
- 7.1.1 - Ya contempla renombrar transmit→context
- Simplificaría implementación de ambos comandos

---

#### 3. **OutputFormatter - Consistencia AI-First** ⭐ ALTA PRIORIDAD
**Problema**: Inconsistencia en outputs
- expand.ts emite JSON
- Resto emite Markdown
- Sin flag común para cambiar formato
- Output actual optimizado para humanos, no para AI

**Nueva Propuesta - AI-First por defecto**:
```typescript
// src/utils/OutputFormatter.ts
export class OutputFormatter {
  constructor(private format: 'ai' | 'human' | 'json' = 'ai')
  format(data: any): string
  static fromFlags(flags: Map<string, any>): OutputFormatter
}
```

**Formatos**:
1. **Por defecto (AI-First)**: Markdown ultra-conciso optimizado para tokens
   ```
   # 7.1.1: Reestructuración de Comandos Core
   status: in-progress | priority: high | parent: 7.1
   deps: 7.1[done]
   subtasks: 1/5 done (7.1.1.3[done])
   next: update 7.1.1.4 status=in-progress
   ```

2. **--human**: Formato actual bonito para lectura humana
   
3. **--json**: Para integración programática
   ```json
   {"id":"7.1.1","status":"in-progress","ready":true,...}
   ```

**Beneficios**:
- Reduce tokens en ~70% para casos AI
- Mantiene compatibilidad con formato humano
- Permite integración con scripts vía JSON

---

### 📋 Refactorizaciones Secundarias

#### 4. **FileOperations - Operaciones fs comunes**
**Problema**: fs-extra usado directamente en comandos
- delegate.ts maneja archivos CDD
- setup-project.ts crea directorios

**Solución Simple**:
```typescript
// src/utils/FileOperations.ts
export class FileOperations {
  static async ensureDir(path: string): Promise<void>
  static async saveArtifact(path: string, content: string): Promise<void>
}
```

---

#### 5. **TaskValidator - Validación centralizada**
**Problema**: update.ts tiene switch complejo de validación
- Validación manual en cada case
- add-task.ts duplica algunas validaciones

**Solución Cypher** (sin dependencias externas):
```typescript
// src/core/TaskValidator.ts
export class TaskValidator {
  static validateStatus(status: string): ValidationResult
  static validateTaskUpdate(task: Task, updates: Partial<Task>): ValidationResult
  static validateNewTask(task: Partial<Task>): ValidationResult
}
```

---

### 🚀 Plan de Implementación

#### Fase 1: Core Queries (Elimina más duplicación)
1. Crear `TaskQueries.ts` con todas las operaciones de búsqueda
2. Refactorizar comandos para usar TaskQueries
3. Eliminar funciones duplicadas

#### Fase 2: Context Builder (Unifica transmit/delegate)
1. Extraer lógica común a ContextBuilder
2. Simplificar transmit.ts y delegate.ts
3. Alinear con tarea 7.1.1 (transmit→context)

#### Fase 3: Output Standardization (AI-First)
1. Crear OutputFormatter con formato AI por defecto
2. Añadir flags --human y --json a parseArguments base
3. Actualizar todos los comandos para usar OutputFormatter
4. Migrar formato actual a modo --human
5. Implementar formato AI ultra-conciso

### ⚡ Principios de Refactorización Cypher

✅ **SÍ HACER**:
- Extraer lógica duplicada real
- Mantener funciones pequeñas y componibles
- Preservar simplicidad en comandos
- Mejorar consistencia AI-first

❌ **NO HACER**:
- No crear abstracciones "por si acaso"
- No añadir capas de indirección innecesarias
- No sobre-optimizar casos que no existen
- No romper el principio "No System"

### 📝 Notas sobre Simplicidad

> "Mantener la simplicidad en comandos es algo que me preocupa"

La limpieza también es simplicidad. Un comando debe:
1. **Parsear argumentos** → simple, directo
2. **Validar entrada** → usando utilidades compartidas
3. **Ejecutar lógica core** → delegando a módulos especializados
4. **Formatear salida** → usando formatter común
5. **Manejar errores** → patrón consistente

Ejemplo de comando limpio:
```typescript
export async function list(args: string[], flags: Map<string, any>) {
  const { filter, format } = parseListFlags(flags);
  const engine = new TaskEngine();
  const formatter = OutputFormatter.fromFlags(flags);
  
  try {
    const tasks = await engine.readTasks();
    const filtered = TaskQueries.filter(tasks, filter);
    const output = formatter.format(filtered);
    console.log(output);
  } catch (error) {
    console.log(formatter.formatError(error));
  }
}
```

### 🔗 Integración con Tareas Existentes

- **Tarea 7.1.1**: Ya incluye reestructuración de comandos
  - decode → list/show ✅
  - transmit → context (se beneficia de ContextBuilder)
  
- **Tarea 7.2**: Optimización de transmit
  - --include-subtasks
  - transmit múltiple
  - Se simplifica con ContextBuilder

- **Tarea 7.0**: Update batch con --json
  - Ya implementado ✅
  - Patrón a seguir para otros comandos