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

// send tracker
wsclient.subscribe('Tx', { 'message.action': 'send' }, data => {
  console.log('Send occured!');
  console.log(data.value);
});

// swap tracker
wsclient.subscribe('Tx', { 'message.action': 'swap' }, data => {
  console.log('Swap occured!');
  console.log(data.value.TxResult.result.events);
});
