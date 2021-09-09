import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { ValAddress } from '../bech32';
import { ValConsPublicKey } from '../PublicKey';
import {
  Validator as Validator_pb,
  Description as Description_pb,
  Commission as Commission_pb,
  CommissionRates as CommissionRates_pb,
  BondStatusMap,
  BondStatus,
} from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/staking_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
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
    public consensus_pubkey: ValConsPublicKey,
    public jailed: boolean,
    public status: BondStatusMap[keyof BondStatusMap],
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
    const validatorProto = new Validator_pb();
    validatorProto.setOperatorAddress(operator_address);
    validatorProto.setConsensusPubkey(consensus_pubkey.packAny() as any);
    validatorProto.setJailed(jailed);
    validatorProto.setStatus(status);
    validatorProto.setTokens(tokens.toString());
    validatorProto.setDelegatorShares(delegator_shares.toString());
    validatorProto.setDescription(description.toProto());
    validatorProto.setUnbondingHeight(unbonding_height);
    validatorProto.setUnbondingTime(Timestamp.fromDate(unbonding_time));
    validatorProto.setCommission(commission.toProto());
    validatorProto.setMinSelfDelegation(min_self_delegation.toString());
    return validatorProto;
  }

  public static fromProto(data: Validator.Proto): Validator {
    return new Validator(
      data.getOperatorAddress(),
      ValConsPublicKey.unpackAny(data.getConsensusPubkey() as any),
      data.getJailed(),
      data.getStatus(),
      new Int(data.getTokens()),
      new Dec(data.getDelegatorShares()),
      Validator.Description.fromProto(
        data.getDescription() as Validator.Description.Proto
      ),
      data.getUnbondingHeight(),
      data.getUnbondingTime()?.toDate() as Date,
      Validator.Commission.fromProto(
        data.getCommission() as Validator.Commission.Proto
      ),
      new Int(data.getMinSelfDelegation())
    );
  }
}

export namespace Validator {
  export const Status: BondStatusMap = BondStatus;
  export interface Data {
    operator_address: ValAddress;
    consensus_pubkey: ValConsPublicKey.Data;
    jailed: boolean;
    status: BondStatusMap[keyof BondStatusMap];
    tokens: string;
    delegator_shares: string;
    description: Description.Data;
    unbonding_height: string;
    unbonding_time: string;
    commission: Commission.Data;
    min_self_delegation: string;
  }

  export type Proto = Validator_pb;

  export class Description extends JSONSerializable<Description.Data> {
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

      const descriptionProto = new Description_pb();
      descriptionProto.setMoniker(moniker);
      descriptionProto.setIdentity(identity);
      descriptionProto.setWebsite(website);
      descriptionProto.setDetails(details);
      descriptionProto.setSecurityContact(security_contact);
      return descriptionProto;
    }

    public static fromProto(proto: Description.Proto): Description {
      return new Description(
        proto.getMoniker(),
        proto.getIdentity(),
        proto.getWebsite(),
        proto.getDetails(),
        proto.getSecurityContact()
      );
    }
  }

  export namespace Description {
    export interface Data {
      moniker: string;
      identity: string;
      website: string;
      details: string;
      security_contact: string;
    }

    export type Proto = Description_pb;
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

    public static fromProto(proto: CommissionRates.Proto): CommissionRates {
      return new CommissionRates(
        new Dec(proto.getRate()),
        new Dec(proto.getMaxRate()),
        new Dec(proto.getMaxChangeRate())
      );
    }

    public toProto(): Validator.CommissionRates.Proto {
      const { rate, max_rate, max_change_rate } = this;
      const commissionRatesProto = new CommissionRates_pb();
      commissionRatesProto.setRate(rate.toString());
      commissionRatesProto.setMaxRate(max_rate.toString());
      commissionRatesProto.setMaxChangeRate(max_change_rate.toString());
      return commissionRatesProto;
    }
  }

  export namespace CommissionRates {
    export interface Data {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    }

    export type Proto = CommissionRates_pb;
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

    public toProto(): Commission.Proto {
      const { commission_rates, update_time } = this;
      const commissionProto = new Commission_pb();
      commissionProto.setCommissionRates(commission_rates.toProto());
      commissionProto.setUpdateTime(Timestamp.fromDate(update_time));
      return commissionProto;
    }

    public static fromProto(proto: Commission.Proto): Commission {
      return new Commission(
        CommissionRates.fromProto(
          proto.getCommissionRates() as CommissionRates.Proto
        ),
        proto.getUpdateTime()?.toDate() as Date
      );
    }
  }

  export namespace Commission {
    export interface Data {
      commission_rates: CommissionRates.Data;
      update_time: string;
    }

    export type Proto = Commission_pb;
  }
}
