import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress, Dec, ValAddress } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export interface DistributionParams {
    /**
     * Community tax rate.
     */
    community_tax: Dec;
    /**
     * Base reward for proposer of block.
     */
    base_proposer_reward: Dec;
    /**
     * Bonus reward for proposer of block.
     */
    bonus_proposer_reward: Dec;
    /**
     * Whether withdrawals are currently enabled.
     */
    withdraw_addr_enabled: boolean;
}
export declare namespace DistributionParams {
    interface Data {
        community_tax: string;
        base_proposer_reward: string;
        bonus_proposer_reward: string;
        withdraw_addr_enabled: boolean;
    }
}
/**
 * Holds the resonse of delegator rewards query
 */
export interface Rewards {
    /**
     * An object that maps validator addresses to corresponding rewards earned with that validator
     */
    rewards: {
        [validator: string]: Coins;
    };
    /**
     * Total cumulative rewards across delegations with all validators
     */
    total: Coins;
}
export declare namespace Rewards {
    interface Data {
        rewards: {
            validator_address: ValAddress;
            reward: Coins.Data;
        }[];
        total: Coins.Data;
    }
}
export declare class DistributionAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Gets a delegator's rewards.
     * @param delegator delegator's account address
     */
    rewards(delegator: AccAddress, params?: APIParams): Promise<Rewards>;
    /**
     * Gets a validator's rewards.
     * @param validator validator's operator address
     */
    validatorCommission(validator: ValAddress, params?: APIParams): Promise<Coins>;
    /**
     * Gets the withdraw address of a delegator, the address to which rewards are withdrawn.
     * @param delegator
     */
    withdrawAddress(delegator: AccAddress, params?: APIParams): Promise<AccAddress>;
    /**
     * Gets the current value of the community pool.
     */
    communityPool(params?: APIParams): Promise<Coins>;
    /**
     * Gets the current distribution parameters.
     */
    parameters(params?: APIParams): Promise<DistributionParams>;
}
