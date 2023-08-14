import { AccessConfigUpdate as AccessConfigUpdate_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/proposal';
import { JSONSerializable } from '../../util/json';
import { AccessConfig } from './AccessConfig';
/**
 *
 */
export declare class AccessConfigUpdate extends JSONSerializable<AccessConfigUpdate.Amino, AccessConfigUpdate.Data, AccessConfigUpdate.Proto> {
    code_id: number;
    instantiate_permission?: AccessConfig | undefined;
    /**
     * @param code_id the reference to the stored WASM code to be updated
     * @param instantiate_permission to apply to the set of code ids
     */
    constructor(code_id: number, instantiate_permission?: AccessConfig | undefined);
    static fromAmino(data: AccessConfigUpdate.Amino): AccessConfigUpdate;
    toAmino(): AccessConfigUpdate.Amino;
    static fromData(data: AccessConfigUpdate.Data): AccessConfigUpdate;
    toData(): AccessConfigUpdate.Data;
    static fromProto(proto: AccessConfigUpdate.Proto): AccessConfigUpdate;
    toProto(): AccessConfigUpdate.Proto;
}
export declare namespace AccessConfigUpdate {
    interface Amino {
        code_id: string;
        instantiate_permission?: AccessConfig.Amino;
    }
    interface Data {
        code_id: string;
        instantiate_permission?: AccessConfig.Data;
    }
    type Proto = AccessConfigUpdate_pb;
}
