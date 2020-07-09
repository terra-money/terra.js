import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Coins } from '../../Coins';

export class MsgGrantAuthorization extends JSONSerializable<
  MsgGrantAuthorization.Data
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
    data: MsgGrantAuthorization.Data
  ): MsgGrantAuthorization {
    const {
      value: { depositor, amount },
    } = data;
    return new MsgGrantAuthorization(depositor, Coins.fromData(amount));
  }

  public toData(): MsgGrantAuthorization.Data {
    const { depositor, amount } = this;
    return {
      type: 'msgauth/MsgGrantAuthorization',
      value: {
        depositor,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgGrantAuthorization {
  export interface Data {
    type: 'msgauth/MsgGrantAuthorization';
    value: {
      depositor: AccAddress;
      amount: Coins.Data;
    };
  }
}
