
import { Artefact, types } from './artefact';

export class Directory extends Artefact {
  constructor(id, children) {
    super(types.DIRECTORY, id);

    this.children = children;
  }
}
