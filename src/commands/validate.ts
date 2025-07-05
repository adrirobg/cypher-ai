import { TaskEngine, Task } from '../core/TaskEngine';
import { TaskQueries } from '../core/TaskQueries';

interface ValidationIssue {
  type: 'duplicate_id' | 'invalid_dependency' | 'circular_dependency' | 'missing_field';
  taskId: string;
  message: string;
  fixable: boolean;
  details?: any;
}

function collectAllTaskIds(tasks: Task[]): Set<string> {
  return new Set(TaskQueries.getAllIds(tasks));
}

function findDuplicateIds(tasks: Task[]): ValidationIssue[] {
  const duplicates = TaskQueries.findDuplicateIds(tasks);
  return duplicates.map(id => ({
    type: 'duplicate_id' as const,
    taskId: id,
    message: `Duplicate task ID found: ${id}`,
    fixable: false
  }));
}

function checkInvalidDependencies(tasks: Task[], validIds: Set<string>): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allTasks = TaskQueries.flatten(tasks);
  
  allTasks.forEach(task => {
    if (task.dependencies?.length) {
      const invalidDeps = task.dependencies.filter(dep => !validIds.has(dep));
      if (invalidDeps.length > 0) {
        issues.push({
          type: 'invalid_dependency',
          taskId: task.id,
          message: `Task ${task.id} has invalid dependencies: ${invalidDeps.join(', ')}`,
          fixable: true,
          details: { invalidDeps }
        });
      }
    }
  });
  
  return issues;
}

function checkCircularDependencies(tasks: Task[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allTasks = TaskQueries.flatten(tasks);
  const taskMap = new Map<string, Task>();
  
  allTasks.forEach(task => {
    taskMap.set(task.id, task);
  });
  
  const checkCycle = (taskId: string, visited: Set<string>, path: string[]): boolean => {
    if (visited.has(taskId)) {
      return path.includes(taskId);
    }
    
    visited.add(taskId);
    path.push(taskId);
    
    const task = taskMap.get(taskId);
    if (task?.dependencies) {
      for (const dep of task.dependencies) {
        if (checkCycle(dep, visited, [...path])) {
          issues.push({
            type: 'circular_dependency',
            taskId: taskId,
            message: `Circular dependency detected involving task ${taskId}`,
            fixable: false,
            details: { cycle: [...path, dep] }
          });
          return true;
        }
      }
    }
    
    return false;
  };
  
  taskMap.forEach((_, taskId) => {
    checkCycle(taskId, new Set(), []);
  });
  
  return issues;
}

function checkRequiredFields(tasks: Task[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const allTasks = TaskQueries.flatten(tasks);
  
  allTasks.forEach(task => {
    if (!task.id || !task.title || !task.description || !task.status) {
      const missing = [];
      if (!task.id) missing.push('id');
      if (!task.title) missing.push('title');
      if (!task.description) missing.push('description');
      if (!task.status) missing.push('status');
      
      issues.push({
        type: 'missing_field',
        taskId: task.id || 'unknown',
        message: `Task missing required fields: ${missing.join(', ')}`,
        fixable: false
      });
    }
  });
  
  return issues;
}

async function fixInvalidDependencies(tasks: Task[], validIds: Set<string>): Promise<Task[]> {
  const fixRecursive = (taskList: Task[]): Task[] => {
    return taskList.map(task => {
      const fixedTask = { ...task };
      if (fixedTask.dependencies?.length) {
        fixedTask.dependencies = fixedTask.dependencies.filter(dep => validIds.has(dep));
      }
      if (fixedTask.subtasks?.length) {
        fixedTask.subtasks = fixRecursive(fixedTask.subtasks);
      }
      return fixedTask;
    });
  };
  
  return fixRecursive(tasks);
}

export async function validate(options: { fix?: boolean; tasksPath?: string } = {}): Promise<void> {
  const engine = new TaskEngine(options.tasksPath);
  
  try {
    const tasks = await engine.readTasks();
    const validIds = collectAllTaskIds(tasks);
    const allIssues: ValidationIssue[] = [];
    
    allIssues.push(...findDuplicateIds(tasks));
    allIssues.push(...checkInvalidDependencies(tasks, validIds));
    allIssues.push(...checkCircularDependencies(tasks));
    allIssues.push(...checkRequiredFields(tasks));
    
    if (allIssues.length === 0) {
      console.log('# Validation Results\n\n✅ All good! No validation issues found.');
      return;
    }
    
    console.log(`# Validation Results\n\n⚠️ Found ${allIssues.length} issue(s):\n`);
    
    const groupedIssues = allIssues.reduce((acc, issue) => {
      if (!acc[issue.type]) acc[issue.type] = [];
      acc[issue.type].push(issue);
      return acc;
    }, {} as Record<string, ValidationIssue[]>);
    
    Object.entries(groupedIssues).forEach(([type, issues]) => {
      const typeTitle = type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      console.log(`## ${typeTitle}\n`);
      issues.forEach(issue => {
        console.log(`- **Task ${issue.taskId}:** ${issue.message}`);
        if (issue.details?.cycle) {
          console.log(`  Cycle: ${issue.details.cycle.join(' → ')}`);
        }
      });
      console.log('');
    });
    
    if (options.fix) {
      const fixableIssues = allIssues.filter(issue => issue.fixable);
      if (fixableIssues.length > 0) {
        console.log('## Applying Fixes\n');
        const fixedTasks = await fixInvalidDependencies(tasks, validIds);
        await engine.writeTasks(fixedTasks);
        console.log(`✅ Fixed ${fixableIssues.length} issue(s):`);
        fixableIssues.forEach(issue => {
          console.log(`- Removed invalid dependencies from task ${issue.taskId}`);
        });
      } else {
        console.log('No auto-fixable issues found.');
      }
    }
  } catch (error: any) {
    console.log(`# Error\n\n${error.message}`);
  }
}