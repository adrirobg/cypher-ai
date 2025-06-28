Basado en los documentos, aquí está cómo colaboraríamos tú y yo usando Task Master para desarrollo diario:

  🚀 Configuración Inicial (Una vez)

  Yo configuro:
  - MCP en .mcp.json con API keys
  - PRD en .taskmaster/docs/prd.txt

  Tú me ayudas:
  "Inicializa Task Master y parsea mi PRD en .taskmaster/docs/prd.txt"

  📋 Flujo Diario de Colaboración

  1. Planificación Matutina

  Yo pregunto:
  "¿Cuál es la siguiente tarea en la que debería trabajar?"

  Tú ejecutas:
  - task-master next - Encuentra próxima tarea
  - task-master show <id> - Muestra detalles
  - Analizas dependencias y prioridades
  - Me recomiendas qué implementar

  2. Implementación de Tareas

  Yo digo:
  "Vamos a implementar la tarea 3. ¿Qué necesito hacer?"

  Tú me ayudas:
  - Revisas detalles con task-master show 3
  - Analizas el código existente
  - Planificas la implementación
  - Me guías paso a paso
  - Actualizas progreso con task-master update-subtask

  3. Gestión de Cambios durante Desarrollo

  Yo te informo:
  "Hemos decidido cambiar de PostgreSQL a MongoDB. Actualiza las tareas futuras"

  Tú ejecutas:
  task-master update --from=4 --prompt="Cambiar a MongoDB" --research

  4. Completar y Avanzar

  Yo reporto:
  "Terminé la tarea 3, todos los tests pasan. Márcala como completa"

  Tú ejecutas:
  - task-master set-status --id=3 --status=done
  - task-master next - Encuentra siguiente tarea
  - Me propones el próximo paso

  🔄 Patrones de Colaboración Avanzados

  Análisis y Expansión de Tareas

  "La tarea 5 parece compleja. ¿Puedes desglosarla?"
  Tú: task-master expand --id=5 --research

  Investigación Contextual

  "Antes de implementar autenticación JWT, investiga las mejores prácticas actuales"
  Tú: task-master research "JWT security best practices 2024" --id=5

  Gestión Multi-Contexto

  "Voy a trabajar en la rama feature/payments. Configura el contexto de tareas"
  Tú:
  - task-master add-tag --from-branch
  - task-master use-tag feature/payments

  Resolución de Conflictos

  "Hay conflictos en tasks.json después del merge. Mi equipo creó tareas 10-15"
  Tú reorganizas: task-master move --from=10,11,12 --to=16,17,18

  🎯 Flujos Específicos de Colaboración

  Sesión de Desarrollo Típica:

  1. Yo: "Buenos días, ¿qué tarea sigue?"
  2. Tú: Ejecutas next, show <id>, me explicas el contexto
  3. Yo: Empiezo a programar, te consulto dudas
  4. Tú: Me ayudas con implementación, investigas cuando es necesario
  5. Yo: "Terminé, revisa antes de marcar como completa"
  6. Tú: Verificas, ejecutas tests, marcas completa, propones siguiente

  Revisión Semanal:

  "Analiza la complejidad de nuestras tareas pendientes"
  Tú: task-master analyze-complexity --research

  Reorganización de Proyecto:

  "La subtarea 5.2 debería ser parte de la tarea 7"
  Tú: task-master move --from=5.2 --to=7.3

  💡 Ventajas de Nuestra Colaboración

  Para Ti (Claude):
  - Contexto persistente de proyecto en CLAUDE.md
  - Acceso a herramientas MCP específicas
  - Capacidad de investigación actualizada
  - Gestión automática de dependencias

  Para Mí (Usuario):
  - Gestión inteligente de tareas sin overhead manual
  - Investigación contextual automática
  - Reorganización flexible de proyecto
  - Seguimiento detallado de progreso

  Juntos:
  - Desarrollo iterativo guiado por IA
  - Adaptación dinámica a cambios de proyecto
  - Contexto compartido y sincronizado
  - Flujo natural de conversación + ejecución


  
