import { Command } from 'commander';
import { TaskEngine } from '../../core/TaskEngine';
import { readFile } from 'fs/promises';
import { join } from 'path';

export abstract class GuideCommand {
  protected abstract guideName: string;
  protected abstract description: string;

  createCommand(): Command {
    return new Command(this.guideName)
      .description(this.description)
      .argument('<taskId>', 'ID of the task')
      .action(async (taskId) => {
        await this.executeGuide(taskId);
      });
  }

  private async executeGuide(taskId: string): Promise<void> {
    try {
      const engine = new TaskEngine();
      const task = await engine.getTaskById(taskId);
      
      if (!task) {
        console.error(`Error: Task ${taskId} not found.`);
        return;
      }

      const guidePath = join(process.cwd(), 'cypher', 'prompts', `${this.guideName}-guide.md`);
      let guideContent = await readFile(guidePath, 'utf-8');

      // Remove YAML frontmatter if present
      if (guideContent.startsWith('---\n')) {
        const endIndex = guideContent.indexOf('\n---\n', 4);
        if (endIndex !== -1) {
          guideContent = guideContent.substring(endIndex + 5);
        }
      }

      // Replace only basic task tokens - leave semantic tokens for dialogue
      guideContent = guideContent
        .replace(/\{\{task\.id\}\}/g, task.id)
        .replace(/\{\{task\.title\}\}/g, task.title || '')
        .replace(/\{\{task\.description\}\}/g, task.description || '')
        .replace(/\{\{task\.status\}\}/g, task.status || 'pending')
        .replace(/\{\{task\.priority\}\}/g, task.priority || 'medium');

      // Print task context and processed guide
      console.log('## Task Context\n');
      console.log('```json');
      console.log(JSON.stringify(task, null, 2));
      console.log('```\n');
      console.log('---\n');
      console.log(guideContent);

    } catch (error) {
      console.error(`Error executing guide: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}