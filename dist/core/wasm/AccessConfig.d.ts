import { AccessType, AccessConfig as AccessConfig_pb } from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { AccAddress } from '../bech32';
import { JSONSerializable } from '../../util/json';
export { AccessType };
/**
 *
 */
export declare class AccessConfig extends JSONSerializable<AccessConfig.Amino, AccessConfig.Data, AccessConfig.Proto> {
    permission: AccessType;
    address: AccAddress;
    /**
     * @param permission access type
     * @param address
     */
    constructor(permission: AccessType, address: AccAddress);
    static fromAmino(data: AccessConfig.Amino): AccessConfig;
    toAmino(): AccessConfig.Amino;
    static fromData(data: AccessConfig.Data): AccessConfig;
    toData(): AccessConfig.Data;
    static fromProto(proto: AccessConfig.Proto): AccessConfig;
    toProto(): AccessConfig.Proto;
}
export declare namespace AccessConfig {
    interface Amino {
        permission: string;
        address: string;
    }
    interface Data {
        permission: string;
        address: string;
    }
    type Proto = AccessConfig_pb;
}
