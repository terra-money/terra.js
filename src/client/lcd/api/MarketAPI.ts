import { Coin, Dec, Numeric, Denom } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';

export interface MarketParams {
  /** Number of blocks it takes for the Terra & Luna pools to naturally "reset" towards
   * equilibrium through automated pool replenishing.
   */
  pool_recovery_period: number;

  /** Initial starting size of both Luna and Terra mint liquidity pools. */
  base_pool: Dec;

  /** Minimum spread charged on Terra<>Luna swaps to prevent leaking value from front-running attacks. */
  min_stability_spread: Dec;
}

export namespace MarketParams {
  export interface Data {
    pool_recovery_period: string;
    base_pool: string;
    min_stability_spread: string;
  }
}

export class MarketAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the Market's swap rate for a given coin to a requested denomination.
   * @param offerCoin coin to convert
   * @param askDenom denomination to swap into
   */
  public async swapRate(
    offerCoin: Coin,
    askDenom: Denom,
    _params: APIParams = {}
  ): Promise<Coin> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    const params = {
      ..._params,
      offer_coin: offerCoin.toString(),
      ask_denom: askDenom,
    };

    return this.c
      .get<{ return_coin: Coin.Data }>(`/terra/market/v1beta1/swap`, params)
      .then(d => Coin.fromData(d.return_coin));
  }

  /**
   * Gets current value of the pool delta, which is used to determine Terra<>Luna swap rates.
   */
  public async poolDelta(params: APIParams = {}): Promise<Dec> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ terra_pool_delta: Numeric.Input }>(
        `/terra/market/v1beta1/terra_pool_delta`,
        params
      )
      .then(d => new Dec(d.terra_pool_delta));
  }

  /**
   * Gets the current Market module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<MarketParams> {
    if (!this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ params: MarketParams.Data }>(
        `/terra/market/v1beta1/params`,
        params
      )
      .then(({ params: d }) => ({
        pool_recovery_period: Number.parseInt(d.pool_recovery_period),
        base_pool: new Dec(d.base_pool),
        min_stability_spread: new Dec(d.min_stability_spread),
      }));
  }
}
