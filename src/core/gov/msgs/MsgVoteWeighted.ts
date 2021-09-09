import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { WeightedVoteOption } from '../Vote';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { MsgVoteWeighted as MsgVoteWeighted_pb } from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/tx_pb';

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

  public static fromProto(proto: MsgVoteWeighted.Proto): MsgVoteWeighted {
    return new MsgVoteWeighted(
      proto.getProposalId(),
      proto.getVoter(),
      proto.getOptionsList().map(o => WeightedVoteOption.fromProto(o))
    );
  }

  public toProto(): MsgVoteWeighted.Proto {
    const { proposal_id, voter, options } = this;
    const msgVoteProto = new MsgVoteWeighted_pb();
    msgVoteProto.setProposalId(proposal_id);
    msgVoteProto.setVoter(voter);
    msgVoteProto.setOptionsList(options.map(o => o.toProto()));
    return msgVoteProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.gov.v1beta1.MsgVoteWeighted');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgVoteWeighted {
    return MsgVoteWeighted.fromProto(
      MsgVoteWeighted_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgVoteWeighted {
  export type Options = WeightedVoteOption[];

  export interface Data {
    type: 'gov/MsgVoteWeighted';
    value: {
      proposal_id: string;
      voter: AccAddress;
      options: Options;
    };
  }

  export type Proto = MsgVoteWeighted_pb;
}
