# **Arquitecturas Cognitivas para Agentes de Desarrollo de Software Autónomos: Un Análisis Comparativo y Guía de Implementación para CoT, ToT y ReAct**

### **Parte I: Marcos de Razonamiento Fundacionales en Modelos de Lenguaje Grandes**

Esta parte establece la base teórica para comprender cómo "piensan" los agentes de IA modernos. Se analizará cada uno de los tres marcos de razonamiento principales, examinando sus mecanismos, propiedades emergentes y limitaciones inherentes a partir de la investigación fundamental.

#### **1\. Introducción: La Evolución del Razonamiento en los Agentes de IA**

##### **El Cambio de Paradigma: Del Prompting Simple a las Arquitecturas Cognitivas**

El enfoque inicial para interactuar con los modelos de lenguaje grandes (LLM) se basaba en un simple paradigma de entrada-salida, donde una pregunta directa producía una respuesta directa.<sup>1</sup> Sin embargo, este método demuestra ser insuficiente para tareas complejas y de múltiples pasos que requieren una deliberación profunda, como las que se encuentran en el desarrollo de software.<sup>2</sup> Para superar estas limitaciones, han surgido marcos de razonamiento estructurado como Chain of Thought (CoT), Tree of Thoughts (ToT) y ReAct (Reasoning and Acting). Estos no son meros "trucos de prompting", sino que deben entenderse como emulaciones de procesos cognitivos humanos que permiten una resolución de problemas más robusta, fiable y transparente.<sup>3</sup>

##### **La Emergencia del Razonamiento como Función de la Escala**

Un hallazgo crítico en la investigación de los LLM es que las capacidades de razonamiento complejas, particularmente las que aprovecha el CoT, son una propiedad emergente de la escala del modelo.<sup>5</sup> Estas habilidades no se manifiestan de manera significativa en modelos más pequeños, sino que surgen y se fortalecen a medida que los modelos superan un umbral de aproximadamente 100 mil millones de parámetros.<sup>2</sup> Este fenómeno sugiere que los modelos más grandes, entrenados en conjuntos de datos masivos, aprenden patrones de razonamiento matizados que les permiten seguir secuencias lógicas paso a paso. Este contexto es fundamental: las técnicas discutidas en este informe son más efectivas cuando se aplican a los LLM de última generación y de gran escala.

##### **El Agente Coder como Dominio de Aplicación Principal**

El desarrollo de software representa un dominio de aplicación ideal para estos marcos de razonamiento avanzados. Su naturaleza intrínsecamente estructurada, la complejidad lógica de los algoritmos, y la necesidad constante de interactuar con herramientas externas —como compiladores, suites de pruebas, sistemas de control de versiones y APIs— lo convierten en un campo de pruebas perfecto. Los "agentes coder" (agentes de IA especializados en desarrollo de código como Claude Code o los que ofrece CodeGPT) son el foco central de este informe, ya que su eficacia depende directamente de la sofisticación de su arquitectura cognitiva subyacente.<sup>6</sup>

#### **2\. Chain of Thought (CoT): Razonamiento Lineal y Descomposición de Problemas**

##### **Mecanismo Central**

Chain of Thought (CoT) es una técnica que mejora drásticamente la capacidad de los LLM para abordar problemas complejos al instruirlos para que generen una serie de pasos de razonamiento intermedios y secuenciales que conducen a una respuesta final.<sup>7</sup> Este proceso, que imita la resolución de problemas paso a paso de los humanos, permite al modelo descomponer un desafío abrumador en partes más manejables, asignando así más recursos computacionales a problemas que requieren una mayor deliberación.<sup>2</sup>

##### **Variantes de Implementación**

Existen dos variantes principales para implementar el CoT:

- **Few-Shot CoT**: Este es el método original, que consiste en proporcionar al modelo algunos ejemplos explícitos de tripletes (entrada, cadena de pensamiento, salida) en el prompt.<sup>7</sup> Al ver estos ejemplos, el modelo aprende a replicar el patrón de razonamiento para nuevas consultas. Este enfoque es muy eficaz pero requiere la creación manual de ejemplos de alta calidad.<sup>2</sup>
- **Zero-Shot CoT**: Un método más simple que no requiere ejemplos. En su lugar, se añade una instrucción directa al final del prompt, como "Pensemos paso a paso" ("Let's think step-by-step").<sup>11</sup> Esto provoca que el modelo genere una cadena de razonamiento por sí mismo. Su eficacia depende en gran medida de las capacidades de seguimiento de instrucciones del modelo, que han mejorado notablemente en los modelos modernos afinados (instruction-tuned).<sup>5</sup>

##### **Fortalezas**

- **Mejora de la Precisión**: CoT aumenta significativamente el rendimiento en tareas que requieren razonamiento aritmético, de sentido común y simbólico al evitar que el modelo salte a una conclusión incorrecta.<sup>7</sup>
- **Interpretabilidad y Depuración**: La cadena de razonamiento explícita ofrece una ventana transparente al "proceso de pensamiento" del modelo. Esto es invaluable para la depuración, ya que permite a los usuarios identificar exactamente dónde falló la lógica y refinar los prompts o el enfoque en consecuencia.<sup>5</sup>

##### **Debilidades**

- **Propagación de Errores**: La naturaleza lineal del CoT es su talón de Aquiles. Sigue un único camino lógico, por lo que un error cometido en una etapa temprana se propagará inevitablemente a través de la cadena, llevando casi con seguridad a una respuesta final incorrecta.<sup>10</sup>
- **Alucinación de Hechos**: Cuando no está anclado a información externa, el CoT se basa únicamente en el conocimiento interno y estático del modelo. Si este conocimiento es incorrecto, obsoleto o simplemente inventado (una "alucinación"), la cadena de razonamiento, aunque lógicamente coherente, será factualmente errónea.<sup>15</sup>
- **Dependencia de la Escala del Modelo**: Como se mencionó anteriormente, el CoT no ofrece beneficios, e incluso puede ser perjudicial, para modelos más pequeños. Es una habilidad emergente que solo se manifiesta en LLM de muy gran escala.<sup>2</sup>

