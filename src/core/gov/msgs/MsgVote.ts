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
    public option: MsgVote.Option
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

  public static fromProto(proto: MsgVote.Proto): MsgVote {
    const { proposal_id, voter, option } = proto;
    return new MsgVote(Number.parseInt(proposal_id), voter, option);
  }

  public toProto(): MsgVote.Proto {
    const { proposal_id, voter, option } = this;
    return {
      '@type': '/cosmos.gov.v1beta1.MsgVote',
      proposal_id: proposal_id.toFixed(),
      voter,
      option,
    };
  }
}

export namespace MsgVote {
  export enum Option {
    EMPTY = 0,
    YES = 1,
    ABSTAIN = 2,
    NO = 3,
    NO_WITH_VETO = 4,
  }

  export interface Data {
    type: 'gov/MsgVote';
    value: {
      proposal_id: string;
      voter: AccAddress;
      option: Option;
    };
  }

  export interface Proto {
    '@type': '/cosmos.gov.v1beta1.MsgVote';
    proposal_id: string;
    voter: AccAddress;
    option: Option;
  }
}
