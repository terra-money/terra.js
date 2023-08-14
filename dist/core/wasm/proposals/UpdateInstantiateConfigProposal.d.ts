import { JSONSerializable } from '../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { UpdateInstantiateConfigProposal as UpdateInstantiateConfigProposal_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import { AccessConfigUpdate } from '../AccessConfigUpdate';
/**
 * UpdateInstantiateConfigProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
export declare class UpdateInstantiateConfigProposal extends JSONSerializable<UpdateInstantiateConfigProposal.Amino, UpdateInstantiateConfigProposal.Data, UpdateInstantiateConfigProposal.Proto> {
    title: string;
    description: string;
    access_config_updates: AccessConfigUpdate[];
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param access_config_updates the address of the smart access_config_updates
     */
    constructor(title: string, description: string, access_config_updates: AccessConfigUpdate[]);
    static fromAmino(data: UpdateInstantiateConfigProposal.Amino, _?: boolean): UpdateInstantiateConfigProposal;
    toAmino(_?: boolean): UpdateInstantiateConfigProposal.Amino;
    static fromProto(proto: UpdateInstantiateConfigProposal.Proto, _?: boolean): UpdateInstantiateConfigProposal;
    toProto(_?: boolean): UpdateInstantiateConfigProposal.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): UpdateInstantiateConfigProposal;
    static fromData(data: UpdateInstantiateConfigProposal.Data, _?: boolean): UpdateInstantiateConfigProposal;
    toData(_?: boolean): UpdateInstantiateConfigProposal.Data;
}
export declare namespace UpdateInstantiateConfigProposal {
    interface Amino {
        type: 'wasm/UpdateInstantiateConfigProposal';
        value: {
            title: string;
            description: string;
            access_config_updates: AccessConfigUpdate.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal';
        title: string;
        description: string;
        access_config_updates: AccessConfigUpdate.Data[];
    }
    type Proto = UpdateInstantiateConfigProposal_pb;
}
