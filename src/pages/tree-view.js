
import React from 'react';
import { connect } from 'react-redux';

import {
  $expandedPaths,
  $isPathExpanded,
  $root,
  $selectedPath,
  moveNode,
  selectPath,
  toggleExpandedPath,
  shiftSelectedPath,
  removeNode,
} from '../state/file-system';

import { TreeView, resolveNodeRenderer } from '../components';

export const TreeViewPage = connect(
  state => ({
    node: $root(state),
    expandedNodes: $expandedPaths(state),
    isPathExpanded: $isPathExpanded(state),
    selectedPath: $selectedPath(state),
  }),
  { moveNode, removeNode, toggleExpandedPath, selectPath, shiftSelectedPath },
)(props => <TreeView resolveNodeRenderer={resolveNodeRenderer} {...props}/>);
