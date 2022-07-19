import { JSONSerializable } from '../../../../../../util/json';
import { AccAddress } from '../../../../../bech32';
import { Coin } from '../../../../../Coin';
import * as Long from 'long';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgTransfer as MsgTransfer_pb } from '@terra-money/terra.proto/ibc/applications/transfer/v1/tx';
import { Height } from '../../../../core/client/Height';
import { Numeric } from '../../../../../numeric';
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
  public timeout_timestamp?: Numeric.Output; // 0 to disable
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
    timeout_timestamp: Numeric.Input | undefined
  ) {
    super();

    if (!timeout_height && !timeout_timestamp) {
      throw 'both of timeout_height and timeout_timestamp are undefined';
    }

    this.source_port = source_port;
    this.source_channel = source_channel;
    this.token = token;
    this.sender = sender;
    this.receiver = receiver;
    this.timeout_height = timeout_height;
    this.timeout_timestamp = timeout_timestamp
      ? Numeric.parse(timeout_timestamp)
      : undefined;
  }

  public static fromAmino(data: MsgTransfer.Amino, _?: boolean): MsgTransfer {
    _;
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

    if (!timeout_height && !timeout_timestamp) {
      throw 'both of timeout_height and timeout_timestamp are undefined';
    }

    return new MsgTransfer(
      source_port,
      source_channel,
      token ? Coin.fromAmino(token) : undefined,
      sender,
      receiver,
      timeout_height ? Height.fromAmino(timeout_height) : undefined,
      timeout_timestamp ? Numeric.parse(timeout_timestamp) : undefined
    );
  }

  public toAmino(_?: boolean): MsgTransfer.Amino {
    _;
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
        timeout_height: timeout_height?.toAmino() || {},
        timeout_timestamp: timeout_timestamp?.toFixed() || undefined,
      },
    };
  }

  public static fromData(data: MsgTransfer.Data, _?: boolean): MsgTransfer {
    _;
    const {
      source_port,
      source_channel,
      token,
      sender,
      receiver,
      timeout_timestamp,
      timeout_height,
    } = data;

    if (!timeout_height && !timeout_timestamp) {
      throw 'both of timeout_height and timeout_timestamp are undefined';
    }

    return new MsgTransfer(
      source_port,
      source_channel,
      token ? Coin.fromData(token) : undefined,
      sender,
      receiver,
      timeout_height ? Height.fromData(timeout_height) : undefined,
      timeout_timestamp ? Number.parseInt(timeout_timestamp) : undefined
    );
  }

  public toData(_?: boolean): MsgTransfer.Data {
    _;
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
      timeout_height: timeout_height
        ? timeout_height.toData()
        : new Height(0, 0).toData(),
      timeout_timestamp: timeout_timestamp?.toFixed() || '0',
    };
  }

  public static fromProto(proto: MsgTransfer.Proto, _?: boolean): MsgTransfer {
    _;
    if (!proto.timeoutHeight && proto.timeoutTimestamp.toNumber() == 0) {
      throw 'both of timeout_height and timeout_timestamp are empty';
    }

    return new MsgTransfer(
      proto.sourcePort,
      proto.sourceChannel,
      proto.token ? Coin.fromProto(proto.token) : undefined,
      proto.sender,
      proto.receiver,
      proto.timeoutHeight ? Height.fromProto(proto.timeoutHeight) : undefined,
      proto.timeoutTimestamp.toNumber()
    );
  }

  public toProto(_?: boolean): MsgTransfer.Proto {
    _;
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
      timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
      timeoutTimestamp: Long.fromString(timeout_timestamp?.toFixed() || '0'),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: MsgTransfer_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): MsgTransfer {
    return MsgTransfer.fromProto(
      MsgTransfer_pb.decode(msgAny.value),
      isClassic
    );
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
      timeout_height: Height.Amino;
      timeout_timestamp?: string;
    };
  }
  export interface Data {
    '@type': '/ibc.applications.transfer.v1.MsgTransfer';
    source_port: string;
    source_channel: string;
    token?: Coin.Data;
    sender: AccAddress;
    receiver: string;
    timeout_height: Height.Data;
    timeout_timestamp: string;
  }
  export type Proto = MsgTransfer_pb;
}
