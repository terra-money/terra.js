import {
  MsgExecuteContract,
  LCDClient,
  MnemonicKey,
} from '../src';

// test1 key from localterra accounts
const terra = new LCDClient({ URL: "https://bombay-lcd.terra.dev/", chainID: "bombay-12" });
const key1 = new MnemonicKey({ mnemonic: "notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius" });
const test1 = terra.wallet(key1);

async function main() {
  const execute = new MsgExecuteContract(
    test1.key.accAddress, // sender
    "terra1vx6kj7afw7mqekzq7mce6q2rl54fly8yhyle85", // contract address
    "test"
  );
  const executeTx = await test1.createAndSignTx({
    msgs: [execute],
  });
  const executeTxResult = await terra.tx.broadcast(executeTx);
  console.log(`execute result: ${JSON.stringify(executeTxResult)}`);

  const queryResult = await terra.wasm.contractQuery("terra1zfpmxxml57vcawqg2f9nxk85t0d588r8g3ptap", "test");
  console.log(`query result: ${queryResult}`);
}

main().catch(console.log);
