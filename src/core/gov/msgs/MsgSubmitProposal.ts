import { Coins } from '../../Coins';
import { Proposal } from '../../Proposal';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';

/**
 * Submit a proposal alongside an initial deposit.
 */
export class MsgSubmitProposal extends JSONSerializable<
  MsgSubmitProposal.Data
> {
  /**
   * @param content proposal content to submit
   * @param initial_deposit deposit provided
   * @param proposer proposer's account address
   */
  constructor(
    public content: Proposal.Content,
    public initial_deposit: Coins,
    public proposer: AccAddress
  ) {
    super();
  }

  public static fromData(data: MsgSubmitProposal.Data): MsgSubmitProposal {
    const {
      value: { content, initial_deposit, proposer },
    } = data;
    return new MsgSubmitProposal(
      Proposal.Content.fromData(content),
      Coins.fromData(initial_deposit),
      proposer
    );
  }

  public toData(): MsgSubmitProposal.Data {
    const { content, initial_deposit, proposer } = this;
    console.log(proposer);
    return {
      type: 'gov/MsgSubmitProposal',
      value: {
        content: content.toData(),
        initial_deposit: initial_deposit.toData(),
        proposer,
      },
    };
  }
}

export namespace MsgSubmitProposal {
  export interface Data {
    type: 'gov/MsgSubmitProposal';
    value: {
      content: Proposal.Content.Data;
      initial_deposit: Coins.Data;
      proposer: AccAddress;
    };
  }
}
