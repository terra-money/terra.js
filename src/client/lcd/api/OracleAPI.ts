import { BaseAPI } from './BaseAPI';
import {
  ValAddress,
  Denom,
  Coin,
  Coins,
  AccAddress,
  Dec,
  AggregateExchangeRatePrevote,
  AggregateExchangeRateVote,
} from '../../../core';

import { APIParams } from '../APIRequester';

export interface OracleParams {
  /** Number of blocks that define the period over which new votes must be submitted for the exchange rate of LUNA. */
  vote_period: number;

  /** Ratio of voting power that must be reached for a denomination to be considered "active." */
  vote_threshold: Dec;

  /** The ratio of the band around the weighted median of the voted exchange rates whose voters are eligible for rewards. Votes that reported exchange rates that lie beyond this band are considered misses. */
  reward_band: Dec;

  /** Number of blocks that define the period over which oracle rewards from non-missed Oracle votes accrue. They are disbursed at the end of these periods. */
  reward_distribution_window: number;

  /** List of active denominations that must be voted on.
   * @returns { name: String, tobin_tax: String }[] on Columbus-4 or later
   */
  whitelist: OracleWhitelist[];

  /** Percetange of stake slashed once per slash window. */
  slash_fraction: Dec;

  /** Number of blocks that define the period over which slashing penalties for missing votes are incurred. */
  slash_window: number;

  /** Minimum percentage of valid (non-miss) exchange rate votes per slash window. */
  min_valid_per_window: Dec;
}

export namespace OracleParams {
  export interface Data {
    vote_period: string;
    vote_threshold: string;
    reward_band: string;
    reward_distribution_window: string;
    whitelist: OracleWhitelist.Data[];
    slash_fraction: string;
    slash_window: string;
    min_valid_per_window: string;
  }
}

export interface OracleWhitelist {
  name: string;
  tobin_tax: Dec;
}

export namespace OracleWhitelist {
  export interface Data {
    name: string;
    tobin_tax: string;
  }
}

export class OracleAPI extends BaseAPI {
  /**
   * Gets the Oracle module's currently registered exchange rate for LUNA in all available denominations.
   */
  public async exchangeRates(params: APIParams = {}): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/oracle/denoms/exchange_rates`, params)
      .then(d => {
        if (d?.result) {
          return Coins.fromData(d.result);
        } else {
          return new Coins({});
        }
      });
  }

  /**
   * Gets the Oracle module's currently registered exchange rate for the specific denomination.
   * @param denom denomination in which to get the exchange rate of LUNA
   */
  public async exchangeRate(denom: Denom): Promise<Coin | undefined> {
    const rates = await this.exchangeRates();
    return rates.get(denom);
  }

  /**
   * Gets the current list of active denominations.
   */
  public async activeDenoms(params: APIParams = {}): Promise<Denom[]> {
    return this.c
      .get<Denom[]>(`/oracle/denoms/actives`, params)
      .then(d => d.result);
  }

  /**
   * Gets the registered feeder address associated with the validator. The feeder address is the
   * Terra account that is permitted to sign Oracle vote messages in the validator's name.
   * @param validator validator's operator address
   */
  public async feederAddress(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<AccAddress> {
    return this.c
      .get<AccAddress>(`/oracle/voters/${validator}/feeder`, params)
      .then(d => d.result);
  }

  /**
   * Gets the number of missed oracle votes for the validator over the current slash window.
   * @param validator validator's operator address
   */
  public async misses(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<number> {
    return this.c
      .get<string>(`/oracle/voters/${validator}/miss`, params)
      .then(d => Number.parseInt(d.result));
  }

  /**
   * Gets the validator's current submitted aggregate prevote
   * @param validator validator's operator address
   */
  public async aggregatePrevote(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<AggregateExchangeRatePrevote> {
    return this.c
      .get<AggregateExchangeRatePrevote.Data>(
        `/oracle/voters/${validator}/aggregate_prevote`,
        params
      )
      .then(d => AggregateExchangeRatePrevote.fromData(d.result));
  }

  /**
   * Gets the validator's current submitted aggregate vote
   * @param validator validator's operator address
   */
  public async aggregateVote(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<AggregateExchangeRateVote> {
    return this.c
      .get<AggregateExchangeRateVote.Data>(
        `/oracle/voters/${validator}/aggregate_vote`,
        params
      )
      .then(d => AggregateExchangeRateVote.fromData(d.result));
  }

  /**
   * Gets the current Oracle module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<OracleParams> {
    return this.c
      .get<OracleParams.Data>(`/oracle/parameters`, params)
      .then(({ result: d }) => ({
        vote_period: Number.parseInt(d.vote_period),
        vote_threshold: new Dec(d.vote_threshold),
        reward_band: new Dec(d.reward_band),
        reward_distribution_window: Number.parseInt(
          d.reward_distribution_window
        ),
        whitelist: d.whitelist.map(x => ({
          name: x.name,
          tobin_tax: new Dec(x.tobin_tax),
        })),
        slash_fraction: new Dec(d.slash_fraction),
        slash_window: Number.parseInt(d.slash_window),
        min_valid_per_window: new Dec(d.min_valid_per_window),
      }));
  }
}
