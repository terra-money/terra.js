import {
  LCDClient,
  MnemonicKey,
  MsgSubmitProposal,
} from '../src';
import { Plan } from '../src/core/upgrade/Plan'
import { SoftwareUpgradeProposal } from '../src/core/upgrade/proposals'

const client = new LCDClient({
  chainID: 'localterra',
  URL: 'http://localhost:1317',
  gasPrices: { uusd: 0.38 },
});

// LocalTerra test1 terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

const wallet = client.wallet(mk);

const plan = new Plan("v0.5.3", undefined/*new Date('2021-12-01T03:28:34.024363013Z')*/, 16333000, "planinfo", undefined/*{ "upgrade_client_state": "plan" }*/);
const prop = new SoftwareUpgradeProposal("UPGRADE PROPOSAL", "SOFTWARE UPGRADE DESC", plan);

async function main() {
  const execute = new MsgSubmitProposal(
    prop,
    { uluna: 10000000 },
    wallet.key.accAddress
  );

  const executeTx = await wallet.createAndSignTx({
    msgs: [execute],
  });

  const executeTxResult = await client.tx.broadcastSync(executeTx);
  console.log(executeTxResult);
}

main().catch(console.error);