#### **3\. Tree of Thoughts (ToT): Exploración Estratégica y Deliberación**

##### **Mecanismo Central**

Tree of Thoughts (ToT) es una generalización del CoT que supera su limitación lineal. En lugar de seguir una única cadena, ToT estructura el proceso de razonamiento como un árbol, permitiendo al modelo explorar múltiples y divergentes caminos de razonamiento de forma simultánea.<sup>1</sup> Este enfoque permite una exploración deliberada, la planificación con anticipación (lookahead) y la capacidad de retroceder (backtracking) cuando un camino resulta ser un callejón sin salida, imitando un proceso de resolución de problemas más sofisticado y humano.<sup>18</sup>

##### **Componentes del Marco ToT**

El marco ToT se compone de tres elementos clave que trabajan en conjunto:

1. **Generación de Pensamientos**: A partir de un estado del problema, se le solicita al LLM que genere varios "pensamientos" o siguientes pasos potenciales. Cada pensamiento se convierte en una nueva rama en el árbol.<sup>21</sup> Estos pueden ser generados de forma independiente (muestreo) o como propuestas secuenciales que continúan un camino existente.<sup>23</sup>
2. **Evaluación de Estados**: Este es un componente crucial de la deliberación. El propio LLM se utiliza para evaluar la viabilidad o el valor de cada pensamiento generado. Esta evaluación puede tomar la forma de una puntuación de valor (p. ej., calificar un paso en un problema matemático como "seguro/quizás/imposible") o un mecanismo de votación en el que se comparan varios caminos para determinar el más prometedor.<sup>21</sup> Esta capacidad de autoevaluación es lo que permite al modelo tomar decisiones informadas sobre qué caminos explorar.<sup>19</sup>
3. **Algoritmo de Búsqueda**: ToT integra algoritmos de búsqueda clásicos para navegar por el árbol de pensamientos. Los más comunes son la Búsqueda en Anchura (BFS), que explora todos los nodos de un nivel antes de pasar al siguiente, y la Búsqueda en Profundidad (DFS), que explora una rama hasta el final antes de retroceder.<sup>24</sup> Estos algoritmos utilizan las evaluaciones de estado para decidir qué ramas podar (descartar) y cuáles expandir, gestionando eficientemente el espacio de búsqueda.

##### **Fortalezas**

- **Resolución Mejorada de Problemas Complejos**: ToT sobresale en tareas que requieren planificación, búsqueda o donde existen múltiples soluciones viables, como la resolución de puzles (p. ej., el Juego del 24) o la planificación estratégica.<sup>11</sup> Supera con creces a CoT en estos escenarios no lineales.<sup>14</sup>
- **Mitigación de Errores**: Al explorar múltiples caminos, ToT es inherentemente más robusto frente a los errores tempranos. Un error en una rama no condena toda la solución, ya que otras ramas pueden seguir siendo viables. Las ramas poco prometedoras se identifican y se podan, evitando la propagación de errores que afecta al CoT.<sup>1</sup>

##### **Debilidades**

- **Intensidad Computacional**: La generación y evaluación de múltiples ramas consume significativamente más recursos computacionales (tokens) y tiempo que una única cadena de CoT.<sup>14</sup> Esto lo hace menos eficiente para problemas simples.
- **Complejidad de Implementación**: A diferencia del CoT, que puede ser tan simple como añadir una frase a un prompt, ToT es un marco complejo. Requiere un diseño cuidadoso de los prompts de generación y evaluación, así como la integración de un algoritmo de búsqueda, lo que supone un esfuerzo de ingeniería considerable.<sup>22</sup>

#### **4\. Reasoning and Acting (ReAct): Sinergia entre Pensamiento y Herramientas Externas**

##### **Mecanismo Central**

El marco ReAct crea un potente bucle sinérgico entre el razonamiento interno y la acción externa. En lugar de depender únicamente de su conocimiento estático, el LLM genera secuencias intercaladas de **Pensamiento** (razonamiento verbalizado interno), **Acción** (una llamada a una herramienta externa) y **Observación** (el resultado devuelto por la herramienta).<sup>15</sup> Este ciclo permite al modelo interactuar con su entorno para recopilar información actualizada y fundamentar su razonamiento.<sup>28</sup>

##### **El Bucle ReAct**

El proceso se desarrolla de la siguiente manera:

1. **Pensamiento (Thought)**: El LLM analiza la tarea y su estado actual, verbalizando un plan o un paso de razonamiento. Por ejemplo: "Necesito averiguar la versión actual de la biblioteca 'requests' y si tiene alguna vulnerabilidad de seguridad conocida".
2. **Acción (Action)**: Basado en el pensamiento, el LLM genera una acción específica y ejecutable para interactuar con una herramienta externa. Por ejemplo: search("requests library PyPI version") o security_scan("requests").
3. **Observación (Observation)**: El sistema ejecuta la acción (p. ej., realiza la búsqueda web o ejecuta el escáner) y devuelve el resultado al LLM. Por ejemplo: "Resultado de la búsqueda: 'requests 2.31.0'. Resultado del escáner: 'No se encontraron vulnerabilidades críticas'".
4. El bucle se repite, con la nueva observación informando el siguiente pensamiento, permitiendo al agente refinar su plan y acercarse a la solución.

##### **Fortalezas**

- **Fundamentación y Veracidad**: Al interactuar con herramientas externas (APIs, bases de datos, búsqueda web, terminales de comandos), ReAct ancla el razonamiento del LLM en información del mundo real, actualizada y verificable. Esto reduce drásticamente las alucinaciones y supera la limitación fundamental del conocimiento estático del modelo.<sup>13</sup>
- **Adaptabilidad Dinámica**: El marco es inherentemente dinámico. El agente puede ajustar su plan sobre la marcha basándose en las observaciones que recibe, manejar excepciones (p. ej., una API que devuelve un error) y recuperarse de acciones fallidas, mostrando una robustez similar a la humana.<sup>26</sup>
- **Interpretabilidad Mejorada**: El rastro explícito de pensamiento-acción-observación proporciona un registro claro y legible por humanos del comportamiento del agente. Esto facilita enormemente la depuración, la auditoría y la generación de confianza en las decisiones del sistema.<sup>29</sup>

