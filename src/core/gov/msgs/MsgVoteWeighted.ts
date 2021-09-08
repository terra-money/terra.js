import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { MsgVote } from './MsgVote';

/**
 * Weighted vote for a proposal
 */
export class MsgVoteWeighted extends JSONSerializable<MsgVoteWeighted.Data> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: MsgVoteWeighted.Options
  ) {
    super();
  }

  public static fromData(data: MsgVoteWeighted.Data): MsgVoteWeighted {
    const {
      value: { proposal_id, voter, options },
    } = data;
    return new MsgVoteWeighted(Number.parseInt(proposal_id), voter, options);
  }

  public toData(): MsgVoteWeighted.Data {
    const { proposal_id, voter, options } = this;
    return {
      type: 'gov/MsgVoteWeighted',
      value: {
        proposal_id: proposal_id.toFixed(),
        voter,
        options,
      },
    };
  }
}

export namespace MsgVoteWeighted {
  export type Options = {
    option: MsgVote.Option;
    weight: string;
  }[];

  export interface Data {
    type: 'gov/MsgVoteWeighted';
    value: {
      proposal_id: string;
      voter: AccAddress;
      options: Options;
    };
  }
}
