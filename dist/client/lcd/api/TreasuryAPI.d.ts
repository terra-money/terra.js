import { BaseAPI } from './BaseAPI';
import { Coin, Denom, Dec, Coins, PolicyConstraints } from '../../../core';
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
export declare namespace TreasuryParams {
    interface Data {
        tax_policy: PolicyConstraints.Data;
        reward_policy: PolicyConstraints.Data;
        seigniorage_burden_target: string;
        mining_increment: string;
        window_short: string;
        window_long: string;
        window_probation: string;
    }
}
export declare class TreasuryAPI extends BaseAPI {
    /**
     * Gets the current registered Tax Cap for a specified denomation.
     * @param denom denomination desired for Tax Cap query.
     */
    taxCap(denom: Denom): Promise<Coin>;
    /**
     * Gets the current registered Tax Rate.
     */
    taxRate(height?: number): Promise<Dec>;
    /**
     * Gets the current registered Reward Weight monetary policy lever.
     */
    rewardWeight(): Promise<Dec>;
    /**
     * Gets the tax proceeds for the epoch.
     */
    taxProceeds(): Promise<Coins>;
    /**
     * Gets the seigniorage proceeds for the epoch.
     */
    seigniorageProceeds(): Promise<Coin>;
    /**
     * Gets the current Treasury module's parameters.
     */
    parameters(): Promise<TreasuryParams>;
}
