import { AccAddress, ValAddress, UnbondingDelegation, Coin } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { Delegation } from '../../../core/staking/Delegation';
import { Validator } from '../../../core/staking/Validator';
import { Redelegation } from '../../../core/staking/Redelegation';
import { Denom } from '../../../core/Denom';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export interface StakingParams {
    /** Amount of time, in seconds, for bonded staking tokens to be unbonded. */
    unbonding_time: number;
    /** Max number of validators for the validating set (delegates). */
    max_validators: number;
    /** Maximum entries for unbonding delegations and redelegations. */
    max_entries: number;
    historical_entries: number;
    /** The denomination used as the staking token (probably Luna). */
    bond_denom: Denom;
}
export declare namespace StakingParams {
    interface Data {
        unbonding_time: string;
        max_validators: number;
        max_entries: number;
        historical_entries: number;
        bond_denom: Denom;
    }
}
export interface StakingPool {
    /** amount of tokens are bonded, including those that are currently unbonding */
    bonded_tokens: Coin;
    /** amount of tokens that are not bonded */
    not_bonded_tokens: Coin;
}
export declare namespace StakingPool {
    interface Data {
        bonded_tokens: string;
        not_bonded_tokens: string;
    }
}
export declare class StakingAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Queries all delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    delegations(delegator?: AccAddress, validator?: ValAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[Delegation[], Pagination]>;
    /**
     * Gets the delegation between a delegator and validator, if it exists.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    delegation(delegator: AccAddress, validator: ValAddress): Promise<Delegation>;
    /**
     * Queries all unbonding delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    unbondingDelegations(delegator?: AccAddress, validator?: ValAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[UnbondingDelegation[], Pagination]>;
    /**
     * Gets the unbonding delegation between a delegator and validator, if it exists.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    unbondingDelegation(delegator?: AccAddress, validator?: ValAddress): Promise<UnbondingDelegation>;
    /**
     * Queries all redelegations, filterable by delegator, source validator, and target validator.
     * @param delegator delegator's account address
     * @param validatorSrc source validator's operator address (from).
     * @param validatorDst destination validator's operator address (to).
     */
    redelegations(delegator: AccAddress, validatorSrc?: ValAddress, validatorDst?: ValAddress, _params?: Partial<PaginationOptions & APIParams>): Promise<[Redelegation[], Pagination]>;
    /**
     * Gets all bonded validators for a delegator given its address.
     * @param delegator delegator's account address
     */
    bondedValidators(delegator: AccAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[Validator[], Pagination]>;
    /**
     * Get all current registered validators, including validators that are not currently in the validating set.
     */
    validators(params?: Partial<PaginationOptions & APIParams>): Promise<[Validator[], Pagination]>;
    /**
     * Gets the validator information for a specific validator.
     * @param validator validator's operator address
     */
    validator(validator: ValAddress, params?: APIParams): Promise<Validator>;
    /**
     * Gets the current staking pool.
     */
    pool(params?: APIParams): Promise<StakingPool>;
    /**
     * Gets the current Staking module's parameters.
     */
    parameters(params?: APIParams): Promise<StakingParams>;
}
