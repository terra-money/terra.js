import { ClientConsensusStates as ClientConsensusStates_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';
import { ConsensusStateWithHeight } from './ConsensusStateWithHeight';
/**
 * ClientConsensusStates defines all the stored consensus states for a given client/
 */
export declare class ClientConsensusStates extends JSONSerializable<ClientConsensusStates.Amino, ClientConsensusStates.Data, ClientConsensusStates.Proto> {
    client_id: string;
    consensus_states: ConsensusStateWithHeight[];
    /**
     * @param client_id client identifier
     * @param consensus_states consensus states and their heights associated with the client
     */
    constructor(client_id: string, consensus_states: ConsensusStateWithHeight[]);
    static fromAmino(data: ClientConsensusStates.Amino): ClientConsensusStates;
    toAmino(): ClientConsensusStates.Amino;
    static fromData(data: ClientConsensusStates.Data): ClientConsensusStates;
    toData(): ClientConsensusStates.Data;
    static fromProto(proto: ClientConsensusStates.Proto): ClientConsensusStates;
    toProto(): ClientConsensusStates.Proto;
}
export declare namespace ClientConsensusStates {
    interface Amino {
        client_id: string;
        consensus_states: ConsensusStateWithHeight.Amino[];
    }
    interface Data {
        client_id: string;
        consensus_states: ConsensusStateWithHeight.Data[];
    }
    type Proto = ClientConsensusStates_pb;
}
