import { AuthAPI } from './AuthAPI';
import { BaseAccount } from '../../../core';
import { MnemonicKey } from '../../../key';
import { LCDClient } from '../LCDClient';

// TODO - restore to https://lcd.terra.dev
const terra = new LCDClient({
  chainID: 'localterra',
  URL: 'http://localhost:1317',
});
const auth = new AuthAPI(terra);

describe('AuthAPI', () => {
  describe('accounts', () => {
    it('account exists', async () => {
      const acct = await auth.accountInfo(
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'
      );

      expect(acct instanceof BaseAccount).toBe(true);
    });

    // TODO: - after merging CosmosSDK@v0.43.x restore vesting account test
    // it('LazyGradedVestingAccount', async () => {
    //   const acct = await auth.accountInfo(
    //     'terra1upg95nlwkfkrq4hhjrn3k9s6ud0aqx36gwnlsn'
    //   );

    //   expect(acct instanceof LazyGradedVestingAccount).toBe(true);
    // });

    it('invalid account', async () => {
      await expect(auth.accountInfo('1234')).rejects.toThrow();
    });

    it("account doesn't exist (valid but new account)", async () => {
      const mk = new MnemonicKey();
      await expect(auth.accountInfo(mk.accAddress)).rejects.toThrow(
        'status code 404'
      );
    });
  });
});
