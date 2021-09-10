import { Tx } from './Tx';
import {
  ABCIMessageLog as ABCIMessageLog_pb,
  TxResponse as TxResponse_pb,
} from '@terra-money/terra.proto/cosmos/base/abci/v1beta1/abci';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 */
export class TxInfo {
  /**
   *
   * @param height height of the block in which the transaction was included.
   * @param txhash transaction's hash.
   * @param raw_log raw log information, as a string.
   * @param logs log information
   * @param gas_wanted gas limited submitted in fee
   * @param gas_used actual gas consumption
   * @param tx transaction content
   * @param timestamp time of inclusion
   * @param code error code
   */
  constructor(
    public height: number,
    public txhash: string,
    public raw_log: string,
    public logs: TxLog[] | undefined,
    public gas_wanted: number,
    public gas_used: number,
    public tx: Tx,
    public timestamp: string,
    public code?: number,
    public codespace?: string
  ) {}

  public static fromProto(proto: TxInfo.Proto): TxInfo {
    return new TxInfo(
      proto.height.toNumber(),
      proto.txhash,
      proto.rawLog,
      proto.logs.map(log => TxLog.fromProto(log)),
      proto.gasWanted.toNumber(),
      proto.gasUsed.toNumber(),
      Tx.unpackAny(proto.tx as Any),
      proto.timestamp,
      proto.code,
      proto.codespace
    );
  }
}

export interface EventKV {
  key: string;
  value: string;
}

export interface Event {
  type: string;
  attributes: EventKV[];
}

export interface EventsByType {
  [type: string]: {
    [key: string]: string[];
  };
}

export namespace EventsByType {
  export function parse(eventData: Event[]): EventsByType {
    const events: EventsByType = {};
    eventData.forEach(ev => {
      ev.attributes.forEach(attr => {
        if (!(ev.type in events)) {
          events[ev.type] = {};
        }

        if (!(attr.key in events[ev.type])) {
          events[ev.type][attr.key] = [];
        }

        events[ev.type][attr.key].push(attr.value);
      });
    });
    return events;
  }
}

export class TxLog {
  public eventsByType: EventsByType;

  constructor(
    public msg_index: number,
    public log: string,
    public events: Event[]
  ) {
    this.eventsByType = EventsByType.parse(this.events);
  }

  public static fromProto(proto: TxLog.Proto): TxLog {
    return new TxLog(
      proto.msgIndex,
      proto.log,
      proto.events.map(e => {
        return {
          type: e.type,
          attributes: e.attributes.map(attr => {
            return {
              key: attr.key,
              value: attr.value,
            };
          }),
        };
      })
    );
  }

  public toProto(): TxLog.Proto {
    const { msg_index, log, events } = this;
    return ABCIMessageLog_pb.fromPartial({
      msgIndex: msg_index,
      log: log,
      events,
    });
  }
}

export namespace TxLog {
  export type Proto = ABCIMessageLog_pb;
}

export namespace TxInfo {
  export type Proto = TxResponse_pb;
}
