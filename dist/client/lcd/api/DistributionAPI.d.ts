import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress, Dec, ValAddress } from '../../../core';
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
/**
 * Holds the response of validator rewards query
 */
export interface ValidatorRewards {
    /** Rewards that are from a validator's self-delegation.  */
    self_bond_rewards: Coins;
    /** Rewards that are from a validator's commission, from delegators.  */
    val_commission: Coins;
}
export declare namespace ValidatorRewards {
    interface Data {
        self_bond_rewards: Coins.Data;
        val_commission: Coins.Data;
    }
}
export declare class DistributionAPI extends BaseAPI {
    /**
     * Gets a delegator's rewards.
     * @param delegator delegator's account address
     */
    rewards(delegator: AccAddress): Promise<Rewards>;
    /**
     * Gets a validator's rewards.
     * @param validator validator's operator address
     */
    validatorRewards(validator: ValAddress): Promise<ValidatorRewards>;
    /**
     * Gets the withdraw address of a delegator, the address to which rewards are withdrawn.
     * @param delegator
     */
    withdrawAddress(delegator: AccAddress): Promise<AccAddress>;
    /**
     * Gets the current value of the community pool.
     */
    communityPool(): Promise<Coins>;
    /**
     * Gets the current distribution parameters.
     */
    parameters(): Promise<DistributionParams>;
}
