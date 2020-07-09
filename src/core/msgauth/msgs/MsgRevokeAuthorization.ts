import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';

export class MsgRevokeAuthorization extends JSONSerializable<
  MsgRevokeAuthorization.Data
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

  public static fromData(
    data: MsgRevokeAuthorization.Data
  ): MsgRevokeAuthorization {
    const {
      value: { depositor, amount },
    } = data;
    return new MsgRevokeAuthorization(depositor, Coins.fromData(amount));
  }

  public toData(): MsgRevokeAuthorization.Data {
    const { depositor, amount } = this;
    return {
      type: 'msgauth/MsgRevokeAuthorization',
      value: {
        depositor,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgRevokeAuthorization {
  export interface Data {
    type: 'msgauth/MsgRevokeAuthorization';
    value: {
      depositor: AccAddress;
      amount: Coins.Data;
    };
  }
}
