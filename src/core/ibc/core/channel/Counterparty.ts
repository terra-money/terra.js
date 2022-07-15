import { Counterparty as Counterparty_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import { JSONSerializable } from '../../../../util/json';

/** Counterparty defines a channel end counterparty */
export class Counterparty extends JSONSerializable<
  Counterparty.Amino,
  Counterparty.Data,
  Counterparty.Proto
> {
  /**
   * @param port_id port on the counterparty chain which owns the other end of the channel.
   * @param channel_id channel end on the counterparty chain
   */
  constructor(public port_id: string, public channel_id: string) {
    super();
  }

  public static fromAmino(data: Counterparty.Amino): Counterparty {
    const { port_id, channel_id } = data;
    return new Counterparty(port_id, channel_id);
  }

  public toAmino(): Counterparty.Amino {
    const { port_id, channel_id } = this;
    const res: Counterparty.Amino = {
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromData(data: Counterparty.Data): Counterparty {
    const { port_id, channel_id } = data;
    return new Counterparty(port_id, channel_id);
  }

  public toData(): Counterparty.Data {
    const { port_id, channel_id } = this;
    const res: Counterparty.Data = {
      port_id,
      channel_id,
    };
    return res;
  }

  public static fromProto(proto: Counterparty.Proto): Counterparty {
    return new Counterparty(proto.portId, proto.channelId);
  }

  public toProto(): Counterparty.Proto {
    const { port_id, channel_id } = this;
    return Counterparty_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
    });
  }
}

export namespace Counterparty {
  export interface Amino {
    port_id: string;
    channel_id: string;
  }

  export interface Data {
    port_id: string;
    channel_id: string;
  }

  export type Proto = Counterparty_pb;
}
