import { Coin, Dec, Denom } from '../../../core';
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
export declare namespace MarketParams {
    interface Data {
        pool_recovery_period: string;
        base_pool: string;
        min_stability_spread: string;
    }
}
export declare class MarketAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Gets the Market's swap rate for a given coin to a requested denomination.
     * @param offerCoin coin to convert
     * @param askDenom denomination to swap into
     */
    swapRate(offerCoin: Coin, askDenom: Denom, _params?: APIParams): Promise<Coin>;
    /**
     * Gets current value of the pool delta, which is used to determine Terra<>Luna swap rates.
     */
    poolDelta(params?: APIParams): Promise<Dec>;
    /**
     * Gets the current Market module's parameters.
     */
    parameters(params?: APIParams): Promise<MarketParams>;
}
