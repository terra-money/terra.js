import { Tx } from './Tx';
import { ABCIMessageLog as ABCIMessageLog_pb, TxResponse as TxResponse_pb } from '@terra-money/terra.proto/cosmos/base/abci/v1beta1/abci';
/**
 * A TxInfo data structure is used to capture information from a transaction lookup for
 * a transaction already included in a block
 */
export declare class TxInfo {
    height: number;
    txhash: string;
    raw_log: string;
    logs: TxLog[] | undefined;
    gas_wanted: number;
    gas_used: number;
    tx: Tx;
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
    constructor(height: number, txhash: string, raw_log: string, logs: TxLog[] | undefined, gas_wanted: number, gas_used: number, tx: Tx, timestamp: string, code?: number | undefined, codespace?: string | undefined);
    static fromProto(proto: TxInfo.Proto): TxInfo;
    static fromData(data: TxInfo.Data, isClassic?: boolean): TxInfo;
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
    function parse(eventAmino: Event[]): EventsByType;
}
export declare class TxLog {
    msg_index: number;
    log: string;
    events: Event[];
    eventsByType: EventsByType;
    constructor(msg_index: number, log: string, events: Event[]);
    static fromData(data: TxLog.Data): TxLog;
    toData(): TxLog.Data;
    static fromProto(proto: TxLog.Proto): TxLog;
    toProto(): TxLog.Proto;
}
export declare namespace TxLog {
    interface Data {
        msg_index: number;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    }
    type Proto = ABCIMessageLog_pb;
}
export declare namespace TxInfo {
    interface Data {
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
    type Proto = TxResponse_pb;
}
