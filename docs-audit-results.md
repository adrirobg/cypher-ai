# Resultados de Auditoría de Documentación Cypher

## 1. Archivos a PRESERVAR en `docs/cypher-core/`

- [ ] `docs/cyper_docs/MANIFESTO_v2.md` - Es la declaración más actualizada y precisa de la filosofía "Commands as Teachers" y el EKP. Es la constitución del proyecto.
- [ ] `docs/research/THE_CYPHER_EVOLUTION.md` - Documento histórico y filosófico crucial. Narra el "porqué" del cambio de paradigma, justificando la arquitectura actual. Esencial para el onboarding y la comprensión profunda del proyecto.
- [ ] `docs/cyper_docs/EKP_v2_Commands_as_Teachers_Roadmap.md` - El roadmap técnico que define la implementación de la arquitectura actual. Sigue siendo una referencia válida para entender cómo se construyó el sistema.
- [ ] `docs/research/IA_Pensamiento_CoT_ToT_ReAct.md` - Documento teórico fundamental sobre las arquitecturas cognitivas que sustentan las decisiones de los agentes. Es conocimiento perenne.
- [ ] `docs/cyper_docs/INTERFACES.md` - Define la estructura de datos `Task`. Es un documento técnico de referencia que sigue siendo válido.
- [ ] `docs/cyper_docs/AI_ECOSYSTEM_PHILOSOPHY.md` - Un resumen excelente y conciso de los principios de colaboración. Perfecto como guía de referencia rápida.

## 2. Archivos a ACTUALIZAR

### Alta Prioridad

- [x] `docs/cyper_docs/README.md`
  - **Cambios necesarios**: El README es el punto de entrada principal. Debe reflejar la nueva filosofía y los comandos EKP.
  - **Secciones afectadas**:
    - "Core Documentation Files": Actualizar la lista y las descripciones.
    - "Implementation Notes": La ruta de los prompts es ahora `cypher/prompts/`, no `src/providers/prompts/`.
    - Eliminar referencias a comandos antiguos si las hubiera.

- [x] `docs/cyper_docs/ONBOARDING.md`
  - **Cambios necesarios**: El flujo de "Quick Start" está completamente desactualizado. Menciona `transmit`, que está deprecado. Debe ser reescrito para reflejar el nuevo flujo de `plan` -> `context` -> `validate` -> `learn`.
  - **Secciones afectadas**:
    - "Quick Start": Reemplazar `transmit` con los nuevos comandos guía.
    - "Key Files to Know": Actualizar la ruta de los prompts.

### Media Prioridad

- [ ] `docs/cyper_docs/ARCHITECTURE.md`
  - **Cambios necesarios**: La sección "AI Integration Layer" y el "Data Flow" son correctos, pero el documento no menciona la parte más importante de la arquitectura EKP: los directorios `cypher/prompts` y `cypher/patterns` y cómo los comandos guía interactúan con ellos.
  - **Secciones afectadas**:
    - Añadir una nueva sección "Evolving Knowledge Protocol (EKP) Architecture" que describa la estructura de `cypher/prompts` y `cypher/patterns`.
    - Actualizar el diagrama de flujo de datos para mostrar cómo los comandos (`plan`, `context`, etc.) leen estas guías.

- [ ] `docs/cyper_docs/GIT_WORKFLOW_EKP_REFACTOR.md`
  - **Cambios necesarios**: El workflow de git fue creado para la refactorización a EKP v2. Ahora que la implementación principal está hecha, este documento debería ser adaptado a un workflow de git general para el mantenimiento y evolución continua del proyecto.
  - **Secciones afectadas**:
    - "Estrategia de Branching": Simplificar para un modelo de feature-branching estándar (ej. `feature/`, `fix/`, `docs/`).
    - "Convenciones de Commits": Eliminar el prefijo `[PHASE X]`.

### Baja Prioridad

- [ ] `docs/cyper_docs/PROMPT_OPTIMIZATION_PATTERNS.md`
  - **Cambios necesarios**: Los patrones son buenos, pero deberían ser actualizados para reflejar la estructura de las nuevas guías en `cypher/prompts/`. El "Universal Prompt Template" es un buen candidato para convertirse en la estructura base de todas las guías.
  - **Secciones afectadas**:
    - "Universal Prompt Template": Refinar y asegurar que coincide con las guías EKP existentes.
    - "Application Examples": Actualizar con ejemplos de los nuevos comandos guía.

## 3. Archivos a DEPRECAR

