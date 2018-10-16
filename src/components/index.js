
import * as nodeRenderingKit from './node-rendering-kit';
import * as detailViewRenderingKit from './detail-view-rendering-kit';

export * from './TreeView';
export * from './DetailView';
export * from './Icon';

export function resolveNodeRenderer(node) {
  return node.type in nodeRenderingKit ? nodeRenderingKit[node.type] : nodeRenderingKit.Node;
}

export function resolveNodeDetailViewRenderer(node) {
  return node.type in detailViewRenderingKit ? detailViewRenderingKit[node.type] : detailViewRenderingKit.Node;
}
