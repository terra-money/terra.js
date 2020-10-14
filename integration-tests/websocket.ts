import { WebSocketClient } from '../src';

const wsclient = new WebSocketClient({
  URL: 'ws://localhost:26657/websocket',
});

let count = 0;
wsclient.subscribe('NewBlock', {}, (_, socket) => {
  console.log(count);
  count += 1;

  if (count === 3) {
    socket.close();
  }
});
