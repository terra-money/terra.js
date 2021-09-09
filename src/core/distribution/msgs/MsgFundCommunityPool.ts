import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgFundCommunityPool as MsgFundCommunityPool_pb } from '@terra-money/terra.proto/src/cosmos/distribution/v1beta1/tx_pb';

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
      proto.getDepositor(),
      Coins.fromProto(proto.getAmountList())
    );
  }

  public toProto(): MsgFundCommunityPool.Proto {
    const { depositor, amount } = this;
    const msgFundCommunityPool = new MsgFundCommunityPool_pb();
    msgFundCommunityPool.setDepositor(depositor);
    msgFundCommunityPool.setAmountList(amount.toProto());
    return msgFundCommunityPool;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.distribution.v1beta1.MsgFundCommunityPool');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgFundCommunityPool {
    return MsgFundCommunityPool.fromProto(
      MsgFundCommunityPool_pb.deserializeBinary(msgAny.getValue_asU8())
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
