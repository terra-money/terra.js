import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Coin } from '../../Coin';
import * as Long from 'long';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgTransfer as MsgTransfer_pb } from '@terra-money/terra.proto/ibc/applications/transfer/v1/tx';
import { Height } from '@terra-money/terra.proto/ibc/core/client/v1/client';
/**
 * A basic message for transfer [[Coin]] via IBC.
 */
export class MsgTransfer extends JSONSerializable<
  MsgTransfer.Amino,
  MsgTransfer.Data,
  MsgTransfer.Proto
> {
  public source_port: string;
  public source_channel: string;
  public token?: Coin;
  public sender: AccAddress;
  public receiver: string; // destination chain can be non-cosmos-based
  public timeout_height?: Height; // 0 to disable
  public timeout_timestamp: number; // 0 to disable
  /**
   * @param source_port the port on which the packet will be sent
   * @param source_channel  the channel by which the packet will be sent
   * @param token the tokens to be transferred
   * @param sender the sender address
   * @param receiver the recipient address on the destination chain
   * @param timeout_height Timeout height relative to the current block height. (0 to disable)
   * @param timeout_timestamp Timeout timestamp (in nanoseconds) relative to the current block timestamp. (0 to disable)
   */
  constructor(
    source_port: string,
    source_channel: string,
    token: Coin | undefined,
    sender: AccAddress,
    receiver: string,
    timeout_height: Height | undefined,
    timeout_timestamp: number
  ) {
    super();
    this.source_port = source_port;
    this.source_channel = source_channel;
    this.token = token;
    this.sender = sender;
    this.receiver = receiver;
    this.timeout_height = timeout_height;
    this.timeout_timestamp = timeout_timestamp;
  }

  public static fromAmino(data: MsgTransfer.Amino): MsgTransfer {
    const {
      value: {
        source_port,
        source_channel,
        token,
        sender,
        receiver,
        timeout_height,
        timeout_timestamp,
      },
    } = data;
    return new MsgTransfer(
      source_port,
      source_channel,
      token ? Coin.fromAmino(token) : undefined,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp
    );
  }

  public toAmino(): MsgTransfer.Amino {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
    } = this;
    return {
      type: 'cosmos-sdk/MsgTransfer',
      value: {
        source_port,
        source_channel,
        token: token ? token.toAmino() : undefined,
        sender,
        receiver,
        timeout_height,
        timeout_timestamp,
      },
    };
  }

  public static fromData(data: MsgTransfer.Data): MsgTransfer {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_timestamp,
      timeout_height,
    } = data;
    return new MsgTransfer(
      source_port,
      source_channel,
      token ? Coin.fromData(token) : undefined,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp
    );
  }

  public toData(): MsgTransfer.Data {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
    } = this;
    return {
      '@type': '/ibc.applications.transfer.v1.MsgTransfer',
      source_port,
      source_channel,
      token: token ? token.toData() : undefined,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
    };
  }

  public static fromProto(proto: MsgTransfer.Proto): MsgTransfer {
    return new MsgTransfer(
      proto.sourcePort,
      proto.sourceChannel,
      proto.token ? Coin.fromProto(proto.token) : undefined,
      proto.sender,
      proto.receiver,
      proto.timeoutHeight ? proto.timeoutHeight : undefined,
      proto.timeoutTimestamp.toNumber()
    );
  }

  public toProto(): MsgTransfer.Proto {
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_height,
      timeout_timestamp,
    } = this;
    return MsgTransfer_pb.fromPartial({
      sourcePort: source_port,
      sourceChannel: source_channel,
      token: token ? token.toProto() : undefined,
      sender,
      receiver,
      timeoutHeight: timeout_height ? timeout_height : undefined,
      timeoutTimestamp: Long.fromNumber(timeout_timestamp),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: MsgTransfer_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgTransfer {
    return MsgTransfer.fromProto(MsgTransfer_pb.decode(msgAny.value));
  }
}

export namespace MsgTransfer {
  export interface Amino {
    type: 'cosmos-sdk/MsgTransfer';
    value: {
      source_port: string;
      source_channel: string;
      token?: Coin.Amino;
      sender: AccAddress;
      receiver: string;
      timeout_height?: Height;
      timeout_timestamp: number;
    };
  }
  export interface Data {
    '@type': '/ibc.applications.transfer.v1.MsgTransfer';
    source_port: string;
    source_channel: string;
    token?: Coin.Data;
    sender: AccAddress;
    receiver: string;
    timeout_height?: Height;
    timeout_timestamp: number;
  }
  export type Proto = MsgTransfer_pb;
}
