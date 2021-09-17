import { APIRequester } from '../APIRequester';
import { AuthAPI } from './AuthAPI';
import { BaseAccount } from '../../../core';
import { MnemonicKey } from '../../../key';

// TODO - restore to https://lcd.terra.dev
const c = new APIRequester('https://bombay-lcd.terra.dev/');
const auth = new AuthAPI(c);

describe('AuthAPI', () => {
  describe('accounts', () => {
    it('account exists', async () => {
      const acct = await auth.accountInfo(
        'terra1fa0trn2nqjc2n6mmz9txta7ky5h5nnp9m6cra3'
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
