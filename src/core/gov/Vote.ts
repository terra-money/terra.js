import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import {
  Vote as Vote_pb,
  VoteOptionMap,
  WeightedVoteOption as WeightedVoteOption_pb,
} from '@terra-money/terra.proto/src/cosmos/gov/v1beta1/gov_pb';
import { Dec, Numeric } from 'core/numeric';

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
    public options: WeightedVoteOption[],
    public option?: VoteOptionMap[keyof VoteOptionMap] // undefined except proposals in voting status
  ) {
    super();
  }

  public static fromData(data: Vote.Data): Vote {
    const { proposal_id, voter, options, option } = data;

    return new Vote(parseInt(proposal_id), voter, options, option);
  }

  public toData(): Vote.Data {
    const { proposal_id, voter, options, option } = this;

    const res: Vote.Data = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options,
      option,
    };

    return res;
  }

  public static fromProto(proto: Vote.Proto): Vote {
    return new Vote(
      proto.getProposalId(),
      proto.getVoter(),
      proto.getOptionsList().map(o => WeightedVoteOption.fromProto(o)),
      proto.getOption()
    );
  }

  public toProto(): Vote.Proto {
    const { proposal_id, voter, options, option } = this;
    const voteProto = new Vote_pb();
    voteProto.setProposalId(proposal_id);
    voteProto.setVoter(voter);
    voteProto.setOptionsList(options.map(o => o.toProto()));
    voteProto.setOption(option ?? 0);
    return voteProto;
  }
}

export namespace Vote {
  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    option?: VoteOptionMap[keyof VoteOptionMap]; // undefined except proposals in voting status
    options: WeightedVoteOption[];
  }

  export type Proto = Vote_pb;
}

export class WeightedVoteOption extends JSONSerializable<WeightedVoteOption.Data> {
  public weight: Dec;
  constructor(
    public option: VoteOptionMap[keyof VoteOptionMap],
    weight: Numeric.Input
  ) {
    super();
    this.weight = new Dec(weight);
  }

  public static fromData(data: WeightedVoteOption.Data): WeightedVoteOption {
    const { option, weight } = data;
    return new WeightedVoteOption(option, weight);
  }

  public toData(): WeightedVoteOption.Data {
    const { option, weight } = this;
    return {
      option,
      weight: weight.toString(),
    };
  }

  public static fromProto(proto: WeightedVoteOption.Proto): WeightedVoteOption {
    return new WeightedVoteOption(proto.getOption(), proto.getWeight());
  }

  public toProto(): WeightedVoteOption.Proto {
    const { option, weight } = this;
    const msgVoteProto = new WeightedVoteOption_pb();
    msgVoteProto.setOption(option);
    msgVoteProto.setWeight(weight.toString());
    return msgVoteProto;
  }
}

export namespace WeightedVoteOption {
  export interface Data {
    option: VoteOptionMap[keyof VoteOptionMap];
    weight: string;
  }

  export type Proto = WeightedVoteOption_pb;
}
