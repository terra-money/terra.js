import { Metadata as Metadata_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/metadata';
import { JSONSerializable } from '../../../../util/json';
/**
 * Metadata defines a set of protocol specific data encoded into the ICS27 channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
export declare class Metadata extends JSONSerializable<Metadata.Amino, Metadata.Data, Metadata.Proto> {
    version: string;
    controller_connection_id: string;
    host_connection_id: string;
    address: string;
    encoding: string;
    tx_type: string;
    /**
     * @param version defines the ICS27 protocol version
     * @param controller_connection_id is the connection identifier associated with the controller chain
     * @param host_connection_id is the connection identifier associated with the host chain
     * @param address defines the interchain account address to be fulfilled upon the OnChanOpenTry handshake step ( NOTE: the address field is empty on the OnChanOpenInit handshake step)
     * @param encoding defines the supported codec format
     * @param tx_type defines the type of transactions the interchain account can execute
     */
    constructor(version: string, controller_connection_id: string, host_connection_id: string, address: string, encoding: string, tx_type: string);
    static fromAmino(data: Metadata.Amino): Metadata;
    toAmino(): Metadata.Amino;
    static fromData(data: Metadata.Data): Metadata;
    toData(): Metadata.Data;
    static fromProto(proto: Metadata.Proto): Metadata;
    toProto(): Metadata.Proto;
}
export declare namespace Metadata {
    interface Amino {
        version: string;
        controller_connection_id: string;
        host_connection_id: string;
        address: string;
        encoding: string;
        tx_type: string;
    }
    interface Data {
        version: string;
        controller_connection_id: string;
        host_connection_id: string;
        address: string;
        encoding: string;
        tx_type: string;
    }
    type Proto = Metadata_pb;
}
