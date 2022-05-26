import {
  AccAddress,
  Account,
  LazyGradedVestingAccount,
  DelayedVestingAccount,
  PeriodicVestingAccount,
  ContinuousVestingAccount,
  BaseAccount,
} from '../../../core';
import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class AuthAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }
  /**
   * Looks up the account information using its Terra account address. If the account has
   * vesting, it will be one of [LazyGradedVestingAccount, DelayedVestingAccount, PeriodicVestingAccount, ContinuousVestingAccount]
   *
   * @param address address of account to look up
   */
  public async accountInfo(
    address: AccAddress,
    params: APIParams = {}
  ): Promise<Account> {
    const { account } = await this.c.get<{
      account:
        | BaseAccount.Data
        | LazyGradedVestingAccount.Data
        | DelayedVestingAccount.Data
        | PeriodicVestingAccount.Data
        | ContinuousVestingAccount.Data;
    }>(`/cosmos/auth/v1beta1/accounts/${address}`, params);
    return Account.fromData(account, this.lcd.config.isClassic);
  }
}
