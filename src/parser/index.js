
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
  if (node.data) {
    node.data = JSON.parse(JSON.stringify(node.data))
  }
  if (node.children) {
    node.children = node.children.map(parseNodeTree);
  }
  const Constructor = constructors[node.type];
  return new Constructor(node);
}
