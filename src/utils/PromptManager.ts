import * as fs from 'fs';
import * as path from 'path';

export class PromptManager {
  private promptCache: Map<string, string> = new Map();
  private promptsBaseDir: string;

  constructor(promptsBaseDir: string) {
    this.promptsBaseDir = promptsBaseDir;
  }

  private loadPrompt(name: string): string {
    if (this.promptCache.has(name)) {
      return this.promptCache.get(name)!;
    }

    const filePath = path.join(this.promptsBaseDir, `${name}.prompt.md`);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      this.promptCache.set(name, content);
      return content;
    } catch (error) {
      throw new Error(`Failed to load prompt ${name}: ${error}`);
    }
  }

  render(name: string, context: Record<string, any>): string {
    let template = this.loadPrompt(name);

    // Handle conditional blocks {{#if (eq variable "value")}}...{{/if}}
    template = template.replace(/\{\{#if \(eq\s+(.*?)\s+"(.*?)"\)\}\}([\s\S]*?)\{\{\/if\}\}/gs, (match, variablePath, expectedValue, content) => {
      const actualValue = variablePath.trim().split('.').reduce((o: any, i: string) => o?.[i], context);
      return actualValue === expectedValue ? content : '';
    });

    // Handle conditional blocks {{#if variable}}...{{/if}}
    template = template.replace(/\{\{#if (.*?)\}\}([\s\S]*?)\{\{\/if\}\}/gs, (match, variable, content) => {
      const key = variable.trim();
      const value = key.split('.').reduce((o: any, i: string) => o?.[i], context);
      return value ? content : '';
    });

    // Handle variable replacements {{variable}}
    template = template.replace(/\{\{(.*?)\}\}/g, (match, variable) => {
      const key = variable.trim();
      const value = key.split('.').reduce((o: any, i: string) => o?.[i], context);
      return value !== undefined && value !== null ? String(value) : '';
    });

    return template;
  }
}