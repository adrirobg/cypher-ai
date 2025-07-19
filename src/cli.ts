#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { join } from 'path';
import { list } from './commands/list';
import { show } from './commands/show';
import { update } from './commands/update';
import { validateStructure } from './commands/validate-graph';
import { next } from './commands/next';
import { addTask } from './commands/add-task';
import { planCommand } from './commands/plan';
import { learnCommand } from './commands/learn';
import { contextCommand } from './commands/context';
import { validateCommand as validateGuideCommand } from './commands/validate';
import { exploreCommand } from './commands/explore';

const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const program = new Command();

program
  .name('cypher')
  .description(packageJson.description)
  .version(packageJson.version);

program
  .command('list')
  .description('List tasks with optional filters')
  .option('-s, --status <status>', 'Filter by status (pending, in-progress, done)')
  .option('-p, --priority <priority>', 'Filter by priority (low, medium, high)')
  .option('-f, --fields <fields>', 'Comma-separated list of fields to display')
  .action(async (options) => {
    try {
      const fields = options.fields 
        ? options.fields.split(',').map((f: string) => f.trim())
        : undefined;
      
      await list({
        status: options.status,
        priority: options.priority,
        fields
      });
    } catch (error) {
      console.error('Error executing list command:', error);
      process.exit(1);
    }
  });

program
  .command('show <task-id>')
  .description('Show detailed information for a specific task')
  .action(async (taskId: string) => {
    try {
      await show(taskId);
    } catch (error) {
      console.error('Error executing show command:', error);
      process.exit(1);
    }
  });


program
  .command('update <task-id> [updates...]')
  .description('Update task properties (e.g., status=done priority=high)')
  .option('--json <json>', 'JSON string with batch updates')
  .action(async (taskId: string, updates: string[], options) => {
    try {
      let updateObject: Record<string, any> = {};
      
      if (options.json) {
        // Parse JSON batch updates
        try {
          updateObject = JSON.parse(options.json);
        } catch (error) {
          console.error(`Invalid JSON format: ${error instanceof Error ? error.message : 'Unknown error'}`);
          process.exit(1);
        }
      } else {
        // Parse key=value pairs into an object
        for (const update of updates) {
          const [key, value] = update.split('=');
          if (key && value) {
            updateObject[key] = value;
          } else {
            console.error(`Invalid update format: ${update}. Use key=value format.`);
            process.exit(1);
          }
        }
      }
      
      await update(taskId, updateObject, { isJsonBatch: !!options.json });
    } catch (error) {
      console.error('Error executing update command:', error);
      process.exit(1);
    }
  });

program
  .command('next')
  .description('Get next pending task')
  .action(async () => {
    try {
      await next();
    } catch (error) {
      console.error('Error executing next command:', error);
      process.exit(1);
    }
  });

program
  .command('validate-graph')
  .description('Validate task graph integrity and dependencies')
  .option('-f, --fix', 'Automatically fix fixable issues')
  .action(async (options) => {
    try {
      await validateStructure({ fix: options.fix });
    } catch (error) {
      console.error('Error executing validate command:', error);
      process.exit(1);
    }
  });




program
  .command('add-task <id> <title> <description>')
  .description('Add a new high-level task to tasks.json')
  .option('-p, --priority <priority>', 'Task priority (low, medium, high)', 'medium')
  .option('-d, --dependencies <deps>', 'Comma-separated list of dependency task IDs')
  .action(async (id: string, title: string, description: string, options) => {
    try {
      const dependencies = options.dependencies 
        ? options.dependencies.split(',').map((dep: string) => dep.trim())
        : undefined;
      
      await addTask({
        id,
        title,
        description,
        priority: options.priority,
        dependencies
      });
    } catch (error) {
      console.error('Error executing add-task command:', error);
      process.exit(1);
    }
  });


// Add new GuideCommand-based commands
program.addCommand(planCommand);
program.addCommand(learnCommand);
program.addCommand(contextCommand);
program.addCommand(validateGuideCommand);
program.addCommand(exploreCommand);

program.parse();

export { program };