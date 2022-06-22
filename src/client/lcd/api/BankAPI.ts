import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class BankAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   */
  public async balance(
    address: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.c
      .get<{
        balances: Coins.Data;
        pagination: Pagination;
      }>(`/cosmos/bank/v1beta1/balances/${address}`, params)
      .then(d => [Coins.fromData(d.balances), d.pagination]);
  }

  /**
   * Get the total supply of tokens in circulation for all denominations.
   */
  public async total(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    return this.c
      .get<{ supply: Coins.Data; pagination: Pagination }>(
        `/cosmos/bank/v1beta1/supply`,
        params
      )
      .then(d => [Coins.fromData(d.supply), d.pagination]);
  }

  /**
   * Lqueries the spenable balance of all coins for a single account.
   * @param address address of account to look up.
   */
  public async spendableBalances(
    address: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Coins, Pagination]> {
    let basePath = '/cosmos/bank/v1beta1/';
    basePath += this.lcd.config.isClassic ? 'balances' : 'spendable_balances';
    return this.c
      .get<{
        balances: Coins.Data;
        pagination: Pagination;
      }>(`${basePath}/${address}`, params)
      .then(d => [Coins.fromData(d.balances), d.pagination]);
    }
}
