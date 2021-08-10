import { Coins } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';

export class SupplyAPI extends BaseAPI {
  /**
   * Get the total supply of tokens in circulation for all denominations.
   */
  public async total(params: APIParams = {}): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/supply/total`, params)
      .then(d => Coins.fromData(d.result));
  }
}
