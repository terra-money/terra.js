import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgPayPacketFeeAsync as MsgPayPacketFeeAsync_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';
import { PacketId } from '../../../core/channel/PacketId';
import { PacketFee } from '../PacketFee';
/**
 * MsgPayPacketFeeAsync defines the request type for the PayPacketFeeAsync rpc
 * This Msg can be used to pay for a packet at a specified sequence (instead of the next sequence send)
 */
export declare class MsgPayPacketFeeAsync extends JSONSerializable<any, MsgPayPacketFeeAsync.Data, MsgPayPacketFeeAsync.Proto> {
    packet_id?: PacketId | undefined;
    packet_fee?: PacketFee | undefined;
    /**
     * @param packet_id packet identifier comprised of the channel ID, port ID and sequence
     * @param packet_fee the packet fee associated with a particular IBC packet
     */
    constructor(packet_id?: PacketId | undefined, packet_fee?: PacketFee | undefined);
    static fromAmino(_: any, isClassic?: boolean): any;
    toAmino(isClassic?: boolean): any;
    static fromData(data: MsgPayPacketFeeAsync.Data, isClassic?: boolean): MsgPayPacketFeeAsync;
    toData(isClassic?: boolean): MsgPayPacketFeeAsync.Data;
    static fromProto(proto: MsgPayPacketFeeAsync.Proto, isClassic?: boolean): MsgPayPacketFeeAsync;
    toProto(isClassic?: boolean): MsgPayPacketFeeAsync.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgPayPacketFeeAsync;
}
export declare namespace MsgPayPacketFeeAsync {
    interface Data {
        '@type': '/ibc.applications.fee.v1.MsgPayPacketFeeAsync';
        packet_id?: PacketId.Data;
        packet_fee?: PacketFee.Data;
    }
    type Proto = MsgPayPacketFeeAsync_pb;
}
