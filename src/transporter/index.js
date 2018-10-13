
import store from '../store';
import { setRootNode } from '../state/file-system'

const ws = new WebSocket('ws://localhost:10000/tv-backend/ws');

function sendMessage(message) {
  ws.send(JSON.stringify(message));
}

function readMessage(evt) {
  try {
    return JSON.parse(evt.data);
  } catch (err) {
    console.log("readMessage err:", err);
    return null;
  }
}

ws.onopen = (() => {
  console.log('connected');

  sendMessage({ procedure: 'GetContent' });
});

ws.onmessage = (message) => {
  if (message != "") {
    const data = readMessage(message);
    if (data != null) {
      var msg = JSON.parse(data);
      console.log("message received:", msg);
  
      store.dispatch(setRootNode(msg));    
    } else {
      console.log("ws.onMessage - data is NULL!");
    }
  } else {
    console.log("empty ws response recieved, probably connected response")
  }
}
