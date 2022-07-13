import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Channel } from '../../core/channel/Channel';
import { MsgChannelOpenInit as MsgChannelOpenInit_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It is called by a relayer on Chain A.
 */
export class MsgChannelOpenInit extends JSONSerializable<
  any,
  MsgChannelOpenInit.Data,
  MsgChannelOpenInit.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel channel info
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel: Channel | undefined,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, isClassic?: boolean): MsgChannelOpenInit {
    _;
    isClassic;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelOpenInit.Data,
    _?: boolean
  ): MsgChannelOpenInit {
    _;
    const { port_id, channel, signer } = data;
    return new MsgChannelOpenInit(
      port_id,
      channel ? Channel.fromData(channel) : undefined,
      signer
    );
  }

  public toData(_?: boolean): MsgChannelOpenInit.Data {
    _;
    const { port_id, channel, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenInit',
      port_id,
      channel: channel ? channel.toData() : undefined,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelOpenInit.Proto,
    _?: boolean
  ): MsgChannelOpenInit {
    _;
    return new MsgChannelOpenInit(
      proto.portId,
      proto.channel ? Channel.fromProto(proto.channel) : undefined,
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgChannelOpenInit.Proto {
    _;
    const { port_id, channel, signer } = this;
    return MsgChannelOpenInit_pb.fromPartial({
      portId: port_id,
      channel: channel ? channel.toProto() : undefined,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    _;
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelOpenInit',
      value: MsgChannelOpenInit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelOpenInit {
    _;
    return MsgChannelOpenInit.fromProto(
      MsgChannelOpenInit_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenInit {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenInit';
    port_id: string;
    channel?: Channel.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenInit_pb;
}
