import { Task } from '../core/TaskEngine';

export interface TaskGenerationOptions {
  maxDepth?: number;
  includeTestStrategy?: boolean;
  includeExecutionHints?: boolean;
}

export interface TaskExpansionOptions {
  maxSubtasks?: number;
  includeDetails?: boolean;
  includeTestStrategy?: boolean;
}

export interface CollaborativeAnalysisOptions {
  perspectives: string[];
  synthesize?: boolean;
}

export interface AnalysisResult {
  perspective: string;
  content: string;
  keyPoints?: string[];
}

export interface CollaborativeAnalysisResult {
  analyses: Record<string, string>;
  synthesis?: string;
  consensusPoints?: string[];
}

export interface AIProvider {
  generateTasks(prd: string, options?: TaskGenerationOptions): Promise<Task[]>;
  
  expandTask(task: Task, options?: TaskExpansionOptions): Promise<Task[]>;
  
  collaborativeAnalysis(
    prompt: string,
    options: CollaborativeAnalysisOptions
  ): Promise<CollaborativeAnalysisResult>;
}