
import { Node, types } from './node';

export class Directory extends Node {
  constructor(id, children) {
    super(types.DIRECTORY, id);

    this.children = children;
  }
}
