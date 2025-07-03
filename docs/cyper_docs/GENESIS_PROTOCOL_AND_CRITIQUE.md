# Protocolo Génesis de Cypher: Propuesta y Crítica

Este documento captura la propuesta inicial para la metodología de creación de roles de IA ("Protocolo Génesis") y la posterior revisión crítica para su refinamiento. Sirve como base para el futuro desarrollo del sistema de auto-expansión de la mente colectiva de IA.

---

## Propuesta Inicial: El Protocolo Génesis de Cypher

Metodología en 4 fases para que el ecosistema se expanda a sí mismo de forma coherente.

### Fase 1: Codificar la Constitución (El ADN Inmutable)
- **Artefacto:** `docs/cyper_docs/CONSTITUTION.md`
- **Contenido:** Principios filosóficos abstractos del ecosistema (Paradigma, Leyes Físicas, Sistema Nervioso). La fuente de verdad filosófica.

### Fase 2: Definir el Genoma del Rol (La Plantilla Biológica)
- **Artefacto:** `docs/cyper_docs/ROLE_GENOME_TEMPLATE.md`
- **Contenido:** Una plantilla estructural para cualquier nuevo `CLAUDE.md` o `GEMINI.md`, definiendo su mandato, heurísticas, protocolos de colaboración y límites.
- **Propósito:** Asegurar que cada nuevo rol nazca con una estructura coherente.

### Fase 3: Automatizar la Mitosis (El Comando de Creación de Roles)
- **Comando:** `cypher specialize <path> --role-description="<desc>"`
- **Proceso:** El Orquestador Raíz utiliza su IA para rellenar la plantilla del Genoma basándose en la descripción del rol, creando así el archivo de contexto del nuevo especialista en la ruta especificada. Es auto-replicación guiada.

### Fase 4: Establecer el Proceso de "Onboarding" (La Entrevista Socrática)
- **Proceso:** Un "unit test" para el nuevo rol. Tras la creación, el Orquestador debe verificar al nuevo agente haciéndole preguntas socráticas para validar que ha asimilado su propio contexto y propósito.
- **Ejemplo:** `cd <new_role_path> && echo "Describe tu mandato principal" | claude`

---

## Análisis Crítico y Mitigaciones (Perspectiva Simulada)

Crítica del protocolo anterior para identificar debilidades sistémicas.

### Debilidad 1: El Riesgo de la Homogeneidad Centralizada (El "Pecado Original")
- **Riesgo:** El Orquestador Raíz, al ser el único creador, podría replicar sus propios sesgos o puntos ciegos en todos los nuevos roles, creando una peligrosa monocultura conceptual.
- **Mitigación: "Polinización Cruzada Obligatoria"**
    - **Propuesta:** Durante la Fase 3 (`cypher specialize`), el Orquestador debe estar **obligado** a consultar al menos a otro agente especialista existente para obtener una segunda perspectiva. El rol final debe ser una **síntesis de al menos dos perspectivas**.

### Debilidad 2: El Dilema de la Constitución Estática (El "Dogma Fósil")
- **Riesgo:** Una `CONSTITUTION.md` inmutable puede volverse obsoleta, haciendo que el sistema sea frágil y dogmático en un entorno cambiante.
- **Mitigación: "Protocolo de Enmienda Constitucional"**
    - **Propuesta:** Introducir un protocolo deliberadamente difícil para modificar la Constitución, que requiera un consenso de un quórum de agentes especialistas y una directiva humana, permitiendo la evolución sin sacrificar la estabilidad.

### Debilidad 3: El Sesgo de Confirmación en la Verificación (El "Padre que Evalúa a su Propio Hijo")
- **Riesgo:** En la Fase 4, el Orquestador que creó el rol también lo verifica, lo que introduce un sesgo de confirmación masivo. Es probable que haga preguntas que confirmen el éxito en lugar de intentar activamente encontrar fallos.
- **Mitigación: "Revisión por Pares en el Onboarding"**
    - **Propuesta:** La verificación socrática **no** debe ser realizada por el creador (el Orquestador). Debe ser delegada a **al menos dos otros especialistas existentes y relevantes** que tengan incentivos diferentes y hagan preguntas más incisivas.