##### **Debilidades**

- **Dependencia de la Calidad de las Herramientas**: El rendimiento de un agente ReAct está directamente ligado a la calidad, fiabilidad y diseño de las herramientas disponibles. Una herramienta que devuelve información no informativa, irrelevante o errónea puede desviar por completo el proceso de razonamiento del agente.<sup>16</sup>
- **Restricciones Estructurales**: El formato estricto Pensamiento-Acción-Observación puede ser menos flexible o eficiente para tareas que son puramente de razonamiento interno, donde un CoT más directo podría ser suficiente y consumir menos recursos.<sup>16</sup>

### **Parte II: Aplicación Estratégica para Agentes de Desarrollo de Software**

Esta parte pasa de la teoría a la aplicación, analizando cómo cada marco de razonamiento puede ser desplegado estratégicamente por un agente coder para abordar los desafíos multifacéticos del ciclo de vida del desarrollo de software.

#### **5\. Análisis Comparativo: Adaptando Arquitecturas Cognitivas a Tareas de Software**

Ningún marco de razonamiento es óptimo para todas las tareas del desarrollo de software. Un agente programador verdaderamente avanzado no será un "agente CoT" o un "agente ReAct", sino un sistema sofisticado capaz de cambiar dinámicamente su modo cognitivo —CoT, ToT o ReAct— en función de la tarea específica que tenga entre manos. Este concepto de "cambio de modo cognitivo" es análogo a cómo un desarrollador humano opera: a veces se enfoca en una codificación lineal y profunda, otras veces realiza una lluvia de ideas arquitectónicas con múltiples ramas, y otras veces entra en un bucle interactivo de depuración.

El ciclo de vida del desarrollo de software se puede desglosar en fases distintas, cada una de las cuales se alinea mejor con una arquitectura cognitiva específica:

1. **Planificación de Alto Nivel**: Tareas como la elección de una arquitectura de software, la selección de un stack tecnológico o el diseño de la estructura de una base de datos implican explorar y comparar múltiples alternativas mutuamente excluyentes. Este escenario es un mal ajuste para el CoT lineal, pero es precisamente donde brilla el ToT, con su capacidad para explorar y evaluar ramas de decisión paralelas.<sup>3</sup>
2. **Diseño e Implementación de Componentes**: Una vez que se ha tomado una decisión de alto nivel, la implementación de una función o módulo bien definido se convierte en un proceso más lineal. El desarrollador sigue una secuencia lógica de pasos: definir la interfaz, manejar los casos de borde, escribir la lógica principal, etc. Este proceso se asigna perfectamente a la descomposición paso a paso del CoT.<sup>7</sup>
3. **Desarrollo Iterativo y Depuración**: La escritura de código en el mundo real rara vez es un proceso de un solo paso. Es un bucle iterativo de escribir código, ejecutar pruebas, leer archivos, inspeccionar registros y corregir errores. Este ciclo de acción y observación es la esencia del marco ReAct, lo que lo convierte en el motor de ejecución ideal para el trabajo práctico de codificación.<sup>26</sup>

Por lo tanto, una arquitectura de agente de última generación debe ser un sistema híbrido. Debería emplear ToT para las decisiones estratégicas de alto nivel, cambiar a CoT para planificar la implementación de componentes específicos y, finalmente, utilizar ReAct como el núcleo de ejecución para escribir, probar y depurar el código de manera interactiva.

La siguiente tabla sirve como una herramienta de decisión de referencia rápida para los ingenieros que diseñan agentes programadores, destilando las compensaciones en un formato estructurado.

**Tabla 1: Matriz Comparativa de CoT, ToT y ReAct para Tareas de Desarrollo de Software**

| Framework | Mecanismo Central | Tarea Principal de Software | Tareas Secundarias de Software | Fortalezas en el Contexto de Codificación | Debilidades en el Contexto de Codificación | Complejidad de Implementación |
| --- | --- | --- | --- | --- | --- | --- |
| **Chain of Thought (CoT)** | Descomposición lineal paso a paso. | Planificación de la implementación de funciones; Generación de explicaciones de código. | Creación de documentación; Refactorización simple. | Proporciona un plan claro y estructurado para la codificación. Mejora la interpretabilidad del proceso de generación de código.<sup>5</sup> | La propagación de errores puede llevar a algoritmos defectuosos. Propenso a alucinar sobre APIs o sintaxis si no se verifica.<sup>14</sup> | Baja |
| --- | --- | --- | --- | --- | --- | --- |
| **Tree of Thoughts (ToT)** | Exploración y evaluación de múltiples caminos de razonamiento en paralelo. | Planificación arquitectónica; Diseño de algoritmos complejos; Selección de tecnología. | Refactorización a gran escala; Optimización de rendimiento. | Permite comparar arquitecturas (p. ej., monolito vs. microservicios) o algoritmos (p. ej., quicksort vs. mergesort) antes de la implementación.<sup>1</sup> Mitiga el riesgo de elegir un camino subóptimo.<sup>10</sup> | Computacionalmente costoso para tareas simples de codificación. La sobrecarga de la búsqueda puede ralentizar el desarrollo rápido.<sup>14</sup> | Alta |
| --- | --- | --- | --- | --- | --- | --- |
| **ReAct (Reasoning + Acting)** | Bucle iterativo de Pensamiento-Acción-Observación con herramientas externas. | Desarrollo iterativo; Depuración; Pruebas; Integración continua. | Búsqueda de documentación; Análisis de dependencias; Escaneo de seguridad. | Fundamenta la generación de código en el estado real del repositorio (mediante herramientas de E/S de archivos). Permite un bucle robusto de prueba-corrección-reprueba. Reduce la alucinación sobre versiones de bibliotecas al permitir verificaciones en tiempo real.<sup>15</sup> | Ineficiente para el diseño de algoritmos puros donde no se necesita interacción con herramientas. La latencia del bucle puede ser excesiva para la generación de código simple de un solo paso.<sup>16</sup> | Media |
| --- | --- | --- | --- | --- | --- | --- |

