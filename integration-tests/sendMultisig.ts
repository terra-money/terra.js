import {
  LCDClient,
  MnemonicKey,
  SignDoc,
  LegacyAminoMultisigPublicKey,
  SimplePublicKey,
  MsgSend,
} from '../src';
import { MultiSignature } from '../src/core/MultiSignature';
import { SignatureV2 } from '../src/core/SignatureV2';

async function main() {
  // create a key out of a mnemonic
  const mk1 = new MnemonicKey({
    mnemonic:
      'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
  });

  const mk2 = new MnemonicKey({
    mnemonic:
      'arrest word woman erupt kiss tank neck achieve diagram gadget siren rare valve replace outside angry dance possible purchase extra yellow cruise pride august',
  });

  const mk3 = new MnemonicKey({
    mnemonic:
      'shrug resist find inch narrow tumble knee fringe wide mandate angry sense grab rack fork snack family until bread lake bridge heavy goat want',
  });
  console.log(mk1.accAddress)
  console.log(mk2.accAddress)
  console.log(mk3.accAddress)

  const multisigPubkey = new LegacyAminoMultisigPublicKey(2, [
    mk1.publicKey as SimplePublicKey,
    mk2.publicKey as SimplePublicKey,
    mk3.publicKey as SimplePublicKey,
  ]);

  const bombay = new LCDClient({
    chainID: 'localterra',
    URL: 'http://localhost:1317',
    gasPrices: { uusd: 0.38 },
  });

  const address = multisigPubkey.address();
  const multisig = new MultiSignature(multisigPubkey);

  // create a simple message that moves coin balances
  const send = new MsgSend(
    address,
    'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
    { uusd: 100000 }
  );

  const accInfo = await bombay.auth.accountInfo(address);
  const tx = await bombay.tx.create(
    [
      {
        address,
        sequenceNumber: accInfo.getSequenceNumber(),
        publicKey: accInfo.getPublicKey(),
      },
    ],
    {
      msgs: [send],
      memo: 'memo',
      gasPrices: { uusd: 0.456 },
      gasAdjustment: 1.2,
    }
  );

  const sig1 = await mk3.createSignatureAmino(
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
      accInfo.getAccountNumber(),
      accInfo.getSequenceNumber(),
      tx.auth_info,
      tx.body
    )
  );

  multisig.appendSignatureV2s([sig1, sig2]);
  tx.appendSignatures([
    new SignatureV2(
      multisigPubkey,
      multisig.toSignatureDescriptor(),
      accInfo.getSequenceNumber()
    ),
  ]);
  console.log(JSON.stringify(tx.toData()));
  bombay.tx.broadcastBlock(tx).then(console.log);
}

main().catch(console.error);
