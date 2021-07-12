import { LCDClient, LocalTerra, MsgSwap, Coin, StdTx, StdFee } from '../src';
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

  // Test raw estimate fee function with specified gas
  const rawFee = await tequila.tx.estimateFee(
    test1.key.accAddress,
    [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    { gas: '500000' }
  );

  console.log(rawFee.toJSON());

  // Test automatic fee estimation using create method with specified denom
  const item = await tequila.tx.create(test1.key.accAddress, {
    msgs: [new MsgSwap(test1.key.accAddress, new Coin('uluna', 1000), 'uusd')],
    feeDenoms: ['uusd'],
  });

  console.log(item.fee.toJSON());
}

main().catch(console.error);
