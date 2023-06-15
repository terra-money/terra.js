import { JSONSerializable } from '../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgPayPacketFee as MsgPayPacketFee_pb } from '@terra-money/terra.proto/ibc/applications/fee/v1/tx';
import { Fee } from '../Fee';

/**
 * MsgPayPacketFee defines the request type for the PayPacketFee rpc
 * This Msg can be used to pay for a packet at the next sequence send & should be combined with the Msg that will be paid for
 */
export class MsgPayPacketFee extends JSONSerializable<
  any,
  MsgPayPacketFee.Data,
  MsgPayPacketFee.Proto
> {
  /**
   * @param fee encapsulates the recv, ack and timeout fees associated with an IBC packet
   * @param source_port_id the source port unique identifier
   * @param source_channel_id the source channel unique identifer
   * @param signer account address to refund fee if necessary
   * @param relayers optional list of relayers permitted to the receive packet fees
   */
  constructor(
    public fee: Fee | undefined,
    public source_port_id: string,
    public source_channel_id: string,
    public signer: string,
    public relayers: string[]
  ) {
    super();
  }

  public static fromAmino(): MsgPayPacketFee {
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgPayPacketFee.Data): MsgPayPacketFee {
    const { fee, source_port_id, source_channel_id, signer, relayers } = data;

    return new MsgPayPacketFee(
      fee ? Fee.fromData(fee) : undefined,
      source_port_id,
      source_channel_id,
      signer,
      relayers
    );
  }

  public toData(): MsgPayPacketFee.Data {
    const { fee, source_port_id, source_channel_id, signer, relayers } = this;
    return {
      '@type': '/ibc.applications.fee.v1.MsgPayPacketFee',
      fee: fee?.toData(),
      source_port_id,
      source_channel_id,
      signer,
      relayers,
    };
  }

  public static fromProto(proto: MsgPayPacketFee.Proto) {
    return new MsgPayPacketFee(
      proto.fee ? Fee.fromProto(proto.fee) : undefined,
      proto.sourcePortId,
      proto.sourceChannelId,
      proto.signer,
      proto.relayers
    );
  }

  public toProto(): MsgPayPacketFee.Proto {
    const { fee, source_port_id, source_channel_id, signer, relayers } = this;
    return MsgPayPacketFee_pb.fromPartial({
      fee: fee?.toProto(),
      sourcePortId: source_port_id,
      sourceChannelId: source_channel_id,
      signer,
      relayers,
    });
  }

  public packAny() {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFee',
      value: MsgPayPacketFee_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgPayPacketFee.fromProto(MsgPayPacketFee_pb.decode(msgAny.value));
  }
}

export namespace MsgPayPacketFee {
  export interface Data {
    '@type': '/ibc.applications.fee.v1.MsgPayPacketFee';
    fee?: Fee.Data;
    source_port_id: string;
    source_channel_id: string;
    signer: string;
    relayers: string[];
  }

  export type Proto = MsgPayPacketFee_pb;
}
