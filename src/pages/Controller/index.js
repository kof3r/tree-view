
import React, { Component } from 'react';
import { Icon } from '../../components';

import './Controller.scss';

export class ControllerPage extends Component {
  ws = null;

  componentDidMount() {
    this.ws = new WebSocket(process.env.CONTROLLER);
  }

  componentWillUnmount() {
    this.ws.close();
  }

  sendMessage(procedure, payload) {
    const message = { procedure };
    if (payload) message.payload = payload;
    this.ws.send(JSON.stringify(message));
  }

  sendAddNodeTest = () => {
    this.sendMessage(
      'AddNode',
      {
        path: ['root', 'home', 'ljubo'],
        node: JSON.parse(`
        {
          "type": "Device",
          "label": "My USB",
          "id": "usb",
          "data": { "connected": false },
          "children": [
            { "type": "File", "label": "wallpaper.jpg", "data": { "type": "jpg" } }
          ]
        }
        `)
      }
    );
  }

  sendUpdateNodeDataTest(connected) {
    this.sendMessage(
      'UpdateNodeData',
      {
        path: ['root', 'home', 'ljubo', 'usb'],
        data: { connected },
      }
    );
  }

  render() {
    return (
      <div className='ControllerPage'>
        <button onClick={() => this.sendMessage('SelectPreviousNode')}><Icon icon='cheveron-up'/></button>
        <button onClick={() => this.sendMessage('ToggleSelectedNodeExpand')}>expand</button>
        <button onClick={this.sendAddNodeTest}>add</button>
        <button onClick={() => this.sendUpdateNodeDataTest(true)}>connect</button>
        <button onClick={() => this.sendUpdateNodeDataTest(false)}>disconnect</button>
        <button onClick={() => this.sendMessage('SelectNextNode')}><Icon icon='cheveron-down'/></button>
      </div>
    );
  }
}
