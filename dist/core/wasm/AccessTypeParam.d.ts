import { AccessType, AccessTypeParam as AccessTypeParam_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { JSONSerializable } from '../../util/json';
export { AccessType };
/**
 *
 */
export declare class AccessTypeParam extends JSONSerializable<AccessTypeParam.Amino, AccessTypeParam.Data, AccessTypeParam.Proto> {
    value: AccessType;
    /**
     * @param value access type
     */
    constructor(value: AccessType);
    static fromAmino(data: AccessTypeParam.Amino): AccessTypeParam;
    toAmino(): AccessTypeParam.Amino;
    static fromData(data: AccessTypeParam.Data): AccessTypeParam;
    toData(): AccessTypeParam.Data;
    static fromProto(proto: AccessTypeParam.Proto): AccessTypeParam;
    toProto(): AccessTypeParam.Proto;
}
export declare namespace AccessTypeParam {
    interface Amino {
        value: string;
    }
    interface Data {
        value: string;
    }
    type Proto = AccessTypeParam_pb;
}
