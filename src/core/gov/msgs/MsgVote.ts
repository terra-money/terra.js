import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

/**
 * Vote for a proposal
 */
export class MsgVote extends JSONSerializable<MsgVote.Data> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public option: number // 0: empty, 1: yes, 2: no, 3: no, 4: no_with_veto
  ) {
    super();
  }

  public static fromData(data: MsgVote.Data): MsgVote {
    const {
      value: { proposal_id, voter, option },
    } = data;
    return new MsgVote(Number.parseInt(proposal_id), voter, option);
  }

  public toData(): MsgVote.Data {
    const { proposal_id, voter, option } = this;
    return {
      type: 'gov/MsgVote',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        option,
      },
    };
  }
}

export namespace MsgVote {
  export interface Data {
    type: 'gov/MsgVote';
    value: {
      proposal_id: string;
      voter: AccAddress;
      option: number;
    };
  }
}
