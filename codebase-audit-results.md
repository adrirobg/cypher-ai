# Resultados de Auditoría de la Base de Código de Cypher

## Contexto

Esta auditoría analiza la base de código en `src/` para identificar el código heredado y proponer un plan de limpieza tras la implementación del roadmap EKP v2 ("Commands as Teachers"). El objetivo es alinear completamente el código con la nueva filosofía de simplicidad, donde la inteligencia reside en las guías (`cypher/prompts/`) y no en el código de los comandos.

--- 

## 1. Archivos a ELIMINAR

Estos archivos pertenecen al antiguo paradigma de orquestación automatizada y contradicen la filosofía EKP v2. Su funcionalidad ha sido reemplazada por el diálogo guiado.

- [ ] `src/commands/transmit.ts`
  - **Razón**: Obsoleto. El roadmap especifica `transmit` -> `context`. El nuevo `context.ts` (que usa `context-guide.md`) lo reemplaza. La lógica de `transmit` para construir contexto ahora es responsabilidad del diálogo del orquestador.

- [ ] `src/commands/expand.ts`
  - **Razón**: Obsoleto. El roadmap especifica `expand` -> `plan`. La descomposición de tareas ahora es un resultado emergente del diálogo de planificación facilitado por `cypher plan`.

- [ ] `src/commands/delegate.ts`
  - **Razón**: Obsoleto. El concepto de "delegación" como un paso programático ha sido eliminado. La generación de prompts y la delegación son ahora parte del flujo de trabajo orgánico que sigue a la planificación.

- [ ] `src/commands/research.ts`
  - **Razón**: Obsoleto. El roadmap lo transforma en una guía. El nuevo comando `explore.ts` (usando `explore-guide.md`) lo reemplaza. La investigación ya no es una llamada a un proveedor de IA, sino un proceso guiado.

- [ ] `src/commands/setup-project.ts`
  - **Razón**: Obsoleto. Este comando automatizaba la creación de tareas a partir de un PRD, una clara violación del principio de "diálogo sobre automatización". La creación de la estructura de tareas ahora debe surgir del diálogo de `plan`.

- [ ] `src/utils/PromptManager.ts`
  - **Razón**: Legado. Este gestor cargaba plantillas de prompts desde `src/providers/prompts/`. La nueva arquitectura carga guías Markdown directamente desde `cypher/prompts/` a través de la clase base `GuideCommand`, haciendo este gestor innecesario.

- [ ] `src/providers/ai-provider.interface.ts`, `src/providers/claude-provider.ts`, `src/providers/index.ts`
  - **Razón**: **Totalmente Obsoletos.** Estos archivos existen únicamente para dar servicio a los comandos heredados (`expand`, `research`, `setup-project`). Al eliminar esos comandos, la capa de proveedor de IA, que contiene una lógica compleja para interactuar con Claude, ya no tiene ningún propósito. Eliminar este directorio completo es la mayor simplificación posible y un paso crucial para cumplir con la visión del EKP v2.

--- 

## 2. Archivos a REFACTORIZAR / SIMPLIFICAR

Estos archivos son necesarios, pero deben ser limpiados para eliminar las dependencias de los archivos obsoletos y simplificar su lógica.

- [ ] `src/cli.ts`
  - **Prioridad**: Alta
  - **Cambios necesarios**:
    1.  Eliminar las importaciones de todos los comandos marcados para eliminación (`transmit`, `expand`, `delegate`, `research`, `setup-project`).
    2.  Eliminar el registro de estos comandos en el programa de `commander`.
    3.  Asegurarse de que el comando `validate` se renombra o se registra correctamente para evitar conflictos con `validate.ts` (la guía) y `validate-structure.ts`.

- [ ] `src/commands/next.ts`
  - **Prioridad**: Media
  - **Cambios necesarios**: El roadmap menciona "Simplificar". El código actual tiene una lógica de elegibilidad y ordenación. Se debe revisar si esta lógica se puede simplificar o si debe ser reemplazada por una guía que enseñe al usuario *cómo* elegir la siguiente tarea.

- [ ] `src/commands/update.ts`
  - **Prioridad**: Baja
  - **Cambios necesarios**: El comando es complejo porque maneja la validación de muchos campos. Se podría simplificar extrayendo la lógica de validación a `TaskQueries.ts` o a un nuevo `TaskValidator.ts` para limpiar el cuerpo del comando.

- [ ] `src/commands/validate-structure.ts`
  - **Prioridad**: Baja
  - **Cambios necesarios**: Renombrar el archivo a `validate-graph.ts` o similar para que su propósito (validar la integridad del grafo de tareas) sea más claro y no entre en conflicto con el comando guía `validate`.

--- 

## 3. Archivos a CONSERVAR

Estos archivos forman el núcleo de la nueva arquitectura EKP v2 y deben ser preservados.

- [ ] `src/commands/base/GuideCommand.ts`: La clase abstracta fundamental para todos los nuevos comandos guía. Es el corazón del EKP.
- [ ] `src/commands/plan.ts`, `context.ts`, `learn.ts`, `validate.ts`, `explore.ts`: Las implementaciones concretas de los "Commands as Teachers".
- [ ] `src/core/TaskEngine.ts`: El motor de bajo nivel para leer/escribir en `tasks.json`. Está correctamente aislado y sin lógica de negocio.
- [ ] `src/core/TaskQueries.ts`: Una excelente utilidad que centraliza la lógica de consulta de tareas, promoviendo código limpio y DRY.
- [ ] `src/commands/list.ts`, `show.ts`, `add-task.ts`: Comandos de utilidad básicos que siguen siendo necesarios para la gestión de tareas.
- [ ] `src/utils/format.ts`: Utilidades de formato genéricas.

--- 

## 4. Plan de Acción Recomendado

Para lograr una base de código limpia y alineada con EKP v2, sigue estos pasos:

1.  **Eliminación Masiva (Paso 1):**
    - Elimina el directorio `src/providers/` completo.
    - Elimina los archivos de comandos heredados: `transmit.ts`, `expand.ts`, `delegate.ts`, `research.ts`, `setup-project.ts`.
    - Elimina el archivo `src/utils/PromptManager.ts`.

2.  **Refactorización del CLI (Paso 2):**
    - Edita `src/cli.ts` para eliminar todas las referencias a los archivos y comandos eliminados. Este es un paso crítico para que el programa vuelva a compilar.

3.  **Verificación (Paso 3):**
    - Ejecuta `npm run typecheck` (o el comando de verificación de TypeScript del proyecto) para asegurarte de que no hay errores de compilación tras la eliminación.

4.  **Simplificación (Paso 4):**
    - Aborda los archivos en la sección "REFACTORIZAR / SIMPLIFICAR" en orden de prioridad para mejorar aún más la calidad del código.

Al completar estos pasos, la base de código de Cypher será drásticamente más pequeña, más simple y un reflejo puro de la filosofía "Commands as Teachers".
