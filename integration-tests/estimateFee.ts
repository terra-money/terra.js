import { LCDClient, LocalTerra, MsgSwap, MsgSend, Coin, StdTx, StdFee } from '../src';
import Axios from 'axios';

const lt = new LocalTerra();
const test1 = lt.wallets.test1;
const test2 = lt.wallets.test2;

async function main() {
  const { data: gasPrices } = await Axios.get(
    'https://bombay-fcd.terra.dev/v1/txs/gas_prices'
  );

  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices,
  });

  // Test raw estimate fee function with specified gas
  const rawFee = await bombay.tx.estimateFee(
    test1.key.accAddress,
    [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    { gas: '500000' }
  );

  console.log('MsgSwap(500000 gas): ', rawFee.toJSON());

  // Test automatic fee estimation using create method with specified denom
  const item = await bombay.tx.create(test1.key.accAddress, {
    msgs: [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    feeDenoms: ['uusd'],
  });

  console.log('MsgSwap(uusd fee)', item.fee.toJSON());

  const send = await bombay.tx.create(test2.key.accAddress, {
    msgs: [new MsgSend(test2.key.accAddress, test1.key.accAddress, '1234uusd')],
    feeDenoms: ['uusd'],
  });

  console.log('MsgSend', send.fee.toJSON());
}

main().catch(console.error);
