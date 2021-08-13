import {
  LCDClient,
  MnemonicKey,
  Wallet,
  MsgGrantAuthorization,
  SendAuthorization,
  MsgSend,
  Coins,
  MsgExecAuthorized,
  MsgRevokeAuthorization,
} from '../src';

function grant(
  granter: Wallet,
  grantee: Wallet,
  spendLimit: Coins.Input,
  expiration: Date
) {
  const msgs = [
    new MsgGrantAuthorization(
      granter.key.accAddress,
      grantee.key.accAddress,
      new SendAuthorization(spendLimit),
      expiration
    ),
  ];

  return granter.createAndSignTx({ msgs });
}

function sendAuthorized(
  granter: Wallet,
  grantee: Wallet,
  to: string,
  amount: Coins.Input
) {
  const msgs = [
    new MsgExecAuthorized(grantee.key.accAddress, [
      new MsgSend(
        granter.key.accAddress, // From test1
        to,
        amount
      ),
    ]),
  ];

  return grantee.createAndSignTx({ msgs });
}

function revoke(granter: Wallet, grantee: Wallet, msg_type_url: string) {
  const msgs = [
    new MsgRevokeAuthorization(
      granter.key.accAddress,
      grantee.key.accAddress,
      msg_type_url
    ),
  ];

  return granter.createAndSignTx({ msgs });
}

async function main() {
  const client = new LCDClient({
    URL: 'http://localhost:1317',
    chainID: 'localterra',
    gasPrices: '169.77ukrw',
  });

  // Granter (terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v)
  const granter = client.wallet(
    new MnemonicKey({
      mnemonic:
        'notice oak worry limit wrap speak medal online prefer cluster roof addict wrist behave treat actual wasp year salad speed social layer crew genius',
    })
  );

  // Grantee (terra17lmam6zguazs5q5u6z5mmx76uj63gldnse2pdp)
  const grantee = client.wallet(
    new MnemonicKey({
      mnemonic:
        'quality vacuum heart guard buzz spike sight swarm shove special gym robust assume sudden deposit grid alcohol choice devote leader tilt noodle tide penalty',
    })
  );

  // MsgGrantAuthorization
  await grant(
    granter,
    grantee,
    // Set enough spend limit since it will be decreased upon every MsgSend transactions
    '1000000000000000ukrw',
    // expire after 100 year
    new Date('2050-01-01')
  )
    .then(tx => client.tx.broadcast(tx))
    .then(console.info)
    .catch(err => {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error(err.message);
      }
    });

  // MsgExecAuthorized of MsgSend
  await sendAuthorized(
    granter,
    grantee,
    // Test3
    'terra1757tkx08n0cqrw7p86ny9lnxsqeth0wgp0em95',
    '2000000000000ukrw'
  )
    .then(tx => client.tx.broadcast(tx))
    .then(console.info)
    .catch(err => {
      if (err.response) {
        // unauthorized: authorization not found: failed to execute message; message index: 0: failed to simulate tx
        // happenes when there's not enough amount of granted amount of token

        // insufficient funds: insufficient account funds; ...
        // happenes when granter does not have enough amount of token
        console.error(err.response.data);
      } else {
        console.error(err.message);
      }
    });

  // MsgRevokeAuthorization
  await revoke(granter, grantee, '/cosmos.bank.v1beta1.MsgSend')
    .then(tx => client.tx.broadcast(tx))
    .then(console.info)
    .catch(err => {
      if (err.response) {
        // unauthorized: authorization not found: failed to execute message; message index: 0: failed to simulate tx
        // happenes when there's not enough amount of granted amount of token

        // insufficient funds: insufficient account funds; ...
        // happenes when granter does not have enough amount of token
        console.error(err.response.data);
      } else {
        console.error(err.message);
      }
    });
}

main().catch(console.error);
