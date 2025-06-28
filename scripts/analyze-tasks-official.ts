import { query, type SDKMessage } from '@anthropic-ai/claude-code';

async function analyzeTasksOfficial() {
  console.log('🔍 Iniciando análisis de tareas con SDK oficial...\n');
  
  try {
    const messages: SDKMessage[] = [];
    
    // Usar el SDK oficial
    for await (const message of query({
      prompt: `
        Por favor realiza un análisis de las tareas del proyecto:
        
        1. Ejecuta: npx task-master list
        2. Analiza la complejidad de cada tarea pendiente
        3. Crea un archivo task-analysis-report.md con:
           - Resumen de tareas
           - Análisis de complejidad
           - Sugerencias de priorización
        
        Usa las herramientas Bash para ejecutar comandos y Write para crear el reporte.
      `,
      options: {
        maxTurns: 10,
        allowedTools: ['Bash', 'Read', 'Write'],
        cwd: process.cwd()
      }
    })) {
      messages.push(message);
      
      // Mostrar progreso
      if (message.type === 'assistant') {
        console.log('Assistant:', JSON.stringify(message.message, null, 2));
      } else if (message.type === 'result') {
        console.log('\nResultado:', message);
      }
    }
    
    console.log('\n✅ Análisis completado!');
    
  } catch (error) {
    console.error('❌ Error:', error);
    console.error('Stack:', error.stack);
  }
}

analyzeTasksOfficial();