
import { nodeTypes } from '../constants';
import { Node } from './base';

export class MachineCluster extends Node {
  constructor(node) {
    super(nodeTypes.MACHINE_CLUSTER, node);
  }
}

export class Machine extends Node {
  constructor(node) {
    super(nodeTypes.MACHINE, node);
  }
}

export class Drive extends Node {
  constructor(node) {
    super(nodeTypes.DRIVE, node);
  }

  get name() {
    return `${this.id}:/`;
  }

  get fill() {
    const { used = 0, total } = this.data;
    return total ? (used / total) : 0;
  }
}

export class Database extends Node {
  constructor(node) {
    super(nodeTypes.DATABASE, node);
  }
}

export class Printer extends Node {
  constructor(node) {
    super(nodeTypes.PRINTER, node);
  }
}
