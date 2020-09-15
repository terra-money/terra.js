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

export namespace DistributionParams {
  export interface Data {
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

export namespace Rewards {
  export interface Data {
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

export namespace ValidatorRewards {
  export interface Data {
    self_bond_rewards: Coins.Data;
    val_commission: Coins.Data;
  }
}

export class DistributionAPI extends BaseAPI {
  /**
   * Gets a delegator's rewards.
   * @param delegator delegator's account address
   */
  public async rewards(delegator: AccAddress): Promise<Rewards> {
    const rewardsData = await this.c
      .get<Rewards.Data>(`/distribution/delegators/${delegator}/rewards`)
      .then(d => d.result);

    const rewards: Rewards['rewards'] = {};
    for (const reward of rewardsData.rewards) {
      rewards[reward.validator_address] = Coins.fromData(reward.reward);
    }
    return {
      rewards,
      total: Coins.fromData(rewardsData.total),
    };
  }

  /**
   * Gets a validator's rewards.
   * @param validator validator's operator address
   */
  public async validatorRewards(
    validator: ValAddress
  ): Promise<ValidatorRewards> {
    return this.c
      .get<ValidatorRewards.Data>(`/distribution/validators/${validator}`)
      .then(d => d.result)
      .then(d => ({
        self_bond_rewards: Coins.fromData(d.self_bond_rewards),
        val_commission: Coins.fromData(d.val_commission),
      }));
  }

  /**
   * Gets the withdraw address of a delegator, the address to which rewards are withdrawn.
   * @param delegator
   */
  public async withdrawAddress(delegator: AccAddress): Promise<AccAddress> {
    return this.c
      .get<AccAddress>(`/distribution/delegators/${delegator}/withdraw_address`)
      .then(d => d.result);
  }

  /**
   * Gets the current value of the community pool.
   */
  public async communityPool(): Promise<Coins> {
    return this.c
      .get<Coins.Data>(`/distribution/community_pool`)
      .then(d => Coins.fromData(d.result));
  }

  /**
   * Gets the current distribution parameters.
   */
  public async parameters(): Promise<DistributionParams> {
    return this.c
      .get<DistributionParams.Data>(`/distribution/parameters`)
      .then(({ result: d }) => ({
        base_proposer_reward: new Dec(d.base_proposer_reward),
        community_tax: new Dec(d.community_tax),
        bonus_proposer_reward: new Dec(d.bonus_proposer_reward),
        withdraw_addr_enabled: d.withdraw_addr_enabled,
      }));
  }
}
