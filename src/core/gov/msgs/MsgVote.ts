import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgVote as MsgVote_pb } from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/tx_pb';
import {
  VoteOption,
  VoteOptionMap,
} from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/gov_pb';

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
    public option: VoteOptionMap[keyof VoteOptionMap]
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
    return new MsgVote(
      proto.getProposalId(),
      proto.getVoter(),
      proto.getOption()
    );
  }

  public toProto(): MsgVote.Proto {
    const { proposal_id, voter, option } = this;
    const msgVoteProto = new MsgVote_pb();
    msgVoteProto.setProposalId(proposal_id);
    msgVoteProto.setVoter(voter);
    msgVoteProto.setOption(option);
    return msgVoteProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.gov.v1beta1.MsgVote');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgVote {
    return MsgVote.fromProto(
      MsgVote_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgVote {
  export const Option: VoteOptionMap = VoteOption;
  export interface Data {
    type: 'gov/MsgVote';
    value: {
      proposal_id: string;
      voter: AccAddress;
      option: VoteOptionMap[keyof VoteOptionMap];
    };
  }

  export type Proto = MsgVote_pb;
}
