import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgSetWithdrawAddress as MsgSetWithdrawAddress_pb } from '@terra-money/terra.proto/src/cosmos/distribution/v1beta1/tx_pb';

/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export class MsgSetWithdrawAddress extends JSONSerializable<MsgSetWithdrawAddress.Data> {
  /**
   * @param delegator_address delegator's account address
   * @param withdraw_address desired new withdraw address
   */
  constructor(
    public delegator_address: AccAddress,
    public withdraw_address: AccAddress
  ) {
    super();
  }

  public static fromData(
    data: MsgSetWithdrawAddress.Data
  ): MsgSetWithdrawAddress {
    const {
      value: { delegator_address, withdraw_address },
    } = data;
    return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
  }

  public toData(): MsgSetWithdrawAddress.Data {
    const { delegator_address, withdraw_address } = this;
    return {
      type: 'distribution/MsgModifyWithdrawAddress',
      value: {
        delegator_address,
        withdraw_address,
      },
    };
  }

  public static fromProto(
    proto: MsgSetWithdrawAddress.Proto
  ): MsgSetWithdrawAddress {
    return new MsgSetWithdrawAddress(
      proto.getDelegatorAddress(),
      proto.getWithdrawAddress()
    );
  }

  public toProto(): MsgSetWithdrawAddress.Proto {
    const { delegator_address, withdraw_address } = this;
    const msgSetWithdrawAddressProto = new MsgSetWithdrawAddress_pb();
    msgSetWithdrawAddressProto.setDelegatorAddress(delegator_address);
    msgSetWithdrawAddressProto.setWithdrawAddress(withdraw_address);
    return msgSetWithdrawAddressProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.distribution.v1beta1.MsgSetWithdrawAddress');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgSetWithdrawAddress {
    return MsgSetWithdrawAddress.fromProto(
      MsgSetWithdrawAddress_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgSetWithdrawAddress {
  export interface Data {
    type: 'distribution/MsgModifyWithdrawAddress';
    value: {
      delegator_address: AccAddress;
      withdraw_address: AccAddress;
    };
  }

  export type Proto = MsgSetWithdrawAddress_pb;
}
