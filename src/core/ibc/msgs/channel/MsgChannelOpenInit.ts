import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Channel } from './Channel';
import { MsgChannelOpenInit as MsgChannelOpenInit_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It is called by a relayer on Chain A.
 */
export class MsgChannelOpenInit extends JSONSerializable<
  MsgChannelOpenInit.Amino,
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
    public channel: Channel,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgChannelOpenInit {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgChannelOpenInit.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgChannelOpenInit.Data): MsgChannelOpenInit {
    const {
      value: { port_id, channel, signer },
    } = data;
    return new MsgChannelOpenInit(port_id, Channel.fromData(channel), signer);
  }

  public toData(): MsgChannelOpenInit.Data {
    const { port_id, channel, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenInit',
      value: {
        port_id,
        channel,
        signer,
      },
    };
  }

  public static fromProto(proto: MsgChannelOpenInit.Proto): MsgChannelOpenInit {
    return new MsgChannelOpenInit(
      proto.portId,
      Channel.fromProto(proto.channel),
      proto.signer
    );
  }

  public toProto(): MsgChannelOpenInit.Proto {
    const { port_id, channel, signer } = this;
    return MsgChannelOpenInit_pb.fromPartial({
      portId: port_id,
      channel: channel.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgChannelOpenInit',
      value: MsgChannelOpenInit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgChannelOpenInit {
    return MsgChannelOpenInit.fromProto(
      MsgChannelOpenInit_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenInit {
  export interface Amino {
    type: 'cosmos-sdk/MsgChannelOpenInit';
    value: {
      port_id: string;
      channel: Channel.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenInit';
    value: {
      port_id: string;
      channel: Channel.Data;
      signer: AccAddress;
    };
  }
  export type Proto = MsgChannelOpenInit_pb;
}
