import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgFundCommunityPool as MsgFundCommunityPool_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';

export class MsgFundCommunityPool extends JSONSerializable<MsgFundCommunityPool.Data> {
  public amount: Coins;
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(public depositor: AccAddress, amount: Coins.Input) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromData(
    data: MsgFundCommunityPool.Data
  ): MsgFundCommunityPool {
    const {
      value: { depositor, amount },
    } = data;
    return new MsgFundCommunityPool(depositor, Coins.fromData(amount));
  }

  public toData(): MsgFundCommunityPool.Data {
    const { depositor, amount } = this;
    return {
      type: 'distribution/MsgFundCommunityPool',
      value: {
        depositor,
        amount: amount.toData(),
      },
    };
  }

  public static fromProto(
    proto: MsgFundCommunityPool.Proto
  ): MsgFundCommunityPool {
    return new MsgFundCommunityPool(
      proto.depositor,
      Coins.fromProto(proto.amount)
    );
  }

  public toProto(): MsgFundCommunityPool.Proto {
    const { depositor, amount } = this;
    return MsgFundCommunityPool_pb.fromPartial({
      amount: amount.toProto(),
      depositor,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      value: MsgFundCommunityPool_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgFundCommunityPool {
    return MsgFundCommunityPool.fromProto(
      MsgFundCommunityPool_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgFundCommunityPool {
  export interface Data {
    type: 'distribution/MsgFundCommunityPool';
    value: {
      depositor: AccAddress;
      amount: Coins.Data;
    };
  }

  export type Proto = MsgFundCommunityPool_pb;
}
