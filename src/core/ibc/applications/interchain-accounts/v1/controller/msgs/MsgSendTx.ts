import { JSONSerializable } from '../../../../../../../util/json';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSendTx as MsgSendTx_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/tx';
import { InterchainAccountPacketData } from '../../InterchainAccountPacketData';
import Long from 'long';

/**
 * MsgSendTx defines the payload for Msg/SendTx
 */
export class MsgSendTx extends JSONSerializable<
  any,
  MsgSendTx.Data,
  MsgSendTx.Proto
> {
  /**
   * @param owner
   * @param connection_id
   * @param packet_data
   * @param relative_timeout timestamp provided will be added to the current block time during transaction execution.
   * The timeout timestamp must be non-zero.
   */
  constructor(
    public owner: string,
    public connection_id: string,
    public packet_data: InterchainAccountPacketData | undefined,
    public relative_timeout: number
  ) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino() {
    throw new Error('Amino not supported');
  }

  public static fromData(data: MsgSendTx.Data) {
    const { owner, connection_id, packet_data, relative_timeout } = data;
    return new MsgSendTx(
      owner,
      connection_id,
      packet_data
        ? InterchainAccountPacketData.fromData(packet_data)
        : undefined,
      Number.parseInt(relative_timeout)
    );
  }

  public toData(): MsgSendTx.Data {
    const { owner, connection_id, packet_data, relative_timeout } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx',
      owner,
      connection_id,
      packet_data: packet_data?.toData(),
      relative_timeout: relative_timeout.toFixed(),
    };
  }

  public static fromProto(proto: MsgSendTx.Proto) {
    return new MsgSendTx(
      proto.owner,
      proto.connectionId,
      proto.packetData
        ? InterchainAccountPacketData.fromProto(proto.packetData)
        : undefined,
      proto.relativeTimeout.toNumber()
    );
  }

  public toProto(): MsgSendTx.Proto {
    const { owner, connection_id, packet_data, relative_timeout } = this;
    return MsgSendTx_pb.fromPartial({
      owner,
      connectionId: connection_id,
      packetData: packet_data ? packet_data.toProto() : undefined,
      relativeTimeout: Long.fromNumber(relative_timeout),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx',
      value: MsgSendTx_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any) {
    return MsgSendTx.fromProto(MsgSendTx_pb.decode(msgAny.value));
  }
}

export namespace MsgSendTx {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.MsgSendTx';
    owner: string;
    connection_id: string;
    packet_data?: InterchainAccountPacketData.Data;
    relative_timeout: string;
  }
  export type Proto = MsgSendTx_pb;
}
