import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../client/Height';
import { Packet } from './Packet';
import { MsgTimeout as MsgTimeout_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';
import Long from 'long';

/**
 * MsgTimeout receives timed-out packet
 */
export class MsgTimeout extends JSONSerializable<
  MsgTimeout.Amino,
  MsgTimeout.Data,
  MsgTimeout.Proto
> {
  /**
   * @param packet
   * @param proof_unreceived
   * @param proof_height
   * @param next_seuqnce_recv
   * @param signer signer address
   */
  constructor(
    public packet: Packet,
    public proof_unreceived: string,
    public proof_height: Height,
    public next_sequence_recv: number,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgTimeout {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgTimeout.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgTimeout.Data): MsgTimeout {
    const {
      packet,
      proof_unreceived,
      proof_height,
      next_sequence_recv,
      signer,
    } = data;
    return new MsgTimeout(
      Packet.fromData(packet),
      proof_unreceived,
      Height.fromData(proof_height),
      next_sequence_recv,
      signer
    );
  }

  public toData(): MsgTimeout.Data {
    const {
      packet,
      proof_unreceived,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgTimeout',
      packet: packet.toData(),
      proof_unreceived,
      proof_height: proof_height.toData(),
      next_sequence_recv,
      signer,
    };
  }

  public static fromProto(proto: MsgTimeout.Proto): MsgTimeout {
    return new MsgTimeout(
      Packet.fromProto(proto.packet!),
      Buffer.from(proto.proofUnreceived).toString('base64'),
      Height.fromProto(proto.proofHeight!),
      proto.nextSequenceRecv.toNumber(),
      proto.signer
    );
  }

  public toProto(): MsgTimeout.Proto {
    const {
      packet,
      proof_unreceived,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return MsgTimeout_pb.fromPartial({
      packet: packet.toProto(),
      proofUnreceived: Buffer.from(proof_unreceived, 'base64'),
      proofHeight: proof_height.toProto(),
      nextSequenceRecv: Long.fromNumber(next_sequence_recv),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgTimeout',
      value: MsgTimeout_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgTimeout {
    return MsgTimeout.fromProto(MsgTimeout_pb.decode(msgAny.value));
  }
}

export namespace MsgTimeout {
  export interface Amino {
    type: 'cosmos-sdk/MsgTimeout';
    value: {
      packet: Packet.Amino;
      proof_unreceived: string;
      proof_height: Height.Amino;
      next_sequence_recv: number;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgTimeout';
    packet: Packet.Data;
    proof_unreceived: string;
    proof_height: Height.Data;
    next_sequence_recv: number;
    signer: AccAddress;
  }
  export type Proto = MsgTimeout_pb;
}