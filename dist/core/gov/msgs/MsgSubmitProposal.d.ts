import { Coins } from '../../Coins';
import { Proposal } from '../Proposal';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSubmitProposal as MsgSubmitProposal_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/tx';
/**
 * Submit a proposal alongside an initial deposit.
 */
export declare class MsgSubmitProposal extends JSONSerializable<MsgSubmitProposal.Amino, MsgSubmitProposal.Data, MsgSubmitProposal.Proto> {
    content: Proposal.Content;
    proposer: AccAddress;
    initial_deposit: Coins;
    /**
     * @param content proposal content to submit
     * @param initial_deposit deposit provided
     * @param proposer proposer's account address
     */
    constructor(content: Proposal.Content, initial_deposit: Coins.Input, proposer: AccAddress);
    static fromAmino(data: MsgSubmitProposal.Amino, isClassic?: boolean): MsgSubmitProposal;
    toAmino(isClassic?: boolean): MsgSubmitProposal.Amino;
    static fromData(data: MsgSubmitProposal.Data, isClassic?: boolean): MsgSubmitProposal;
    toData(isClassic?: boolean): MsgSubmitProposal.Data;
    static fromProto(proto: MsgSubmitProposal.Proto, isClassic?: boolean): MsgSubmitProposal;
    toProto(isClassic?: boolean): MsgSubmitProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgSubmitProposal;
}
export declare namespace MsgSubmitProposal {
    interface Amino {
        type: 'gov/MsgSubmitProposal' | 'cosmos-sdk/MsgSubmitProposal';
        value: {
            content: Proposal.Content.Amino;
            initial_deposit: Coins.Amino;
            proposer: AccAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal';
        content: Proposal.Content.Data;
        initial_deposit: Coins.Data;
        proposer: AccAddress;
    }
    type Proto = MsgSubmitProposal_pb;
}
