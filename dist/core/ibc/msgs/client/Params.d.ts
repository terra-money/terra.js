import { Params as Params_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';
/**
 * Params defines the set of IBC light client parameters.
 */
export declare class Params extends JSONSerializable<Params.Amino, Params.Data, Params.Proto> {
    allowed_clients: string[];
    /**
     * @param allowed_clients allowed_clients defines the list of allowed client state types.
     */
    constructor(allowed_clients: string[]);
    static fromAmino(data: Params.Amino): Params;
    toAmino(): Params.Amino;
    static fromData(data: Params.Data): Params;
    toData(): Params.Data;
    static fromProto(proto: Params.Proto): Params;
    toProto(): Params.Proto;
}
export declare namespace Params {
    interface Amino {
        allowed_clients: string[];
    }
    interface Data {
        allowed_clients: string[];
    }
    type Proto = Params_pb;
}
