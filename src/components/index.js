
import * as nodeRenderingKit from './node-rendering-kit';

export * from './TreeView';
export * from './DetailView';

export function resolveNodeRenderer(node) {
  return node.type in nodeRenderingKit ? nodeRenderingKit[node.type] : nodeRenderingKit.Node;
}
