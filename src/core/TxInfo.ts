import { JSONSerializable } from '../util/json';
import { StdTx } from './StdTx';

/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 */
export class TxInfo extends JSONSerializable<TxInfo.Data> {
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
    public tx: StdTx,
    public timestamp: string,
    public code?: number
  ) {
    super();
  }

  public static fromData(data: TxInfo.Data): TxInfo {
    return new TxInfo(
      Number.parseInt(data.height),
      data.txhash,
      data.raw_log,
      data.logs && data.logs.map(log => TxLog.fromData(log)),
      Number.parseInt(data.gas_wanted),
      Number.parseInt(data.gas_used),
      StdTx.fromData(data.tx),
      data.timestamp,
      data.code
    );
  }

  public toData(): TxInfo.Data {
    let data: TxInfo.Data = {
      height: this.height.toFixed(),
      txhash: this.txhash,
      raw_log: this.raw_log,
      gas_wanted: this.gas_wanted.toFixed(),
      gas_used: this.gas_used.toFixed(),
      tx: this.tx.toData(),
      timestamp: this.timestamp,
    };

    if (this.logs) {
      data = { ...data, logs: this.logs.map(log => log.toData()) };
    }

    if (this.code) {
      data = { ...data, code: this.code };
    }

    return data;
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

export class TxLog extends JSONSerializable<TxLog.Data> {
  public events: {
    [type: string]: {
      [key: string]: string[];
    };
  };

  constructor(
    public msg_index: number,
    public log: string,
    private _eventData: Event[]
  ) {
    super();
    this.events = {};
    _eventData.forEach(ev => {
      ev.attributes.forEach(attr => {
        this.insertEventAttribute(ev.type, attr.key, attr.value);
      });
    });
  }

  private insertEventAttribute(type: string, key: string, value: string) {
    if (!(type in this.events)) {
      this.events[type] = {};
    }

    if (!(key in this.events[type])) {
      this.events[type][key] = [];
    }

    this.events[type][key].push(value);
  }

  public static fromData(data: TxLog.Data): TxLog {
    const { msg_index, log, events } = data;
    return new TxLog(msg_index, log, events);
  }

  public toData(): TxLog.Data {
    const { msg_index, log } = this;
    return {
      msg_index,
      log,
      events: this._eventData,
    };
  }
}

export namespace TxLog {
  export interface Data {
    msg_index: number;
    log: string;
    events: Event[];
  }
}

export namespace TxInfo {
  export interface Data {
    height: string;
    txhash: string;
    raw_log: string;
    logs?: TxLog.Data[];
    gas_wanted: string;
    gas_used: string;
    tx: StdTx.Data;
    timestamp: string;
    code?: number;
  }
}
