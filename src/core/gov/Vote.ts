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
export class Vote extends JSONSerializable<Vote.Amino, Vote.Data, Vote.Proto> {
  public Option = VoteOption;

  /**
   * @param proposal_id ID of proposal to vote on
   * @param voter voter's account address
   * @param options voting options
   */
  constructor(
    public proposal_id: number,
    public voter: AccAddress,
    public options: WeightedVoteOption[]
  ) {
    super();
  }

  public static fromAmino(data: Vote.Amino, _?: boolean): Vote {
    _;
    const { proposal_id, voter, options } = data;
    return new Vote(
      Number.parseInt(proposal_id),
      voter,
      options.map(v => WeightedVoteOption.fromAmino(v))
    );
  }

  public toAmino(_?: boolean): Vote.Amino {
    _;
    const { proposal_id, voter, options } = this;

    const res: Vote.Amino = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(v => v.toAmino()),
    };

    return res;
  }

  public static fromData(data: Vote.Data, _?: boolean): Vote {
    _;
    const { proposal_id, voter, options } = data;
    return new Vote(
      Number.parseInt(proposal_id),
      voter,
      options.map(v => WeightedVoteOption.fromData(v))
    );
  }

  public toData(_?: boolean): Vote.Data {
    _;
    const { proposal_id, voter, options } = this;

    const res: Vote.Data = {
      proposal_id: proposal_id.toFixed(),
      voter,
      options: options.map(v => v.toData()),
    };

    return res;
  }

  public static fromProto(proto: Vote.Proto, _?: boolean): Vote {
    _;
    return new Vote(
      proto.proposalId.toNumber(),
      proto.voter,
      proto.options.map(o => WeightedVoteOption.fromProto(o))
    );
  }

  public toProto(_?: boolean): Vote.Proto {
    _;
    const { proposal_id, voter, options } = this;
    return Vote_pb.fromPartial({
      options: options.map(o => o.toProto()),
      proposalId: Long.fromNumber(proposal_id),
      voter,
    });
  }
}

export namespace Vote {
  export const Option = VoteOption;
  export type Option = VoteOption;

  export interface Amino {
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOption.Amino[];
  }

  export interface Data {
    proposal_id: string;
    voter: AccAddress;
    options: WeightedVoteOption.Data[];
  }

  export type Proto = Vote_pb;
}

export class WeightedVoteOption extends JSONSerializable<
  WeightedVoteOption.Amino,
  WeightedVoteOption.Data,
  WeightedVoteOption.Proto
> {
  public weight: Dec;
  constructor(public option: VoteOption, weight: Numeric.Input) {
    super();
    this.weight = new Dec(weight);
  }

  public static fromAmino(
    data: WeightedVoteOption.Amino,
    _?: boolean
  ): WeightedVoteOption {
    _;
    const { option, weight } = data;
    return new WeightedVoteOption(option, weight);
  }

  public toAmino(_?: boolean): WeightedVoteOption.Amino {
    _;
    const { option, weight } = this;
    return {
      option,
      weight: weight.toString(),
    };
  }

  public static fromData(
    data: WeightedVoteOption.Data,
    _?: boolean
  ): WeightedVoteOption {
    _;
    const { option, weight } = data;
    return new WeightedVoteOption(option, weight);
  }

  public toData(_?: boolean): WeightedVoteOption.Data {
    _;
    const { option, weight } = this;
    return {
      option,
      weight: weight.toString(),
    };
  }

  public static fromProto(
    proto: WeightedVoteOption.Proto,
    _?: boolean
  ): WeightedVoteOption {
    _;
    return new WeightedVoteOption(proto.option, proto.weight);
  }

  public toProto(_?: boolean): WeightedVoteOption.Proto {
    _;
    const { option, weight } = this;
    return WeightedVoteOption_pb.fromPartial({
      option,
      weight: weight.toString(),
    });
  }
}

export namespace WeightedVoteOption {
  export interface Amino {
    option: VoteOption;
    weight: string;
  }

  export interface Data {
    option: VoteOption;
    weight: string;
  }

  export type Proto = WeightedVoteOption_pb;
}
