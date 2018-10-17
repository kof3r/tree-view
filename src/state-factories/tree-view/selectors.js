
import { createSelector } from 'reselect';
import { pathString } from 'util.lib/path';
import { createStaticSelector } from 'util.lib/redux';
import { modelNodeTree } from '../../parser';

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

export function createTreeViewSelectors(statePath) {
  const resolvePath = path => `${statePath}.${path}`;
  
  const $tree = createStaticSelector(resolvePath('tree'));
  const $expandedPaths = createStaticSelector(resolvePath('expandedPaths'));
  const $selectedPath = createStaticSelector(resolvePath('selectedPath'));
  const $root = createSelector(
    $tree,
    tree => tree ? modelNodeTree(tree) : null
  );
  const $isPathExpanded = createSelector(
    $expandedPaths,
    expandedNodes => path => pathString(path) in expandedNodes,
  );
  const $indexPathMap = createSelector(
    $root,
    $expandedPaths,
    (root, expandedPaths) => buildIndexPathMap([], root, expandedPaths),
  );
  const $pathIndexMap = createSelector(
    $indexPathMap,
    indexPathMap => indexPathMap.reduce((pim, path, idx) => Object.assign(pim, { [pathString(path)]: idx }), {}),
  );
  const $selectedNode = createSelector(
    $root,
    $selectedPath,
    (root, path) => {
      if (!path || !root) return null;
  
      const [_, ...segments] = path;
      return segments.reduce((node, segment) => (node && segment in node.children) ? node.children[segment] : null, root);
    }
  );

  return {
    $expandedPaths,
    $indexPathMap,
    $isPathExpanded,
    $pathIndexMap,
    $root,
    $selectedNode,
    $selectedPath,
  }
}
