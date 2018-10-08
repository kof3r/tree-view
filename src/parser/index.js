
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
  const node = { ...rootNode };
  node.data = node.data ? JSON.parse(JSON.stringify(node.data)) : {};
  if (node.children) {
    node.children = node.children.reduce((dict, child) => Object.assign(dict, { [child.id]: parseNodeTree(child) }), {});
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
