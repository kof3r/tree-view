
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { $root } from '../state/file-system';
import { TreeView, nodeRenderingKit } from '../components';

export const TreeViewPage = connect(
  state => ({
    root: $root(state),
  })
)(({ root }) => <TreeView node={root} renderingKit={nodeRenderingKit}/>);
