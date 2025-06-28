import { claude } from '@instantlyeasy/claude-code-sdk-ts';

async function analyzeTasks() {
  console.log('🔍 Iniciando análisis de tareas...\n');
  
  try {
    // Configurar Claude con permisos necesarios
    const analysis = await claude()
      .allowTools('Bash', 'Read', 'Write', 'mcp__context7__get-library-docs', 'mcp__context7__resolve-library-id')
      .skipPermissions()  // Para automatización sin prompts
      .query(`
        Por favor realiza un análisis completo de las tareas del proyecto:

        1. LISTAR TAREAS
        Ejecuta: npx task-master list
        Identifica todas las subtareas pendientes.

        2. ANALIZAR CADA SUBTAREA
        Para cada subtarea pendiente, evalúa:
        - Complejidad estimada (1-10)
        - Tiempo aproximado de implementación
        - Tecnologías/librerías involucradas
        - Posibles riesgos o consideraciones

        3. INVESTIGAR MEJORES PRÁCTICAS
        Para las tecnologías identificadas, investiga:
        - Patrones recomendados actuales
        - Errores comunes a evitar
        - Consideraciones de rendimiento/seguridad

        4. BUSCAR EN CONTEXT7
        Usa Context7 para encontrar:
        - Documentación relevante de las librerías
        - Snippets de código útiles
        - Ejemplos de implementación

        5. GENERAR REPORTE
        Crea un archivo 'task-analysis-report.md' con el siguiente formato:

        # Análisis de Tareas - ${new Date().toLocaleDateString()}

        ## Resumen Ejecutivo
        - Total de subtareas analizadas: X
        - Complejidad promedio: X/10
        - Tiempo total estimado: X horas

        ## Análisis Detallado

        ### Subtarea X.Y: [Título]
        **Complejidad:** X/10
        **Tiempo estimado:** X horas
        **Tecnologías:** [lista]

        **Hallazgos de investigación:**
        - [Mejores prácticas encontradas]
        - [Consideraciones importantes]

        **Recursos de Context7:**
        - [Documentación relevante]
        - [Snippets útiles]

        **Sugerencia de actualización para task-master:**
        \`\`\`
        npx task-master update-subtask --id=X.Y --prompt="
        COMPLEJIDAD: X/10, ~X horas
        STACK: [tecnologías]
        RECURSOS:
        - [recurso 1]
        - [recurso 2]
        CONSIDERACIONES:
        - [consideración 1]
        - [consideración 2]
        "
        \`\`\`

        ---

        [Repetir para cada subtarea]

        ## Recomendaciones Generales
        [Insights generales del análisis]

        IMPORTANTE: NO ejecutes ningún comando de actualización. Solo genera el reporte con las sugerencias.
      `)
      .asText();
    
    console.log(analysis);
    console.log('\n✅ Análisis completado! Revisa el archivo task-analysis-report.md');
    
  } catch (error) {
    console.error('❌ Error durante el análisis:', error);
    
    // Manejo específico de errores
    if (error.message?.includes('command not found: claude')) {
      console.error('\n📋 Parece que Claude Code CLI no está instalado.');
      console.error('Por favor ejecuta:');
      console.error('  npm install -g @anthropic-ai/claude-code');
      console.error('  claude login');
    } else if (error.message?.includes('Invalid API key')) {
      console.error('\n🔑 Error de autenticación.');
      console.error('Por favor ejecuta: claude login');
    }
  }
}

// Ejecutar el análisis
analyzeTasks();