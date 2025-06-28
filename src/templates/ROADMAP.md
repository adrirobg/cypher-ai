# ROADMAP: Plan de Implementación Técnico

Este documento detalla el plan de construcción por fases para el sistema de orquestación.

## Fase 0: El Motor - `core/TaskEngine.ts`
*   **Objetivo:** Crear la capa de acceso a datos (DAL) mínima y pura. Es el corazón del sistema.
*   **Artefacto:** `core/TaskEngine.ts`
*   **Funcionalidad MVP:**
    *   `readTasks(): Promise<Task[]>`
    *   `writeTasks(tasks: Task[]): Promise<void>`
    *   `getTaskById(id: string): Promise<Task | null>`
    *   `updateTask(id: string, updates: Partial<Task>): Promise<void>`
*   **Anti-Sobreingeniería:** No tendrá caché, ni validación compleja. Será un simple adaptador de sistema de archivos.

## Fase 1: Herramientas de Lectura - `scripts/`
*   **Objetivo:** Validar el `TaskEngine` y crear nuestras primeras herramientas AI-First.
*   **Artefactos:** `scripts/show.ts`, `scripts/list.ts`
*   **Clave:** La salida de estos scripts debe ser un formato optimizado para IA (ej. Markdown estructurado), no un simple `console.log` del objeto.

## Fase 2: El "Pre-flight Check" - El Primer Flujo de Valor
*   **Objetivo:** Componer nuestra primera herramienta compleja que genera un artefacto de alto valor.
*   **Artefacto:** `scripts/preflight-check.ts`
*   **Lógica:** Usará el `TaskEngine` directamente para componer el artefacto de contexto definido en `PREFLIGHT_TEMPLATE.md`.
*   **Hito:** Demuestra que nuestro enfoque de composición funciona.

## Fase 3: Flujos de Escritura y Complejos
*   **Objetivo:** Reemplazar la funcionalidad de escritura y los flujos de trabajo más complejos.
*   **Artefactos:** `scripts/set-status.ts`, `scripts/setup-project.ts`
*   **Dependencia Futura:** Flujos como `setup-project.ts` requerirán invocar a un LLM para replicar la inteligencia de `task-master` (ej. `parse-prd`, `expand`). Esta dependencia se gestionará dentro del propio script.

## Fase 4: Empaquetado como Herramienta Reutilizable
*   **Objetivo:** Transformar el sistema en una herramienta npm instalable.
*   **Artefactos:** 
    *   `package.json` con configuración de publicación
    *   `bin/ai-orchestrator` CLI principal
    *   `README.md` con documentación de instalación y uso
*   **Funcionalidad:** 
    *   Comando `init` para inicializar en cualquier proyecto
    *   Comando `setup-project` para parsear PRD
    *   Todos los comandos accesibles via CLI

## Fase 5: Publicación y Distribución
*   **Objetivo:** Hacer la herramienta disponible públicamente.
*   **Acciones:**
    *   Publicar en npm registry
    *   Crear documentación completa
    *   Ejemplos de uso en diferentes tipos de proyectos
*   **Resultado Final:** Cualquier desarrollador puede ejecutar:
    ```bash
    npm install -g ai-orchestrator
    ai-orchestrator init
    ```
