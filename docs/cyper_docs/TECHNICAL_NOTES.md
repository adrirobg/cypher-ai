## Análisis Técnico Detallado del SDK de Claude Code para Cypher

Este documento detalla cómo Cypher interactuará programáticamente con el SDK de Claude Code, alineándose con nuestra filosofía "AI-First" y los principios de "Build, Don't Wrap" y "Compose, Don't Orchestrate".

### Consideraciones Generales

*   **Autenticación:** El SDK de Claude Code gestiona la autenticación automáticamente a través de variables de entorno (ej. `ANTHROPIC_API_KEY`). No necesitaremos implementar lógica de autenticación explícita en nuestro código.
*   **SDK de TypeScript:** Será nuestra herramienta principal para interactuar con Claude Code.
*   **Salida JSON:** Siempre solicitaremos la salida en formato JSON (`--output-format json`) para un análisis programático fiable y eficiente en tokens.
*   **Permisos de Herramientas:** Seremos conscientes de la necesidad de especificar `allowedTools` cuando Claude Code deba realizar acciones más allá de la generación de texto (ej. `Bash`, `Read`, `Write`).
*   **Manejo de Errores:** Implementaremos un manejo robusto de errores para las invocaciones de Claude Code, incluyendo la gestión de posibles timeouts o fallos de la API.

### Implicaciones por Fase del Roadmap

#### Fase 0: The Core Engine (`src/core/TaskEngine.ts`)

*   **Uso del SDK:** El SDK de Claude Code **no se utilizará directamente** en esta fase.
*   **Enfoque:** Esta fase se centrará exclusivamente en operaciones de sistema de archivos (lectura/escritura de `tasks.json`) utilizando módulos nativos de Node.js (ej. `fs-extra`).
*   **Relevancia:** La interfaz `Task` definida en `INTERFACES.md` será crucial para la tipificación de los datos que el `TaskEngine` manejará.

#### Fase 1: Herramientas de Lectura (`scripts/show.ts`, `scripts/list.ts`)

*   **Uso del SDK:** El SDK de Claude Code **no se utilizará directamente** en esta fase.
*   **Enfoque:** Estos comandos utilizarán el `TaskEngine` para leer datos y formatearán la salida para el consumo de IA (ej. Markdown estructurado), pero sin invocar a Claude Code.

#### Fase 2: El "Pre-flight Check" (`scripts/preflight-check.ts`)

*   **Uso del SDK:** Aquí es donde el SDK de Claude Code será **central**.
*   **Interacción:**
    *   Utilizaremos la función `query` de `@anthropic-ai/claude-code`.
    *   El `prompt` será nuestro contexto AI-First cuidadosamente elaborado (basado en `PREFLIGHT_TEMPLATE.md` y datos obtenidos del `TaskEngine`).
    *   Configuraremos `options.outputFormat: 'json'` para una fácil interpretación programática de la respuesta de Claude Code.
    *   Estableceremos `options.maxTurns` a un valor bajo (ej. 1 o 2), ya que esperamos una respuesta directa y concisa (el artefacto de contexto).
    *   No se espera que Claude Code realice acciones (como leer archivos o ejecutar comandos) en esta fase, por lo que `allowedTools` no será una preocupación inicial.
*   **Resultado:** Claude Code generará el artefacto de contexto pre-vuelo optimizado para el agente implementador.

#### Fase 3: Flujos de Escritura y Complejos (`scripts/set-status.ts`, `scripts/setup-project.ts`)

*   **Uso del SDK:** Estos comandos harán un **uso intensivo** del SDK de Claude Code, especialmente aquellos que replican la inteligencia de `task-master`.
*   **Interacción:**
    *   **`set-status.ts`:** No invocará directamente a Claude Code, sino que usará `TaskEngine.updateTask()`.
    *   **`setup-project.ts` (y futuros comandos inteligentes):**
        *   La lógica de `parse-prd` (generación de tareas a partir de un PRD) implicará enviar el contenido del PRD a Claude Code y esperar una respuesta estructurada (ej. JSON con el array de `Task`s).
        *   La lógica de `expand` (descomposición de tareas en subtareas) implicará enviar la tarea a Claude Code y esperar una respuesta estructurada (ej. JSON con el array de `subtasks`).
        *   Se utilizarán `options.outputFormat: 'json'` y se gestionarán `allowedTools` según las necesidades de cada sub-tarea de Claude Code (ej. si necesita leer archivos del PRD, se le permitirá `Read`).

### Resumen del Flujo de Interacción con Claude Code

Cypher actuará como un orquestador que prepara el prompt y las opciones adecuadas para Claude Code, invoca el SDK, y procesa la respuesta estructurada para generar los artefactos o realizar las actualizaciones de estado necesarias. La clave es la comunicación bidireccional basada en JSON para una integración fluida y programática.
