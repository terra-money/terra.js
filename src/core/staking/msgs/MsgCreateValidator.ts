import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Int } from '../../numeric';
import { AccAddress, ValAddress } from '../../bech32';
import { Validator } from '../Validator';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateValidator as MsgCreateValidator_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
import { ValConsPublicKey, PublicKey } from '../../PublicKey';

/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
export class MsgCreateValidator extends JSONSerializable<MsgCreateValidator.Data> {
  /**
   *
   * @param description validator's delegate information
   * @param commission validator's commission policy
   * @param min_self_delegation minimum self delegation
   * @param delegator_address validator's account address
   * @param validator_address validator's operator address
   * @param pubkey validator's consensus public key
   * @param value amount to use for self-delegation
   */
  constructor(
    public description: Validator.Description,
    public commission: Validator.CommissionRates,
    public min_self_delegation: Int,
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public pubkey: ValConsPublicKey,
    public value: Coin
  ) {
    super();
  }

  public static fromData(data: MsgCreateValidator.Data): MsgCreateValidator {
    const {
      value: {
        description,
        commission,
        min_self_delegation,
        delegator_address,
        validator_address,
        pubkey,
        value,
      },
    } = data;
    return new MsgCreateValidator(
      description,
      Validator.CommissionRates.fromData(commission),
      new Int(min_self_delegation),
      delegator_address,
      validator_address,
      ValConsPublicKey.fromData(pubkey),
      Coin.fromData(value)
    );
  }

  public toData(): MsgCreateValidator.Data {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = this;
    return {
      type: 'staking/MsgCreateValidator',
      value: {
        description,
        commission: commission.toData(),
        min_self_delegation: min_self_delegation.toString(),
        delegator_address,
        validator_address,
        pubkey: pubkey.toData(),
        value: value.toData(),
      },
    };
  }

  public static fromProto(proto: MsgCreateValidator.Proto): MsgCreateValidator {
    return new MsgCreateValidator(
      Validator.Description.fromProto(
        proto.description as Validator.Description.Proto
      ),
      Validator.CommissionRates.fromProto(
        proto.commission as Validator.CommissionRates.Proto
      ),
      new Int(proto.minSelfDelegation),
      proto.delegatorAddress,
      proto.validatorAddress,
      PublicKey.fromProto(proto.pubkey as Any) as ValConsPublicKey,
      Coin.fromProto(proto.value as Coin.Proto)
    );
  }

  public toProto(): MsgCreateValidator.Proto {
    const {
      description,
      commission,
      min_self_delegation,
      delegator_address,
      validator_address,
      pubkey,
      value,
    } = this;
    return MsgCreateValidator_pb.fromPartial({
      commission: commission.toProto(),
      delegatorAddress: delegator_address,
      description: description.toProto(),
      minSelfDelegation: min_self_delegation.toString(),
      pubkey: pubkey.packAny(),
      validatorAddress: validator_address,
      value: value.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgCreateValidator',
      value: MsgCreateValidator_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgCreateValidator {
    return MsgCreateValidator.fromProto(
      MsgCreateValidator_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgCreateValidator {
  export interface Data {
    type: 'staking/MsgCreateValidator';
    value: {
      description: Validator.Description;
      commission: Validator.CommissionRates.Data;
      min_self_delegation: string;
      delegator_address: AccAddress;
      validator_address: ValAddress;
      pubkey: ValConsPublicKey.Data;
      value: Coin.Data;
    };
  }

  export type Proto = MsgCreateValidator_pb;
}
