import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Int } from '../../numeric';
import { AccAddress, ValAddress } from '../../bech32';
import { Validator } from '../Validator';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgCreateValidator as MsgCreateValidator_pb } from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/tx_pb';
import { ValConsPublicKey, PublicKey } from 'core/PublicKey';

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
        proto.getDescription() as Validator.Description.Proto
      ),
      Validator.CommissionRates.fromProto(
        proto.getCommission() as Validator.CommissionRates.Proto
      ),
      new Int(proto.getMinSelfDelegation()),
      proto.getDelegatorAddress(),
      proto.getValidatorAddress(),
      PublicKey.fromProto(proto.getPubkey() as any) as ValConsPublicKey,
      Coin.fromProto(proto.getValue() as Coin.Proto)
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
    const msgCreateValidatorProto = new MsgCreateValidator_pb();
    msgCreateValidatorProto.setDescription(description.toProto());
    msgCreateValidatorProto.setCommission(commission.toProto());
    msgCreateValidatorProto.setMinSelfDelegation(
      min_self_delegation.toString()
    );
    msgCreateValidatorProto.setDelegatorAddress(delegator_address);
    msgCreateValidatorProto.setValidatorAddress(validator_address);
    msgCreateValidatorProto.setPubkey(pubkey.packAny() as any);
    msgCreateValidatorProto.setValue(value.toProto());
    return msgCreateValidatorProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.staking.v1beta1.MsgCreateValidator');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgCreateValidator {
    return MsgCreateValidator.fromProto(
      MsgCreateValidator_pb.deserializeBinary(msgAny.getValue_asU8())
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
