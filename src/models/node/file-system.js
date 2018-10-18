
import { Node } from './node';

export class File extends Node {
  get fileType() {
    const { path, type } = this.data;
    return type || path.split('.', 2)[1];
  }

  get content() {
    return this.data.content;
  }

  get filePath() {
    return this.data.path;
  }
}
