
const ws = new WebSocket('ws://localhost:10000/tv-backend/ws');

function sendMessage(message) {
  ws.send(JSON.stringify(message));
}

function readMessage(evt) {
  try {
    return JSON.parse(evt.data);
  } catch (err) {
    console.log(err);
    return null;
  }
}

ws.onopen = (() => {
  console.log('connected');

  sendMessage({ procedure: 'GetContent' });
});

ws.onmessage = (message) => {
  const data = readMessage(message);
  console.log(data);
}
