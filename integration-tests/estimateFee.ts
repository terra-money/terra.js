import { LCDClient, LocalTerra, MsgSwap, Coin } from '../src';
import Axios from 'axios';

const lt = new LocalTerra();
const test1 = lt.wallets.test1;

async function main() {
  const { data: tequilaGasPrices } = await Axios.get(
    'https://tequila-fcd.terra.dev/v1/txs/gas_prices'
  );

  const tequila = new LCDClient({
    chainID: 'tequila-0004',
    URL: 'https://tequila-fcd.terra.dev',
    gasPrices: tequilaGasPrices,
  });

  const item = await tequila.tx.create(test1.key.accAddress, {
    msgs: [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    feeDenoms: ['uusd'],
  });

  console.log(item.fee.toJSON());
}

main().catch(console.error);
