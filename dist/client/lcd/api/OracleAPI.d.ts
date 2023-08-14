import { BaseAPI } from './BaseAPI';
import { ValAddress, Denom, Coin, Coins, AccAddress, Dec, AggregateExchangeRatePrevote, AggregateExchangeRateVote } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export interface OracleWhitelist {
    name: string;
    tobin_tax: Dec;
}
export declare namespace OracleWhitelist {
    interface Data {
        name: string;
        tobin_tax: string;
    }
}
export interface OracleParams {
    /** Number of blocks that define the period over which new votes must be submitted for the exchange rate of uluna. */
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
export declare namespace OracleParams {
    interface Data {
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
export declare namespace OracleWhitelist {
    interface Data {
        name: string;
        tobin_tax: string;
    }
}
export declare class OracleAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Gets the Oracle module's currently registered exchange rate for uluna in all available denominations.
     */
    exchangeRates(params?: APIParams): Promise<Coins>;
    /**
     * Gets the Oracle module's currently registered exchange rate for the specific denomination.
     * @param denom denomination in which to get the exchange rate of uluna
     */
    exchangeRate(denom: Denom, params?: APIParams): Promise<Coin | undefined>;
    /**
     * Gets the current list of active denominations.
     */
    activeDenoms(params?: APIParams): Promise<Denom[]>;
    /**
     * Gets the registered feeder address associated with the validator. The feeder address is the
     * Terra account that is permitted to sign Oracle vote messages in the validator's name.
     * @param validator validator's operator address
     */
    feederAddress(validator: ValAddress, params?: APIParams): Promise<AccAddress>;
    /**
     * Gets the number of missed oracle votes for the validator over the current slash window.
     * @param validator validator's operator address
     */
    misses(validator: ValAddress, params?: APIParams): Promise<number>;
    /**
     * Gets the validator's current submitted aggregate prevote
     * @param validator validator's operator address
     */
    aggregatePrevote(validator: ValAddress, params?: APIParams): Promise<AggregateExchangeRatePrevote>;
    /**
     * Gets the validator's current submitted aggregate vote
     * @param validator validator's operator address
     */
    aggregateVote(validator: ValAddress, params?: APIParams): Promise<AggregateExchangeRateVote>;
    /**
     * Gets the current Oracle module's parameters.
     */
    parameters(params?: APIParams): Promise<OracleParams>;
}
