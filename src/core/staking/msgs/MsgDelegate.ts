import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDelegate as MsgDelegate_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';

/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export class MsgDelegate extends JSONSerializable<MsgDelegate.Data> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_address validator's operator address
   * @param amount amount of LUNA to be sent for delegation
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public amount: Coin
  ) {
    super();
  }

  public static fromData(data: MsgDelegate.Data): MsgDelegate {
    const {
      value: { delegator_address, validator_address, amount },
    } = data;
    return new MsgDelegate(
      delegator_address,
      validator_address,
      Coin.fromData(amount)
    );
  }

  public toData(): MsgDelegate.Data {
    const { delegator_address, validator_address, amount } = this;
    return {
      type: 'staking/MsgDelegate',
      value: {
        delegator_address,
        validator_address,
        amount: amount.toData(),
      },
    };
  }

  public static fromProto(proto: MsgDelegate.Proto): MsgDelegate {
    return new MsgDelegate(
      proto.delegatorAddress,
      proto.validatorAddress,
      Coin.fromProto(proto.amount as Coin.Proto)
    );
  }

  public toProto(): MsgDelegate.Proto {
    const { delegator_address, validator_address, amount } = this;
    return MsgDelegate_pb.fromPartial({
      amount: amount.toProto(),
      delegatorAddress: delegator_address,
      validatorAddress: validator_address,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: MsgDelegate_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgDelegate {
    return MsgDelegate.fromProto(MsgDelegate_pb.decode(msgAny.value));
  }
}

export namespace MsgDelegate {
  export interface Data {
    type: 'staking/MsgDelegate';
    value: {
      delegator_address: AccAddress;
      validator_address: ValAddress;
      amount: Coin.Data;
    };
  }

  export type Proto = MsgDelegate_pb;
}
