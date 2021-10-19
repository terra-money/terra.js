import { LCDClient, MsgSend, MnemonicKey, Fee } from '../src';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const bombay = new LCDClient({
    chainID: 'localterra',
    URL: 'http://localhost:1317',
    gasPrices: { uusd: 0.38 },
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(mk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
    { uluna: 1312029 }
  ).toAminoJSON();

  const fee = JSON.parse(new Fee(200000, { uluna: 500000 }, '', '').toAminoJSON());
  //const fee = new Fee(200000, { uluna: 100000 }, '', '');
  console.log('AMINOJS');
  console.log(send)
  console.log(fee);

  wallet
    .createAndSignTx({
      msgs: [JSON.parse(send)],
      memo: 'test from terra.js!',
      fee
    })
    .then(tx => {
      return bombay.tx.broadcast(tx);
    })
    .then(result => {
      console.log(`TX hash: ${result.txhash}  ${result.raw_log}`);
    });
}

main().catch(console.error);
