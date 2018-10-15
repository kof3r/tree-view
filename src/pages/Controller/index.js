
import React, { Component } from 'react';

import './Controller.scss';

export class ControllerPage extends Component {
  ws = null;

  componentDidMount() {
    this.ws = new WebSocket(process.env.CONTROLLER);
  }

  componentWillUnmount() {
    this.ws.close();
  }

  sendMessage(procedure) {
    this.ws.send(JSON.stringify({ procedure }));
  }

  render() {
    return (
      <div className='ControllerPage'>
        <button onClick={() => this.sendMessage('SelectPreviousNode')}>previous</button>
        <button onClick={() => this.sendMessage('ToggleSelectedNodeExpand')}>expand</button>
        <button onClick={() => this.sendMessage('SelectNextNode')}>next</button>
      </div>
    );
  }
}
