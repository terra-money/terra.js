import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommission_pb } from '@terra-money/legacy.proto/cosmos/distribution/v1beta1/tx';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgWithdrawValidatorCommission extends JSONSerializable<
  MsgWithdrawValidatorCommission.Amino,
  MsgWithdrawValidatorCommission.Data,
  MsgWithdrawValidatorCommission.Proto
> {
  /**
   * @param validator_address validator's operator address
   */
  constructor(public validator_address: ValAddress) {
    super();
  }

  public static fromAmino(
    data: MsgWithdrawValidatorCommission.Amino,
    _?: boolean
  ): MsgWithdrawValidatorCommission {
    _;
    const {
      value: { validator_address },
    } = data;
    return new MsgWithdrawValidatorCommission(validator_address);
  }

  public toAmino(isClassic?: boolean): MsgWithdrawValidatorCommission.Amino {
    const { validator_address } = this;
    return {
      type: isClassic
        ? 'distribution/MsgWithdrawValidatorCommission'
        : 'cosmos-sdk/MsgWithdrawValidatorCommission',
      value: {
        validator_address,
      },
    };
  }

  public static fromData(
    proto: MsgWithdrawValidatorCommission.Data,
    _?: boolean
  ): MsgWithdrawValidatorCommission {
    _;
    const { validator_address } = proto;
    return new MsgWithdrawValidatorCommission(validator_address);
  }

  public toData(_?: boolean): MsgWithdrawValidatorCommission.Data {
    _;
    const { validator_address } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      validator_address,
    };
  }

  public static fromProto(
    proto: MsgWithdrawValidatorCommission.Proto,
    _?: boolean
  ): MsgWithdrawValidatorCommission {
    _;
    return new MsgWithdrawValidatorCommission(proto.validatorAddress);
  }

  public toProto(_?: boolean): MsgWithdrawValidatorCommission.Proto {
    _;
    const { validator_address } = this;
    return MsgWithdrawValidatorCommission_pb.fromPartial({
      validatorAddress: validator_address,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
      value: MsgWithdrawValidatorCommission_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgWithdrawValidatorCommission {
    return MsgWithdrawValidatorCommission.fromProto(
      MsgWithdrawValidatorCommission_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgWithdrawValidatorCommission {
  export interface Amino {
    type:
      | 'distribution/MsgWithdrawValidatorCommission'
      | 'cosmos-sdk/MsgWithdrawValidatorCommission';
    value: {
      validator_address: ValAddress;
    };
  }

  export interface Data {
    '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission';
    validator_address: ValAddress;
  }

  export type Proto = MsgWithdrawValidatorCommission_pb;
}
