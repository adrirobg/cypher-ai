import { ClaudeProvider } from '../providers/claude-provider';
import { TaskEngine } from '../core/TaskEngine';
import * as fs from 'fs';
import * as path from 'path';

interface SetupProjectOptions {
  maxDepth?: number;
  force?: boolean;
  includeTestStrategy?: boolean;
  includeExecutionHints?: boolean;
}

export async function setupProject(prdPath: string, options: SetupProjectOptions = {}): Promise<void> {
  const provider = new ClaudeProvider();
  const cypherDir = path.resolve(process.cwd(), 'cypher');
  const cypherTasksPath = path.join(cypherDir, 'tasks.json');
  const engine = new TaskEngine(cypherTasksPath);
  
  try {
    // Ensure cypher directory exists
    if (!fs.existsSync(cypherDir)) {
      fs.mkdirSync(cypherDir, { recursive: true });
    }
    // Validate PRD file exists
    if (!fs.existsSync(prdPath)) {
      console.log(`# Error\n\nPRD file not found: ${prdPath}`);
      return;
    }
    
    // Read PRD content
    const prdContent = fs.readFileSync(prdPath, 'utf-8');
    
    if (!prdContent.trim()) {
      console.log(`# Error\n\nPRD file is empty: ${prdPath}`);
      return;
    }
    
    // Check if tasks.json already exists and warn if not using --force
    const existingTasks = await engine.readTasks();
    if (existingTasks.length > 0 && !options.force) {
      console.log(`# Warning\n\nExisting tasks found. Use --force to overwrite.`);
      console.log(`Current tasks: ${existingTasks.length}`);
      return;
    }
    
    console.log(`# SETUP PROJECT FROM PRD\n`);
    console.log(`**Reading PRD:** ${path.basename(prdPath)}`);
    console.log(`**Max Depth:** ${options.maxDepth || 2}`);
    console.log(`**Generating tasks...**\n`);
    
    // Generate tasks using Claude
    const tasks = await provider.generateTasks(prdContent, {
      maxDepth: options.maxDepth || 2,
      includeTestStrategy: options.includeTestStrategy ?? true,
      includeExecutionHints: options.includeExecutionHints ?? true,
    });
    
    if (!tasks || tasks.length === 0) {
      console.log(`# Error\n\nNo tasks were generated from the PRD.`);
      return;
    }
    
    // Write tasks to file
    await engine.writeTasks(tasks);
    
    // Display success summary
    console.log(`# ✅ PROJECT SETUP COMPLETE\n`);
    console.log(`**Tasks Generated:** ${tasks.length}`);
    
    // Count subtasks
    const totalSubtasks = tasks.reduce((count, task) => 
      count + (task.subtasks?.length || 0), 0
    );
    
    if (totalSubtasks > 0) {
      console.log(`**Subtasks Generated:** ${totalSubtasks}`);
    }
    
    console.log(`**Saved to:** cypher/tasks.json\n`);
    
    // Show next steps
    console.log('### Next Steps\n');
    console.log('1. Review generated tasks: `cypher decode`');
    console.log('2. Find next task to work on: `cypher next`');
    console.log('3. Generate context for a task: `cypher transmit <task-id>`');
    console.log('4. Update task status: `cypher update <task-id> status=done`');
    
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}