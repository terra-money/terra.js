import { LCDClient, LocalTerra, MsgSwap, MsgSend, Coin } from '../src';
import Axios from 'axios';
import { Fee } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';

const lt = new LocalTerra();
const test1 = lt.wallets.test1;
const test2 = lt.wallets.test2;

async function main() {
  const { data: gasPrices } = await Axios.get(
    'https://bombay-fcd.terra.dev/v1/txs/gas_prices'
  );

  const bombay = new LCDClient({
    chainID: 'bombay-10',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices,
  });

  const accountInfo = await bombay.auth.accountInfo(test1.key.accAddress);

  // Test raw estimate fee function with specified gas
  const rawFee = await bombay.tx.estimateFee(
    [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    { gas: 'auto', sequence: accountInfo.sequence }
  );

  console.log('MsgSwap(500000 gas): ', Fee.toJSON(rawFee.toProto()));

  // Test automatic fee estimation using create method with specified denom
  const item = await bombay.tx.create(test1.key.accAddress, {
    msgs: [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    feeDenoms: ['uusd'],
  });

  console.log('MsgSwap(uusd fee)', Fee.toJSON(item.auth_info.fee.toProto()));

  const send = await bombay.tx.create(test2.key.accAddress, {
    msgs: [new MsgSend(test2.key.accAddress, test1.key.accAddress, '1234uusd')],
    feeDenoms: ['uusd'],
  });

  console.log('MsgSend', Fee.toJSON(send.auth_info.fee.toProto()));
}

main().catch(console.error);
