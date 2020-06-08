import { Coins } from '../../../core';
import { BaseAPI } from './BaseAPI';

export class SupplyAPI extends BaseAPI {
  /**
   * Get the total supply of tokens in circulation for all denominations.
   */
  public async total(): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/supply/total`)
      .then(d => Coins.fromData(d.result));
  }
}
