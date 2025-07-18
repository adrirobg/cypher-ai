import { GuideCommand } from './base/GuideCommand';

class PlanCommand extends GuideCommand {
  protected guideName = 'plan';
  protected description = 'Guía el proceso de planificación colaborativa para una tarea';
}

export const planCommand = new PlanCommand().createCommand();