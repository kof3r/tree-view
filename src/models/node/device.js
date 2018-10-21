
import { Node } from './node';

export class Device extends Node {
  get isConnected() {
    return !!this.data.connected;
  }

  get isActive() {
    return this.isConnected;
  }
}
