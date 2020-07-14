import { BaseAPI } from './BaseAPI';
import {
  ValAddress,
  Denom,
  ExchangeRateVote,
  Coin,
  Coins,
  ExchangeRatePrevote,
  AccAddress,
  Dec,
  AggregateExchangeRatePrevote,
  AggregateExchangeRateVote,
} from '../../../core';

export interface OracleParams {
  /** Number of blocks that define the period over which new votes must be submitted for the exchange rate of LUNA. */
  vote_period: number;

  /** Ratio of voting power that must be reached for a denomination to be considered "active." */
  vote_threshold: Dec;

  /** The ratio of the band around the weighted median of the voted exchange rates whose voters are eligible for rewards. Votes that reported exchange rates that lie beyond this band are considered misses. */
  reward_band: Dec;

  /** Number of blocks that define the period over which oracle rewards from non-missed Oracle votes accrue. They are disbursed at the end of these periods. */
  reward_distribution_window: number;

  /** List of active denominations that must be voted on. */
  whitelist: Denom[];

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
    whitelist: Denom[];
    slash_fraction: string;
    slash_window: string;
    min_valid_per_window: string;
  }
}

export class OracleAPI extends BaseAPI {
  /**
   * Query the currently casted votes for the exchange rate of LUNA, filterable by validator or denom.
   *
   * At least one of the parameters **must** be provided.
   * @param denom denomination to query votes for
   * @param validator validator operator address to query votes for
   */
  public async votes(
    denom?: Denom,
    validator?: ValAddress
  ): Promise<ExchangeRateVote[]> {
    if (validator !== undefined && denom !== undefined) {
      const vote = await this.c.get<ExchangeRateVote.Data>(
        `/oracle/denoms/${denom}/votes/${validator}`
      );
      return [ExchangeRateVote.fromData(vote.result)];
    } else if (validator !== undefined) {
      const votes = await this.c.get<ExchangeRateVote.Data[]>(
        `/oracle/voters/${validator}/votes`
      );
      return votes.result.map(ExchangeRateVote.fromData);
    } else if (denom !== undefined) {
      const votes = await this.c.get<ExchangeRateVote.Data[]>(
        `/oracle/denoms/${denom}/votes`
      );
      return votes.result.map(ExchangeRateVote.fromData);
    } else {
      throw new Error('both denom and validator cannot both be undefined');
    }
  }

  /**
   * Query the currently casted vprevotes, filterable by validator or denom.
   *
   * At least one of the parameters **must** be provided.
   * @param denom denomination to query prevotes for
   * @param validator validator operator address to query prevotes for
   */
  public async prevotes(
    denom?: Denom,
    validator?: ValAddress
  ): Promise<ExchangeRatePrevote[]> {
    if (validator !== undefined && denom !== undefined) {
      const prevote = await this.c.get<ExchangeRatePrevote.Data>(
        `/oracle/denoms/${denom}/prevotes/${validator}`
      );
      return [ExchangeRatePrevote.fromData(prevote.result)];
    } else if (validator !== undefined) {
      const prevotes = await this.c.get<ExchangeRatePrevote.Data[]>(
        `/oracle/voters/${validator}/prevotes`
      );
      return prevotes.result.map(ExchangeRatePrevote.fromData);
    } else if (denom !== undefined) {
      const prevotes = await this.c.get<ExchangeRatePrevote.Data[]>(
        `/oracle/denoms/${denom}/prevotes`
      );
      return prevotes.result.map(ExchangeRatePrevote.fromData);
    } else {
      throw new Error('both denom and validator cannot both be undefined');
    }
  }

  /**
   * Gets the Oracle module's currently registered exchange rate for LUNA in all available denominations.
   */
  public async exchangeRates(): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/oracle/denoms/exchange_rates`)
      .then(d => Coins.fromData(d.result));
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
  public async activeDenoms(): Promise<Denom[]> {
    return this.c.get<Denom[]>(`/oracle/denoms/actives`).then(d => d.result);
  }

  /**
   * Gets the registered feeder address associated with the validator. The feeder address is the
   * Terra account that is permitted to sign Oracle vote messages in the validator's name.
   * @param validator validator's operator address
   */
  public async feederAddress(validator: ValAddress): Promise<AccAddress> {
    return this.c
      .get<AccAddress>(`/oracle/voters/${validator}/feeder`)
      .then(d => d.result);
  }

  /**
   * Gets the number of missed oracle votes for the validator over the current slash window.
   * @param validator validator's operator address
   */
  public async misses(validator: ValAddress): Promise<number> {
    return this.c
      .get<string>(`/oracle/voters/${validator}/miss`)
      .then(d => Number.parseInt(d.result));
  }

  /**
   * Gets the validator's current submitted aggregate prevote
   * @param validator validator's operator address
   */
  public async aggregatePrevote(
    validator: ValAddress
  ): Promise<AggregateExchangeRatePrevote> {
    return this.c
      .get<AggregateExchangeRatePrevote.Data>(
        `/oracle/voters/${validator}/aggregate_prevote`
      )
      .then(d => AggregateExchangeRatePrevote.fromData(d.result));
  }

  /**
   * Gets the validator's current submitted aggregate vote
   * @param validator validator's operator address
   */
  public async aggregateVote(
    validator: ValAddress
  ): Promise<AggregateExchangeRateVote> {
    return this.c
      .get<AggregateExchangeRateVote.Data>(
        `/oracle/voters/${validator}/aggregate_vote`
      )
      .then(d => AggregateExchangeRateVote.fromData(d.result));
  }

  /**
   * Gets the current Oracle module's parameters.
   */
  public async parameters(): Promise<OracleParams> {
    return this.c
      .get<OracleParams.Data>(`/oracle/parameters`)
      .then(d => d.result)
      .then(d => ({
        vote_period: Number.parseInt(d.vote_period),
        vote_threshold: new Dec(d.vote_threshold),
        reward_band: new Dec(d.reward_band),
        reward_distribution_window: Number.parseInt(
          d.reward_distribution_window
        ),
        whitelist: d.whitelist,
        slash_fraction: new Dec(d.slash_fraction),
        slash_window: Number.parseInt(d.slash_window),
        min_valid_per_window: new Dec(d.min_valid_per_window),
      }));
  }
}
