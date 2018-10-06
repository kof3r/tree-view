
import { Artefact, types } from './artefact';
import { Directory } from './directory';

export class Machine extends Directory {
  constructor(id, children) {
    super(id, children);

    this.type = types.MACHINE;
  }
}

export class Drive extends Artefact {
  constructor(id, fill = 0) {
    super(types.DRIVE, id);

    this.fill = fill;
  }
}

export class Database extends Artefact {
  constructor(id) {
    super(types.DATABASE, id);
  }
}

export class Printer extends Artefact {
  constructor(id) {
    super(types.PRINTER, id);
  }
}