- [ ] `docs/cyper_docs/ROADMAP.md` - **Razón**: Obsoleto. Este roadmap describe un plan de implementación que ha sido completamente reemplazado por el `EKP_v2_Commands_as_Teachers_Roadmap.md`. Conservarlo crea confusión.
- [ ] `docs/cyper_docs/COLLABORATION_PLAN.md` - **Razón**: Obsoleto. Proponía un enfoque (`--perspective`) que no fue el que finalmente se implementó. La colaboración ahora emerge del diálogo facilitado por las guías, no de flags en los comandos.
- [ ] `docs/cyper_docs/COMMAND_REFACTOR_TASKS.md` - **Razón**: Completado. Este documento fue una lista de tareas de refactorización que ya se han llevado a cabo. Su valor es histórico pero ya no es una guía de trabajo activa.
- [ ] `docs/cyper_docs/EXECUTION_PATTERNS.md` - **Razón**: Obsoleto. El patrón "Supervisor-Executor" ha sido reemplazado por el diálogo orgánico del EKP. La decisión de cómo ejecutar emerge de la conversación, no de una regla basada en el número de archivos.
- [ ] `docs/cyper_docs/MANIFESTO.md` - **Razón**: Reemplazado por `MANIFESTO_v2.md`. Conservar la versión antigua puede causar confusión sobre los principios actuales del proyecto.
- [ ] `docs/research/PCE_IMPLEMENTATION_ROADMAP.md` y `docs/research/PCE_Protocol_Paper.md` - **Razón**: Versiones intermedias. Estos documentos fueron pasos importantes en la evolución hacia el EKP, pero `THE_CYPHER_EVOLUTION.md` y `EKP_v2_Commands_as_Teachers_Roadmap.md` son los documentos finales y más completos que los reemplazan.
- [ ] `docs/research/ekp-implementation-plan.md` - **Razón**: Borrador. Parece un plan de implementación más informal que fue superado por el roadmap oficial de EKP v2.

## 4. Archivos a INVESTIGAR

- [ ] `docs/cyper_docs/AI_COLLABORATION_ESSENCE.md`, `AI_COLLABORATION_FULL.md`, `AI_COLLABORATION_OPTIMIZATION.md`, `CONTEXTUAL_AI_TEAMS.md`, `CONTEXTUAL_CLAUDE.md`, `USING_GEMINI_AS_CLAUDE.md` - **Qué necesita clarificación**: Este conjunto de documentos describe un fascinante paradigma de colaboración "orgánica" usando los CLIs de Gemini y Claude. Es una idea poderosa, pero no está claro si es una capacidad *actual* del sistema o una exploración *futura*. Necesitamos determinar si esto debe integrarse en la documentación principal como un patrón de uso avanzado o archivarse como una investigación.
- [ ] `docs/cyper_docs/GENESIS_PROTOCOL_AND_CRITIQUE.md` - **Qué necesita clarificación**: Similar al anterior, describe un protocolo avanzado para la auto-expansión de roles de IA. ¿Es una capacidad actual o una idea para el futuro? Su estado debe ser clarificado.
- [ ] `docs/research/GEMINI_vs_CLAUDE_Cognitive_Framework_Analysis.md`, `old_test_orch.md`, `test-gemini-orchestrator.md` - **Qué necesita clarificación**: Parecen ser artefactos de diálogos de desarrollo. Contienen la "historia" de cómo se llegó a las conclusiones. Necesitamos decidir si su valor es puramente histórico (y por lo tanto pueden ser archivados) o si contienen principios que deben ser extraídos y preservados en la documentación principal.

## 5. GAPS Identificados

### Documentación Faltante Crítica

- [ ] **Tutorial de "Mi Primera Tarea con EKP"**: El roadmap de EKP v2 menciona la creación de `docs/tutorial/FIRST_TASK_EKP.md`. Este tutorial es CRÍTICO para que los usuarios entiendan el nuevo flujo de trabajo. No parece existir.
- [ ] **Guía de Migración de Comandos**: No hay un documento claro que le diga a un usuario existente: "Si antes usabas `transmit`, ahora usa `context`. Si usabas `expand`, ahora inicia un diálogo con `plan`".
- [ ] **Documentación de los Comandos Guía**: No hay una sección en la documentación que explique qué hace cada uno de los nuevos comandos (`plan`, `context`, `learn`, `validate`) y cuál es el propósito de la guía que presentan.

### Documentación Deseable

- [ ] **Guía de Creación de Patrones**: Un documento que explique cómo y cuándo extraer un patrón de una retrospectiva y añadirlo a `cypher/patterns/`.
- [ ] **Guía de Evolución de Prompts**: Un documento que detalle el proceso para proponer y aplicar mejoras a las guías en `cypher/prompts/`.
- [ ] **Arquitectura del Conocimiento**: Un documento que explique en detalle la filosofía detrás de los directorios `prompts`, `patterns`, y `knowledge`.

## 6. Recomendaciones

1.  **Prioridad Máxima: Llenar los Gaps Críticos.** La falta de un tutorial y una guía de migración es el mayor obstáculo para la adopción del nuevo sistema. La creación de esta documentación debe ser la primera prioridad.
2.  **Ejecutar la Deprecación:** Eliminar los archivos marcados como "DEPRECAR" para limpiar la base de conocimiento y evitar confusiones. Se puede hacer un backup en una carpeta `docs/archive` si se desea conservar el historial.
3.  **Aclarar los Archivos de "INVESTIGAR":** Tener una sesión para decidir el futuro de los documentos sobre colaboración orgánica y el protocolo génesis. Si son para el futuro, moverlos a una carpeta `docs/future-concepts`. Si contienen patrones actuales, extraerlos y fusionarlos en la documentación principal.
4.  **Crear el Directorio `docs/cypher-core/`:** Mover los archivos marcados como "PRESERVAR" a este nuevo directorio para crear una base de conocimiento canónica y fácil de encontrar.
5.  **Planificar las Actualizaciones:** Abordar los archivos marcados como "ACTUALIZAR" en orden de prioridad (Alta -> Media -> Baja).
