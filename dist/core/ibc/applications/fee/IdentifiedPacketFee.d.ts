import { IdentifiedPacketFees as IdentifiedPacketFees_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/fee';
import { JSONSerializable } from '../../../../util/json';
import { PacketFee } from './PacketFee';
import { PacketId } from '../../core/channel/PacketId';
/**
 *  IdentifiedPacketFees contains a list of type PacketFee and associated PacketId
 */
export declare class IdentifiedPacketFees extends JSONSerializable<IdentifiedPacketFees.Amino, IdentifiedPacketFees.Data, IdentifiedPacketFees.Proto> {
    packet_id: PacketId | undefined;
    packet_fees: PacketFee[];
    /**
     * @param packet_id unique packet identifier comprised of the channel ID, port ID and sequence
     * @param packet_fees list of packet fees
     */
    constructor(packet_id: PacketId | undefined, packet_fees?: PacketFee[]);
    static fromAmino(data: IdentifiedPacketFees.Amino): IdentifiedPacketFees;
    toAmino(): IdentifiedPacketFees.Amino;
    static fromData(data: IdentifiedPacketFees.Data): IdentifiedPacketFees;
    toData(): IdentifiedPacketFees.Data;
    static fromProto(proto: IdentifiedPacketFees.Proto): IdentifiedPacketFees;
    toProto(): IdentifiedPacketFees.Proto;
}
export declare namespace IdentifiedPacketFees {
    interface Amino {
        packet_id: PacketId.Amino | undefined;
        packet_fees: PacketFee.Amino[];
    }
    interface Data {
        packet_id: PacketId.Data | undefined;
        packet_fees: PacketFee.Data[];
    }
    type Proto = IdentifiedPacketFees_pb;
}
