# INTERFACES: Contratos de Datos del Sistema

Este archivo define las estructuras de datos fundamentales. Son el contrato que todos los componentes del sistema deben respetar.

## Interface: `Task`

Define la estructura de una tarea o subtarea.

```typescript
interface Task {
  /**
   * Identificador único y jerárquico. Ej: "1", "1.1", "1.1.2"
   */
  id: string;

  /**
   * Título conciso de la tarea.
   */
  title: string;

  /**
   * Descripción detallada de lo que se debe hacer.
   */
  description: string;

  /**
   * El estado actual del trabajo.
   */
  status: 'pending' | 'in-progress' | 'done' | 'blocked' | 'cancelled';

  /**
   * Prioridad de la tarea (opcional).
   */
  priority?: 'low' | 'medium' | 'high';

  /**
   * Lista de IDs de tareas de las que esta tarea depende (opcional).
   */
  dependencies?: string[];

  /**
   * Lista de subtareas anidadas (opcional).
   */
  subtasks?: Task[];

  // --- CAMPOS AI-FIRST ---

  /**
   * Contiene el contexto generado por el "Pre-flight Check" (opcional).
   * Puede ser una ruta a un archivo .md o el contenido directamente.
   */
  context?: string;

  /**
   * Lista de rutas a los artefactos generados al completar la tarea (opcional).
   * Ej: ["src/components/Login.tsx", "src/tests/Login.test.ts"]
   */
  outputs?: string[];
}
```
