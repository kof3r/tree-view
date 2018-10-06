
import { nodeTypes } from '../constants';
import { Node, Group } from './base';

export class MachineCluster extends Group {
  constructor(id, children) {
    super(nodeTypes.MACHINE_CLUSTER, id, children);
  }
}

export class Machine extends Group {
  constructor(id, children) {
    super(nodeTypes.MACHINE, id, children);
  }
}

export class Drive extends Node {
  constructor(id, fill = 0) {
    super(nodeTypes.DRIVE, id);

    this.fill = fill;
  }
}

export class Database extends Node {
  constructor(id) {
    super(nodeTypes.DATABASE, id);
  }
}

export class Printer extends Node {
  constructor(id) {
    super(nodeTypes.PRINTER, id);
  }
}
