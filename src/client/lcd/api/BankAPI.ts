import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress } from '../../../core';
import { APIParams } from '../APIRequester';

export class BankAPI extends BaseAPI {
  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   */
  public async balance(
    address: AccAddress,
    params: APIParams = {}
  ): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/bank/balances/${address}`, params)
      .then(d => Coins.fromData(d.result));
  }

  /**
   * Get the total supply of tokens in circulation for all denominations.
   */
  public async total(): Promise<Coins> {
    return this.c
      .get<{ supply: Coins.Data }>(`/bank/total`)
      .then(d => Coins.fromData(d.result.supply));
  }
}
