import { Account } from './Account';
import { PublicKey } from '../PublicKey';

const data = require('./Account.data.json');

describe('Account', () => {
  it('deserializes accounts correctly', () => {
    const data: Account.Data = {
      type: 'core/Account',
      value: {
        address: 'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
        public_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: 'AvBeqhogW0wd7OtF8M8hJ/P1A/IBY1+uNvBO/tbVlfq2',
        },
        account_number: '251248',
        sequence: '58',
      },
    };
    const acct = Account.fromData(data);
    expect(acct).toMatchObject({
      address: 'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
      public_key: {
        value: 'AvBeqhogW0wd7OtF8M8hJ/P1A/IBY1+uNvBO/tbVlfq2',
      },
      account_number: 251248,
      sequence: 58,
    });
    expect(acct.toData()).toMatchObject(data);
  });

  it('deserializes a new account correctly', () => {
    // a new account does not yet have a public key
    const newAccount: Account.Data = {
      type: 'core/Account',
      value: {
        address: '',
        public_key: null,
        account_number: '0',
        sequence: '0',
      },
    };

    expect(Account.fromData(newAccount).toData()).toMatchObject(newAccount);
  });

  it('serializes accounts correctly', () => {
    const acct = new Account(
      'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
      new PublicKey('tendermint/PubKeySecp256k1', 'abc'),
      251248,
      58
    );

    expect(acct.toData()).toMatchObject({
      type: 'core/Account',
      value: {
        address: 'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
        public_key: {
          type: 'tendermint/PubKeySecp256k1',
          value: 'abc',
        },
        account_number: '251248',
        sequence: '58',
      },
    });
  });

  it('deserializes from example data', () => {
    data.forEach((ex: Account.Data) => {
      expect(Account.fromData(ex).toData()).toMatchObject(ex);
    });
  });
});
