import { JSONSerializable } from '../util/json';
import { StdTx } from './StdTx';
/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 */
export declare class TxInfo extends JSONSerializable<TxInfo.Data> {
    height: number;
    txhash: string;
    raw_log: string;
    logs: TxLog[] | undefined;
    gas_wanted: number;
    gas_used: number;
    tx: StdTx;
    timestamp: string;
    code?: number | undefined;
    codespace?: string | undefined;
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
    constructor(height: number, txhash: string, raw_log: string, logs: TxLog[] | undefined, gas_wanted: number, gas_used: number, tx: StdTx, timestamp: string, code?: number | undefined, codespace?: string | undefined);
    static fromData(data: TxInfo.Data): TxInfo;
    toData(): TxInfo.Data;
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
export declare namespace EventsByType {
    type Data = Event[];
    function parse(eventData: Event[]): EventsByType;
}
export declare class TxLog extends JSONSerializable<TxLog.Data> {
    msg_index: number;
    log: string;
    events: Event[];
    eventsByType: EventsByType;
    constructor(msg_index: number, log: string, events: Event[]);
    static fromData(data: TxLog.Data): TxLog;
    toData(): TxLog.Data;
}
export declare namespace TxLog {
    interface Data {
        msg_index: number;
        log: string;
        events: Event[];
    }
}
export declare namespace TxInfo {
    interface Data {
        height: string;
        txhash: string;
        raw_log: string;
        logs?: TxLog.Data[];
        gas_wanted: string;
        gas_used: string;
        tx: StdTx.Data;
        timestamp: string;
        code?: number;
        codespace?: string;
    }
}
