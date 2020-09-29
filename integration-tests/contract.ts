import {
  LCDClient,
  MsgStoreCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  MnemonicKey,
  StdFee,
  isTxError,
} from '../src';
import * as fs from 'fs';

// test1 key from localterra accounts
const mk = new MnemonicKey({
  mnemonic:
    'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
});

// connect to localterra
const terra = new LCDClient({
  URL: 'http://localhost:1317',
  chainID: 'localterra',
});

const wallet = terra.wallet(mk);

async function main(): Promise<void> {
  const storeCode = new MsgStoreCode(
    wallet.key.accAddress,
    fs.readFileSync('contract.wasm').toString('base64')
  );
  const storeCodeTx = await wallet.createAndSignTx({
    msgs: [storeCode],
  });
  const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);

  if (isTxError(storeCodeTxResult)) {
    throw new Error(
      `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
    );
  }

  const {
    store_code: { code_id },
  } = storeCodeTxResult.logs[0].eventsByType;

  const instantiate = new MsgInstantiateContract(
    wallet.key.accAddress,
    +code_id[0], // code ID
    {
      count: 0,
    }, // InitMsg
    { uluna: 10000000, ukrw: 1000000 }, // init coins
    false // migratable
  );

  const instantiateTx = await wallet.createAndSignTx({
    msgs: [instantiate],
  });
  const instantiateTxResult = await terra.tx.broadcastSync(instantiateTx);

  if (isTxError(instantiateTxResult)) {
    throw new Error(
      `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
    );
  }

  const {
    instantiate_contract: { contract_address },
  } = instantiateTxResult.logs[0].eventsByType;

  const execute = new MsgExecuteContract(
    wallet.key.accAddress, // sender
    contract_address[0], // contract account address
    { increment: {} }, // handle msg
    { uluna: 100000 } // coins
  );
  const executeTx = await wallet.createAndSignTx({
    msgs: [execute],
  });
  const executeTxResult = await terra.tx.broadcast(executeTx);
  console.log(executeTxResult);
}

main().then(console.log);
