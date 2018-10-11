
import React from 'react';
import { connect } from 'react-redux';

import { $root, moveNode, $expandedPaths, $isPathExpanded, toggleExpandedPath } from '../state/file-system';
import { TreeView, nodeRenderingKit } from '../components';

export const TreeViewPage = connect(
  state => ({
    node: $root(state),
    expandedNodes: $expandedPaths(state),
    isPathExpanded: $isPathExpanded(state),
  }),
  { moveNode, toggleExpandedPath }
)((props) => <TreeView renderingKit={nodeRenderingKit} {...props}/>);
