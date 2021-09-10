import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import {
  Vote as Vote_pb,
  VoteOption,
  WeightedVoteOption as WeightedVoteOption_pb,
} from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import { Dec, Numeric } from '../numeric';
import * as Long from 'long';
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
    public option?: VoteOption // undefined except proposals in voting status
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
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOption.fromProto(o)),
      proto.option
    );
  }

  public toProto(): Vote.Proto {
    const { proposal_id, voter, options, option } = this;
    return Vote_pb.fromPartial({
      option,
      options: options.map(o => o.toProto()),
      proposalId: Long.fromNumber(proposal_id),
      voter,
    });
  }
}

export namespace Vote {
  export type Option = VoteOption;
  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    option?: VoteOption; // undefined except proposals in voting status
    options: WeightedVoteOption[];
  }

  export type Proto = Vote_pb;
}

export class WeightedVoteOption extends JSONSerializable<WeightedVoteOption.Data> {
  public weight: Dec;
  constructor(public option: VoteOption, weight: Numeric.Input) {
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
    return new WeightedVoteOption(proto.option, proto.weight);
  }

  public toProto(): WeightedVoteOption.Proto {
    const { option, weight } = this;
    return WeightedVoteOption_pb.fromPartial({
      option,
      weight: weight.toString(),
    });
  }
}

export namespace WeightedVoteOption {
  export interface Data {
    option: VoteOption;
    weight: string;
  }

  export type Proto = WeightedVoteOption_pb;
}
