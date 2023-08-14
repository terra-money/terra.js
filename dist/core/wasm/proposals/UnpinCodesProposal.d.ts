import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { UnpinCodesProposal as UnpinCodesProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
/**
 * UnpinCodesProposal gov proposal content type to unpin a set of code ids in
 * the wasmvm cache.
 */
export declare class UnpinCodesProposal extends JSONSerializable<UnpinCodesProposal.Amino, UnpinCodesProposal.Data, UnpinCodesProposal.Proto> {
    title: string;
    description: string;
    code_ids: number[];
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param code_ids the address of the smart code_ids
     */
    constructor(title: string, description: string, code_ids: number[]);
    static fromAmino(data: UnpinCodesProposal.Amino, _?: boolean): UnpinCodesProposal;
    toAmino(_?: boolean): UnpinCodesProposal.Amino;
    static fromProto(proto: UnpinCodesProposal.Proto, _?: boolean): UnpinCodesProposal;
    toProto(_?: boolean): UnpinCodesProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): UnpinCodesProposal;
    static fromData(data: UnpinCodesProposal.Data, _?: boolean): UnpinCodesProposal;
    toData(_?: boolean): UnpinCodesProposal.Data;
}
export declare namespace UnpinCodesProposal {
    interface Amino {
        type: 'wasm/UnpinCodesProposal';
        value: {
            title: string;
            description: string;
            code_ids: string[];
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.UnpinCodesProposal';
        title: string;
        description: string;
        code_ids: string[];
    }
    type Proto = UnpinCodesProposal_pb;
}
