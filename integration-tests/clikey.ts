import { StdFee, StdSignMsg, MsgSend } from '../src';
import { LocalTerra } from '../src';
import { CLIKey } from '../src';

const terra = new LocalTerra();
const { validator: test1 } = terra.wallets;
const clikey = new CLIKey('test1');
const test1Cli = terra.wallet(clikey);

const send = new MsgSend(test1.key.accAddress, test1.key.accAddress, { uluna: 100000 });

async function main() {
    const tx = await test1Cli.createAndSignTx({
        msgs: [send],
        fee: new StdFee(100000, { uluna: 100000 })
    });

    console.log(await terra.tx.broadcast(tx));
}

main();