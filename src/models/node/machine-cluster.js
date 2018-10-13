
import { Node } from './node';

export class Drive extends Node {
  get name() {
    return `${super.name}:/`;
  }

  get fill() {
    const { used = 0, total } = this.data;
    return total ? (used / total) : 0;
  }
}
