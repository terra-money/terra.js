import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgVote as MsgVote_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';
import { VoteOption } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
/**
 * Vote for a proposal
 */
export declare class MsgVote extends JSONSerializable<MsgVote.Amino, MsgVote.Data, MsgVote.Proto> {
    proposal_id: number;
    voter: AccAddress;
    option: VoteOption;
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    constructor(proposal_id: number, voter: AccAddress, option: VoteOption);
    static fromAmino(data: MsgVote.Amino, _?: boolean): MsgVote;
    toAmino(isClassic?: boolean): MsgVote.Amino;
    static fromData(data: MsgVote.Data, _?: boolean): MsgVote;
    toData(_?: boolean): MsgVote.Data;
    static fromProto(proto: MsgVote.Proto, _?: boolean): MsgVote;
    toProto(_?: boolean): MsgVote.Proto;
    packAny(_?: boolean): Any;
    static unpackAny(msgAny: Any, _?: boolean): MsgVote;
}
export declare namespace MsgVote {
    const Option: typeof VoteOption;
    type Option = VoteOption;
    interface Amino {
        type: 'gov/MsgVote' | 'cosmos-sdk/MsgVote';
        value: {
            proposal_id: string;
            voter: AccAddress;
            option: VoteOption;
        };
    }
    interface DataV1Beta1 {
        '@type': '/cosmos.gov.v1beta1.MsgVote';
        proposal_id: string;
        voter: AccAddress;
        option: Option;
    }
    interface DataV1 {
        '@type': '/cosmos.gov.v1.MsgVote';
        proposal_id: string;
        voter: AccAddress;
        option: Option;
    }
    type Data = DataV1Beta1 | DataV1;
    type Proto = MsgVote_pb;
}
