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
   * @param events events
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
    public events?: Event[],
    public code?: number
  ) {
    super();
  }

  public static fromData(data: TxInfo.Data): TxInfo {
    return new TxInfo(
      Number.parseInt(data.height),
      data.txhash,
      data.raw_log,
      data.logs,
      Number.parseInt(data.gas_wanted),
      Number.parseInt(data.gas_used),
      StdTx.fromData(data.tx),
      data.timestamp,
      data.events,
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
      data = { ...data, logs: this.logs };
    }

    if (this.events) {
      data = { ...data, events: this.events };
    }

    if (this.code) {
      data = { ...data, code: this.code };
    }

    return data;
  }
}

export interface Event {
  type: string;
  attributes: EventKV[];
}

export interface EventKV {
  key: string;
  value: string;
}

export interface TxLog {
  msg_index: number;
  success: boolean;
  log: string;
  events: Event[];
}

export namespace TxInfo {
  export interface Data {
    height: string;
    txhash: string;
    raw_log: string;
    logs?: TxLog[];
    gas_wanted: string;
    gas_used: string;
    tx: StdTx.Data;
    timestamp: string;
    events?: Event[];
    code?: number;
  }
}
