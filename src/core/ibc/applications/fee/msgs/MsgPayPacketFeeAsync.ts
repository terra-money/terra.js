import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgPayPacketFeeAsync as MsgPayPacketFeeAsync_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';
import { PacketId } from '../../../core/channel/PacketId';
import { PacketFee } from '../PacketFee';

/**
 * MsgPayPacketFeeAsync defines the request type for the PayPacketFeeAsync rpc
 * This Msg can be used to pay for a packet at a specified sequence (instead of the next sequence send)
 */
export class MsgPayPacketFeeAsync extends JSONSerializable<
  any,
  MsgPayPacketFeeAsync.Data,
  MsgPayPacketFeeAsync.Proto
> {
  /**
   * @param packet_id packet identifier comprised of the channel ID, port ID and sequence
   * @param packet_fee the packet fee associated with a particular IBC packet
   */
  constructor(public packet_id?: PacketId, public packet_fee?: PacketFee) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(isClassic?: boolean): any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgPayPacketFeeAsync.Data,
    isClassic?: boolean
  ): MsgPayPacketFeeAsync {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { packet_id, packet_fee } = data;

    return new MsgPayPacketFeeAsync(
      packet_id ? PacketId.fromData(packet_id) : undefined,
      packet_fee ? PacketFee.fromData(packet_fee) : undefined
    );
  }

  public toData(isClassic?: boolean): MsgPayPacketFeeAsync.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { packet_id, packet_fee } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgPayPacketFeeAsync',
      packet_id: packet_id?.toData(),
      packet_fee: packet_fee?.toData(),
    };
  }

  public static fromProto(
    proto: MsgPayPacketFeeAsync.Proto,
    isClassic?: boolean
  ): MsgPayPacketFeeAsync {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new MsgPayPacketFeeAsync(
      proto.packetId ? PacketId.fromProto(proto.packetId) : undefined,
      proto.packetFee ? PacketFee.fromProto(proto.packetFee) : undefined
    );
  }

  public toProto(isClassic?: boolean): MsgPayPacketFeeAsync.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }

    const { packet_id, packet_fee } = this;
    return MsgPayPacketFeeAsync_pb.fromPartial({
      packetId: packet_id?.toProto(),
      packetFee: packet_fee?.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFeeAsync',
      value: MsgPayPacketFeeAsync_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgPayPacketFeeAsync {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return MsgPayPacketFeeAsync.fromProto(
      MsgPayPacketFeeAsync_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgPayPacketFeeAsync {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgPayPacketFeeAsync';
    packet_id?: PacketId.Data;
    packet_fee?: PacketFee.Data;
  }

  export type Proto = MsgPayPacketFeeAsync_pb;
}
