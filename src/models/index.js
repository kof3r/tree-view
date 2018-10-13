
import * as nodeModels from './node';

export function createNodeModel(node) {
  const Node = node.type in nodeModels ? nodeModels[node.type] : nodeModels.Node;
  return new Node(node);
}
