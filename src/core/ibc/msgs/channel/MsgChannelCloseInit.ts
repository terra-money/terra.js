import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgChannelCloseInit as MsgChannelCloseInit_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A to close a channel with Chain B.
 */
export class MsgChannelCloseInit extends JSONSerializable<
  MsgChannelCloseInit.Amino,
  MsgChannelCloseInit.Data,
  MsgChannelCloseInit.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel channel info
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgChannelCloseInit {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgChannelCloseInit.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgChannelCloseInit.Data): MsgChannelCloseInit {
    const {
      value: { port_id, channel_id, signer },
    } = data;
    return new MsgChannelCloseInit(port_id, channel_id, signer);
  }

  public toData(): MsgChannelCloseInit.Data {
    const { port_id, channel_id, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelCloseInit',
      value: {
        port_id,
        channel_id,
        signer,
      },
    };
  }

  public static fromProto(
    proto: MsgChannelCloseInit.Proto
  ): MsgChannelCloseInit {
    return new MsgChannelCloseInit(proto.portId, proto.channelId, proto.signer);
  }

  public toProto(): MsgChannelCloseInit.Proto {
    const { port_id, channel_id, signer } = this;
    return MsgChannelCloseInit_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgChannelCloseInit',
      value: MsgChannelCloseInit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgChannelCloseInit {
    return MsgChannelCloseInit.fromProto(
      MsgChannelCloseInit_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelCloseInit {
  export interface Amino {
    type: 'cosmos-sdk/MsgChannelCloseInit';
    value: {
      port_id: string;
      channel_id: string;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelCloseInit';
    value: {
      port_id: string;
      channel_id: string;
      signer: AccAddress;
    };
  }
  export type Proto = MsgChannelCloseInit_pb;
}
