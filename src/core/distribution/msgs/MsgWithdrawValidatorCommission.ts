import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommission_pb } from '@terra-money/terra.proto/src/cosmos/distribution/v1beta1/tx_pb';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgWithdrawValidatorCommission extends JSONSerializable<MsgWithdrawValidatorCommission.Data> {
  /**
   * @param validator_address validator's operator address
   */
  constructor(public validator_address: ValAddress) {
    super();
  }

  public static fromData(
    data: MsgWithdrawValidatorCommission.Data
  ): MsgWithdrawValidatorCommission {
    const {
      value: { validator_address },
    } = data;
    return new MsgWithdrawValidatorCommission(validator_address);
  }

  public toData(): MsgWithdrawValidatorCommission.Data {
    const { validator_address } = this;
    return {
      type: 'distribution/MsgWithdrawValidatorCommission',
      value: {
        validator_address,
      },
    };
  }

  public static fromProto(
    proto: MsgWithdrawValidatorCommission.Proto
  ): MsgWithdrawValidatorCommission {
    return new MsgWithdrawValidatorCommission(proto.getValidatorAddress());
  }

  public toProto(): MsgWithdrawValidatorCommission.Proto {
    const { validator_address } = this;
    const msgWithdrawValidatorCommissionProto =
      new MsgWithdrawValidatorCommission_pb();
    msgWithdrawValidatorCommissionProto.setValidatorAddress(validator_address);
    return msgWithdrawValidatorCommissionProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl(
      '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission'
    );
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgWithdrawValidatorCommission {
    return MsgWithdrawValidatorCommission.fromProto(
      MsgWithdrawValidatorCommission_pb.deserializeBinary(
        msgAny.getValue_asU8()
      )
    );
  }
}

export namespace MsgWithdrawValidatorCommission {
  export interface Data {
    type: 'distribution/MsgWithdrawValidatorCommission';
    value: {
      validator_address: ValAddress;
    };
  }

  export type Proto = MsgWithdrawValidatorCommission_pb;
}