#### **6\. CoT en la Práctica: De la Planificación Algorítmica a la Explicación Post-Hoc**

En el contexto de la codificación, CoT puede utilizarse de dos maneras estratégicas. La primera es la **planificación previa a la computación**: antes de escribir una función compleja, el agente puede usar CoT para generar un plan detallado en lenguaje natural o pseudocódigo.<sup>5</sup> Este plan sirve como un prompt altamente contextualizado para el paso final de generación de código, guiando al modelo hacia una implementación más lógica y estructurada.

Sin embargo, una aplicación más profunda y contraintuitiva surge en el contexto del afinamiento (fine-tuning) de modelos de código. Una investigación reveló que para esta tarea, invertir el orden tradicional a prompt -> código -> CoT produjo una mejora significativa del rendimiento (hasta un 9.86%) en comparación con el enfoque estándar de prompt -> CoT -> código.<sup>33</sup>

Este hallazgo sugiere una dinámica fundamental sobre cómo los LLM manejan dominios especializados como el código:

1. El paradigma estándar CoT -> código asume que el razonamiento en lenguaje natural es el precursor causal del buen código.
2. Sin embargo, la "habilidad" de un LLM para generar código idiomático y sintácticamente correcto puede ser una capacidad de coincidencia de patrones más intuitiva y distinta de su "habilidad" para articular pasos lógicos en prosa.
3. Forzar al modelo a razonar primero podría restringir o interferir con su potente capacidad de generación de código. Podría producir un código forzado y literal que sigue la prosa, en lugar de un código idiomático y eficiente.
4. El paradigma código -> CoT desacopla estas dos habilidades. Primero, el modelo genera el código utilizando toda su capacidad de coincidencia de patrones. Luego, realiza una tarea separada y posiblemente más sencilla: explicar el código que acaba de escribir.
5. La implicación más amplia es que, para dominios altamente especializados, el "pensamiento" puede ser una racionalización post-hoc en lugar de un razonamiento a priori. Esto tiene profundas consecuencias sobre cómo se deben estructurar los datos de entrenamiento para agentes especializados. El CoT no solo beneficia al agente, sino que se convierte en un artefacto valioso para la mantenibilidad y la comprensión por parte de los desarrolladores humanos.

Como guía accionable, se recomienda que al afinar un agente programador, los datos de entrenamiento se estructuren como tripletas de (pregunta, código_final, explicación_CoT). Esta CoT generada puede luego ser integrada como comentarios de código, mejorando directamente la calidad y mantenibilidad del software producido.<sup>33</sup>

#### **7\. ToT en la Práctica: Planificación Arquitectónica y Diseño Algorítmico**

ToT es el marco ideal para las fases iniciales y más estratégicas del desarrollo de software, donde la exploración y evaluación de alternativas de alto nivel es crucial.<sup>3</sup>

Un ejemplo claro es la **selección de una arquitectura o tecnología**. Consideremos el siguiente flujo de trabajo para un agente encargado de "seleccionar una base de datos para una nueva aplicación de red social":

1. **Nodo Raíz (Problema)**: "Seleccionar una base de datos para una nueva aplicación de red social con requisitos de alta escalabilidad y consultas de conexión complejas."
2. **Generación de Pensamientos (Ramas)**: El agente genera varias alternativas de alto nivel.
    - "Camino A: Usar una base de datos relacional como PostgreSQL, aprovechando su robustez y transaccionalidad."
    - "Camino B: Usar un almacén de documentos NoSQL como MongoDB, para una mayor flexibilidad de esquema."
    - "Camino C: Usar una base de datos de grafos como Neo4j, optimizada para consultas de relaciones sociales."
3. **Evaluación de Estados**: El agente evalúa cada camino contra los requisitos clave. Utilizando el propio LLM, asigna puntuaciones o valoraciones a cada rama. Por ejemplo, podría concluir que PostgreSQL (Camino A) es excelente para la integridad de los datos pero podría enfrentar desafíos de escalabilidad horizontal, mientras que Neo4j (Camino C) es perfecto para el grafo social pero menos ideal para almacenar contenido de usuario como publicaciones o mensajes.
4. **Poda y Exploración**: Basándose en la evaluación, el agente podría podar caminos menos prometedores o expandir los más viables. Podría concluir que una arquitectura híbrida (usando PostgreSQL para los datos de usuario y Neo4j para las conexiones) es la solución óptima, generando así una decisión arquitectónica matizada y bien razonada que sería difícil de alcanzar con un enfoque lineal.

De manera similar, para el **diseño de algoritmos complejos**, ToT permite al agente explorar diferentes estrategias de implementación (p. ej., un enfoque recursivo vs. uno iterativo), comparar su complejidad teórica en tiempo y espacio, y seleccionar el enfoque más óptimo antes de escribir una sola línea de código.<sup>34</sup>

#### **8\. ReAct en la Práctica: El Núcleo del Agente Coder Interactivo**

El ciclo de desarrollo diario de un programador —escribir, compilar, probar, depurar— se puede modelar directamente como un bucle ReAct.<sup>26</sup> Aquí, el agente no solo genera código, sino que interactúa activamente con el entorno de desarrollo.

El poder de un agente ReAct reside en su **conjunto de herramientas**. Un agente programador eficaz debe estar equipado con herramientas que le permitan percibir y manipular su entorno de desarrollo. Un conjunto de herramientas esencial incluiría:

- **Herramientas del Sistema de Archivos**: read_file(path), write_file(path, content), list_directory(path). Para leer el código existente, escribir nuevo código y navegar por la estructura del proyecto.
- **Herramientas de Ejecución de Código**: execute_python_script(path), execute_shell_command(command). Para ejecutar el código, instalar dependencias o ejecutar scripts de compilación.
- **Herramientas de Pruebas**: run_unit_tests(path), run_integration_tests(). Para validar la funcionalidad del código y detectar regresiones.
- **Herramientas de Validación y Análisis**: lint_code(path), run_static_analysis(), scan_for_security_vulnerabilities(). Para garantizar la calidad, el estilo y la seguridad del código, abordando directamente los desafíos de fiabilidad del código generado por LLM.<sup>37</sup>
- **Herramientas de Recuperación de Información**: web_search(query) para buscar documentación de API o soluciones a errores, y vector_search_codebase(query) para encontrar fragmentos de código relevantes dentro del propio repositorio.

