import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PinCodesProposal as PinCodesProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
/**
 * PinCodesProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export declare class PinCodesProposal extends JSONSerializable<PinCodesProposal.Amino, PinCodesProposal.Data, PinCodesProposal.Proto> {
    title: string;
    description: string;
    code_ids: number[];
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param code_ids the address of the smart code_ids
     */
    constructor(title: string, description: string, code_ids: number[]);
    static fromAmino(data: PinCodesProposal.Amino, _?: boolean): PinCodesProposal;
    toAmino(_?: boolean): PinCodesProposal.Amino;
    static fromProto(proto: PinCodesProposal.Proto, _?: boolean): PinCodesProposal;
    toProto(_?: boolean): PinCodesProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): PinCodesProposal;
    static fromData(data: PinCodesProposal.Data, _?: boolean): PinCodesProposal;
    toData(_?: boolean): PinCodesProposal.Data;
}
export declare namespace PinCodesProposal {
    interface Amino {
        type: 'wasm/PinCodesProposal';
        value: {
            title: string;
            description: string;
            code_ids: string[];
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.PinCodesProposal';
        title: string;
        description: string;
        code_ids: string[];
    }
    type Proto = PinCodesProposal_pb;
}
