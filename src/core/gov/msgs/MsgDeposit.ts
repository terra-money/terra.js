import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';

/**
 * Add a deposit for a proposal
 */
export class MsgDeposit extends JSONSerializable<MsgDeposit.Data> {
  public amount: Coins;
  /**
   * @param proposal_id Id of porposal to deposit to
   * @param depositor depositor's account address
   * @param amount amount to deposit
   */
  constructor(
    public proposal_id: number,
    public depositor: AccAddress,
    amount: Coins.Input
  ) {
    super();
    this.amount = new Coins(amount);
  }

  public static fromData(data: MsgDeposit.Data): MsgDeposit {
    const {
      value: { proposal_id, depositor, amount },
    } = data;
    return new MsgDeposit(
      Number.parseInt(proposal_id),
      depositor,
      Coins.fromData(amount)
    );
  }

  public toData(): MsgDeposit.Data {
    const { proposal_id, depositor, amount } = this;
    return {
      type: 'gov/MsgDeposit',
      value: {
        proposal_id: proposal_id.toString(),
        depositor,
        amount: amount.toData(),
      },
    };
  }
}

export namespace MsgDeposit {
  export interface Data {
    type: 'gov/MsgDeposit';
    value: {
      proposal_id: string;
      depositor: AccAddress;
      amount: Coins.Data;
    };
  }
}
