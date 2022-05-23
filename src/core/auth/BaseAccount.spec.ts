import { BaseAccount } from './BaseAccount';
import { SimplePublicKey } from '../PublicKey';

const data = require('./BaseAccount.data.json');

describe('Account', () => {
  it('legacy deserializes accounts correctly', () => {
    const data: BaseAccount.Amino = {
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
    const acct = BaseAccount.fromAmino(data);
    expect(acct).toMatchObject({
      address: 'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
      public_key: new SimplePublicKey(
        'AvBeqhogW0wd7OtF8M8hJ/P1A/IBY1+uNvBO/tbVlfq2'
      ),
      account_number: 251248,
      sequence: 58,
    });
    expect(acct.toAmino(true)).toMatchObject(data);
  });

  it('legacy deserializes a new account correctly', () => {
    // a new account does not yet have a public key
    const newAccount: BaseAccount.Amino = {
      type: 'core/Account',
      value: {
        address: '',
        public_key: null,
        account_number: '0',
        sequence: '0',
      },
    };

    expect(BaseAccount.fromAmino(newAccount).toAmino(true)).toMatchObject(
      newAccount
    );
  });

  it('legacy serializes accounts correctly', () => {
    const acct = new BaseAccount(
      'terra12fm3tql2uu0gheuj3st9cwz7ml97tq9mla88c2',
      new SimplePublicKey('abc'),
      251248,
      58
    );

    expect(acct.toAmino(true)).toMatchObject({
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

  it('legacy deserializes from example data', () => {
    data.forEach((ex: BaseAccount.Amino) => {
      expect(BaseAccount.fromAmino(ex).toAmino(true)).toMatchObject(ex);
    });
  });
});
