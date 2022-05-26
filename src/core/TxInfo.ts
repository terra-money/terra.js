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

  public static fromData(data: TxInfo.Data, isClassic?: boolean): TxInfo {
    return new TxInfo(
      Number.parseInt(data.height),
      data.txhash,
      data.raw_log,
      data.logs.map(log => TxLog.fromData(log)),
      Number.parseInt(data.gas_wanted),
      Number.parseInt(data.gas_used),
      Tx.fromData(data.tx, isClassic),
      data.timestamp,
      data.code,
      data.codespace
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
  export function parse(eventAmino: Event[]): EventsByType {
    const events: EventsByType = {};
    eventAmino.forEach(ev => {
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

  public static fromData(data: TxLog.Data): TxLog {
    return new TxLog(
      data.msg_index,
      data.log,
      data.events.map(e => {
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

  public toData(): TxLog.Data {
    const { msg_index, log, events } = this;
    return {
      msg_index,
      log,
      events,
    };
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
  export interface Data {
    msg_index: number;
    log: string;
    events: { type: string; attributes: { key: string; value: string }[] }[];
  }
  export type Proto = ABCIMessageLog_pb;
}

export namespace TxInfo {
  export interface Data {
    height: string;
    txhash: string;
    codespace: string;
    code: number;
    data: string;
    raw_log: string;
    logs: TxLog.Data[];
    info: string;
    gas_wanted: string;
    gas_used: string;
    tx: Tx.Data;
    timestamp: string;
  }
  export type Proto = TxResponse_pb;
}
