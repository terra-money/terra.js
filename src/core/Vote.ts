import { JSONSerializable } from '../util/json';
import { AccAddress } from './bech32';
import { MsgVote } from './';

/**
 * Stores vote information for a proposal
 */
export class Vote extends JSONSerializable<Vote.Data> {
  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param option one of voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public option: MsgVote.Option
  ) {
    super();
  }

  public static fromData(data: Vote.Data): Vote {
    const { proposal_id, voter, option } = data;
    return new Vote(parseInt(proposal_id), voter, option);
  }

  public toData(): Vote.Data {
    const { proposal_id, voter, option } = this;
    return {
      proposal_id: proposal_id.toFixed(),
      voter,
      option,
    };
  }
}

export namespace Vote {
  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    option: MsgVote.Option;
  }
}
