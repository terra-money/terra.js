import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { ValAddress } from '../bech32';
import { ValConsPublicKey } from '../PublicKey';
import {
  Validator as Validator_pb,
  Description as Description_pb,
  Commission as Commission_pb,
  CommissionRates as CommissionRates_pb,
  BondStatus,
} from '@terra-money/terra.proto/cosmos/staking/v1beta1/staking';
import * as Long from 'long';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * Stores information fetched from the blockchain about the current status of a validator.
 * As an end user, you will not have to create an instance of this class, one will be
 * generated for you to store information about a validator polled from the API functions
 * in [[StakingAPI]].
 */
export class Validator extends JSONSerializable<
  Validator.Amino,
  Validator.Data,
  Validator.Proto
> {
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
    public consensus_pubkey: ValConsPublicKey,
    public jailed: boolean,
    public status: BondStatus,
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

  public toAmino(): Validator.Amino {
    return {
      operator_address: this.operator_address,
      consensus_pubkey: this.consensus_pubkey.toAmino(),
      jailed: this.jailed,
      status: this.status,
      tokens: this.tokens.toString(),
      delegator_shares: this.delegator_shares.toString(),
      description: this.description,
      unbonding_height: this.unbonding_height.toFixed(),
      unbonding_time: this.unbonding_time.toISOString(),
      commission: this.commission.toAmino(),
      min_self_delegation: this.min_self_delegation.toString(),
    };
  }

  public static fromAmino(data: Validator.Amino): Validator {
    return new Validator(
      data.operator_address,
      ValConsPublicKey.fromAmino(data.consensus_pubkey),
      data.jailed || false,
      data.status || 0,
      new Int(data.tokens),
      new Dec(data.delegator_shares),
      Validator.Description.fromAmino(data.description),
      Number.parseInt(data.unbonding_height),
      new Date(data.unbonding_time),
      Validator.Commission.fromAmino(data.commission),
      new Int(data.min_self_delegation)
    );
  }

  public toData(): Validator.Data {
    return {
      operator_address: this.operator_address,
      consensus_pubkey: this.consensus_pubkey.toData(),
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
      ValConsPublicKey.fromData(data.consensus_pubkey),
      data.jailed || false,
      data.status || 0,
      new Int(data.tokens),
      new Dec(data.delegator_shares),
      Validator.Description.fromData(data.description),
      Number.parseInt(data.unbonding_height),
      new Date(data.unbonding_time),
      Validator.Commission.fromData(data.commission),
      new Int(data.min_self_delegation)
    );
  }

  public toProto(): Validator.Proto {
    const {
      operator_address,
      consensus_pubkey,
      jailed,
      status,
      tokens,
      delegator_shares,
      description,
      unbonding_height,
      unbonding_time,
      commission,
      min_self_delegation,
    } = this;
    return Validator_pb.fromPartial({
      commission: commission.toProto(),
      consensusPubkey: consensus_pubkey.packAny(),
      delegatorShares: delegator_shares.toString(),
      description: description.toProto(),
      jailed,
      minSelfDelegation: min_self_delegation.toString(),
      operatorAddress: operator_address,
      status,
      tokens: tokens.toString(),
      unbondingHeight: Long.fromNumber(unbonding_height),
      unbondingTime: unbonding_time,
    });
  }

  public static fromProto(data: Validator.Proto): Validator {
    return new Validator(
      data.operatorAddress,
      ValConsPublicKey.unpackAny(data.consensusPubkey as Any),
      data.jailed,
      data.status,
      new Int(data.tokens),
      new Dec(data.delegatorShares),
      Validator.Description.fromProto(
        data.description as Validator.Description.Proto
      ),
      data.unbondingHeight.toNumber(),
      data.unbondingTime as Date,
      Validator.Commission.fromProto(
        data.commission as Validator.Commission.Proto
      ),
      new Int(data.minSelfDelegation)
    );
  }
}

export namespace Validator {
  export const Status = BondStatus;
  export type Status = BondStatus;
  export interface Amino {
    operator_address: ValAddress;
    consensus_pubkey: ValConsPublicKey.Amino;
    jailed: boolean;
    status: BondStatus;
    tokens: string;
    delegator_shares: string;
    description: Description.Amino;
    unbonding_height: string;
    unbonding_time: string;
    commission: Commission.Amino;
    min_self_delegation: string;
  }

  export interface Data {
    operator_address: ValAddress;
    consensus_pubkey: ValConsPublicKey.Data;
    jailed: boolean;
    status: BondStatus;
    tokens: string;
    delegator_shares: string;
    description: Description.Data;
    unbonding_height: string;
    unbonding_time: string;
    commission: Commission.Data;
    min_self_delegation: string;
  }

