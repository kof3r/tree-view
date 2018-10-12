
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import store from '../store';
import { TreeViewPage } from '../pages';
import { SplitLayout } from '../layouts';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <SplitLayout
            left={<TreeViewPage/>}
          />
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App);
