import { GuideCommand } from './base/GuideCommand';

class ExploreCommand extends GuideCommand {
  protected guideName = 'explore';
  protected description = 'Guía para exploración contextual multidimensional';
}

export const exploreCommand = new ExploreCommand().createCommand();