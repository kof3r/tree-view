
import { Node } from './node';

export class File extends Node {
  get fileType() {
    return this.data.type || null;
  }

  get content() {
    return this.data.content;
  }
}
