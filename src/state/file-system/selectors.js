
import { createSelector } from 'reselect';
import { pathString } from 'util.lib/path';
import { modelNodeTree } from '../../parser';

const $tree = state => state.fileSystem.tree;
export const $expandedPaths = state => state.fileSystem.expandedPaths;

export const $root = createSelector(
  $tree,
  tree => modelNodeTree(tree)
);

export const $isPathExpanded = createSelector(
  $expandedPaths,
  expandedNodes => path => pathString(path) in expandedNodes,
);
