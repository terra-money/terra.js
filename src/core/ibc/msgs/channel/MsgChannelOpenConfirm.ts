import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../client/Height';
import { MsgChannelOpenConfirm as MsgChannelOpenConfirm_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 *  MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to OPEN on Chain A.
 */
export class MsgChannelOpenConfirm extends JSONSerializable<
  MsgChannelOpenConfirm.Amino,
  MsgChannelOpenConfirm.Data,
  MsgChannelOpenConfirm.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel_id
   * @param proof_ack
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public proof_ack: string,
    public proof_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgChannelOpenConfirm {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgChannelOpenConfirm.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenConfirm.Data
  ): MsgChannelOpenConfirm {
    const { port_id, channel_id, proof_ack, proof_height, signer } = data;
    return new MsgChannelOpenConfirm(
      port_id,
      channel_id,
      proof_ack,
      Height.fromData(proof_height),
      signer
    );
  }

  public toData(): MsgChannelOpenConfirm.Data {
    const { port_id, channel_id, proof_ack, proof_height, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm',
      port_id,
      channel_id,
      proof_ack,
      proof_height,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenConfirm.Proto
  ): MsgChannelOpenConfirm {
    return new MsgChannelOpenConfirm(
      proto.portId,
      proto.channelId,
      Buffer.from(proto.proofAck).toString('base64'),
      Height.fromProto(proto.proofHeight!),
      proto.signer
    );
  }

  public toProto(): MsgChannelOpenConfirm.Proto {
    const { port_id, channel_id, proof_ack, proof_height, signer } = this;
    return MsgChannelOpenConfirm_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      proofAck: Buffer.from(proof_ack, 'base64'),
      proofHeight: proof_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm',
      value: MsgChannelOpenConfirm_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgChannelOpenConfirm {
    return MsgChannelOpenConfirm.fromProto(
      MsgChannelOpenConfirm_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenConfirm {
  export interface Amino {
    type: 'cosmos-sdk/MsgChannelOpenConfirm';
    value: {
      port_id: string;
      channel_id: string;
      proof_ack: string;
      proof_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm';
    port_id: string;
    channel_id: string;
    proof_ack: string;
    proof_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenConfirm_pb;
}
