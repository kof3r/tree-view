
import { nodeTypes } from '../constants';
import { fileExtension } from '../util';

import { Node } from './base';

export class Directory extends Node {
  constructor(node) {
    super(nodeTypes.DIRECTORY, node);
  }
}

export class File extends Node {
  constructor(node) {
    super(nodeTypes.FILE, node);

    this.data.fileType = fileExtension(super.name);
  }

  get fileType() {
    return this.data.fileType;
  }
}
