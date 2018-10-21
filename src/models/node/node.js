
import { NODE_PATH_DELIMITER } from '../../constants';

function sortChildren(e1, e2) {
  if (e1.children && !e2.children) return -1;
  if (!e1.children && e2.children) return 1;
  return e1.name.localeCompare(e2.name); 
}

export class Node {
  constructor({ type, id, label, children, data }) {
    if (typeof id !== 'string') {
      throw new Error(`node id must be a string, you provided ${id} with a type of ${typeof id}`);
    }
    if (id.includes(NODE_PATH_DELIMITER)) {
      throw new Error(`node id must not contain the path delimimter ${NODE_PATH_DELIMITER}, you provided ${id}`);
    }

    this.type = type;
    this.id = id;
    this.label = label;
    this.children = children;
    this.data = data || {};
  }

  get hasChildren() {
    return !!this.children;
  }

  get childList() {
    return this.children ? Object.values(this.children) : undefined;
  }

  get childListSorted() {
    return [...this.childList].sort(sortChildren);
  }

  get name() {
    return this.label !== undefined ? this.label : this.id;
  }

  get isActive() {
    return true;
  }
}
