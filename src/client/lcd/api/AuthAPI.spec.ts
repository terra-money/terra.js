import { AuthAPI } from './AuthAPI';
import { BaseAccount } from '../../../core';
import { MnemonicKey } from '../../../key';
import { LCDClient } from '../LCDClient';

// TODO - restore to https://lcd.terra.dev
const terra = new LCDClient({
  chainID: 'pisco-1',
  URL: 'https://pisco-lcd.terra.dev',
});
const auth = new AuthAPI(terra);

describe('AuthAPI', () => {
  describe('accounts', () => {
    it('account exists', async () => {
      const acct = await auth.accountInfo(
        'terra1h8ljdmae7lx05kjj79c9ekscwsyjd3yr8wyvdn'
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

  describe('parameters', () => {
    it('parameters', async () => {
      const param = await auth.parameters();

      expect(param.max_memo_characters).toBeGreaterThanOrEqual(0);
      expect(param.tx_sig_limit).toBeGreaterThanOrEqual(0);
      expect(param.tx_size_cost_per_byte).toBeGreaterThanOrEqual(0);
      expect(param.sig_verify_cost_ed25519).toBeGreaterThanOrEqual(0);
      expect(param.sig_verify_cost_secp256k1).toBeGreaterThanOrEqual(0);
    });
  });
});
