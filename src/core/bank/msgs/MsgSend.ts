import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';

/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
export class MsgSend extends JSONSerializable<MsgSend.Data> {
  /**
   * value of the transaction
   */
  public amount: Coins;

  /**
   * @param from_address sender's address
   * @param to_address recipient's address
   * @param amount value of the transaction
   */
  constructor(
    public from_address: AccAddress,
    public to_address: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromData(data: MsgSend.Data): MsgSend {
    const {
      value: { from_address, to_address, amount },
    } = data;
    return new MsgSend(from_address, to_address, Coins.fromData(amount));
  }

  public toData(): MsgSend.Data {
    const { from_address, to_address, amount } = this;
    return {
      type: 'bank/MsgSend',
      value: {
        from_address,
        to_address,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgSend {
  export interface Data {
    type: 'bank/MsgSend';
    value: {
      from_address: AccAddress;
      to_address: AccAddress;
      amount: Coins.Data;
    };
  }
}
