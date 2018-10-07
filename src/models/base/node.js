
import { NODE_PATH_DELIMITER } from '../../constants';

export class Node {
  constructor(type, { id, children, data }) {
    if (typeof id !== 'string') {
      throw new Error(`node id must be a string, you provided ${id} with a type of ${typeof id}`);
    }
    if (id.includes(NODE_PATH_DELIMITER)) {
      throw new Error(`node id must not contain the path delimimter ${NODE_PATH_DELIMITER}, you provided ${id}`);
    }

    this.type = type;
    this.id = id;
    this.children = children;
    this.data = data || {};
  }

  get name() {
    return this.id;
  }
}
