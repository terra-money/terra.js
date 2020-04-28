import {
  AccAddress,
  ValAddress,
  UnbondingDelegation,
  Coin,
  Coins,
} from '../../../core';
import { BaseAPI } from './BaseAPI';
import { Delegation } from '../../../core/staking/Delegation';
import { Validator } from '../../../core/staking/Validator';
import { Redelegation } from '../../../core/staking/Redelegation';
import { Denom } from '../../../core/Denom';

export interface StakingParams {
  /** Amount of time, in seconds, for bonded staking tokens to be unbonded. */
  unbonding_time: number;

  /** Max number of validators for the validating set (delegates). */
  max_validators: number;

  /** Maximum entries for unbonding delegations and redelegations. */
  max_entries: number;

  /** The denomination used as the staking token (probably Luna). */
  bond_denom: Denom;
}

export namespace StakingParams {
  export interface Data {
    unbonding_time: string;
    max_validators: number;
    max_entries: number;
    bond_denom: Denom;
  }
}

export interface StakingPool {
  /** amount of tokens are bonded, including those that are currently unbonding */
  bonded_tokens: Coin;

  /** amount of tokens that are not bonded */
  not_bonded_tokens: Coin;
}

export namespace StakingPool {
  export interface Data {
    bonded_tokens: string;
    not_bonded_tokens: string;
  }
}

export class StakingAPI extends BaseAPI {
  /**
   * Queries all delegations, filtering by delegator, validator, or both.
   *
   * At least one of the parameters must be defined.
   * @param delegator delegator's account address
   * @param validator validator's operator address
   */
  public async delegations(
    delegator?: AccAddress,
    validator?: ValAddress
  ): Promise<Delegation[]> {
    if (delegator !== undefined && validator !== undefined) {
      return this.c
        .get<Delegation.Data>(
          `/staking/delegators/${delegator}/delegations/${validator}`
        )
        .then(data => [Delegation.fromData(data.result)]);
    } else if (delegator !== undefined) {
      return this.c
        .get<Delegation.Data[]>(`/staking/delegators/${delegator}/delegations`)
        .then(data => data.result.map(Delegation.fromData));
    } else if (validator !== undefined) {
      return this.c
        .get<Delegation.Data[]>(`/staking/validators/${validator}/delegations`)
        .then(data => data.result.map(Delegation.fromData));
    } else {
      throw new TypeError(
        'arguments delegator and validator cannot both be empty'
      );
    }
  }

  /**
   * Gets the delegation between a delegator and validator, if it exists.
   * @param delegator delegator's account address
   * @param validator validator's operator address
   */
  public async delegation(
    delegator: AccAddress,
    validator: ValAddress
  ): Promise<Delegation> {
    return this.delegations(delegator, validator).then(delgs => delgs[0]);
  }

  /**
   * Queries all unbonding delegations, filtering by delegator, validator, or both.
   *
   * At least one of the parameters must be defined.
   * @param delegator delegator's account address
   * @param validator validator's operator address
   */
  public async unbondingDelegations(
    delegator: AccAddress,
    validator: ValAddress
  ): Promise<UnbondingDelegation[]> {
    if (delegator !== undefined && validator !== undefined) {
      return this.c
        .get<UnbondingDelegation.Data>(
          `/staking/delegators/${delegator}/unbonding_delegations/${validator}`
        )
        .then(data => [UnbondingDelegation.fromData(data.result)]);
    } else if (delegator !== undefined) {
      return this.c
        .get<UnbondingDelegation.Data[]>(
          `/staking/delegators/${delegator}/unbonding_delegations`
        )
        .then(data => data.result.map(UnbondingDelegation.fromData));
    } else if (validator !== undefined) {
      return this.c
        .get<UnbondingDelegation.Data[]>(
          `/staking/validators/${validator}/unbonding_delegations`
        )
        .then(data => data.result.map(UnbondingDelegation.fromData));
    } else {
      throw new TypeError(
        'arguments delegator and validator cannot both be empty'
      );
    }
  }

  /**
   * Gets the unbonding delegation between a delegator and validator, if it exists.
   * @param delegator delegator's account address
   * @param validator validator's operator address
   */
  public async unbondingDelegation(
    delegator: AccAddress,
    validator: ValAddress
  ): Promise<UnbondingDelegation> {
    return this.unbondingDelegations(delegator, validator).then(
      udelgs => udelgs[0]
    );
  }

  /**
   * Queries all redelegations, filterable by delegator, source validator, and target validator.
   * @param delegator delegator's account address
   * @param validatorSrc source validator's operator address (from).
   * @param validatorDst destination validator's operator address (to).
   */
  public async redelegations(
    delegator?: AccAddress,
    validatorSrc?: ValAddress,
    validatorDst?: ValAddress
  ): Promise<Redelegation[]> {
    let params = {
      delegator,
      validator_from: validatorSrc,
      validator_to: validatorDst,
    };
    return this.c
      .get<Redelegation.Data[]>(`/staking/redelegations`, params)
      .then(d => d.result.map(Redelegation.fromData));
  }

  /**
   * Gets all bonded validators for a delegator given its address.
   * @param delegator delegator's account address
   */
  public async bondedValidators(delegator: AccAddress): Promise<Validator[]> {
    return this.c
      .get<Validator.Data[]>(`/staking/delegators/${delegator}/validators`)
      .then(d => d.result.map(Validator.fromData));
  }

  /**
   * Get all current registered validators, including validators that are not currently in the validating set.
   */
  public async validators(): Promise<Validator[]> {
    return this.c
      .get<Validator.Data[]>(`/staking/validators`)
      .then(d => d.result.map(Validator.fromData));
  }

  /**
   * Gets the validator information for a specific validator.
   * @param validator validator's operator address
   */
  public async validator(validator: ValAddress) {
    return this.c
      .get<Validator.Data>(`/staking/validators/${validator}`)
      .then(d => Validator.fromData(d.result));
  }

  /**
   * Gets the current staking pool.
   */
  public async pool(): Promise<StakingPool> {
    return this.c
      .get<StakingPool.Data>(`/staking/pool`)
      .then(d => d.result)
      .then(d => ({
        bonded_tokens: new Coin(Denom.LUNA, d.bonded_tokens),
        not_bonded_tokens: new Coin(Denom.LUNA, d.not_bonded_tokens),
      }));
  }

  /**
   * Gets the current Staking module's parameters.
   */
  public async parameters(): Promise<StakingParams> {
    return this.c
      .get<StakingParams.Data>(`/staking/parameters`)
      .then(d => d.result)
      .then(d => ({
        unbonding_time: Number.parseInt(d.unbonding_time),
        max_validators: d.max_validators,
        max_entries: d.max_entries,
        bond_denom: d.bond_denom,
      }));
  }
}
