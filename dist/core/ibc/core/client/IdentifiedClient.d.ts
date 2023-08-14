import { IdentifiedClientState as IdentifiedClientState_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';
/**
 * IdentifiedClientState defines a client state with an additional client identifier field
 */
export declare class IdentifiedClientState extends JSONSerializable<IdentifiedClientState.Amino, IdentifiedClientState.Data, IdentifiedClientState.Proto> {
    client_id: string;
    client_state: any;
    /**
     * @param client_id client identifier
     * @param client_state client state
     */
    constructor(client_id: string, client_state: any);
    static fromAmino(data: IdentifiedClientState.Amino): IdentifiedClientState;
    toAmino(): IdentifiedClientState.Amino;
    static fromData(data: IdentifiedClientState.Data): IdentifiedClientState;
    toData(): IdentifiedClientState.Data;
    static fromProto(proto: IdentifiedClientState.Proto): IdentifiedClientState;
    toProto(): IdentifiedClientState.Proto;
}
export declare namespace IdentifiedClientState {
    interface Amino {
        client_id: string;
        client_state: any;
    }
    interface Data {
        client_id: string;
        client_state: any;
    }
    type Proto = IdentifiedClientState_pb;
}
