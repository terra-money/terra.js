import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Channel } from './Channel';
import { Height } from '../client/Height';
import { MsgChannelOpenTry as MsgChannelOpenTry_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelOpenTry defines a msg sent by a Relayer to try to open a channel on Chain B
 */
export class MsgChannelOpenTry extends JSONSerializable<
  MsgChannelOpenTry.Amino,
  MsgChannelOpenTry.Data,
  MsgChannelOpenTry.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param previous_channel_id
   * @param channel channel info
   * @param counterparty_version
   * @param proof_init
   * @param proof_height
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public previous_channel_id: string,
    public channel: Channel,
    public counterparty_version: string,
    public proof_init: string,
    public proof_height: Height,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any): MsgChannelOpenTry {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): MsgChannelOpenTry.Amino {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgChannelOpenTry.Data): MsgChannelOpenTry {
    const {
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    } = data;
    return new MsgChannelOpenTry(
      port_id,
      previous_channel_id,
      Channel.fromData(channel),
      counterparty_version,
      proof_init,
      Height.fromData(proof_height),
      signer
    );
  }

  public toData(): MsgChannelOpenTry.Data {
    const {
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelOpenTry',
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    };
  }

  public static fromProto(proto: MsgChannelOpenTry.Proto): MsgChannelOpenTry {
    return new MsgChannelOpenTry(
      proto.portId,
      proto.previousChannelId,
      Channel.fromProto(proto.channel!),
      proto.counterpartyVersion,
      Buffer.from(proto.proofInit).toString('base64'),
      Height.fromProto(proto.proofHeight!),
      proto.signer
    );
  }

  public toProto(): MsgChannelOpenTry.Proto {
    const {
      port_id,
      previous_channel_id,
      channel,
      counterparty_version,
      proof_init,
      proof_height,
      signer,
    } = this;
    return MsgChannelOpenTry_pb.fromPartial({
      portId: port_id,
      previousChannelId: previous_channel_id,
      channel: channel.toProto(),
      counterpartyVersion: counterparty_version,
      proofInit: Buffer.from(proof_init, 'base64'),
      proofHeight: proof_height.toProto(),
      signer,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos-sdk/MsgChannelOpenTry',
      value: MsgChannelOpenTry_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgChannelOpenTry {
    return MsgChannelOpenTry.fromProto(
      MsgChannelOpenTry_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelOpenTry {
  export interface Amino {
    type: 'cosmos-sdk/MsgChannelOpenTry';
    value: {
      port_id: string;
      previous_channel_id: string;
      channel: Channel.Amino;
      counterparty_version: string;
      proof_init: string;
      proof_height: Height.Amino;
      signer: AccAddress;
    };
  }
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelOpenTry';
    port_id: string;
    previous_channel_id: string;
    channel: Channel.Data;
    counterparty_version: string;
    proof_init: string;
    proof_height: Height.Data;
    signer: AccAddress;
  }
  export type Proto = MsgChannelOpenTry_pb;
}
