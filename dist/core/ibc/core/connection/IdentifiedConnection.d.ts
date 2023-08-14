import { IdentifiedConnection as IdentifiedConnection_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { JSONSerializable } from '../../../../util/json';
import { Version } from './Version';
import { State, stateFromJSON, stateToJSON } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { Counterparty } from './Counterparty';
export { State, stateFromJSON, stateToJSON };
/**
 * IdentifiedConnection defines a connection with additional connection identifier field
 */
export declare class IdentifiedConnection extends JSONSerializable<IdentifiedConnection.Amino, IdentifiedConnection.Data, IdentifiedConnection.Proto> {
    id: string;
    client_id: string;
    versions: Version[];
    state: State;
    counterparty: Counterparty | undefined;
    delay_period: number;
    /**
     * @param id connection identifier
     * @param client_id client associated with this connection.
     * @param versions IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection
     * @param state current state of the connection end
     * @param counterparty counterparty chain associated with this connection
     * @param delay_period delay period associated with this connection
     */
    constructor(id: string, client_id: string, versions: Version[], state: State, counterparty: Counterparty | undefined, delay_period: number);
    static fromAmino(data: IdentifiedConnection.Amino): IdentifiedConnection;
    toAmino(): IdentifiedConnection.Amino;
    static fromData(data: IdentifiedConnection.Data): IdentifiedConnection;
    toData(): IdentifiedConnection.Data;
    static fromProto(proto: IdentifiedConnection.Proto): IdentifiedConnection;
    toProto(): IdentifiedConnection.Proto;
}
export declare namespace IdentifiedConnection {
    interface Amino {
        id: string;
        client_id: string;
        versions: Version.Amino[];
        state: string;
        counterparty?: Counterparty.Amino;
        delay_period: string;
    }
    interface Data {
        id: string;
        client_id: string;
        versions: Version.Data[];
        state: string;
        counterparty?: Counterparty.Data;
        delay_period: string;
    }
    type Proto = IdentifiedConnection_pb;
}
