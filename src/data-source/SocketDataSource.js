
import { fileSystemActions } from '../state/file-system';

import { DataSource } from './DataSource';

const { setRootNode, shiftSelectedPath, toggleExpandedPath } = fileSystemActions;

export class SocketDataSource extends DataSource {
  constructor(dispatch, wsUrl) {
    super(dispatch);

    this.wsUrl = wsUrl;
    this.ws = null;
    this.messageHandlers = {
      'SetContent': root => dispatch(setRootNode(root)),
      'SelectNextNode': () => dispatch(shiftSelectedPath(1)),
      'SelectPreviousNode': () => dispatch(shiftSelectedPath(-1)),
      'ToggleSelectedNodeExpand': () => dispatch(toggleExpandedPath()),
    }
  }
  connect() {
    const ws = this.ws = new WebSocket(this.wsUrl);
    ws.onopen = () => this.send('GetContent');
    ws.onmessage = this.handleMessage.bind(this);
  }
  send(procedure, payload) {
    const message = { procedure };
    if (payload !== undefined) {
      message.payload = payload;
    }
    this.ws.send(JSON.stringify(message));
  }
  handleMessage({ data }) {
    try {
      const { procedure, payload } = JSON.parse(data);
      if (!(procedure in this.messageHandlers)) {
        console.error(`unrecognized procedure: ${procedure}`);
        console.log('supported procedures: ', Object.keys(this.messageHandlers).join(', '));
        return;
      }
      this.messageHandlers[procedure](payload);
    } catch (err) {
      console.error('failed to handle server sent message!');
      console.error('server sent:')
      console.error(data);
      console.error('error:')
      console.error(err);
    }
  }
}
