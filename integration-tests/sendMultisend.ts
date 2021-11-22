import { LCDClient, MnemonicKey, MsgMultiSend, SignDoc } from '../src';

async function main() {
  // create a key out of a mnemonic
  const mk = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const mk2 = new MnemonicKey({
    mnemonic:
      'arrest word woman erupt kiss tank neck achieve diagram gadget siren rare valve replace outside angry dance possible purchase extra yellow cruise pride august',
  });

  const bombay = new LCDClient({
    chainID: 'bombay-12',
    URL: 'https://bombay-lcd.terra.dev',
    gasPrices: { uusd: 0.38 },
  });

  // create a simple message that moves coin balances
  const send = new MsgMultiSend(
    [
      new MsgMultiSend.Input('terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v', {
        uusd: 100000,
      }),
      new MsgMultiSend.Input('terra1fqwsd6as9v7f93vja2u7yjs98enawcaq6ge2dx', {
        uusd: 200000,
      }),
    ],
    [
      new MsgMultiSend.Output('terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp', {
        uusd: 150000,
      }),
      new MsgMultiSend.Output('terra1gufrav46pnpwf03yu7xz76ylkmatsxtplrxnmc', {
        uusd: 150000,
      }),
    ]
  );

  const accInfo = await bombay.auth.accountInfo(mk.accAddress);
  const accInfo2 = await bombay.auth.accountInfo(mk2.accAddress);

  const tx = await bombay.tx.create(
    [
      { address: mk.accAddress, sequenceNumber: accInfo.getSequenceNumber() },
      { address: mk2.accAddress, sequenceNumber: accInfo2.getSequenceNumber() },
    ],
    {
      msgs: [send],
      memo: 'memo',
      gasPrices: { uusd: 0.456 },
      gasAdjustment: 1.4,
    }
  );

  const sig1 = await mk.createSignatureAmino(
    new SignDoc(
      bombay.config.chainID,
      accInfo.getAccountNumber(),
      accInfo.getSequenceNumber(),
      tx.auth_info,
      tx.body
    )
  );

  const sig2 = await mk2.createSignatureAmino(
    new SignDoc(
      bombay.config.chainID,
      accInfo2.getAccountNumber(),
      accInfo2.getSequenceNumber(),
      tx.auth_info,
      tx.body
    )
  );

  tx.appendSignatures([sig1, sig2]);
  console.log(JSON.stringify(tx.toData()));
  bombay.tx.broadcast(tx).then(console.log);
}

main().catch(console.error);
