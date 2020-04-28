import { AccAddress, Account, LazyGradedVestingAccount } from '../../../core';
import { BaseAPI } from './BaseAPI';

export class AuthAPI extends BaseAPI {
  /**
   * Looks up the account information using its Terra account address. If the account has
   * vesting, it will be a [[LazyGradedVestingAccount]].
   *
   * @param address address of account to look up
   */
  public async accountInfo(
    address: AccAddress
  ): Promise<Account | LazyGradedVestingAccount> {
    const { result } = await this.c.get<
      Account.Data | LazyGradedVestingAccount.Data
    >(`/auth/accounts/${address}`);
    if (result.type === 'core/Account') {
      return Account.fromData(result);
    } else {
      return LazyGradedVestingAccount.fromData(result);
    }
  }
}
