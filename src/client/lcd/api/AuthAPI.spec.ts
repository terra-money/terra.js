import { APIRequester } from '../APIRequester';
import { AuthAPI } from './AuthAPI';
import { Account, LazyGradedVestingAccount } from '../../../core';
import { MnemonicKey } from '../../../key';

const c = new APIRequester('https://lcd.terra.dev/');
const auth = new AuthAPI(c);

describe('AuthAPI', () => {
  describe('accounts', () => {
    it('account exists', async () => {
      const acct = await auth.accountInfo(
        'terra1ax7xtll5v6u6vdnymxa4k4648w80zhkggl0u24'
      );

      expect(acct instanceof Account).toBe(true);
    });

    it('LazyGradedVestingAccount', async () => {
      const acct = await auth.accountInfo(
        'terra1upg95nlwkfkrq4hhjrn3k9s6ud0aqx36gwnlsn'
      );

      expect(acct instanceof LazyGradedVestingAccount).toBe(true);
    });

    it('invalid account', async () => {
      await expect(auth.accountInfo('1234')).rejects.toThrow();
    });

    it("account doesn't exist (valid but new account)", async () => {
      const mk = new MnemonicKey();
      const acct = await auth.accountInfo(mk.accAddress);
      expect((<Account>acct).address).toBe('');
    });
  });
});
