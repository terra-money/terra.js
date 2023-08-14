import { Counterparty as Counterparty_pb } from '@terra-money/terra.proto/ibc/core/connection/v1/connection';
import { JSONSerializable } from '../../../../util/json';
import { MerklePrefix } from '../commitment/MerklePrefix';
/** Counterparty defines a channel end counterparty */
export declare class Counterparty extends JSONSerializable<Counterparty.Amino, Counterparty.Data, Counterparty.Proto> {
    client_id: string;
    connection_id: string;
    prefix?: MerklePrefix | undefined;
    /**
     * @param client_id identifies the client on the counterparty chain associated with a given connection.
     * @param connection_id identifies the connection end on the counterparty chain associated with a given connection.
     * @param prefix commitment merkle prefix of the counterparty chain.
     */
    constructor(client_id: string, connection_id: string, prefix?: MerklePrefix | undefined);
    static fromAmino(data: Counterparty.Amino): Counterparty;
    toAmino(): Counterparty.Amino;
    static fromData(data: Counterparty.Data): Counterparty;
    toData(): Counterparty.Data;
    static fromProto(proto: Counterparty.Proto): Counterparty;
    toProto(): Counterparty.Proto;
}
export declare namespace Counterparty {
    interface Amino {
        client_id: string;
        connection_id: string;
        prefix?: MerklePrefix.Amino;
    }
    interface Data {
        client_id: string;
        connection_id: string;
        prefix?: MerklePrefix.Data;
    }
    type Proto = Counterparty_pb;
}
