
import { Node } from './node';

export class Group extends Node {
  constructor(type, id, children = []) {
    super(type, id);

    this.children = children;
  }
}
