
import { Node, types } from './node';

export class File extends Node {
  constructor(id, fileType) {
    super(types.FILE, id);

    this.fileType = fileType;
  }

  get name() {
    return `${this.id}.${this.fileType}`;
  }
}
