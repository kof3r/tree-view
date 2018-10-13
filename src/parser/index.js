
import uuid from 'uuid';

import { nodeTypes } from '../constants';
import { Directory, File, MachineCluster, Machine, Drive, Database, Printer } from '../models';

const constructors = {
  [nodeTypes.DATABASE]: Database,
  [nodeTypes.DIRECTORY]: Directory,
  [nodeTypes.DRIVE]: Drive,
  [nodeTypes.FILE]: File,
  [nodeTypes.MACHINE]: Machine,
  [nodeTypes.MACHINE_CLUSTER]: MachineCluster,
  [nodeTypes.PRINTER]: Printer,
}

export function parseNodeTree(rootNode) {
  const node = {
    ...rootNode,
    id: rootNode.id ? rootNode.id : uuid.v4(),
    data: rootNode.data ? JSON.parse(JSON.stringify(rootNode.data)) : {},
  };
  if (rootNode.children) {
    node.children = {};
    for (const rootChild of rootNode.children) {
      const child = parseNodeTree(rootChild);
      node.children[child.id] = child;
    }
  }
  return node;
}

export function modelNodeTree(rootNode) {
  const node = { ...rootNode };
  node.data = JSON.parse(JSON.stringify(node.data))
  if (node.children) {
    const modeledChildren = {};
    Object.keys(node.children).forEach(id => {
      modeledChildren[id] = modelNodeTree(node.children[id])
    });
    node.children = modeledChildren;
  }
  const Constructor = constructors[node.type];
  return new Constructor(node);
}
