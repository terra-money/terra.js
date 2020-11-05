import { StdFee, MsgSend } from '../src';
import { LocalTerra } from '../src';
import { CLIKey } from '../src';

const terra = new LocalTerra();
const { test1 } = terra.wallets;
const cliKey = new CLIKey({ keyName: 'paul4' });
const cliWallet = terra.wallet(cliKey);

const send = new MsgSend(cliWallet.key.accAddress, test1.key.accAddress, {
  uluna: 100000,
});

async function main() {
  const tx = await cliWallet.createAndSignTx({
    msgs: [send],
    fee: new StdFee(100000, { uluna: 100000 }),
  });

  console.log(await terra.tx.broadcast(tx));
}

main().catch(console.error);
