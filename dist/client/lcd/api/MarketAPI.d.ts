import { Coin, Dec, Denom } from '../../../core';
import { BaseAPI } from './BaseAPI';
export interface MarketParams {
    /** Number of blocks it takes for the Terra & Luna pools to naturally "reset" towards
     * equilibrium through automated pool replenishing.
     */
    pool_recovery_period: number;
    /** Initial starting size of both Terra and Luna liquidity pools. */
    base_pool: Dec;
    /** Minimum spread charged on Terra<>Luna swaps to prevent leaking value from front-running attacks. */
    min_spread: Dec;
}
export declare namespace MarketParams {
    interface Data {
        pool_recovery_period: string;
        base_pool: string;
        min_spread: string;
    }
}
export declare class MarketAPI extends BaseAPI {
    /**
     * Gets the Market's swap rate for a given coin to a requested denomination.
     * @param offerCoin coin to convert
     * @param askDenom denomination to swap into
     */
    swapRate(offerCoin: Coin, askDenom: Denom): Promise<Coin>;
    /**
     * Gets current value of the pool delta, which is used to determine Terra<>Luna swap rates.
     */
    terraPoolDelta(): Promise<Dec>;
    /**
     * Gets the current Market module's parameters.
     */
    parameters(): Promise<MarketParams>;
}
