import { ClaudeProvider } from '../providers/claude-provider';
import { TaskEngine } from '../core/TaskEngine';

interface ExpandOptions {
  maxSubtasks?: number;
  includeDetails?: boolean;
  includeTestStrategy?: boolean;
}

export async function expand(taskId: string, options: ExpandOptions = {}): Promise<void> {
  const engine = new TaskEngine();
  const provider = new ClaudeProvider();
  
  try {
    // Get the task to expand
    const task = await engine.getTaskById(taskId);
    
    if (!task) {
      console.log(JSON.stringify({
        status: 'error',
        taskId,
        code: 'TASK_NOT_FOUND',
        message: `Task ${taskId} not found`
      }));
      return;
    }
    
    // Check if task already has subtasks
    if (task.subtasks && task.subtasks.length > 0) {
      console.log(JSON.stringify({
        status: 'error',
        taskId,
        code: 'TASK_ALREADY_EXPANDED',
        message: `Task ${taskId} already has ${task.subtasks.length} subtasks`,
        existingSubtasks: task.subtasks.length
      }));
      return;
    }
    
    // Get parent task for additional context
    let parentTask = null;
    if (taskId.includes('.')) {
      const parentId = taskId.substring(0, taskId.lastIndexOf('.'));
      parentTask = await engine.getTaskById(parentId);
    }
    
    // Get sibling tasks if parent exists
    let siblingTasks = [];
    if (parentTask && parentTask.subtasks) {
      siblingTasks = parentTask.subtasks.filter(t => t.id !== taskId);
    }
    
    // Create enriched task with context
    const taskWithContext = {
      ...task,
      _context: {
        parentTask: parentTask ? { id: parentTask.id, title: parentTask.title, description: parentTask.description } : null,
        siblingTasks: siblingTasks.map(t => ({ id: t.id, title: t.title, status: t.status }))
      }
    };
    
    // Expand the task using AI
    const subtasks = await provider.expandTask(taskWithContext as any, {
      maxSubtasks: options.maxSubtasks || 5,
      includeDetails: options.includeDetails ?? true,
      includeTestStrategy: options.includeTestStrategy ?? false
    });
    
    if (!subtasks || subtasks.length === 0) {
      console.log(JSON.stringify({
        status: 'warning',
        taskId,
        code: 'NO_SUBTASKS_GENERATED',
        message: 'No subtasks were generated. Task might be too simple to decompose.'
      }));
      return;
    }
    
    // Update the task with the new subtasks
    await engine.updateTask(taskId, { subtasks });
    
    // Output AI-First result
    console.log(JSON.stringify({
      status: 'success',
      taskId,
      generatedSubtasks: subtasks.map(st => ({
        id: st.id,
        title: st.title,
        description: st.description,
        status: st.status,
        dependencies: st.dependencies || []
      })),
      subtaskCount: subtasks.length
    }, null, 2));
    
  } catch (error: any) {
    console.log(JSON.stringify({
      status: 'error',
      taskId,
      code: 'EXPANSION_FAILED',
      message: error.message || 'Failed to expand task'
    }));
  }
}