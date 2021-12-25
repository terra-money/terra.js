import { LCDClient, MsgSend, LedgerKey, LedgerTransportType } from '../src';
import { SignMode } from '@terra-money/terra.proto/cosmos/tx/signing/v1beta1/signing';

async function main() {
  // ledgerkey
  const lk = new LedgerKey(LedgerTransportType.NODE);
  await lk.initialize();

  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
  });

  // a wallet can be created out of any key
  // wallets abstract transaction building
  const wallet = bombay.wallet(lk);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    'terra1mzv70x2avy4k95dujh9j3xh43nusxh8mh02cs5',
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    { uluna: 120400 }
  );

  const tx = await wallet
    .createAndSignTx({
      msgs: [send],
      memo: 'ledgerkey test',
      signMode: SignMode.SIGN_MODE_LEGACY_AMINO_JSON
    });
  console.log(`signed tx: ${JSON.stringify(tx)}`);
  const result = await bombay.tx.broadcast(tx);
  console.log(`TX hash: ${result.txhash}  ${result.raw_log}`);
}

main().catch(console.error);
