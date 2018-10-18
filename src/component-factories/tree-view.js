
import React from 'react';
import { connect } from 'react-redux';
import { TreeView } from '../components';

export function createConnectedTreeView({ actions, selectors, resolveNodeComponent }) {
  const { moveNode, removeNode, selectPath, shiftSelectedPath, toggleExpandedPath } = actions;
  const { $isPathExpanded, $root, $selectedPath, } = selectors;

  const mapStateToProps = state => ({
    node: $root(state),
    isPathExpanded: $isPathExpanded(state),
    selectedPath: $selectedPath(state),
  });

  const mapDispatchToProps = { moveNode, removeNode, selectPath, shiftSelectedPath, toggleExpandedPath };

  return connect(mapStateToProps, mapDispatchToProps)(props => <TreeView resolveNodeRenderer={resolveNodeComponent} {...props}/>);
}