A continuación se muestra un **ejemplo de traza de una sesión de depuración con ReAct**, donde el agente debe corregir un error en un script de Python:

- **Entrada Inicial**: "El script calculator.py falla en la prueba test_divide_by_zero con un error ZeroDivisionError."
- **Traza del Agente**:
  - **Pensamiento 1**: El error es un ZeroDivisionError en test_divide_by_zero. Necesito examinar el código de la función de división en calculator.py y el código de la prueba en tests/test_calculator.py para entender la causa.
  - **Acción 1**: read_file('calculator.py')
  - **Observación 1**: (Contenido de calculator.py, mostrando def divide(a, b): return a / b)
  - **Pensamiento 2**: La función divide no maneja el caso en que b es cero. Esta es la causa probable del error. Necesito modificar la función para que levante una excepción ValueError si el divisor es cero, como es la práctica común en Python.
  - **Acción 2**: write_file('calculator.py', 'def divide(a, b):\\n if b == 0:\\n raise ValueError("Cannot divide by zero")\\n return a / b')
  - **Observación 2**: "Archivo calculator.py actualizado con éxito."
  - **Pensamiento 3**: He modificado el código. Ahora necesito ejecutar las pruebas nuevamente para verificar que la corrección funciona y no he introducido nuevas regresiones.
  - **Acción 3**: run_unit_tests('tests/test_calculator.py')
  - **Observación 3**: "Todas las pruebas pasaron con éxito."
  - **Pensamiento 4**: El error ha sido corregido y las pruebas lo confirman. La tarea está completa.
  - **Acción 4**: finish("El bug ha sido corregido en calculator.py y todas las pruebas pasan.")

Este ejemplo concreto ilustra cómo el bucle Pensamiento-Acción-Observación permite al agente diagnosticar, actuar y verificar de manera sistemática, reflejando el flujo de trabajo de un desarrollador humano.<sup>40</sup>

### **Parte III: Guía de Implementación y Planos Accionables**

Esta parte final proporciona la guía práctica, traduciendo las discusiones teóricas y estratégicas en orientación accionable para construir y desplegar agentes programadores eficaces.

#### **9\. Una Guía Práctica para Implementar Agentes Coder**

##### **Prompting Estructurado para Agentes Coder**

Un prompting eficaz es crucial para guiar el comportamiento del agente. El uso de un formato estructurado, como las etiquetas XML recomendadas por Anthropic, hace que la salida del modelo sea más predecible, más fácil de analizar y ayuda al propio modelo a separar su razonamiento de su entregable final.<sup>42</sup> Se deben utilizar etiquetas como

&lt;thinking&gt;, &lt;plan&gt;, &lt;code&gt; y &lt;explanation&gt; para delimitar las diferentes partes de la salida del agente.

La siguiente tabla proporciona plantillas de prompts listas para usar que los desarrolladores pueden adaptar, ahorrando un tiempo y esfuerzo significativos en la ingeniería de prompts.

**Tabla 2: Plantillas de Prompts para Agentes Coder**

| Tarea | Marco de Razonamiento | Plantilla de Prompt |
| --- | --- | --- |
| **Generación de Función** | CoT | Usted es un desarrollador experto en Python. Su tarea es escribir una función que cumpla con los siguientes requisitos: &lt;requisitos&gt;{{REQUISITOS}}&lt;/requisitos&gt;. Antes de escribir el código, piense paso a paso dentro de etiquetas &lt;plan&gt; para delinear su enfoque. Luego, escriba el código final dentro de etiquetas &lt;code&gt;. Finalmente, proporcione una breve explicación en etiquetas &lt;explanation&gt;. |
| --- | --- | --- |
| **Planificación Arquitectónica** | ToT | Imagine a tres arquitectos de software expertos discutiendo la mejor arquitectura para el siguiente problema: {{PROBLEMA}}. Cada experto debe proponer un enfoque inicial (p. ej., monolítico, microservicios, sin servidor). Luego, cada uno debe evaluar los pros y los contras de cada enfoque en el contexto de los requisitos del problema. Deben debatir y refinar sus ideas hasta llegar a una recomendación consensuada o a una comparación clara de las compensaciones. Estructure la discusión como un árbol de pensamientos, explorando cada rama. |
| --- | --- | --- |
| **Depuración de Código** | ReAct | Usted es un desarrollador experto en Python. Una prueba unitaria está fallando. Su objetivo es corregir el código para que la prueba pase. Tiene acceso a las siguientes herramientas:. Utilice el siguiente formato:\\nPensamiento:\\nAcción: \[La herramienta a usar, p. ej., read_file\]\\nEntrada de Acción: \[La entrada para la herramienta, p. ej., 'tests/test_logic.py'\]\\nObservación:\\n... (repita Pensamiento/Acción/Observación N veces)...\\nPensamiento: He corregido el error y las pruebas ahora deberían pasar.\\nAcción: finish\\n\\nContexto inicial:\\n&lt;error_log&gt;{{MENSAJE_DE_ERROR}}&lt;/error_log&gt;\\n&lt;test_code&gt;{{CONTENIDO_DEL_CODIGO_DE_PRUEBA}}&lt;/test_code&gt; |
| --- | --- | --- |

##### **Implementación con Frameworks de Agentes (LangChain y AutoGen)**

