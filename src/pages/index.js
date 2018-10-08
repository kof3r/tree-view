
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { $root, moveNode } from '../state/file-system';
import { TreeView, nodeRenderingKit } from '../components';

export const TreeViewPage = connect(
  state => ({
    root: $root(state),
  }),
  { moveNode }
)(({ root, moveNode }) => <TreeView node={root} moveNode={moveNode} renderingKit={nodeRenderingKit}/>);
