import { BaseAPI } from './BaseAPI';
import { Coin, Denom, Dec, Coins, PolicyConstraints } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';

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
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the current registered Tax caps for all denomination
   * @returns Coin[]
   */
  public async taxCaps(params: APIParams = {}): Promise<Coins> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ tax_caps: { denom: string; tax_cap: string }[] }>(
        `/terra/treasury/v1beta1/tax_caps`,
        params
      )
      .then(d => new Coins(d.tax_caps.map(c => new Coin(c.denom, c.tax_cap))));
  }

  /**
   * Gets the current registered Tax Cap for a specified denomination.
   * @param denom denomination desired for Tax Cap query.
   */
  public async taxCap(denom: Denom, params: APIParams = {}): Promise<Coin> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ tax_cap: string }>(
        `/terra/treasury/v1beta1/tax_caps/${denom}`,
        params
      )
      .then(d => new Coin(denom, d.tax_cap));
  }

  /**
   * Gets the current registered Tax Rate.
   */
  public async taxRate(height?: number, _params: APIParams = {}): Promise<Dec> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    const params = { ..._params };

    if (height) {
      params.height = height;
    }

    return this.c
      .get<{ tax_rate: string }>(`/terra/treasury/v1beta1/tax_rate`, params)
      .then(d => new Dec(d.tax_rate));
  }

  /**
   * Gets the current registered Reward Weight monetary policy lever.
   */
  public async rewardWeight(params: APIParams = {}): Promise<Dec> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ reward_weight: string }>(
        `/terra/treasury/v1beta1/reward_weight`,
        params
      )
      .then(d => new Dec(d.reward_weight));
  }

  /**
   * Gets the tax proceeds for the epoch.
   */
  public async taxProceeds(params: APIParams = {}): Promise<Coins> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ tax_proceeds: Coins.Data }>(
        `/terra/treasury/v1beta1/tax_proceeds`,
        params
      )
      .then(d => Coins.fromData(d.tax_proceeds));
  }

  /**
   * Gets the seigniorage proceeds for the epoch.
   */
  public async seigniorageProceeds(params: APIParams = {}): Promise<Coin> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ seigniorage_proceeds: string }>(
        `/terra/treasury/v1beta1/seigniorage_proceeds`,
        params
      )
      .then(d => new Coin('uluna', d.seigniorage_proceeds));
  }

  /**
   * Gets the current Treasury module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<TreasuryParams> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ params: TreasuryParams.Data }>(
        `/terra/treasury/v1beta1/params`,
        params
      )
      .then(({ params: d }) => ({
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
