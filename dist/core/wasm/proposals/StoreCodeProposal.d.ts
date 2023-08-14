import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { StoreCodeProposal as StoreCodeProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import { AccessConfig } from '../AccessConfig';
/**
 * StoreCodeProposal gov proposal content type to submit WASM code to the system
 */
export declare class StoreCodeProposal extends JSONSerializable<StoreCodeProposal.Amino, StoreCodeProposal.Data, StoreCodeProposal.Proto> {
    title: string;
    description: string;
    run_as: string;
    wasm_byte_code: string;
    instantiate_permission?: AccessConfig | undefined;
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as the address that is passed to the contract's environment as sender
     * @param wasm_byte_code can be raw or gzip compressed
     * @param instantiate_permission to apply on contract creation, optional
     */
    constructor(title: string, description: string, run_as: string, wasm_byte_code: string, instantiate_permission?: AccessConfig | undefined);
    static fromAmino(data: StoreCodeProposal.Amino, _?: boolean): StoreCodeProposal;
    toAmino(_?: boolean): StoreCodeProposal.Amino;
    static fromData(data: StoreCodeProposal.Data, _?: boolean): StoreCodeProposal;
    toData(_?: boolean): StoreCodeProposal.Data;
    static fromProto(proto: StoreCodeProposal.Proto, _?: boolean): StoreCodeProposal;
    toProto(_?: boolean): StoreCodeProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): StoreCodeProposal;
}
export declare namespace StoreCodeProposal {
    interface Amino {
        type: 'wasm/StoreCodeProposal';
        value: {
            title: string;
            description: string;
            run_as: AccAddress;
            wasm_byte_code: string;
            instantiate_permission?: AccessConfig.Amino;
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.StoreCodeProposal';
        title: string;
        description: string;
        run_as: AccAddress;
        wasm_byte_code: string;
        instantiate_permission?: AccessConfig.Data;
    }
    type Proto = StoreCodeProposal_pb;
}
