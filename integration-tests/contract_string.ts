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
    "terra1qjdyffc8qae9vxhhxxc5kr43thsamw4fp4gj6z", // contract address
    "increment"
  );
  const executeTx = await test1.createAndSignTx({
    msgs: [execute],
  });
  const executeTxResult = await terra.tx.broadcast(executeTx);
  console.log(`execute result: ${JSON.stringify(executeTxResult)}`);

  const queryResult = await terra.wasm.contractQuery("terra1qjdyffc8qae9vxhhxxc5kr43thsamw4fp4gj6z", "test");
  console.log(`query result: ${queryResult}`);
}

main().catch(console.log);
