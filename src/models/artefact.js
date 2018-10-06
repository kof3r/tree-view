
export class Artefact {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }

  get name() {
    return this.id;
  }
}

export const types = {
  DIRECTORY: 'DIRECTORY',
  FILE: 'FILE',
  MACHINE: 'MACHINE',
  DRIVE: 'DRIVE',
  DATABASE: 'DATABASE',
  PRINTER: 'PRINTER',
}
