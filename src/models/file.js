
import { Artefact, types } from './artefact';

export class File extends Artefact {
  constructor(id, fileType) {
    super(types.FILE, id);

    this.fileType = fileType;
  }

  get name() {
    return `${this.id}.${this.fileType}`;
  }
}
