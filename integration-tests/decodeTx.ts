import { LCDClient, MsgSend, MnemonicKey } from '../src';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.15 },
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(mk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
    { uluna: 1312029 }
  );

  const tx = await wallet
    .createAndSignTx({
      msgs: [send],
      memo: 'decode test',
	});


  const encoded = bombay.tx.encode(tx);
  const decoded = bombay.tx.decode(encoded);

  console.log(`\n\tstringified:${JSON.stringify(tx)}`);
  console.log(`\n\tencoded:${encoded}`);
  console.log(`\n\tdecoded:${JSON.stringify(decoded)}`);

}

main().catch(console.error);
