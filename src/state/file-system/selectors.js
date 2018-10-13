
import { createSelector } from 'reselect';
import { pathString } from 'util.lib/path';
import { modelNodeTree } from '../../parser';

const $tree = state => state.fileSystem.tree;
export const $expandedPaths = state => state.fileSystem.expandedPaths;
export const $selectedPath = state => state.fileSystem.selectedPath;

export const $root = createSelector(
  $tree,
  tree => modelNodeTree(tree)
);

export const $isPathExpanded = createSelector(
  $expandedPaths,
  expandedNodes => path => pathString(path) in expandedNodes,
);

function buildIndexPathMap(pathPrefix, node, expandedNodes) {
  const path = [...pathPrefix, node.id];
  const pathMap = [path];
  if (node.childList && (pathString(path) in expandedNodes)) {
    for (const child of node.childListSorted) {
      const childPathMap = buildIndexPathMap(path, child, expandedNodes);
      for (const childPath of childPathMap) {
        pathMap.push(childPath);
      }
    }
  }
  return pathMap;
}

export const $indexPathMap = createSelector(
  $root,
  $expandedPaths,
  (root, expandedPaths) => buildIndexPathMap([], root, expandedPaths),
);

export const $pathIndexMap = createSelector(
  $indexPathMap,
  indexPathMap => indexPathMap.reduce((pim, path, idx) => Object.assign(pim, { [pathString(path)]: idx }), {}),
);

export const $selectedNode = createSelector(
  $root,
  $selectedPath,
  (root, path) => {
    if (!path) return null;

    const [_, ...segments] = path;
    return segments.reduce((node, segment) => node.children[segment], root);
  }
);
