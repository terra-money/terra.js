import { Packet as Packet_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';
import { Height } from '../client/Height';
/** Packet defines a type that carries data across different chains through IBC */
export declare class Packet extends JSONSerializable<Packet.Amino, Packet.Data, Packet.Proto> {
    sequence: number;
    source_port: string;
    source_channel: string;
    destination_port: string;
    destination_channel: string;
    data: string;
    timeout_height: Height | undefined;
    timeout_timestamp: number;
    /**
     * @param port_id port on the counterparty chain which owns the other end of the channel.
     * @param channel_id channel end on the counterparty chain
     */
    constructor(sequence: number, source_port: string, source_channel: string, destination_port: string, destination_channel: string, data: string, timeout_height: Height | undefined, timeout_timestamp: number);
    static fromAmino(_data: Packet.Amino): Packet;
    toAmino(): Packet.Amino;
    static fromData(_data: Packet.Data): Packet;
    toData(): Packet.Data;
    static fromProto(proto: Packet.Proto): Packet;
    toProto(): Packet.Proto;
}
export declare namespace Packet {
    interface Amino {
        sequence: number;
        source_port: string;
        source_channel: string;
        destination_port: string;
        destination_channel: string;
        data: string;
        timeout_height?: Height.Amino;
        timeout_timestamp: number;
    }
    interface Data {
        sequence: number;
        source_port: string;
        source_channel: string;
        destination_port: string;
        destination_channel: string;
        data: string;
        timeout_height?: Height.Data;
        timeout_timestamp: string;
    }
    type Proto = Packet_pb;
}
