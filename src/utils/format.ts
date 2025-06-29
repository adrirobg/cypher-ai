import { Task } from '../core/TaskEngine';

export function formatStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'pending': '⏳ pending',
    'in-progress': '🔄 in-progress',
    'done': '✅ done',
    'blocked': '🚫 blocked',
    'cancelled': '❌ cancelled'
  };
  return statusMap[status] || status;
}

export function formatDependencies(deps: string[]): string {
  if (!deps || deps.length === 0) return '-';
  return deps.join(', ');
}

export function formatTaskList(tasks: Task[]): string {
  if (!tasks || tasks.length === 0) return 'No tasks found.';
  
  const headers = '| ID | Title | Status | Dependencies |';
  const separator = '|----|-------|--------|--------------|';
  
  const rows = tasks.map(task => {
    const id = task.id.padEnd(3);
    const title = task.title.length > 40 ? task.title.substring(0, 37) + '...' : task.title;
    const status = formatStatus(task.status);
    const deps = formatDependencies(task.dependencies || []);
    return `| ${id} | ${title} | ${status} | ${deps} |`;
  });
  
  return [headers, separator, ...rows].join('\n');
}

export function formatTaskDetail(task: Task): string {
  const sections: string[] = [];
  
  sections.push(`## Task ${task.id}: ${task.title}`);
  sections.push('');
  
  sections.push(`**Status:** ${formatStatus(task.status)}`);
  
  if (task.priority) {
    sections.push(`**Priority:** ${task.priority}`);
  }
  
  sections.push('');
  sections.push('### Description');
  sections.push(task.description);
  
  if (task.dependencies && task.dependencies.length > 0) {
    sections.push('');
    sections.push('### Dependencies');
    sections.push(task.dependencies.map(dep => `- ${dep}`).join('\n'));
  }
  
  if (task.context) {
    sections.push('');
    sections.push('### Context');
    sections.push(task.context);
  }
  
  if (task.outputs && task.outputs.length > 0) {
    sections.push('');
    sections.push('### Outputs');
    sections.push(task.outputs.map(out => `- ${out}`).join('\n'));
  }
  
  if (task.subtasks && task.subtasks.length > 0) {
    sections.push('');
    sections.push('### Subtasks');
    sections.push(formatTaskList(task.subtasks));
  }
  
  return sections.join('\n');
}