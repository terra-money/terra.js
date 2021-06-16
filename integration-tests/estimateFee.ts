import { LCDClient, LocalTerra, MsgSwap, Coin } from '../src';
import Axios from 'axios';

const lt = new LocalTerra();
const test1 = lt.wallets.test1;

async function main() {
  const { data: gasPrices } = await Axios.get(
    'https://bombay-fcd.terra.dev/v1/txs/gas_prices'
  );

  const tequila = new LCDClient({
    chainID: 'bombay-0007',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices,
  });

  const item = await tequila.tx.create(test1.key.accAddress, {
    msgs: [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    feeDenoms: ['uusd'],
  });

  console.log(item.fee.toJSON());
}

main().catch(console.error);
