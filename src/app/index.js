
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import store from '../store';
import { TreeViewPage, ControllerPage } from '../pages';

import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Switch>
              <Route exact path='/' component={TreeViewPage}/>
              <Route exact path='/controller' component={ControllerPage}/>
              <Redirect to='/' />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default hot(module)(App);
