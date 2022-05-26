import { PacketId as PacketId_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';
import * as Long from 'long';

/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
export class PacketId extends JSONSerializable<
    PacketId.Amino,
    PacketId.Data,
    PacketId.Proto
> {
    /** 
     * @param port_id  channel port identifier
     * @param channel_id channel unique identifier
     * @param sequence packet sequence
     */
    constructor(
        public port_id: string,
        public channel_id: string,
        public sequence: number
    ) {
        super();
    }

    public static fromAmino(data: PacketId.Amino): PacketId {
        const { port_id, channel_id, sequence } = data;
        return new PacketId(port_id, channel_id, Number.parseInt(sequence));
    }

    public toAmino(): PacketId.Amino {
        const { port_id, channel_id, sequence } = this;
        const res: PacketId.Amino = {
            port_id,
            channel_id,
            sequence: sequence.toFixed(),
        };
        return res;
    }

    public static fromData(data: PacketId.Data): PacketId {
        const { port_id, channel_id, sequence } = data;
        return new PacketId(
            port_id,
            channel_id,
            Number.parseInt(sequence),
        );
    }

    public toData(): PacketId.Data {
        const { port_id, channel_id, sequence } = this;
        const res: PacketId.Data = {
            port_id,
            channel_id,
            sequence: sequence.toFixed(),
        };
        return res;
    }

    public static fromProto(proto: PacketId.Proto): PacketId {
        return new PacketId(
            proto.portId,
            proto.channelId,
            proto.sequence.toNumber(),
        );
    }

    public toProto(): PacketId.Proto {
        const { port_id, channel_id, sequence } = this;
        return PacketId_pb.fromPartial({
            portId: port_id,
            channelId: channel_id,
            sequence: Long.fromNumber(sequence),
        });
    }
}

export namespace PacketId {
    export interface Amino {
        port_id: string;
        channel_id: string;
        sequence: string;
    }

    export interface Data {
        port_id: string;
        channel_id: string;
        sequence: string;
    }

    export type Proto = PacketId_pb;
}
