import { LCDClient, MsgSend, TerraVaultKey, StdFee } from '../src';

//To use LocalTerra
const terra = new LCDClient({
  URL: 'http://localhost:1317',
  chainID: 'localterra'
});

// create a simple message that moves coin balances
const send = new MsgSend(
  'terra1xfun7qepkgr777prkukpkhg6h5fuus2fkwmh4k',
  'terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp',
  { uusd: 300 }
);

// load the key from the local vault, and request tx signing
TerraVaultKey
  .loadAccount("http://127.0.0.1:8200","terra1xfun7qepkgr777prkukpkhg6h5fuus2fkwmh4k","root")
  .then(kms => terra.wallet(kms))
  .then(wallet => wallet.createAndSignTx({
    msgs: [send],
    memo: 'Signed using Terra Vault!',
    fee: new StdFee(100000, { uusd: 100000 }),
  }))
  .then(tx => terra.tx.broadcast(tx))
  .then(console.log);