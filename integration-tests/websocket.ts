import { LocalTerra, WebSocketClient } from '../src';

const wsclient = new WebSocketClient({
  URL: 'ws://localhost:26657/websocket',
});

const terra = new LocalTerra();

let count = 0;
wsclient.subscribe('NewBlock', {}, (_, socket) => {
  console.log(count);
  count += 1;

  if (count === 3) {
    socket.close();
  }
});

// send tracker
wsclient.subscribe(
  'Tx',
  { 'message.action': 'send', 'message.e': ['CONTAINS', '3'] },
  data => {
    console.log('Send occured!');
    console.log(data.value);
  }
);

// swap tracker
wsclient.subscribeTx({ 'message.action': 'swap' }, async data => {
  console.log('Swap occured!');
  const txInfo = await terra.tx.txInfo(data.value.TxResult.txhash);
  if (txInfo.logs) {
    console.log(txInfo.logs[0].eventsByType);
  }
});