- **LangChain**: Es un framework popular para construir aplicaciones con LLM. Para implementar un agente ReAct, se puede utilizar la función create_react_agent. Es crucial definir herramientas personalizadas que el agente pueda usar. Por ejemplo, una herramienta run_pytest se puede crear a partir de una función de Python que ejecute los tests y devuelva la salida.<sup>43</sup> LangChain proporciona decoradores y clases base para facilitar la creación de estas herramientas personalizadas, permitiendo al agente interactuar con cualquier sistema externo.<sup>44</sup>
- **AutoGen**: Este framework de Microsoft se especializa en la creación de sistemas multi-agente conversacionales. Se puede utilizar AutoGen Studio, una interfaz de bajo código, para configurar un flujo de trabajo donde múltiples agentes colaboran.<sup>46</sup> Por ejemplo, se podría crear un "Agente Programador" responsable de escribir el código, y un "Agente de QA" responsable de ejecutar las pruebas y reportar los errores. El Agente Programador recibiría los informes de errores del Agente de QA y entraría en un bucle de corrección, emulando un equipo de desarrollo de software.

#### **10\. El Flujo de Trabajo Centrado en la Validación: Mitigando los Riesgos del Código LLM**

La barrera más significativa para la adopción generalizada del código generado por LLM es su falta de fiabilidad. El código puede ser sintácticamente correcto pero contener errores lógicos sutiles, problemas de rendimiento, ineficiencias o, lo que es peor, vulnerabilidades de seguridad críticas.<sup>37</sup> Un proceso de revisión manual por parte de humanos es lento, costoso y a menudo insuficiente para detectar todos los problemas.<sup>49</sup>

Aquí es donde el marco ReAct puede ser transformador. El problema no es solo generar código, sino generar código _confiable_. Los desarrolladores humanos generan confianza a través de un riguroso proceso de validación: pruebas, linting, análisis estático y escaneo de seguridad. El marco ReAct está perfectamente adaptado para _automatizar_ este mismo proceso de validación. Las "Acciones" del agente no deben limitarse a write_file, sino que deben incluir run_linter, run_security_scan y run_tests.

Esto redefine el objetivo del agente: su tarea no está completa cuando el código está escrito, sino cuando el código pasa un conjunto predefinido de puertas de calidad. Este enfoque transforma al agente de un simple "generador de código" a un "ingeniero de aseguramiento de calidad automatizado", una propuesta de valor mucho más alta que aborda directamente el principal obstáculo para la adopción de la IA en el desarrollo de software.

Un **plano para un agente ReAct centrado en la validación** incluiría los siguientes pasos:

1. **Definir las Puertas de Calidad**: El agente recibe una "definición de completado" en su prompt de sistema. Por ejemplo: "El código debe estar formateado según el estándar PEP 8, pasar todas las reglas del linter, no tener vulnerabilidades críticas o altas según el escáner de seguridad, y pasar el 100% de las pruebas unitarias."
2. **Bucle de Refinamiento Iterativo**: El agente escribe una primera versión del código.
3. **Ejecución de la Validación**: El agente ejecuta sistemáticamente el código a través de las herramientas de validación (linter, escáner, suite de pruebas).
4. **Autocorrección**: El agente utiliza la salida (Observaciones) de las herramientas de validación para informar su siguiente Pensamiento y Acción, que consiste en corregir el código. Por ejemplo, si el linter reporta una línea demasiado larga, el agente la reescribirá. Si una prueba falla, el agente analizará el error y modificará la lógica.
5. Este bucle continúa hasta que todas las puertas de calidad se superan con éxito.

#### **11\. Gestión del Estado para Tareas de Desarrollo Complejas**

El desarrollo de software en el mundo real no es una tarea corta y sin estado. Implica trabajar en múltiples archivos, recordar decisiones de diseño anteriores y mantener un estado coherente durante largos períodos. Las ventanas de contexto de los LLM, aunque cada vez más grandes, siguen siendo una limitación fundamental para estas tareas de larga duración.<sup>48</sup>

Para abordar este desafío, se pueden utilizar arquitecturas basadas en grafos como **LangGraph**.<sup>51</sup> LangGraph, una extensión de LangChain, permite modelar los flujos de trabajo de los agentes como grafos de estado.

- **Gestión del Estado**: El estado del grafo es un objeto que persiste a lo largo de la ejecución del agente. Puede contener información crucial como la lista de archivos modificados, los resultados de las últimas pruebas, el plan de alto nivel y el historial de conversación. Esto proporciona al agente una memoria a largo plazo que va más allá de la ventana de contexto del LLM.<sup>53</sup>
- **Aristas Condicionales**: LangGraph permite crear flujos de trabajo más complejos que un simple bucle ReAct. Se pueden definir aristas condicionales que dirigen el flujo en función del estado. Por ejemplo, después de una acción execute_tests, una arista condicional puede enrutar al agente a un nodo de "depuración" si las pruebas fallan, o a un nodo de "confirmar_código" si pasan. Esto permite un comportamiento de agente mucho más sofisticado, robusto y similar al humano.

#### **12\. Conclusión y Direcciones Futuras**

El avance de los agentes de IA en el dominio del desarrollo de software depende de la adopción de arquitecturas cognitivas sofisticadas. Este informe ha analizado tres marcos fundamentales —CoT, ToT y ReAct— y ha extraído varias conclusiones clave para su aplicación práctica:

1. **La Necesidad de un Enfoque Híbrido**: El agente programador más eficaz no se adherirá rígidamente a un único modo de razonamiento. En su lugar, será un sistema híbrido capaz de realizar un "cambio de modo cognitivo", utilizando ToT para la planificación estratégica, CoT para la descomposición de tareas y ReAct como el motor de ejecución interactivo.
2. **El Paradigma código -> CoT para el Afinamiento**: La investigación sugiere que, para afinar modelos de código, es más eficaz hacer que el modelo genere primero el código y luego la explicación (CoT). Esto desacopla la generación de código basada en patrones de la racionalización en lenguaje natural y produce artefactos de explicación valiosos para los desarrolladores humanos.
3. **La Centralidad del Bucle de Validación ReAct**: La confianza es el principal obstáculo para la adopción del código generado por IA. Un flujo de trabajo ReAct centrado en la validación, donde el agente es responsable no solo de escribir código sino de asegurar que pasa rigurosas puertas de calidad (linting, pruebas, seguridad), es la estrategia más prometedora para construir agentes programadores fiables y listos para la producción.

