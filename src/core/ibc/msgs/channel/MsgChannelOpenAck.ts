import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Height } from '../../core/client/Height';
import { MsgChannelOpenAck as MsgChannelOpenAck_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of channel state to TRYOPEN on Chain B.
 */
export class MsgChannelOpenAck extends JSONSerializable<
  any,
  MsgChannelOpenAck.Data,
  MsgChannelOpenAck.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel_id
   * @param counterparty_channel_id
   * @param counterparty_version
   * @param proof_try
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public counterparty_channel_id: string,
    public counterparty_version: string,
    public proof_try: string,
    public proof_height: Height | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgChannelOpenAck {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenAck.Data,
    _?: boolean
  ): MsgChannelOpenAck {
    _;
    const {
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height,
      signer,
    } = data;
    return new MsgChannelOpenAck(
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height ? Height.fromData(proof_height) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenAck.Data {
    _;
    const {
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenAck',
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height: proof_height ? proof_height.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenAck.Proto,
    _?: boolean
  ): MsgChannelOpenAck {
    _;
    return new MsgChannelOpenAck(
      proto.portId,
      proto.channelId,
      proto.counterpartyChannelId,
      proto.counterpartyVersion,
      Buffer.from(proto.proofTry).toString('base64'),
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenAck.Proto {
    _;
    const {
      port_id,
      channel_id,
      counterparty_channel_id,
      counterparty_version,
      proof_try,
      proof_height,
      signer,
    } = this;
    return MsgChannelOpenAck_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      counterpartyChannelId: counterparty_channel_id,
      counterpartyVersion: counterparty_version,
      proofTry: Buffer.from(proof_try, 'base64'),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenAck',
      value: MsgChannelOpenAck_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenAck {
    _;
    return MsgChannelOpenAck.fromProto(
      MsgChannelOpenAck_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenAck {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenAck';
    port_id: string;
    channel_id: string;
    counterparty_channel_id: string;
    counterparty_version: string;
    proof_try: string;
    proof_height?: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenAck_pb;
}
