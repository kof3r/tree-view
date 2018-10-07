
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { TreeView, nodeRenderingKit } from '../components';
import { parseNodeTree } from '../parser';
import fileSystemRaw from '../test_data/file-system.json';

import './App.scss';

const parsedFileSystem = parseNodeTree(fileSystemRaw);

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>TreeView</h1>
        <TreeView node={parsedFileSystem} renderingKit={nodeRenderingKit}/>
      </div>
    );
  }
}

export default hot(module)(App);
