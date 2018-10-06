
export class Node {
  constructor(type, id) {
    this.type = type;
    this.id = id;
  }

  get name() {
    return this.id;
  }
}
