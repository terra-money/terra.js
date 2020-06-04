import {
  LCDClient,
  MnemonicKey,
  MsgStoreCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  StdFee,
  Coins,
} from './src';

const { readFileSync } = require('fs');
const terra = new LCDClient({
  URL: 'http://localhost:1317',
  chainID: 'william',
});

const key = new MnemonicKey({
  mnemonic:
    'measure bargain wheat churn wife divert vacuum west forget eager donor mad pool height feel ship sibling tower boost bright lunar mad village attitude',
});

const key2 = new MnemonicKey();

const wallet = terra.wallet(key);
const contractData = readFileSync('contract.wasm');
const storeMsg = new MsgStoreCode(
  wallet.key.accAddress,
  contractData.toString('base64')
);

const fun = async () => {
  const storeTx = await wallet.createAndSignTx({
    msgs: [storeMsg],
    fee: new StdFee(100000000, { uluna: 100000 }),
  });

  let res = await terra.tx.broadcast(storeTx);
  const codeId = Number.parseInt(res.logs[0].events[1].attributes[1].value);
  console.log(`Uploaded code id: #${codeId}`);

  const instantiateMsg = new MsgInstantiateContract(
    wallet.key.accAddress,
    codeId,
    {
      decimals: 2,
      initial_balances: [{ address: wallet.key.accAddress, amount: '1000000' }],
      name: 'williamCoin',
      symbol: 'WILL',
    },
    new Coins({
      uluna: 10000,
    })
  );

  const instantiateTx = await wallet.createAndSignTx({
    msgs: [instantiateMsg],
    fee: new StdFee(100000000, { uluna: 100000 }),
  });

  res = await terra.tx.broadcast(instantiateTx);
  const contractAddress = res.logs[0].events[0].attributes[2].value;
  console.log(`Instantiated contract at address: ${contractAddress}`);

  const executeMsg = new MsgExecuteContract(
    wallet.key.accAddress,
    contractAddress,
    {
      transfer: {
        amount: '5000',
        recipient: key2.accAddress,
      },
    },
    new Coins({}) // empty coins
  );

  const executeTx = await wallet.createAndSignTx({
    msgs: [executeMsg],
    fee: new StdFee(100000000, { uluna: 100000 }),
  });

  res = await terra.tx.broadcast(executeTx);
  const balance1 = await terra.wasm.contractQuery<{ balance: string }>(
    contractAddress,
    {
      balance: { address: wallet.key.accAddress },
    }
  );

  const balance2 = await terra.wasm.contractQuery<{ balance: string }>(
    contractAddress,
    {
      balance: { address: key2.accAddress },
    }
  );

  console.log(`${wallet.key.accAddress} has ${balance1.balance} williamCoin`);
  console.log(`${key2.accAddress} has ${balance2.balance} williamCoin`);
};

fun();
