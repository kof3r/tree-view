
const ws = new WebSocket('ws://localhost:10000/tv-backend/ws');

function sendMessage(message) {
  ws.send(JSON.stringify(message));
}

function readMessage(evt) {
  console.log(evt)
  return JSON.parse(evt.data);
}

ws.onopen = (() => {
  console.log('connected');

  sendMessage({ procedure: 'GetContent' });
});

ws.onmessage = (message) => {
  const data = readMessage(message);
  console.log(data);
}
