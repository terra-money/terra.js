import { LCDClient, LocalTerra, MsgSwap, MsgSend, Coin } from '../src';
import Axios from 'axios';

const lt = new LocalTerra();
const test1 = lt.wallets.test1;

async function main() {
  const { data: gasPrices } = await Axios.get(
    'https://bombay-fcd.terra.dev/v1/txs/gas_prices'
  );

  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices,
  });

  const accountInfo = await bombay.auth.accountInfo(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'
  );

  const msgs = [
    new MsgSwap(
      'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
      new Coin('uusd', 1000),
      'uluna'
    ),
  ];

  // Test raw estimate fee function with specified gas
  const rawFee = await bombay.tx.estimateFee({
    msgs,
    gas: 'auto',
    sequence: accountInfo.getSequenceNumber(),
  });

  console.log('MsgSwap(500000 gas): ', rawFee.toData());

  // Test automatic fee estimation using create method with specified denom
  const item = await bombay.tx.create(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    {
      msgs,
      feeDenoms: ['uusd'],
    }
  );

  console.log('MsgSwap(uusd fee)', item.auth_info.fee.toData());

  const send = await bombay.tx.create(test1.key.accAddress, {
    msgs: [
      new MsgSend(
        test1.key.accAddress,
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        '1234uusd'
      ),
    ],
    feeDenoms: ['uusd'],
  });

  console.log('MsgSend', send.auth_info.fee.toData());
}

main().catch(console.error);
