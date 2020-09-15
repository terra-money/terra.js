import { Dec, Numeric, Denom } from '../../../core';
import { BaseAPI } from './BaseAPI';

export interface MintingParams {
  mint_denom: Denom;
  inflation_rate_change: Dec;
  inflation_max: Dec;
  inflation_min: Dec;
  goal_bonded: Dec;
  blocks_per_year: number;
}

export namespace MintingParams {
  export interface Data {
    mint_denom: string;
    inflation_rate_change: string;
    inflation_max: string;
    inflation_min: string;
    goal_bonded: string;
    blocks_per_year: string;
  }
}

export class MintAPI extends BaseAPI {
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
  public async parameters(): Promise<MintingParams> {
    return this.c
      .get<MintingParams.Data>(`/minting/parameters`)
      .then(({ result: d }) => ({
        mint_denom: d.mint_denom,
        inflation_rate_change: new Dec(d.inflation_rate_change),
        inflation_max: new Dec(d.inflation_max),
        inflation_min: new Dec(d.inflation_min),
        goal_bonded: new Dec(d.goal_bonded),
        blocks_per_year: Number.parseInt(d.blocks_per_year),
      }));
  }
}
