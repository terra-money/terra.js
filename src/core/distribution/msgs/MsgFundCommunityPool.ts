import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coins } from '../../Coins';

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
    const { depositor, amount } = proto;
    return new MsgFundCommunityPool(depositor, Coins.fromData(amount));
  }

  public toProto(): MsgFundCommunityPool.Proto {
    const { depositor, amount } = this;
    return {
      '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
      depositor,
      amount: amount.toData(),
    };
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

  export interface Proto {
    '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool';
    depositor: AccAddress;
    amount: Coins.Data;
  }
}
