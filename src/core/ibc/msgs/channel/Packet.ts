import { Packet as Packet_pb } from '@terra-money/terra.proto/ibc/core/channel/v1/channel';
import Long from 'long';
import { JSONSerializable } from '../../../../util/json';
import { Height } from '../client/Height';

/** Packet defines a type that carries data across different chains through IBC */
export class Packet extends JSONSerializable<
  Packet.Amino,
  Packet.Data,
  Packet.Proto
> {
  /**
   * @param port_id port on the counterparty chain which owns the other end of the channel.
   * @param channel_id channel end on the counterparty chain
   */
  constructor(
    public sequence: number,
    public source_port: string,
    public source_channel: string,
    public destination_port: string,
    public destination_channel: string,
    public data: string,
    public timeout_height: Height | undefined,
    public timeout_timestamp: number
  ) {
    super();
  }

  public static fromAmino(_data: Packet.Amino): Packet {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = _data;
    return new Packet(
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height ? Height.fromAmino(timeout_height) : undefined,
      timeout_timestamp
    );
  }

  public toAmino(): Packet.Amino {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = this;
    const res: Packet.Amino = {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height: timeout_height ? timeout_height.toAmino() : undefined,
      timeout_timestamp,
    };
    return res;
  }

  public static fromData(_data: Packet.Data): Packet {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = _data;
    return new Packet(
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height ? Height.fromData(timeout_height) : undefined,
      Number.parseInt(timeout_timestamp)
    );
  }

  public toData(): Packet.Data {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = this;
    const res: Packet.Data = {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height: timeout_height ? timeout_height.toData() : undefined,
      timeout_timestamp: timeout_timestamp.toFixed(),
    };
    return res;
  }

  public static fromProto(proto: Packet.Proto): Packet {
    return new Packet(
      proto.sequence.toNumber(),
      proto.sourcePort,
      proto.sourceChannel,
      proto.destinationPort,
      proto.destinationChannel,
      Buffer.from(proto.data).toString('base64'),
      proto.timeoutHeight ? Height.fromProto(proto.timeoutHeight) : undefined,
      proto.timeoutTimestamp.toNumber()
    );
  }

  public toProto(): Packet.Proto {
    const {
      sequence,
      source_port,
      source_channel,
      destination_port,
      destination_channel,
      data,
      timeout_height,
      timeout_timestamp,
    } = this;
    return Packet_pb.fromPartial({
      sequence: Long.fromNumber(sequence),
      sourcePort: source_port,
      sourceChannel: source_channel,
      destinationPort: destination_port,
      destinationChannel: destination_channel,
      data: Buffer.from(data, 'base64'),
      timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
      timeoutTimestamp: Long.fromNumber(timeout_timestamp),
    });
  }
}

export namespace Packet {
  export interface Amino {
    sequence: number;
    source_port: string;
    source_channel: string;
    destination_port: string;
    destination_channel: string;
    data: string;
    timeout_height?: Height.Amino;
    timeout_timestamp: number;
  }

  export interface Data {
    sequence: number;
    source_port: string;
    source_channel: string;
    destination_port: string;
    destination_channel: string;
    data: string;
    timeout_height?: Height.Data;
    timeout_timestamp: string;
  }

  export type Proto = Packet_pb;
}
