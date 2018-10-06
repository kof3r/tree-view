
import { Node, types } from './node';
import { Directory } from './directory';

export class Machine extends Directory {
  constructor(id, children) {
    super(id, children);

    this.type = types.MACHINE;
  }
}

export class Drive extends Node {
  constructor(id, fill = 0) {
    super(types.DRIVE, id);

    this.fill = fill;
  }
}

export class Database extends Node {
  constructor(id) {
    super(types.DATABASE, id);
  }
}

export class Printer extends Node {
  constructor(id) {
    super(types.PRINTER, id);
  }
}
