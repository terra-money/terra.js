import { LCDClient, MsgSend, MnemonicKey } from '../src';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import { TxBody } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';

async function main() {
  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.15 },
  });

  (await bombay.tx.txInfosByHeight(8152638)).
    map((tx) => {
      console.log(JSON.stringify(tx));
    });


  (await bombay.tx.txInfosByHeight(8153558)).
    map((tx) => {
      console.log(JSON.stringify(tx));
    });

}

main().catch(console.error);
