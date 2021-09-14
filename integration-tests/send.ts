import {
  LCDClient,
  MsgSend,
  MnemonicKey,
  MsgGrantAllowance,
  Fee,
} from '../src';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const bombay = new LCDClient({
    chainID: 'bombay-10',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.38 },
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(mk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
    { uusd: 1312029 }
  );

  wallet
    .createAndSignTx({
      signMode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
      msgs: [send],
      memo: 'test from terra.js!',
    })
    .then(tx => {
      return bombay.tx.broadcast(tx);
    })
    .then(result => {
      console.log(`TX hash: ${result.txhash}  ${result.raw_log}`);
    });
}

main().catch(console.error);
