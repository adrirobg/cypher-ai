import { query } from '@instantlyeasy/claude-code-sdk-ts';

async function analyzeTasksStreaming() {
  console.log('🔍 Iniciando análisis de tareas (modo streaming)...\n');
  
  try {
    const messages = [];
    
    // Usar la API de streaming
    for await (const message of query(`
      Por favor ejecuta estos pasos:
      
      1. Ejecuta: npx task-master list
      2. Muestra las tareas encontradas
      3. Para cada tarea pendiente, analiza su complejidad
      4. Crea un archivo task-analysis-report.md con tus hallazgos
      
      Mantén el análisis simple y conciso.
    `, {
      allowedTools: ['Bash', 'Read', 'Write'],
      permissionMode: 'bypassPermissions'
    })) {
      // Procesar cada mensaje
      if (message.type === 'assistant') {
        console.log('Claude:', message.content);
      } else if (message.type === 'result') {
        console.log('\nResultado final:', message.content);
      }
      
      messages.push(message);
    }
    
    console.log('\n✅ Análisis completado!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Debug adicional
    if (error.message?.includes('command not found')) {
      console.error('\nAsegúrate de que Claude Code CLI esté instalado:');
      console.error('npm install -g @anthropic-ai/claude-code');
    }
  }
}

analyzeTasksStreaming();