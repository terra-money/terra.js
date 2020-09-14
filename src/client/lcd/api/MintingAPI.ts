import { Dec, Numeric } from '../../../core';
import { BaseAPI } from './BaseAPI';

export namespace MintingParams {
  export interface Data {
    mint_denom: string;
    inflation_rate_change: string;
    inflation_max: string;
    inflation_min: string;
    goal_bonded: string;
    blocks_per_year: number;
  }
}

export class MintingAPI extends BaseAPI {
  /**
   * Gets the current minting inflation value
   */
  public async inflation(): Promise<Dec> {
    return this.c
      .get<Numeric.Input>(`/minting/inflation`)
      .then(d => new Dec(d.result));
  }

  /**
   * Gets the current minting annaul provisions value
   */
  public async annualProvisions(): Promise<Dec> {
    return this.c
      .get<Numeric.Input>(`minting/annual-provisions`)
      .then(d => new Dec(d.result));
  }

  /**
   * Gets the current minting module's parameters.
   */
  public async parameters(): Promise<MintingParams.Data> {
    return this.c
      .get<MintingParams.Data>(`/market/parameters`)
      .then(({ result }) => result);
  }
}
