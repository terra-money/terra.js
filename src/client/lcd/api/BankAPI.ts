import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress } from '../../../core';

export class BankAPI extends BaseAPI {
  /**
   * Look up the balance of an account by its address.
   * @param address address of account to look up.
   */
  public async balance(address: AccAddress): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/bank/balances/${address}`)
      .then(d => Coins.fromData(d.result));
  }
}
