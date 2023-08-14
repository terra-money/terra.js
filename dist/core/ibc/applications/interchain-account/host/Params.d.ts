import { Params as Params_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/host/v1/host';
import { JSONSerializable } from '../../../../../util/json';
/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
export declare class Params extends JSONSerializable<Params.Amino, Params.Data, Params.Proto> {
    host_enabled: boolean;
    allowed_messages: string[];
    /**
     * @param host_enabled host_enabled enables or disables the host submodule.
     */
    constructor(host_enabled: boolean, allowed_messages: string[]);
    static fromAmino(data: Params.Amino): Params;
    toAmino(): Params.Amino;
    static fromData(data: Params.Data): Params;
    toData(): Params.Data;
    static fromProto(proto: Params.Proto): Params;
    toProto(): Params.Proto;
}
export declare namespace Params {
    interface Amino {
        host_enabled: boolean;
        allowed_messages: string[];
    }
    interface Data {
        host_enabled: boolean;
        allowed_messages: string[];
    }
    type Proto = Params_pb;
}
