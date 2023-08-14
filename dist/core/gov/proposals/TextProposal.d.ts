import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { TextProposal as TextProposal_pb } from '@terra-money/terra.proto/cosmos/gov/v1beta1/gov';
/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
export declare class TextProposal extends JSONSerializable<TextProposal.Amino, TextProposal.Data, TextProposal.Proto> {
    title: string;
    description: string;
    /**
     * @param title proposal's title
     * @param description proposal's description
     */
    constructor(title: string, description: string);
    static fromAmino(data: TextProposal.Amino, _?: boolean): TextProposal;
    toAmino(isClassic?: boolean): TextProposal.Amino;
    static fromData(proto: TextProposal.Data, _?: boolean): TextProposal;
    toData(_?: boolean): TextProposal.Data;
    static fromProto(proto: TextProposal.Proto, _?: boolean): TextProposal;
    toProto(_?: boolean): TextProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): TextProposal;
}
export declare namespace TextProposal {
    interface Amino {
        type: 'gov/TextProposal' | 'cosmos-sdk/TextProposal';
        value: {
            title: string;
            description: string;
        };
    }
    interface Data {
        '@type': '/cosmos.gov.v1beta1.TextProposal';
        title: string;
        description: string;
    }
    type Proto = TextProposal_pb;
}
