
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { TreeView, nodeRenderingKit } from '../components';
import { someFileSystem } from '../test_data';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>TreeView</h1>
        <TreeView node={someFileSystem} renderingKit={nodeRenderingKit}/>
      </div>
    );
  }
}

export default hot(module)(App);
