
import { nodeTypes } from '../constants';
import { Node, Group } from './base';

export class Directory extends Group {
  constructor(id, children) {
    super(nodeTypes.DIRECTORY, id, children);
  }
}

export class File extends Node {
  constructor(id, fileType) {
    super(nodeTypes.FILE, id);

    this.fileType = fileType;
  }

  get name() {
    return `${this.id}.${this.fileType}`;
  }
}
