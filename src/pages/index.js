
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
} from '../state/file-system';

import { TreeView, nodeRenderingKit } from '../components';

export const TreeViewPage = connect(
  state => ({
    node: $root(state),
    expandedNodes: $expandedPaths(state),
    isPathExpanded: $isPathExpanded(state),
    selectedPath: $selectedPath(state),
  }),
  { moveNode, toggleExpandedPath, selectPath, shiftSelectedPath },
)(props => <TreeView renderingKit={nodeRenderingKit} {...props}/>);