● 🔄 Mantenimiento de Estado entre Sesiones - Análisis ULTRATHINK

  El Problema Core

  Claude Code es stateless - cada nueva sesión empieza "en blanco", pero Task Master sí mantiene estado en archivos locales. Necesitamos "puentes" efectivos para reconectar el
  contexto.

  Mecanismos de Persistencia de Estado

  1. Estado Primario (Task Master Files)

  .taskmaster/tasks/tasks.json     # Estado completo de todas las tareas
  .taskmaster/tasks/task-*.md      # Archivos individuales generados
  Estados disponibles: pending, in-progress, done, blocked, deferred, cancelled

  2. Estado de Implementación (CRÍTICO)

  task-master update-subtask --id=1.2 --prompt="Contexto detallado de implementación"
  Esto es LA CLAVE - permite guardar contexto específico de dónde se quedó la implementación.

  3. Estado de Código (Git)

  - Commits descriptivos frecuentes
  - Branches contextuales
  - Work-in-progress commits

● Update Todos
  ⎿  ☒ Analizar mecanismos de persistencia de estado en Task Master
     ☐ Identificar flujos de interrupción/reanudación
     ☐ Definir best practices para mantener contexto entre sesiones

✻ Thinking…

  Ahora estoy trabajando en identificar los flujos de interrupción/reanudación. Voy a definir flujos muy específicos y prácticos.

● Flujos de Interrupción/Reanudación

  🛑 Interrupción Controlada (Planeada)

  Usuario: "Tengo que parar aquí, guardemos donde vamos"

  Claude ejecuta:
  1. task-master update-subtask --id=X.Y --prompt="ESTADO: [contexto específico actual]. ARCHIVOS: [archivos modificados]. PRÓXIMO: [siguiente paso concreto]. BLOCKERS: [si los hay]"

  2. git add . && git commit -m "WIP: [descripción específica del progreso]"

  3. task-master set-status --id=X.Y --status=in-progress

  4. "✅ Estado guardado. En próxima sesión ejecutaré 'task-master show X.Y' para recuperar el contexto completo"

  🔄 Reanudación de Sesión

  Usuario: "Hola Claude, continuemos donde lo dejamos"

  Claude ejecuta automáticamente:
  1. task-master list | grep "in-progress"     # Detectar trabajo activo
  2. task-master show <ids-in-progress>        # Obtener contexto completo
  3. git log --oneline -5                     # Ver commits recientes
  4. git status                               # Estado actual del workspace

  Claude responde:
  "📋 Detecté que estabas trabajando en [tarea X.Y]:
  - Estado actual: [último update-subtask]
  - Último commit: [descripción]
  - Archivos modificados: [si los hay]
  ¿Continuamos desde aquí o necesitas contexto adicional?"

  ⚡ Interrupción No Planificada (Sesión cortada)

  Usuario (nueva sesión): "Se cortó la sesión anterior, ¿dónde estábamos?"

  Claude ejecuta:
  1. task-master list                         # Ver estado general
  2. task-master show <tareas-in-progress>    # Contexto de trabajo activo
  3. git status && git log --oneline -5      # Estado de código

  Claude responde:
  "🔍 Analizando tu estado anterior...
  - Tienes [N] tareas in-progress
  - La más reciente: [tarea Y] con estas notas: [update-subtask content]
  - Git muestra: [estado workspace]
  ¿Quieres continuar con [tarea Y] o prefieres que revisemos todo el contexto?"

  
