import { AIProvider, TaskGenerationOptions, TaskExpansionOptions, CollaborativeAnalysisOptions, CollaborativeAnalysisResult } from './ai-provider.interface';
import { Task } from '../core/TaskEngine';
import { query, type SDKMessage } from '@anthropic-ai/claude-code';
import * as path from 'path';
import { PromptManager } from '../utils/PromptManager';

export class ClaudeProvider implements AIProvider {
  private promptManager: PromptManager;

  constructor() {
    this.promptManager = new PromptManager(path.join(__dirname, 'prompts'));
  }

  private async getTextResponse(
    prompt: string, 
    maxTurns: number = 1, 
    timeoutMs: number = 120000
  ): Promise<string> {
    const messages: SDKMessage[] = [];
    const abortController = new AbortController();
    
    // Timeout básico
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, timeoutMs);
    
    try {
      for await (const message of query({
        prompt,
        abortController,
        options: { 
          maxTurns
        }
      })) {
        messages.push(message);
      }
    } finally {
      clearTimeout(timeoutId);
    }
    
    // Find the result message with the final response
    const resultMessage = messages.find(m => m.type === 'result' && m.subtype === 'success') as any;
    if (resultMessage?.result) {
      return resultMessage.result;
    }
    
    // Fallback: concatenate assistant messages
    const assistantMessages = messages.filter(m => m.type === 'assistant') as any[];
    return assistantMessages
      .map(m => m.message.content?.[0]?.text || '')
      .join('');
  }

  async generateTasks(prd: string, options?: TaskGenerationOptions): Promise<Task[]> {
    const prompt = this.promptManager.render('generate-tasks', {
      prd,
      maxDepth: options?.maxDepth || 2,
      includeTestStrategy: options?.includeTestStrategy ?? true,
      includeExecutionHints: options?.includeExecutionHints ?? true,
    });

    const response = await this.getTextResponse(prompt);

    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = response.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : response;
      
      const tasks = JSON.parse(jsonString.trim());
      return Array.isArray(tasks) ? tasks : [tasks];
    } catch (error) {
      throw new Error(`Failed to parse tasks from Claude response: ${error}`);
    }
  }

  async expandTask(task: Task, options?: TaskExpansionOptions): Promise<Task[]> {
    const prompt = this.promptManager.render('expand-task', {
      task,
      maxSubtasks: options?.maxSubtasks || 8,
      includeDetails: options?.includeDetails ?? true,
      includeTestStrategy: options?.includeTestStrategy ?? true,
    });

    const response = await this.getTextResponse(prompt);

    try {
      const subtasks = JSON.parse(response);
      return Array.isArray(subtasks) ? subtasks : [subtasks];
    } catch (error) {
      throw new Error(`Failed to parse subtasks from Claude response: ${error}`);
    }
  }

  async collaborativeAnalysis(
    prompt: string,
    options: CollaborativeAnalysisOptions
  ): Promise<CollaborativeAnalysisResult> {
    const perspectives = options.perspectives;
    const synthesize = options.synthesize ?? true;
    
    const analysisPromises = perspectives.map(async (perspective) => {
      const perspectivePrompt = this.promptManager.render('collaborative-analysis/perspective', {
        perspective,
        prompt,
      });
      const response = await this.getTextResponse(perspectivePrompt);
      return [perspective, response] as [string, string];
    });
    
    const analysisResults = await Promise.all(analysisPromises);
    
    const analyses: Record<string, string> = {};
    analysisResults.forEach(([perspective, analysis]) => {
      analyses[perspective] = analysis;
    });
    
    const result: CollaborativeAnalysisResult = { analyses };
    
    if (synthesize && perspectives.length > 1) {
      const synthesisPrompt = this.promptManager.render('collaborative-analysis/synthesis', {
        prompt,
        analyses: Object.entries(analyses).map(([p, a]) => `\n[${p.toUpperCase()} PERSPECTIVE]\n${a}`).join('\n\n'),
      });

      const synthesisResponse = await this.getTextResponse(synthesisPrompt);
      
      const consensusMatch = synthesisResponse.match(/CONSENSUS:(.*?)(?=TRADE-OFFS:|$)/s);
      const consensusText = consensusMatch?.[1]?.trim() || '';
      
      result.synthesis = synthesisResponse;
      result.consensusPoints = consensusText
        .split('\n')
        .filter((line: string) => line.trim().startsWith('-'))
        .map((line: string) => line.trim().substring(1).trim());
    }
    
    return result;
  }
}