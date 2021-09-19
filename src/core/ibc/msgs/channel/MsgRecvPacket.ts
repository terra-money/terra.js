import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../client/Height';
import { Packet } from './Packet';
import { MsgRecvPacket as MsgRecvPacket_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgRecvPacket receives incoming IBC packet
 */
export class MsgRecvPacket extends JSONSerializable<
  MsgRecvPacket.Amino,
  MsgRecvPacket.Data,
  MsgRecvPacket.Proto
> {
  /**
   * @param packet
   * @param proof_commitment
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public packet: Packet,
    public proof_commitment: string,
    public proof_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgRecvPacket {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgRecvPacket.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRecvPacket.Data): MsgRecvPacket {
    const { packet, proof_commitment, proof_height, signer } = data;
    return new MsgRecvPacket(
      Packet.fromData(packet),
      proof_commitment,
      Height.fromData(proof_height),
      signer
    );
  }

  public toData(): MsgRecvPacket.Data {
    const { packet, proof_commitment, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgRecvPacket',
      packet: packet.toData(),
      proof_commitment,
      proof_height: proof_height.toData(),
      signer,
    };
  }

  public static fromProto(proto: MsgRecvPacket.Proto): MsgRecvPacket {
    return new MsgRecvPacket(
      Packet.fromProto(proto.packet!),
      Buffer.from(proto.proofCommitment).toString('base64'),
      Height.fromProto(proto.proofHeight!),
      proto.signer
    );
  }

  public toProto(): MsgRecvPacket.Proto {
    const { packet, proof_commitment, proof_height, signer } = this;
    return MsgRecvPacket_pb.fromPartial({
      packet: packet.toProto(),
      proofCommitment: Buffer.from(proof_commitment, 'base64'),
      proofHeight: proof_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgRecvPacket',
      value: MsgRecvPacket_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgRecvPacket {
    return MsgRecvPacket.fromProto(MsgRecvPacket_pb.decode(msgAny.value));
  }
}

export namespace MsgRecvPacket {
  export interface Amino {
    type: 'cosmos-sdk/MsgRecvPacket';
    value: {
      packet: Packet.Amino;
      proof_commitment: string;
      proof_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgRecvPacket';
    packet: Packet.Data;
    proof_commitment: string;
    proof_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgRecvPacket_pb;
}