  export type Proto = Validator_pb;

  export class Description extends JSONSerializable<
    Description.Amino,
    Description.Data,
    Description.Proto
  > {
    /**
     * @param moniker Identifying name, e.g. "Hashed"
     * @param identity time at which commission was last updated
     * @param website validator's website
     * @param details long description
     * @param security_contact validator's contact
     */
    constructor(
      public moniker: string,
      public identity: string,
      public website: string,
      public details: string,
      public security_contact: string
    ) {
      super();
    }

    public toAmino(): Description.Amino {
      return {
        moniker: this.moniker,
        identity: this.identity,
        website: this.website,
        details: this.details,
        security_contact: this.security_contact,
      };
    }

    public static fromAmino(data: Description.Amino): Description {
      return new Description(
        data.moniker,
        data.identity || '',
        data.website || '',
        data.details || '',
        data.security_contact || ''
      );
    }

    public toData(): Description.Data {
      return {
        moniker: this.moniker,
        identity: this.identity,
        website: this.website,
        details: this.details,
        security_contact: this.security_contact,
      };
    }

    public static fromData(data: Description.Data): Description {
      return new Description(
        data.moniker,
        data.identity || '',
        data.website || '',
        data.details || '',
        data.security_contact || ''
      );
    }

    public toProto(): Description.Proto {
      const { moniker, identity, website, details, security_contact } = this;

      return Description_pb.fromPartial({
        details,
        identity,
        moniker,
        securityContact: security_contact,
        website,
      });
    }

    public static fromProto(proto: Description.Proto): Description {
      return new Description(
        proto.moniker,
        proto.identity,
        proto.website,
        proto.details,
        proto.securityContact
      );
    }
  }

  export namespace Description {
    export interface Amino {
      moniker: string;
      identity: string;
      website: string;
      details: string;
      security_contact: string;
    }

    export interface Data {
      moniker: string;
      identity: string;
      website: string;
      details: string;
      security_contact: string;
    }

    export type Proto = Description_pb;
  }

  export class CommissionRates extends JSONSerializable<
    CommissionRates.Amino,
    CommissionRates.Data,
    CommissionRates.Proto
  > {
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

    public static fromAmino(data: CommissionRates.Amino): CommissionRates {
      const { rate, max_rate, max_change_rate } = data;
      return new CommissionRates(
        new Dec(rate),
        new Dec(max_rate),
        new Dec(max_change_rate)
      );
    }

    public toAmino(): Validator.CommissionRates.Amino {
      const { rate, max_rate, max_change_rate } = this;
      return {
        rate: rate.toString(),
        max_rate: max_rate.toString(),
        max_change_rate: max_change_rate.toString(),
      };
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

    public static fromProto(proto: CommissionRates.Proto): CommissionRates {
      return new CommissionRates(
        new Dec(proto.rate),
        new Dec(proto.maxRate),
        new Dec(proto.maxChangeRate)
      );
    }

    public toProto(): Validator.CommissionRates.Proto {
      const { rate, max_rate, max_change_rate } = this;
      return CommissionRates_pb.fromPartial({
        maxChangeRate: max_change_rate.toString(),
        maxRate: max_rate.toString(),
        rate: rate.toString(),
      });
    }
  }

  export namespace CommissionRates {
    export interface Amino {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    }

    export interface Data {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    }

    export type Proto = CommissionRates_pb;
  }

  export class Commission extends JSONSerializable<
    Commission.Amino,
    Commission.Data,
    Commission.Proto
  > {
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

    public toAmino(): Commission.Amino {
      return {
        commission_rates: this.commission_rates.toAmino(),
        update_time: this.update_time.toISOString(),
      };
    }

    public static fromAmino(data: Commission.Amino): Commission {
      return new Commission(
        CommissionRates.fromAmino(data.commission_rates),
        new Date(data.update_time)
      );
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

    public toProto(): Commission.Proto {
      const { commission_rates, update_time } = this;
      return Commission_pb.fromPartial({
        commissionRates: commission_rates.toProto(),
        updateTime: update_time,
      });
    }

    public static fromProto(proto: Commission.Proto): Commission {
      return new Commission(
        CommissionRates.fromProto(
          proto.commissionRates as CommissionRates.Proto
        ),
        proto.updateTime as Date
      );
    }
  }

  export namespace Commission {
    export interface Amino {
      commission_rates: CommissionRates.Amino;
      update_time: string;
    }

    export interface Data {
      commission_rates: CommissionRates.Data;
      update_time: string;
    }

    export type Proto = Commission_pb;
  }
}
