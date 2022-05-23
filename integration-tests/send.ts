import { LCDClient, MsgSend, MnemonicKey } from '../src';
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
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(mk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
    { uluna: 1000 }
  );

  wallet
    .createAndSignTx({
      signMode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
      msgs: [send],
      memo: 'test from terra.js!',
    })
    .then(tx => {
    	/*
    	tx.body.messages[0] = new MsgSend(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
    { uluna: 2000 }
		);
		*/
      return bombay.tx.broadcast(tx);
    })
    .then(result => {
      console.log(`TX hash: ${result.txhash}  ${result.raw_log}`);
    });
}

main().catch(console.error);
