import { ClaudeProvider } from '../providers/claude-provider';
import { TaskEngine } from '../core/TaskEngine';

interface ResearchOptions {
  perspectives?: string[];
  task?: string;
}

const DEFAULT_PERSPECTIVES = ['architecture', 'security', 'performance'];

export async function research(query: string, options: ResearchOptions = {}): Promise<void> {
  const perspectives = options.perspectives || DEFAULT_PERSPECTIVES;
  const provider = new ClaudeProvider();
  
  try {
    let fullQuery = query;
    
    // If researching for a specific task, add context
    if (options.task) {
      const engine = new TaskEngine();
      const task = await engine.getTaskById(options.task);
      
      if (!task) {
        console.log(`# Error\n\nTask ${options.task} not found.`);
        return;
      }
      
      fullQuery = `
Context: Researching for Task ${task.id} - ${task.title}
Description: ${task.description}

Research Query: ${query}
`;
    }
    
    console.log(`# RESEARCH: ${query}\n`);
    console.log(`**Analyzing from ${perspectives.length} perspectives...**\n`);
    
    // Progreso visual
    perspectives.forEach((p, i) => {
      console.log(`[${i+1}/${perspectives.length}] 🔍 ${p} perspective...`);
    });
    console.log('');
    
    const result = await provider.collaborativeAnalysis(fullQuery, {
      perspectives,
      synthesize: true
    });
    
    // Display each perspective
    for (const [perspective, analysis] of Object.entries(result.analyses)) {
      console.log(`## ${perspective.toUpperCase()} PERSPECTIVE\n`);
      console.log(analysis);
      console.log('\n---\n');
    }
    
    // Display synthesis if available
    if (result.synthesis) {
      console.log('## SYNTHESIS\n');
      console.log(result.synthesis);
      
      if (result.consensusPoints && result.consensusPoints.length > 0) {
        console.log('\n### Key Consensus Points\n');
        result.consensusPoints.forEach(point => {
          console.log(`- ${point}`);
        });
      }
    }
    
    // Add usage hints
    console.log('\n---\n');
    console.log('### Next Steps\n');
    console.log('1. Review the analysis above');
    console.log('2. Use insights to inform implementation');
    if (options.task) {
      console.log(`3. Generate context: \`cypher transmit ${options.task}\``);
      console.log(`4. Update task when complete: \`cypher update ${options.task} status=done\``);
    }
    
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}