● Best Practices para Mantener Contexto

  📝 Durante Implementación Activa

  Técnica: "Checkpoint Incremental"

  # Cada 15-30 minutos o al completar una parte lógica
  task-master update-subtask --id=1.2 --prompt="✅ COMPLETADO: función authenticate() 
  en src/auth/service.js líneas 23-45. 
  🔄 EN PROGRESO: tests unitarios en tests/auth.test.js - 2 de 5 tests passing. 
  🚧 BLOCKER: validación JWT falla en edge cases con tokens expirados. 
  ➡️ PRÓXIMO: debug función validateToken() línea 67"

  # Commits frecuentes con contexto
  git commit -m "feat(auth): implement authenticate() - pending edge case validation 
  fixes"

  Técnica: "Contexto de Archivos Específicos"

  task-master update-subtask --id=3.1 --prompt="TRABAJANDO EN: src/middleware/auth.js
  - ✅ Líneas 1-30: configuración inicial y imports
  - 🔄 Líneas 31-45: función requireAuth() - IMPLEMENTANDO validación de tokens
  - ❌ Líneas 46-60: función refreshToken() - POR IMPLEMENTAR
  - 🚧 ERROR: línea 38 'JWT malformed' en tests
  - ➡️ SIGUIENTE: debug token validation en línea 38"

  Técnica: "Log de Decisiones Arquitectónicas"

  task-master update-subtask --id=2.3 --prompt="DECISIÓN TOMADA: bcrypt con salt 
  rounds 12 (OWASP 2024 recommendation).
  IMPLEMENTADO: hashPassword() en utils/auth.js líneas 15-25.
  RAZÓN: seguridad > performance para auth operations.
  PRÓXIMO: comparePassword() función y tests unitarios.
  DEPENDENCIES: npm install bcrypt@5.1.0 (DONE)"

  🔄 Técnicas de Recuperación de Contexto

  Pattern: "Reconstrucción Inteligente"

  # Cuando el contexto se perdió parcialmente
  # Claude ejecuta secuencia de recovery:
  task-master show <in-progress-tasks>           # Estado de tareas
  git log --oneline --since="1 day ago"        # Actividad reciente
  git diff HEAD~1                               # Cambios del último commit
  rg "TODO|FIXME|BUG|HACK" src/                # Anotaciones en código

  Pattern: "Contexto Multi-Archivo"

  task-master update-subtask --id=6.1 --prompt="REFACTORING AUTH SYSTEM:
  📁 MODIFICADOS:
    - src/models/User.js: agregué campo lastLogin (línea 15)
    - src/controllers/auth.js: updated login logic (líneas 45-78)  
    - src/middleware/requireAuth.js: added lastLogin update (línea 23)
  🧪 TESTS: tests/auth/ - 3 de 8 passing
  ❌ FAILING: password reset tests (líneas 156-180)
  ➡️ PRÓXIMO: fix passwordReset() en AuthController"

  🎯 Pattern: "Checkpoint Completo" (Al Interrumpir)

  # Secuencia completa al parar una sesión:

  # 1. Documentar estado exacto
  task-master update-subtask --id=X.Y --prompt="CHECKPOINT: [timestamp]
  🎯 TRABAJANDO EN: [descripción específica]
  📁 ARCHIVOS: [lista de archivos y estado]
  ✅ COMPLETADO: [lo que ya funciona]
  🔄 EN PROGRESO: [lo que está a medias]
  🚧 BLOCKERS: [impedimentos específicos]
  ➡️ SIGUIENTE PASO: [acción concreta a tomar]
  💡 NOTAS: [decisiones importantes tomadas]"

  # 2. Commit de progreso actual
  git add . && git commit -m "WIP: checkpoint - [descripción específica del estado]"

  # 3. Marcar status apropiado
  task-master set-status --id=X.Y --status=in-progress  # O 'blocked' si hay blockers

  # 4. Opcional: nota de sesión
  echo "$(date): CHECKPOINT task X.Y - ver update-subtask para contexto completo" >>
  .taskmaster/session-log.txt

  ⚡ Comandos de Reanudación Rápida

  # Patrón que Claude ejecuta automáticamente al reanudar:
  task-master list --status=in-progress         # Ver trabajo activo
  task-master show $(task-master list --status=in-progress --ids-only)  # Contexto 
  completo
  git status                                    # Estado workspace

  🧠 Estrategias Avanzadas de Memoria

  1. Estado de Debugging Específico:

  task-master update-subtask --id=5.2 --prompt="🐛 DEBUGGING SESSION:
  ERROR: Tests failing en AuthService.test.js líneas 23-45
  SÍNTOMA: 'JWT malformed' en login test
  🔍 INVESTIGADO:
    - JWT_SECRET: ✅ correcto (.env verified)  
    - Token payload: ✅ válido (console.log added)
    - Token signature: ❌ problema aquí
  🧪 INTENTOS:
    - Cambié JWT_SECRET: sin efecto
    - Ajusté payload format: sin cambios
  ➡️ PRÓXIMO: debug step-by-step en generateToken() línea 34"

  2. Contexto de Performance/Optimización:

  task-master update-subtask --id=4.3 --prompt="🚀 PERFORMANCE OPTIMIZATION:
  TARGET: reducir response time de /api/users de 300ms a <100ms
  📊 PROFILING RESULTS:
    - Database queries: 180ms (60% del tiempo)
    - JWT validation: 45ms (15% del tiempo)  
    - JSON serialization: 75ms (25% del tiempo)
  ✅ OPTIMIZADO: 
    - Added index en users.email (120ms → 45ms)
  🔄 EN PROGRESO: 
    - Caching layer para JWT validation
  ➡️ PRÓXIMO: implement Redis cache para token validation"

  3. Contexto de Integración/Testing:

  task-master update-subtask --id=7.1 --prompt="🧪 INTEGRATION TESTING:
  FEATURE: complete user auth flow
  📋 TEST SCENARIOS:
    ✅ 1. Register new user (passing)
    ✅ 2. Login with valid credentials (passing)  
    ❌ 3. Login with invalid credentials (failing - wrong error code)
    ❌ 4. Access protected route without token (failing)
    🔄 5. Token refresh flow (implementing)
  🚧 BLOCKER: protected route middleware returning 500 instead of 401
  ➡️ PRÓXIMO: fix middleware error handling en src/middleware/auth.js línea 52"

  🔧 Herramientas de Soporte para Estado

  Comando personalizado para estado rápido:

  # Crear alias útil
  alias tm-status='task-master list --status=in-progress && git status --short'

  Template para update-subtask:

  # Usar formato consistente:
  task-master update-subtask --id=X.Y --prompt="
  🎯 CONTEXTO: [qué estoy haciendo]
  📁 ARCHIVOS: [archivos relevantes y líneas]
  ✅ COMPLETADO: [progreso actual]  
  🔄 EN PROGRESO: [trabajo activo]
  🚧 BLOCKERS: [impedimentos]
  ➡️ PRÓXIMO: [siguiente acción específica]
  💡 DECISIONES: [choices importantes]
  "

