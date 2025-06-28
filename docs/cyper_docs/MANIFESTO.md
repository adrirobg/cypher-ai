# MANIFESTO: Cypher - Bridging Human Intent and AI Implementation

## Vision
Build **Cypher**: a reusable AI-to-AI orchestration tool that can be installed in any project to provide a complete framework for AI-driven development.

Just as Task Master revolutionized task management for humans, Cypher will revolutionize collaboration between developers and AI agents - but built from scratch with an AI-first mindset.

**End Goal:** An npm tool that any developer can install to bring AI-native task orchestration to their projects.

> "Unfortunately, no one can be told what Cypher is. You have to see it for yourself." - But we'll try anyway.

## Problema a Resolver
La orquestación de herramientas CLI externas es frágil, ineficiente y crea un acoplamiento no deseado. No podemos optimizar el contexto para los agentes de IA si no somos dueños de la lógica y los datos.

## Principios Rectores (Inmutables)

1.  **Build, Don't Wrap (Construir, no Envolver):**
    Creamos nuestra propia lógica de negocio desde la base. No envolvemos ni dependemos de las implementaciones de herramientas externas.

2.  **Own Your Data (Ser Dueños de los Datos):**
    La fuente de verdad (ej. `tasks.json`) es nuestra. La leemos y escribimos exclusivamente a través de nuestro propio motor de datos (`TaskEngine`).

3.  **Compose, Don't Orchestrate (Componer, no Orquestar):**
    Creamos flujos de trabajo complejos mediante la composición de funciones y herramientas internas, no orquestando llamadas a procesos CLI externos.

4.  **AI-First From Ground Up (Mentalidad AI-First desde la Base):**
    Cada decisión, desde la estructura de datos hasta el formato de salida, está optimizada para ser consumida por un agente de IA. La eficiencia de tokens y la precisión estructural son las métricas primarias de calidad.

5.  **Planning as Artifact (La Planificación como Artefacto):**
    La planificación no es un documento de referencia, es un paso de "compilación". Genera artefactos (especificaciones) precisos, accionables y verificables que sirven como input directo para la siguiente fase del sistema.

## Technical Foundation

Cypher leverages the Claude Code SDK (@anthropic-ai/claude-code) as its intelligence engine. This is fundamentally different from wrapping external CLIs:

- **We compose with the SDK**: Claude Code SDK is our AI brain, not a wrapped tool
- **We build our own logic**: Task management, context generation, and orchestration are our code
- **We abstract complexity**: Users don't need to know Claude Code SDK syntax

The result: A specialized AI-native tool that happens to use Claude as its intelligence provider, with future support for other AI providers (Gemini, GPT).
