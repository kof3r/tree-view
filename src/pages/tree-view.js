
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SplitLayout } from '../layouts';
import { fileSystemActions, fileSystemSelectors } from '../state/file-system';
import { TreeView, DetailView, resolveNodeRenderer, resolveNodeDetailViewRenderer } from '../components';
import { SocketDataSource, HttpDataSource } from '../data-source';
import store from '../store';

import fileSystemMock from '../test_data/file-system.json';

const {
  moveNode,
  removeNode,
  selectPath,
  shiftSelectedPath,
  toggleExpandedPath,
} = fileSystemActions;

const {
  $expandedPaths,
  $isPathExpanded,
  $root,
  $selectedNode,
  $selectedPath,
} = fileSystemSelectors;

const TreeViewConnected = connect(
  state => ({
    node: $root(state),
    isPathExpanded: $isPathExpanded(state),
    selectedPath: $selectedPath(state),
  }),
  { moveNode, removeNode, toggleExpandedPath, selectPath, shiftSelectedPath },
)(props => <TreeView resolveNodeRenderer={resolveNodeRenderer} {...props}/>);


const DetailViewConnected = connect(
  state => ({ node: $selectedNode(state) }),
)(props => <DetailView {...props} resolveNodeRenderer={resolveNodeDetailViewRenderer} resolveNodeTitleRenderer={resolveNodeRenderer}/>);

export class TreeViewPage extends Component {
  componentDidMount() {
    let url = fileSystemMock;
    let DataSource = HttpDataSource;
    const { DATA_SOURCE } = process.env;
    const protocol = DATA_SOURCE.split('://')[0];
    if (protocol === 'http') {
      DataSource = HttpDataSource;
      url = DATA_SOURCE;
    } else if(protocol === 'ws') {
      DataSource = SocketDataSource;
      url = DATA_SOURCE;
    }
    const dataSource = new DataSource(store.dispatch, url);
    dataSource.connect();
  }
  render() {
    return (
      <SplitLayout
        left={<TreeViewConnected/>}
        right={<DetailViewConnected/>}
      />
    );
  }
}
