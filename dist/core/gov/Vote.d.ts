import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../bech32';
import { Vote as Vote_pb, VoteOption, WeightedVoteOption as WeightedVoteOption_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
import { Dec, Numeric } from '../numeric';
/**
 * Stores vote information for a proposal
 */
export declare class Vote extends JSONSerializable<Vote.Amino, Vote.Data, Vote.Proto> {
    proposal_id: number;
    voter: AccAddress;
    options: WeightedVoteOption[];
    Option: typeof VoteOption;
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param options voting options
     */
    constructor(proposal_id: number, voter: AccAddress, options: WeightedVoteOption[]);
    static fromAmino(data: Vote.Amino, _?: boolean): Vote;
    toAmino(_?: boolean): Vote.Amino;
    static fromData(data: Vote.Data, _?: boolean): Vote;
    toData(_?: boolean): Vote.Data;
    static fromProto(proto: Vote.Proto, _?: boolean): Vote;
    toProto(_?: boolean): Vote.Proto;
}
export declare namespace Vote {
    const Option: typeof VoteOption;
    type Option = VoteOption;
    interface Amino {
        proposal_id: string;
        voter: AccAddress;
        options: WeightedVoteOption.Amino[];
    }
    interface Data {
        proposal_id: string;
        voter: AccAddress;
        options: WeightedVoteOption.Data[];
    }
    type Proto = Vote_pb;
}
export declare class WeightedVoteOption extends JSONSerializable<WeightedVoteOption.Amino, WeightedVoteOption.Data, WeightedVoteOption.Proto> {
    option: VoteOption;
    weight: Dec;
    constructor(option: VoteOption, weight: Numeric.Input);
    static fromAmino(data: WeightedVoteOption.Amino, _?: boolean): WeightedVoteOption;
    toAmino(_?: boolean): WeightedVoteOption.Amino;
    static fromData(data: WeightedVoteOption.Data, _?: boolean): WeightedVoteOption;
    toData(_?: boolean): WeightedVoteOption.Data;
    static fromProto(proto: WeightedVoteOption.Proto, _?: boolean): WeightedVoteOption;
    toProto(_?: boolean): WeightedVoteOption.Proto;
}
export declare namespace WeightedVoteOption {
    interface Amino {
        option: VoteOption;
        weight: string;
    }
    interface Data {
        option: VoteOption;
        weight: string;
    }
    type Proto = WeightedVoteOption_pb;
}
