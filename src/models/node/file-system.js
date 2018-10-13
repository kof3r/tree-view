
import { Node } from './node';

export class File extends Node {
  get fileType() {
    return this.name.split('.', 2)[1];
  }
}
