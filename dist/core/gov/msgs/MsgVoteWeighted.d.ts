import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { WeightedVoteOption } from '../Vote';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgVoteWeighted as MsgVoteWeighted_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';
/**
 * Weighted vote for a proposal
 */
export declare class MsgVoteWeighted extends JSONSerializable<MsgVoteWeighted.Amino, MsgVoteWeighted.Data, MsgVoteWeighted.Proto> {
    proposal_id: number;
    voter: AccAddress;
    options: WeightedVoteOption[];
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    constructor(proposal_id: number, voter: AccAddress, options: WeightedVoteOption[]);
    static fromAmino(data: MsgVoteWeighted.Amino, _?: boolean): MsgVoteWeighted;
    toAmino(isClassic?: boolean): MsgVoteWeighted.Amino;
    static fromData(data: MsgVoteWeighted.Data, _?: boolean): MsgVoteWeighted;
    toData(_?: boolean): MsgVoteWeighted.Data;
    static fromProto(proto: MsgVoteWeighted.Proto, _?: boolean): MsgVoteWeighted;
    toProto(_?: boolean): MsgVoteWeighted.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgVoteWeighted;
}
export declare namespace MsgVoteWeighted {
    interface Amino {
        type: 'gov/MsgVoteWeighted' | 'cosmos-sdk/MsgVoteWeighted';
        value: {
            proposal_id: string;
            voter: AccAddress;
            options: WeightedVoteOption.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted';
        proposal_id: string;
        voter: AccAddress;
        options: WeightedVoteOption.Data[];
    }
    type Proto = MsgVoteWeighted_pb;
}