El futuro de estos marcos parece dirigirse hacia una mayor integración y sofisticación. Podemos anticipar algoritmos de búsqueda y planificación más avanzados para ToT, la estandarización de conjuntos de herramientas para agentes ReAct en diferentes lenguajes y dominios, y la integración cada vez más profunda de estas arquitecturas cognitivas directamente en los Entornos de Desarrollo Integrado (IDE) y las plataformas de desarrollo de software de extremo a extremo, transformando fundamentalmente la forma en que se crea el software.<sup>6</sup>

#### Obras citadas

1. Beginner's Guide To Tree Of Thoughts Prompting (With Examples) | Zero To Mastery, fecha de acceso: julio 6, 2025, <https://zerotomastery.io/blog/tree-of-thought-prompting/>
2. Comprehensive Guide to Chain-of-Thought Prompting - Mercity AI, fecha de acceso: julio 6, 2025, <https://www.mercity.ai/blog-post/guide-to-chain-of-thought-prompting>
3. Comparing Reasoning Frameworks: ReAct, Chain-of-Thought, and Tree-of-Thoughts | by allglenn | Stackademic, fecha de acceso: julio 6, 2025, <https://blog.stackademic.com/comparing-reasoning-frameworks-react-chain-of-thought-and-tree-of-thoughts-b4eb9cdde54f>
4. Why does CoT and ToT enhance the performance of LLMs : r/LocalLLM - Reddit, fecha de acceso: julio 6, 2025, <https://www.reddit.com/r/LocalLLM/comments/1ikn2i7/why_does_cot_and_tot_enhance_the_performance_of/>
5. What is chain of thought (CoT) prompting? - IBM, fecha de acceso: julio 6, 2025, <https://www.ibm.com/think/topics/chain-of-thoughts>
6. CodeGPT: AI Agents for Software Development, fecha de acceso: julio 6, 2025, <https://codegpt.co/>
7. Chain-of-Thought Prompting Elicits Reasoning in Large ... - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/pdf/2201.11903>
8. Chain-of-Thought Prompting Elicits Reasoning in Large Language Models - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/abs/2201.11903>
9. Chain of Thought (CoT), Tree of Thought (ToT), and ReAct (Reasoning & Acting) | by Hema Sri Nakirikanti | Medium, fecha de acceso: julio 6, 2025, <https://medium.com/@hemasri.nakirikanti16/chain-of-thought-cot-tree-of-thought-tot-and-react-reasoning-acting-aeab1b94f1d9>
10. Comprehensive Guide to Prompt Engineering Techniques and Applications - Deepchecks, fecha de acceso: julio 6, 2025, <https://www.deepchecks.com/comprehensive-guide-to-prompt-engineering-techniques-and-applications/>
11. Advanced Prompt Engineering Techniques - Mercity AI, fecha de acceso: julio 6, 2025, <https://www.mercity.ai/blog-post/advanced-prompt-engineering-techniques>
12. \[2304.03262\] When do you need Chain-of-Thought Prompting for ChatGPT? - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/abs/2304.03262>
13. 5 Advanced Prompting Techniques to Improve Your LLM App's Responses - athina.ai, fecha de acceso: julio 6, 2025, <https://blog.athina.ai/5-advanced-prompting-techniques-to-improve-your-llm-app-s-responses>
14. Comparing Chain-of-Thought (CoT) and Tree-of-Thought (ToT) Reasoning Models in AI Agents - Monster API, fecha de acceso: julio 6, 2025, <https://blog.monsterapi.ai/chain-of-thought-cot-and-tree-of-thought-tot-reasoning-models-in-ai-agents/>
15. ReAct: Synergizing Reasoning and Acting in Language Models - Google Research, fecha de acceso: julio 6, 2025, <https://research.google/blog/react-synergizing-reasoning-and-acting-in-language-models/>
16. ReAct - Prompt Engineering Guide, fecha de acceso: julio 6, 2025, <https://www.promptingguide.ai/techniques/react>
17. ToTRL: Unlock LLM Tree-of-Thoughts Reasoning Potential through Puzzles Solving - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/html/2505.12717v1>
18. What is Tree Of Thoughts Prompting? - IBM, fecha de acceso: julio 6, 2025, <https://www.ibm.com/think/topics/tree-of-thoughts>
19. Tree of Thoughts: Deliberate Problem Solving with Large Language Models - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/html/2305.10601v2>
20. Tree of Thoughts: Deliberate Problem Solving with Large Language Models - OpenReview, fecha de acceso: julio 6, 2025, <https://openreview.net/forum?id=5Xc1ecxO1h>
21. Improving LLM Reasoning with Multi-Agent Tree-of-Thought Validator Agent - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/html/2409.11527v2>
22. Tree of Thought (ToT) prompting - GeeksforGeeks, fecha de acceso: julio 6, 2025, <https://www.geeksforgeeks.org/artificial-intelligence/tree-of-thought-tot-prompting/>
23. princeton-nlp/tree-of-thought-llm: \[NeurIPS 2023\] Tree of Thoughts: Deliberate Problem Solving with Large Language Models - GitHub, fecha de acceso: julio 6, 2025, <https://github.com/princeton-nlp/tree-of-thought-llm>
24. Tree of Thoughts (ToT) | Prompt Engineering Guide, fecha de acceso: julio 6, 2025, <https://www.promptingguide.ai/techniques/tot>
25. Prompt Engineering Techniques. Chain of Thought (CoT)… | by Gul Gultekin Erdem | Medium, fecha de acceso: julio 6, 2025, <https://medium.com/@GULGULTEKIN/prompt-engineering-techniques-37a473ed25a6>
26. ReAct: Synergizing Reasoning and Acting in Language Models - arXiv, fecha de acceso: julio 6, 2025, <https://arxiv.org/pdf/2210.03629>
27. What is a ReAct Agent? | IBM, fecha de acceso: julio 6, 2025, <https://www.ibm.com/think/topics/react-agent>
28. ReAct: Synergizing Reasoning and Acting in Language Models - ResearchGate, fecha de acceso: julio 6, 2025, <https://www.researchgate.net/publication/364290390_ReAct_Synergizing_Reasoning_and_Acting_in_Language_Models>
29. ReAct: Synergizing Reasoning and Acting in Language Models, fecha de acceso: julio 6, 2025, <https://react-lm.github.io/>
30. ReAct Agent: Guide to understand its functionalities and create it from scratch, fecha de acceso: julio 6, 2025, <https://www.plainconcepts.com/react-agent-ai/>
31. Building ReAct Agents from Scratch: A Hands-On Guide using Gemini - Medium, fecha de acceso: julio 6, 2025, <https://medium.com/google-cloud/building-react-agents-from-scratch-a-hands-on-guide-using-gemini-ffe4621d90ae>
32. ReAct: Synergizing Reasoning and Acting in Language Models - Hugging Face, fecha de acceso: julio 6, 2025, <https://huggingface.co/papers/2210.03629>
33. Revisiting Chain-of-Thought in Code Generation: Do Language Models Need to Learn Reasoning before Coding? | OpenReview, fecha de acceso: julio 6, 2025, [https://openreview.net/forum?id=wSZeQoJ1Vk&referrer=%5Bthe%20profile%20of%20Ren-Biao%20Liu%5D(%2Fprofile%3Fid%3D~Ren-Biao_Liu1)](https://openreview.net/forum?id=wSZeQoJ1Vk&referrer=%5Bthe+profile+of+Ren-Biao+Liu%5D%28/profile?id%3D~Ren-Biao_Liu1%29)
34. Master Tree-of-Thoughts Prompting for Better Problem-Solving - Relevance AI, fecha de acceso: julio 6, 2025, <https://relevanceai.com/prompt-engineering/master-tree-of-thoughts-prompting-for-better-problem-solving>
35. Tree of Thoughts: A New Way to Prompt AI - DEV Community, fecha de acceso: julio 6, 2025, <https://dev.to/zokizuan/tree-of-thoughts-a-new-way-to-prompt-ai-2dle>
36. Implementing ReAct Agentic Pattern From Scratch - Daily Dose of Data Science, fecha de acceso: julio 6, 2025, <https://www.dailydoseofds.com/ai-agents-crash-course-part-10-with-implementation/>
37. Unveiling Inefficiencies in LLM-Generated Code: Toward a Comprehensive Taxonomy, fecha de acceso: julio 6, 2025, <https://arxiv.org/html/2503.06327v2>
38. Code Generation with LLMs: Practical Challenges, Gotchas, and Nuances - Medium, fecha de acceso: julio 6, 2025, <https://medium.com/@adnanmasood/code-generation-with-llms-practical-challenges-gotchas-and-nuances-7b51d394f588>
39. The Hidden Risks of LLM-Generated Web Application Code : r/PromptEngineering - Reddit, fecha de acceso: julio 6, 2025, <https://www.reddit.com/r/PromptEngineering/comments/1kb5xmj/the_hidden_risks_of_llmgenerated_web_application/>
40. Multi-agent System Design Patterns From Scratch In Python | ReAct Agents - Medium, fecha de acceso: julio 6, 2025, <https://medium.com/aimonks/multi-agent-system-design-patterns-from-scratch-in-python-react-agents-e4480d099f38>
41. How to Build a ReAct Agent from Scratch with Python - YouTube, fecha de acceso: julio 6, 2025, <https://www.youtube.com/watch?v=GSep4L4vS08>
42. Let Claude think (chain of thought prompting) to increase ..., fecha de acceso: julio 6, 2025, <https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/chain-of-thought>
43. Build an Agent | 🦜️ LangChain, fecha de acceso: julio 6, 2025, <https://python.langchain.com/docs/tutorials/agents/>
44. Agent & Tools — Basic Code using LangChain | by Shravan Kumar - Medium, fecha de acceso: julio 6, 2025, <https://medium.com/@shravankoninti/agent-tools-basic-code-using-langchain-50e13eb07d92>
45. Building a simple Agent with Tools and Toolkits in LangChain | by Sami Maameri - Medium, fecha de acceso: julio 6, 2025, <https://medium.com/data-science/building-a-simple-agent-with-tools-and-toolkits-in-langchain-77e0f9bd1fa5>
46. "Introduction to AutoGen Studio" By Hector Perez - YouTube, fecha de acceso: julio 6, 2025, <https://www.youtube.com/watch?v=GE4RPAhiWq4>
47. Multi AI Agent Workflow—The End Is Nigh For Devs | by Reflections & Ideas - Desmond Loh, fecha de acceso: julio 6, 2025, <https://medium.com/@desmond2112/multi-ai-agent-workflow-the-end-is-nigh-for-devs-a12561296546>
48. Challenges to Using Large Language Models in Code Generation and Repair, fecha de acceso: julio 6, 2025, <https://www.computer.org/csdl/magazine/sp/2025/02/10942512/25p32OfDUaY>
49. Ask HN: Anyone struggling to get value out of coding LLMs? - Hacker News, fecha de acceso: julio 6, 2025, <https://news.ycombinator.com/item?id=44095189>
50. Hallucinations in code are the least dangerous form of LLM mistakes - Hacker News, fecha de acceso: julio 6, 2025, <https://news.ycombinator.com/item?id=43233903>
51. Building Autonomous AI Agents with LangGraph | Coursera, fecha de acceso: julio 6, 2025, <https://www.coursera.org/learn/packt-building-autonomous-ai-agents-with-langgraph-oyjym>
52. This is Hands Down the BEST Way to Build AI Agents - YouTube, fecha de acceso: julio 6, 2025, <https://www.youtube.com/watch?v=U6LbW2IFUQw>
53. Autonomous AI Agent: A Primer's Guide - Ozkary - Emerging Technologies, fecha de acceso: julio 6, 2025, <https://www.ozkary.com/2025/06/autonomous-ai-agent-primers-guide.html>
54. My guide on what tools to use to build AI agents (if you are a newb) - Reddit, fecha de acceso: julio 6, 2025, <https://www.reddit.com/r/AI_Agents/comments/1il8b1i/my_guide_on_what_tools_to_use_to_build_ai_agents/>