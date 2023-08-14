import { Params as Params_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/controller';
import { JSONSerializable } from '../../../../../util/json';
/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the controller submodule.
 */
export declare class Params extends JSONSerializable<Params.Amino, Params.Data, Params.Proto> {
    controller_enabled: boolean;
    /**
     * @param controller_enabled controller_enabled enables or disables the controller submodule
     */
    constructor(controller_enabled: boolean);
    static fromAmino(data: Params.Amino): Params;
    toAmino(): Params.Amino;
    static fromData(data: Params.Data): Params;
    toData(): Params.Data;
    static fromProto(proto: Params.Proto): Params;
    toProto(): Params.Proto;
}
export declare namespace Params {
    interface Amino {
        controller_enabled: boolean;
    }
    interface Data {
        controller_enabled: boolean;
    }
    type Proto = Params_pb;
}
