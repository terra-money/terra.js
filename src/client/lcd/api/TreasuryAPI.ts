import { BaseAPI } from './BaseAPI';
import { Coin, Denom, Dec, Coins, PolicyConstraints } from '../../../core';
import { APIParams } from '../APIRequester';

export interface TreasuryParams {
  /**
   * Current Tax Policy which governs how Tax Rate can be changed.
   */
  tax_policy: PolicyConstraints;

  /**
   * Current Reward Policy which governs how Reward Weight can be changed.
   */
  reward_policy: PolicyConstraints;

  /**
   * Factor that determines reward weight.
   */
  seigniorage_burden_target: Dec;

  /**
   * Factor that determines reward weight.
   */
  mining_increment: Dec;

  /**
   * Number of epochs defining a short window.
   */
  window_short: number;

  /**
   * Number of epochs defining a long window.
   */
  window_long: number;

  /**
   * Number of epochs defining the probationary period after genesis, during which monetary policy levers Tax Rate and Reward Weight do not change.
   */
  window_probation: number;
}

export namespace TreasuryParams {
  export interface Data {
    tax_policy: PolicyConstraints.Data;
    reward_policy: PolicyConstraints.Data;
    seigniorage_burden_target: string;
    mining_increment: string;
    window_short: string;
    window_long: string;
    window_probation: string;
  }
}
export class TreasuryAPI extends BaseAPI {
  /**
   * Gets the current registered Tax Cap for a specified denomation.
   * @param denom denomination desired for Tax Cap query.
   */
  public async taxCap(denom: Denom, params: APIParams = {}): Promise<Coin> {
    return this.c
      .get<string>(`/treasury/tax_cap/${denom}`, params)
      .then(d => new Coin(denom, d.result));
  }

  /**
   * Gets the current registered Tax Rate.
   */
  public async taxRate(height?: number, _params: APIParams = {}): Promise<Dec> {
    const params = { ..._params };

    if (height) {
      params.height = height;
    }

    return this.c
      .get<string>(`/treasury/tax_rate`, params)
      .then(d => new Dec(d.result));
  }

  /**
   * Gets the current registered Reward Weight monetary policy lever.
   */
  public async rewardWeight(params: APIParams = {}): Promise<Dec> {
    return this.c
      .get<string>(`/treasury/reward_weight`, params)
      .then(d => new Dec(d.result));
  }

  /**
   * Gets the tax proceeds for the epoch.
   */
  public async taxProceeds(params: APIParams = {}): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/treasury/tax_proceeds`, params)
      .then(d => Coins.fromData(d.result));
  }

  /**
   * Gets the seigniorage proceeds for the epoch.
   */
  public async seigniorageProceeds(params: APIParams = {}): Promise<Coin> {
    return this.c
      .get<string>(`/treasury/seigniorage_proceeds`, params)
      .then(d => new Coin(Denom.LUNA, d.result));
  }

  /**
   * Gets the current Treasury module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<TreasuryParams> {
    return this.c
      .get<TreasuryParams.Data>(`/treasury/parameters`, params)
      .then(({ result: d }) => ({
        tax_policy: PolicyConstraints.fromData(d.tax_policy),
        reward_policy: PolicyConstraints.fromData(d.reward_policy),
        mining_increment: new Dec(d.mining_increment),
        seigniorage_burden_target: new Dec(d.seigniorage_burden_target),
        window_long: Number.parseInt(d.window_long),
        window_short: Number.parseInt(d.window_short),
        window_probation: Number.parseInt(d.window_probation),
      }));
  }
}
