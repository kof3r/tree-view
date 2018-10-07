
export class Node {
  constructor(type, { id, children, data }) {
    this.type = type;
    this.id = id;
    this.children = children;
    this.data = data || {};
  }

  get name() {
    return this.id;
  }
}