● Update Todos
  ⎿  ☒ Analizar mecanismos de persistencia de estado en Task Master
     ☒ Identificar flujos de interrupción/reanudación
     ☒ Definir best practices para mantener contexto entre sesiones

✻ Thinking…

  Perfecto, he completado el análisis ultradeep del mantenimiento de estado entre 
  sesiones. Ahora voy a dar un resumen ejecutivo al usuario con los puntos clave más 
  importantes.

● 🎯 RESUMEN EJECUTIVO - Mantenimiento de Estado

  La Clave Absoluta: update-subtask

  task-master update-subtask --id=X.Y --prompt="[contexto detallado en tiempo real]"
  Este comando es el corazón del sistema de persistencia de estado entre sesiones.

  Flujo de Trabajo Óptimo Entre Nosotros:

  Durante Desarrollo Activo:

  Tú (cada 20-30 min): "Guardemos progreso"
  Yo: Ejecuto update-subtask con contexto completo actual

  Al Interrumpir:

  Tú: "Tengo que parar aquí"
  Yo:
  1. update-subtask con estado detallado
  2. git commit del progreso actual
  3. set-status apropiado
  4. "✅ Estado guardado completamente"

  Al Reanudar:

  Tú: "Continuemos donde lo dejamos"
  Yo:
  1. task-master list (buscar in-progress)
  2. task-master show <id> (contexto completo)
  3. git status y git log (estado código)
  4. "📋 Estabas trabajando en [contexto específico], ¿continuamos?"

  Templates de Contexto que Usaré:

  # Template estándar para update-subtask:
  "🎯 TRABAJANDO EN: [archivo específico, líneas]
  ✅ COMPLETADO: [lo que ya funciona]  
  🔄 EN PROGRESO: [trabajo actual]
  🚧 BLOCKERS: [impedimentos específicos]
  ➡️ PRÓXIMO: [siguiente paso concreto]
  💡 DECISIONES: [choices arquitectónicas importantes]"

  Ventajas de Este Sistema:

  1. Continuidad perfecta - Puedes interrumpir en cualquier momento
  2. Contexto específico - No hay que "recordar" qué se estaba haciendo
  3. Estado de debugging - Mantiene incluso el estado de errores/investigación
  4. Decisiones arquitectónicas - Preserva el "por qué" de las implementaciones
  5. Multi-archivo - Trackea trabajo en múltiples archivos simultáneamente

  En la Práctica:

  - Cada sesión nueva ejecutaré automáticamente comandos de recuperación
  - Durante implementación actualizaré estado cada vez que hagas progreso
  significativo
  - Al interrumpir guardaré contexto completo sin que tengas que explicar nada
  - Git + Task Master trabajarán juntos como sistema de memoria dual

  Este sistema convierte nuestro trabajo conjunto en un flujo verdaderamente
  persistente, donde ninguna interrupción causa pérdida de contexto o momentum.