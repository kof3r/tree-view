
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SplitLayout } from '../layouts';
import { fileSystemActions, fileSystemSelectors } from '../state/file-system';
import { resolveNodeRenderer, resolveNodeDetailViewRenderer } from '../components';
import { createConnectedTreeView, createDetailViewConnected } from '../component-factories';
import { SocketDataSource, HttpDataSource } from '../data-source';
import store from '../store';

import fileSystemMock from '../test_data/file-system.json';

const TreeViewConnected = createConnectedTreeView({
  actions: fileSystemActions,
  selectors: fileSystemSelectors,
  resolveNodeComponent: resolveNodeRenderer,
});

const DetailViewConnected = createDetailViewConnected({
  selectors: fileSystemSelectors,
  resolveNodeComponent: resolveNodeDetailViewRenderer,
  resolveNodeTitleComponent: resolveNodeRenderer,
});

export class TreeViewPage extends Component {
  componentDidMount() {
    let url = fileSystemMock;
    let DataSource = HttpDataSource;
    const { DATA_SOURCE } = process.env;
    if (DATA_SOURCE) {
      const protocol = DATA_SOURCE.split('://')[0];
      if (protocol === 'http') {
        DataSource = HttpDataSource;
        url = DATA_SOURCE;
      } else if(protocol === 'ws') {
        DataSource = SocketDataSource;
        url = DATA_SOURCE;
      }
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
