import { PacketId as PacketId_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';
/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
export declare class PacketId extends JSONSerializable<PacketId.Amino, PacketId.Data, PacketId.Proto> {
    port_id: string;
    channel_id: string;
    sequence: number;
    /**
     * @param port_id  channel port identifier
     * @param channel_id channel unique identifier
     * @param sequence packet sequence
     */
    constructor(port_id: string, channel_id: string, sequence: number);
    static fromAmino(data: PacketId.Amino): PacketId;
    toAmino(): PacketId.Amino;
    static fromData(data: PacketId.Data): PacketId;
    toData(): PacketId.Data;
    static fromProto(proto: PacketId.Proto): PacketId;
    toProto(): PacketId.Proto;
}
export declare namespace PacketId {
    interface Amino {
        port_id: string;
        channel_id: string;
        sequence: string;
    }
    interface Data {
        port_id: string;
        channel_id: string;
        sequence: string;
    }
    type Proto = PacketId_pb;
}
