import {
  MsgStoreCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  isTxError,
  LocalTerra,
  getCodeId,
  getContractAddress,
} from '../src';
import * as fs from 'fs';

// test1 key from localterra accounts
const terra = new LocalTerra();
const { test1 } = terra.wallets;

async function main(): Promise<void> {
  const storeCode = new MsgStoreCode(
    test1.key.accAddress,
    fs.readFileSync('contract.wasm').toString('base64')
  );
  const storeCodeTx = await test1.createAndSignTx({
    msgs: [storeCode],
  });
  const storeCodeTxResult = await terra.tx.broadcast(storeCodeTx);

  console.log(storeCodeTxResult);

  if (isTxError(storeCodeTxResult)) {
    throw new Error(
      `store code failed. code: ${storeCodeTxResult.code}, codespace: ${storeCodeTxResult.codespace}, raw_log: ${storeCodeTxResult.raw_log}`
    );
  }

  const codeId = getCodeId(storeCodeTxResult);

  const instantiate = new MsgInstantiateContract(
    test1.key.accAddress,
    undefined,
    +codeId, // code ID
    { count: 0, }, // InitMsg
    { uluna: 10000000, ukrw: 1000000 } // init coins
  );

  const instantiateTx = await test1.createAndSignTx({
    msgs: [instantiate],
  });
  const instantiateTxResult = await terra.tx.broadcast(instantiateTx);

  console.log(instantiateTxResult);

  if (isTxError(instantiateTxResult)) {
    throw new Error(
      `instantiate failed. code: ${instantiateTxResult.code}, codespace: ${instantiateTxResult.codespace}, raw_log: ${instantiateTxResult.raw_log}`
    );
  }

  const contractAddress = getContractAddress(instantiateTxResult);

  const execute = new MsgExecuteContract(
    test1.key.accAddress, // sender
    contractAddress, // contract address
    { increment: {} }, // handle msg
    { uluna: 100000 } // coins
  );
  const executeTx = await test1.createAndSignTx({
    msgs: [execute],
  });
  const executeTxResult = await terra.tx.broadcast(executeTx);
  console.log(executeTxResult);
}

main().then(console.log);
