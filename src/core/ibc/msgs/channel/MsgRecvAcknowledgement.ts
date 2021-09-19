import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../client/Height';
import { Packet } from './Packet';
import { MsgAcknowledgement as MsgAcknowledgement_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgAcknowledgement receives incoming IBC acknowledgement
 */
export class MsgAcknowledgement extends JSONSerializable<
  MsgAcknowledgement.Amino,
  MsgAcknowledgement.Data,
  MsgAcknowledgement.Proto
> {
  /**
   * @param packet
   * @param acknowledgement
   * @param proof_height
   * @param proof_acked
   * @param signer signer address
   */
  constructor(
    public packet: Packet,
    public acknowledgement: string,
    public proof_acked: string,
    public proof_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgAcknowledgement {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgAcknowledgement.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgAcknowledgement.Data): MsgAcknowledgement {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = data;
    return new MsgAcknowledgement(
      Packet.fromData(packet),
      proof_acked,
      acknowledgement,
      Height.fromData(proof_height),
      signer
    );
  }

  public toData(): MsgAcknowledgement.Data {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgAcknowledgement',
      packet: packet.toData(),
      acknowledgement,
      proof_acked,
      proof_height: proof_height.toData(),
      signer,
    };
  }

  public static fromProto(proto: MsgAcknowledgement.Proto): MsgAcknowledgement {
    return new MsgAcknowledgement(
      Packet.fromProto(proto.packet!),
      Buffer.from(proto.acknowledgement).toString('base64'),
      Buffer.from(proto.proofAcked).toString('base64'),
      Height.fromProto(proto.proofHeight!),
      proto.signer
    );
  }

  public toProto(): MsgAcknowledgement.Proto {
    const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
    return MsgAcknowledgement_pb.fromPartial({
      packet: packet.toProto(),
      acknowledgement: Buffer.from(acknowledgement, 'base64'),
      proofAcked: Buffer.from(proof_acked, 'base64'),
      proofHeight: proof_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgAcknowledgement',
      value: MsgAcknowledgement_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgAcknowledgement {
    return MsgAcknowledgement.fromProto(
      MsgAcknowledgement_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgAcknowledgement {
  export interface Amino {
    type: 'cosmos-sdk/MsgAcknowledgement';
    value: {
      packet: Packet.Amino;
      acknowledgement: string;
      proof_acked: string;
      proof_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgAcknowledgement';
    packet: Packet.Data;
    acknowledgement: string;
    proof_acked: string;
    proof_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgAcknowledgement_pb;
}
