import { Coins } from '../../../core';
import { BaseAPI } from './BaseAPI';

export interface SupplyResponse {
  supply: Coins;
}

export namespace SupplyResponse {
  export interface Data {
    supply: Coins.Data;
  }
}

export class SupplyAPI extends BaseAPI {
  /**
   * Get the total supply of tokens in circulation for all denominations.
   */
  public async total(): Promise<Coins> {
    return this.c
      .get<SupplyResponse.Data>(`/bank/total`)
      .then(d => Coins.fromData(d.result.supply));
  }
}
