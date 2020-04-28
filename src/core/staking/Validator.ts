import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { ValAddress, ValConsPubKey } from '../strings';

/**
 * Stores information fetched from the blockchain about the current status of a validator.
 * As an end user, you will not have to create an instance of this class, one will be
 * generated for you to store information about a validator polled from the API functions
 * in [[StakingAPI]].
 */
export class Validator extends JSONSerializable<Validator.Data> {
  /**
   *
   * @param operator_address validator's operator address
   * @param consensus_pubkey validator's consensus public key
   * @param jailed whether the current validator is jailed
   * @param status unbonded `0`, unbonding `1`, bonded `2`
   * @param tokens total Luna from all delegations (including self)
   * @param delegator_shares total shares of all delegators
   * @param description validator's delegate description
   * @param unbonding_height if unbonding, height at which this validator began unbonding
   * @param unbonding_time if unbonding, min time for the validator to complete unbonding
   * @param commission validator commission
   * @param min_self_delegation minimum self delegation
   */
  constructor(
    public operator_address: ValAddress,
    public consensus_pubkey: ValConsPubKey,
    public jailed: boolean,
    public status: number,
    public tokens: Int,
    public delegator_shares: Dec,
    public description: Validator.Description,
    public unbonding_height: number,
    public unbonding_time: Date,
    public commission: Validator.Commission,
    public min_self_delegation: Int
  ) {
    super();
  }

  public toData(): Validator.Data {
    return {
      operator_address: this.operator_address,
      consensus_pubkey: this.consensus_pubkey,
      jailed: this.jailed,
      status: this.status,
      tokens: this.tokens.toString(),
      delegator_shares: this.delegator_shares.toString(),
      description: this.description,
      unbonding_height: this.unbonding_height.toFixed(),
      unbonding_time: this.unbonding_time.toISOString(),
      commission: this.commission.toData(),
      min_self_delegation: this.min_self_delegation.toString(),
    };
  }

  public static fromData(data: Validator.Data): Validator {
    return new Validator(
      data.operator_address,
      data.consensus_pubkey,
      data.jailed,
      data.status,
      new Int(data.tokens),
      new Dec(data.delegator_shares),
      data.description,
      Number.parseInt(data.unbonding_height),
      new Date(data.unbonding_time),
      Validator.Commission.fromData(data.commission),
      new Int(data.min_self_delegation)
    );
  }
}

export namespace Validator {
  export interface Data {
    operator_address: ValAddress;
    consensus_pubkey: ValConsPubKey;
    jailed: boolean;
    status: number;
    tokens: string;
    delegator_shares: string;
    description: Description;
    unbonding_height: string;
    unbonding_time: string;
    commission: Commission.Data;
    min_self_delegation: string;
  }

  export interface Description {
    /** Identifying name, e.g. "Hashed */
    moniker: string;

    /** identity from keybase.io */
    identity: string;

    /** validator's website */
    website: string;

    /** longer description */
    details: string;
  }

  export class CommissionRates extends JSONSerializable<CommissionRates.Data> {
    /**
     * @param rate current commission rate
     * @param max_rate max commission rate
     * @param max_change_rate max percentage commission can change in 24hrs
     */
    constructor(
      public rate: Dec,
      public max_rate: Dec,
      public max_change_rate: Dec
    ) {
      super();
    }

    public static fromData(data: CommissionRates.Data): CommissionRates {
      const { rate, max_rate, max_change_rate } = data;
      return new CommissionRates(
        new Dec(rate),
        new Dec(max_rate),
        new Dec(max_change_rate)
      );
    }

    public toData(): Validator.CommissionRates.Data {
      const { rate, max_rate, max_change_rate } = this;
      return {
        rate: rate.toString(),
        max_rate: max_rate.toString(),
        max_change_rate: max_change_rate.toString(),
      };
    }
  }

  export namespace CommissionRates {
    export interface Data {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    }
  }

  export class Commission extends JSONSerializable<Commission.Data> {
    /**
     * @param commission_rates commission rates
     * @param update_time time at which commission was last updated
     */
    constructor(
      public commission_rates: CommissionRates,
      public update_time: Date
    ) {
      super();
    }

    public toData(): Commission.Data {
      return {
        commission_rates: this.commission_rates.toData(),
        update_time: this.update_time.toISOString(),
      };
    }

    public static fromData(data: Commission.Data): Commission {
      return new Commission(
        CommissionRates.fromData(data.commission_rates),
        new Date(data.update_time)
      );
    }
  }

  export namespace Commission {
    export interface Data {
      commission_rates: CommissionRates.Data;
      update_time: string;
    }
  }
}
