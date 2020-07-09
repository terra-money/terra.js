import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';

export class MsgExecAuthorized extends JSONSerializable<
  MsgExecAuthorized.Data
> {
  public amount: Coins;
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(public depositor: AccAddress, amount: Coins.Input) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromData(data: MsgExecAuthorized.Data): MsgExecAuthorized {
    const {
      value: { depositor, amount },
    } = data;
    return new MsgExecAuthorized(depositor, Coins.fromData(amount));
  }

  public toData(): MsgExecAuthorized.Data {
    const { depositor, amount } = this;
    return {
      type: 'msgauth/MsgExecAuthorized',
      value: {
        depositor,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgExecAuthorized {
  export interface Data {
    type: 'msgauth/MsgExecAuthorized';
    value: {
      depositor: AccAddress;
      amount: Coins.Data;
    };
  }
}
