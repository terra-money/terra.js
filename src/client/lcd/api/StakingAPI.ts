import {
  AccAddress,
  ValAddress,
  UnbondingDelegation,
  Coin,
} from '../../../core';
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

export namespace StakingParams {
  export interface Data {
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

export namespace StakingPool {
  export interface Data {
    bonded_tokens: string;
    not_bonded_tokens: string;
  }
}

export class StakingAPI extends BaseAPI {

  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Queries all delegations, filtering by delegator, validator, or both.
   *
   * At least one of the parameters must be defined.
   * @param delegator delegator's account address
   * @param validator validator's operator address
   */
  public async delegations(
    delegator?: AccAddress,
    validator?: ValAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Delegation[], Pagination]> {
    if (delegator !== undefined && validator !== undefined) {
      return this.c
        .get<{ delegation_response: Delegation.Data }>(
          `/cosmos/staking/v1beta1/validators/${validator}/delegations/${delegator}`,
          params
        )
        .then(({ delegation_response: data }) => [
          [Delegation.fromData(data)],
          { total: 1, next_key: '' },
        ]);
    } else if (delegator !== undefined) {
      return this.c
        .get<{
          delegation_responses: Delegation.Data[];
          pagination: Pagination;
        }>(`/cosmos/staking/v1beta1/delegations/${delegator}`, params)
        .then(data => [
          data.delegation_responses.map(Delegation.fromData),
          data.pagination,
        ]);
    } else if (validator !== undefined) {
      return this.c
        .get<{
          delegation_responses: Delegation.Data[];
          pagination: Pagination;
        }>(
          `/cosmos/staking/v1beta1/validators/${validator}/delegations`,
          params
        )
        .then(data => [
          data.delegation_responses.map(Delegation.fromData),
          data.pagination,
        ]);
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
    return this.delegations(delegator, validator).then(delgs => delgs[0][0]);
  }

  /**
   * Queries all unbonding delegations, filtering by delegator, validator, or both.
   *
   * At least one of the parameters must be defined.
   * @param delegator delegator's account address
   * @param validator validator's operator address
   */
  public async unbondingDelegations(
    delegator?: AccAddress,
    validator?: ValAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[UnbondingDelegation[], Pagination]> {
    if (delegator !== undefined && validator !== undefined) {
      return this.c
        .get<{ unbond: UnbondingDelegation.Data }>(
          `/cosmos/staking/v1beta1/validators/${validator}/delegations/${delegator}/unbonding_delegation`,
          params
        )
        .then(({ unbond: data }) => [
          [UnbondingDelegation.fromData(data)],
          { next_key: '', total: 1 },
        ]);
    } else if (delegator !== undefined) {
      return this.c
        .get<{
          unbonding_responses: UnbondingDelegation.Data[];
          pagination: Pagination;
        }>(
          `/cosmos/staking/v1beta1/delegators/${delegator}/unbonding_delegations`,
          params
        )
        .then(data => [
          data.unbonding_responses.map(UnbondingDelegation.fromData),
          data.pagination,
        ]);
    } else if (validator !== undefined) {
      return this.c
        .get<{
          unbonding_responses: UnbondingDelegation.Data[];
          pagination: Pagination;
        }>(
          `/cosmos/staking/v1beta1/validators/${validator}/unbonding_delegations`,
          params
        )
        .then(data => [
          data.unbonding_responses.map(UnbondingDelegation.fromData),
          data.pagination,
        ]);
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
    delegator?: AccAddress,
    validator?: ValAddress
  ): Promise<UnbondingDelegation> {
    return this.unbondingDelegations(delegator, validator).then(
      udelgs => udelgs[0][0]
    );
  }

  /**
   * Queries all redelegations, filterable by delegator, source validator, and target validator.
   * @param delegator delegator's account address
   * @param validatorSrc source validator's operator address (from).
   * @param validatorDst destination validator's operator address (to).
   */
  public async redelegations(
    delegator: AccAddress,
    validatorSrc?: ValAddress,
    validatorDst?: ValAddress,
    _params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Redelegation[], Pagination]> {
    const params = {
      ..._params,
      src_validator_addr: validatorSrc,
      dst_validator_addr: validatorDst,
    };
    return this.c
      .get<{
        redelegation_responses: Redelegation.Data[];
        pagination: Pagination;
      }>(
        `/cosmos/staking/v1beta1/delegators/${delegator}/redelegations`,
        params
      )
      .then(d => [
        d.redelegation_responses.map(Redelegation.fromData),
        d.pagination,
      ]);
  }

  /**
   * Gets all bonded validators for a delegator given its address.
   * @param delegator delegator's account address
   */
  public async bondedValidators(
    delegator: AccAddress,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Validator[], Pagination]> {
    return this.c
      .get<{ validators: Validator.Data[]; pagination: Pagination }>(
        `/cosmos/staking/v1beta1/delegators/${delegator}/validators`,
        params
      )
      .then(d => [d.validators.map(Validator.fromData), d.pagination]);
  }

  /**
   * Get all current registered validators, including validators that are not currently in the validating set.
   */
  public async validators(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[Validator[], Pagination]> {
    return this.c
      .get<{ validators: Validator.Data[]; pagination: Pagination }>(
        `/cosmos/staking/v1beta1/validators`,
        params
      )
      .then(d => [d.validators.map(Validator.fromData), d.pagination]);
  }

  /**
   * Gets the validator information for a specific validator.
   * @param validator validator's operator address
   */
  public async validator(
    validator: ValAddress,
    params: APIParams = {}
  ): Promise<Validator> {
    return this.c
      .get<{ validator: Validator.Data }>(
        `/cosmos/staking/v1beta1/validators/${validator}`,
        params
      )
      .then(d => Validator.fromData(d.validator));
  }

  /**
   * Gets the current staking pool.
   */
  public async pool(params: APIParams = {}): Promise<StakingPool> {
    return this.c
      .get<{ pool: StakingPool.Data }>(`/cosmos/staking/v1beta1/pool`, params)
      .then(({ pool: d }) => ({
        bonded_tokens: new Coin('uluna', d.bonded_tokens),
        not_bonded_tokens: new Coin('uluna', d.not_bonded_tokens),
      }));
  }

  /**
   * Gets the current Staking module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<StakingParams> {
    return this.c
      .get<{ params: StakingParams.Data }>(
        `/cosmos/staking/v1beta1/params`,
        params
      )
      .then(({ params: d }) => ({
        unbonding_time: Number.parseInt(d.unbonding_time),
        max_validators: d.max_validators,
        max_entries: d.max_entries,
        historical_entries: d.historical_entries,
        bond_denom: d.bond_denom,
      }));
  }
}
