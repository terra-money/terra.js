import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { Packet } from '../../core/channel/Packet';
import { MsgRecvPacket as MsgRecvPacket_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgRecvPacket receives incoming IBC packet
 */
export class MsgRecvPacket extends JSONSerializable<
  any,
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
    public packet: Packet | undefined,
    public proof_commitment: string,
    public proof_height: Height | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgRecvPacket {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgRecvPacket.Data, _?: boolean): MsgRecvPacket {
    _;
    const { packet, proof_commitment, proof_height, signer } = data;
    return new MsgRecvPacket(
      packet ? Packet.fromData(packet) : undefined,
      proof_commitment,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgRecvPacket.Data {
    _;
    const { packet, proof_commitment, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgRecvPacket',
      packet: packet ? packet.toData() : undefined,
      proof_commitment,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgRecvPacket.Proto,
    _?: boolean
  ): MsgRecvPacket {
    _;
    return new MsgRecvPacket(
      proto.packet ? Packet.fromProto(proto.packet) : undefined,
      Buffer.from(proto.proofCommitment).toString('base64'),
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgRecvPacket.Proto {
    _;
    const { packet, proof_commitment, proof_height, signer } = this;
    return MsgRecvPacket_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofCommitment: Buffer.from(proof_commitment, 'base64'),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgRecvPacket',
      value: MsgRecvPacket_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgRecvPacket {
    _;
    return MsgRecvPacket.fromProto(MsgRecvPacket_pb.decode(msgAny.value));
  }
}

export namespace MsgRecvPacket {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgRecvPacket';
    packet?: Packet.Data;
    proof_commitment: string;
    proof_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgRecvPacket_pb;
}
