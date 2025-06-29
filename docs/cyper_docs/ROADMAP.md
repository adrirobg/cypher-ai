# ROADMAP: Plan de Implementación Técnico

Este documento detalla el plan de construcción por fases para el sistema de orquestación.

## Fase 0: El Motor - `core/TaskEngine.ts` ✅ COMPLETADO
*   **Objetivo:** Crear la capa de acceso a datos (DAL) mínima y pura. Es el corazón del sistema.
*   **Artefacto:** `core/TaskEngine.ts`
*   **Funcionalidad MVP:**
    *   `readTasks(): Promise<Task[]>`
    *   `writeTasks(tasks: Task[]): Promise<void>`
    *   `getTaskById(id: string): Promise<Task | null>`
    *   `updateTask(id: string, updates: Partial<Task>): Promise<void>`
*   **Anti-Sobreingeniería:** No tendrá caché, ni validación compleja. Será un simple adaptador de sistema de archivos.
*   **Estado:** ✅ Implementado con tests completos

## Fase 1: Comando Read - `decode`
*   **Objetivo:** Primer comando para validar arquitectura CLI y TaskEngine.
*   **Artefacto:** `src/commands/decode.ts`
*   **Funcionalidad:**
    *   `cypher decode tasks` - Listar todas las tareas
    *   `cypher decode 1.2` - Mostrar tarea específica
*   **Output:** Markdown estructurado para consumo AI
*   **Preparación futura:** Estructura que permita añadir `--perspective`
*   **Hito:** Arquitectura CLI probada, lectura funcional.

## Fase 2: Comando Context - `transmit`
*   **Objetivo:** Generar contextos pre-flight de alto valor.
*   **Artefacto:** `src/commands/transmit.ts`
*   **Funcionalidad:** 
    *   `cypher transmit 1.2` - Contexto estándar
    *   `cypher transmit 1.2 --perspective=security` - Contexto especializado (futura extensión)
*   **Template:** PREFLIGHT_TEMPLATE con soporte para perspectivas
*   **Hito:** Primera herramienta de valor real para AI agents.

## Fase 3: Comando Write - `update`
*   **Objetivo:** Modificación universal de tareas.
*   **Artefacto:** `src/commands/update.ts`
*   **Funcionalidad:** 
    *   `cypher update 1.2 --status=done`
    *   `cypher update 1.2 --title="..." --dependencies=[]`
*   **Hito:** CRUD completo sobre tasks.json.

## Fase 4: Comandos de Análisis - `next` y `validate`
*   **Objetivo:** Inteligencia sobre el grafo de tareas.
*   **Artefactos:**
    *   `src/commands/next.ts` - Siguiente tarea por dependencias
    *   `src/commands/validate.ts` - Integridad del grafo
*   **Extensión futura:**
    *   `validate --collaborative` - Validación multi-perspectiva
    *   `validate --fix` - Corrección automática
*   **Hito:** Sistema inteligente sin IA.

## Fase 5: Capa de Integración IA - `src/providers/`
*   **Objetivo:** Crear la infraestructura para integración con proveedores de IA.
*   **Artefactos:**
    *   `src/providers/ai-provider.interface.ts` - Interfaz común con `collaborativeAnalysis`
    *   `src/providers/claude-provider.ts` - Implementación con Claude SDK
*   **Nuevas capacidades:**
    *   Flag `--perspective` en comandos existentes
    *   Método `collaborativeAnalysis` para multi-perspectiva
    *   Síntesis automática de perspectivas
*   **Principio:** La IA mejora pero no es requerida para funcionalidad básica.

## Fase 6: Comandos Avanzados con IA
*   **Objetivo:** Implementar comandos que requieren IA desde su concepción.
*   **Artefactos:**
    *   `src/commands/research.ts` - Investigación multi-perspectiva ⭐
    *   `src/commands/setup-project.ts` - Parsear PRD y generar estructura
    *   `src/commands/expand.ts` - Descomponer tareas complejas
*   **Comando `research` (estrella):**
    *   `cypher research "JWT best practices"` - Investigación simple
    *   `cypher research "OAuth vs JWT" --perspectives=security,performance`
    *   `cypher research --task=1.2` - Investigación contextual
*   **Integración IA Completa**: 
    *   Usa `collaborativeAnalysis` del provider
    *   Output estructurado con síntesis automática
    *   Resultados optimizados para consumo AI

## Fase 7: Empaquetado y CLI - `src/cli.ts`
*   **Objetivo:** Crear la interfaz de línea de comandos y preparar para distribución npm.
*   **Artefactos:** 
    *   `src/cli.ts` - Entry point con Commander.js
    *   `src/commands/init.ts` - Inicializar .cypher/ en proyectos
    *   Actualizar `package.json` con bin y scripts
*   **Funcionalidad:** 
    *   `cypher init` - Crear estructura .cypher/
    *   `cypher decode/transmit/update/next/validate` - Comandos base
    *   `cypher setup-project/expand` - Comandos con IA
*   **Hito:** Tool usable localmente con `npm link`.

## Fase 8: Sistema Multi-Proveedor de IA (Futuro)
*   **Objetivo:** Expandir soporte a múltiples proveedores manteniendo simplicidad.
*   **Artefactos:**
    *   `src/providers/gemini-provider.ts` - Implementación alternativa
    *   `src/providers/openai-provider.ts` - Soporte GPT
*   **Principio:** La interfaz ya existe desde Fase 2, solo añadir implementaciones.
*   **Beneficios:** 
    *   Usuarios eligen su IA preferida
    *   Flexibilidad de costos y capacidades
    *   Evitar vendor lock-in

## Fase 9: Publicación y Distribución
*   **Objetivo:** Hacer la herramienta disponible públicamente.
*   **Acciones:**
    *   Publicar en npm registry como `cypher-ai`
    *   Crear documentación completa
    *   Ejemplos de uso en diferentes tipos de proyectos
*   **Resultado Final:** Cualquier desarrollador puede ejecutar:
    ```bash
    npm install -g cypher-ai
    cypher init
    ```
