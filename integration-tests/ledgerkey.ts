import { LCDClient, MsgSend, LedgerKey } from '../src';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

async function main() {
  // ledgerkey
  const transport = await TransportNodeHid.create()
  const lk = new LedgerKey(transport);

  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.38 },
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(lk);

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
