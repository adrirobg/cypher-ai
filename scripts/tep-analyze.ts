import { query, type SDKMessage } from '@anthropic-ai/claude-code';
import { mkdir } from 'fs/promises';

async function tepAnalyze(taskId: string) {
  console.log(`🔬 Ejecutando Task Enrichment Protocol para tarea #${taskId}...\n`);
  
  // Asegurar que existe el directorio enriched
  await mkdir('.taskmaster/enriched', { recursive: true });
  
  const messages: SDKMessage[] = [];
  
  try {
    for await (const message of query({
      prompt: `
        Ejecuta el Task Enrichment Protocol (TEP) para la tarea ${taskId}:
        
        [1/5] EXPANDIR SUBTAREAS
        - Ejecuta: npx task-master show ${taskId}
        - Si no tiene subtareas, ejecuta: npx task-master expand --id=${taskId} --research
        - Muestra el progreso de expansión
        
        [2/5] ANALIZAR COMPLEJIDAD
        - Analiza la complejidad de cada subtarea
        - Identifica oportunidades de paralelización
        - Evalúa dependencias entre subtareas
        - Identifica riesgos técnicos
        
        [3/5] INVESTIGAR DOMINIO
        - Investiga mejores prácticas actuales para las tecnologías identificadas
        - Busca patrones de implementación comunes
        - Considera aspectos de seguridad, rendimiento y mantenibilidad
        - Identifica errores comunes a evitar
        
        [4/5] BUSCAR EN CONTEXT7
        - Para cada tecnología principal identificada:
          1. Usa resolve-library-id para encontrar la biblioteca
          2. Busca patrones específicos con get-library-docs
        - Prioriza snippets de código reutilizables
        - Captura referencias a documentación oficial
        - Busca ejemplos de implementación similares
        
        [5/5] GENERAR ARCHIVO ENRIQUECIDO
        Crea el archivo: .taskmaster/enriched/${taskId}-enriched.json
        
        Estructura del JSON (mantén simple pero completo):
        {
          "meta": {
            "taskId": "${taskId}",
            "taskTitle": "[título completo de la tarea]",
            "generatedAt": "[ISO timestamp]",
            "tepVersion": "1.0.0",
            "complexity": "[score numérico]"
          },
          "structure": {
            "mainTask": {
              "id": "${taskId}",
              "title": "[título]",
              "description": "[descripción]",
              "status": "[status actual]"
            },
            "subtasks": [
              {
                "id": "[subtask id]",
                "title": "[título]",
                "complexity": "[1-10]",
                "estimatedHours": "[horas]",
                "dependencies": ["[ids de dependencias]"]
              }
            ],
            "totalSubtasks": "[número]",
            "dependencies": {
              "graph": "[descripción del grafo de dependencias]",
              "criticalPath": ["[ids en orden]"]
            }
          },
          "analysis": {
            "complexity": {
              "overall": "[score y justificación]",
              "distribution": "[distribución por subtarea]",
              "highComplexityAreas": ["[áreas complejas]"]
            },
            "parallelization": {
              "strategy": "[secuencial/paralelo/mixto]",
              "opportunities": ["[qué se puede paralelizar]"],
              "constraints": ["[qué debe ser secuencial]"]
            },
            "technologies": {
              "primary": ["[tecnologías principales]"],
              "secondary": ["[tecnologías de soporte]"],
              "libraries": ["[librerías específicas]"]
            },
            "risks": [
              {
                "area": "[área de riesgo]",
                "severity": "[alta/media/baja]",
                "mitigation": "[estrategia de mitigación]"
              }
            ]
          },
          "research": {
            "bestPractices": {
              "[tecnología]": ["[práctica recomendada]"]
            },
            "antiPatterns": {
              "[tecnología]": ["[qué evitar]"]
            },
            "securityConsiderations": ["[consideraciones]"],
            "performanceConsiderations": ["[consideraciones]"]
          },
          "context7": {
            "librariesSearched": [
              {
                "name": "[nombre]",
                "id": "[context7 id]",
                "relevance": "[alta/media/baja]"
              }
            ],
            "patterns": {
              "[patrón]": {
                "description": "[descripción]",
                "snippet": "[código ejemplo]",
                "source": "[librería/línea]"
              }
            },
            "resources": [
              {
                "type": "[documentación/ejemplo/tutorial]",
                "title": "[título]",
                "relevance": "[descripción de relevancia]"
              }
            ]
          },
          "implementation": {
            "recommendedApproach": "[descripción del approach]",
            "phases": [
              {
                "phase": "[número]",
                "name": "[nombre]",
                "subtasks": ["[ids]"],
                "duration": "[estimación]",
                "description": "[qué se hace]"
              }
            ],
            "estimatedTotalTime": "[horas/días]",
            "keyDecisions": [
              {
                "decision": "[qué decidir]",
                "recommendation": "[recomendación]",
                "rationale": "[por qué]"
              }
            ]
          }
        }
        
        IMPORTANTE: 
        - Genera un JSON válido y bien formateado
        - Incluye información concreta y accionable
        - No inventes datos, usa información real de los análisis
        - Mantén el balance entre completitud y simplicidad
      `,
      options: {
        maxTurns: 30,
        allowedTools: [
          'Bash',
          'Read', 
          'Write',
          'mcp__context7__get-library-docs',
          'mcp__context7__resolve-library-id'
        ],
        cwd: process.cwd()
      }
    })) {
      messages.push(message);
      
      // Mostrar progreso
      if (message.type === 'assistant' && message.message.content) {
        const content = message.message.content;
        if (Array.isArray(content)) {
          content.forEach(block => {
            if (block.type === 'text') {
              console.log(block.text);
            }
          });
        }
      }
    }
    
    console.log('\n✅ TEP completado exitosamente!');
    console.log(`📄 Archivo generado: .taskmaster/enriched/${taskId}-enriched.json`);
    console.log('\n💡 Próximos pasos:');
    console.log('   1. Revisa el archivo JSON generado');
    console.log('   2. Úsalo como guía para la implementación');
    console.log('   3. El archivo es inmutable - no lo modifiques durante la implementación');
    
  } catch (error) {
    console.error('❌ Error durante TEP:', error.message);
    
    if (error.message?.includes('command not found: claude')) {
      console.error('\n📋 Claude Code CLI no está instalado.');
      console.error('Por favor ejecuta:');
      console.error('  npm install -g @anthropic-ai/claude-code');
      console.error('  claude login');
    } else if (error.message?.includes('Invalid API key')) {
      console.error('\n🔑 Error de autenticación.');
      console.error('Por favor ejecuta: claude login');
    }
    
    process.exit(1);
  }
}

// Validar argumentos y ejecutar
const taskId = process.argv[2];

if (!taskId) {
  console.error('❌ Error: Se requiere el ID de la tarea');
  console.error('\nUso: npx tsx scripts/tep-analyze.ts <task-id>');
  console.error('\nEjemplos:');
  console.error('  npx tsx scripts/tep-analyze.ts 2');
  console.error('  npx tsx scripts/tep-analyze.ts 7');
  process.exit(1);
}

// Ejecutar análisis TEP
tepAnalyze(taskId);