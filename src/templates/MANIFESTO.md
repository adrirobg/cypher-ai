# MANIFESTO: Principios del Sistema de Orquestación AI-to-AI

## Visión
Construir una **herramienta de orquestación AI-to-AI reutilizable** que pueda ser instalada en cualquier proyecto para proporcionar un marco completo de desarrollo guiado por IA. 

Al igual que Task Master revolucionó la gestión de tareas para humanos, nuestra herramienta revolucionará la colaboración entre desarrolladores y agentes de IA, pero construida desde cero con una mentalidad AI-first.

**Objetivo Final:** Una herramienta npm que cualquier desarrollador pueda instalar para traer orquestación de tareas AI-nativa a sus proyectos.

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
