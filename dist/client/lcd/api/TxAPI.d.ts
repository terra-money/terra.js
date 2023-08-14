import { BaseAPI } from './BaseAPI';
import { Msg, Tx, Coins, TxInfo, Numeric, Fee, PublicKey } from '../../../core';
import { LCDClient } from '../LCDClient';
import { TxLog } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
interface Wait {
    height: number;
    txhash: string;
    raw_log: string;
    gas_wanted: number;
    gas_used: number;
    logs: TxLog.Data[];
    timestamp: string;
}
interface Block extends Wait {
    info: string;
    data: string;
}
interface Sync {
    height: number;
    txhash: string;
    raw_log: string;
}
interface Async {
    height: number;
    txhash: string;
}
export declare type TxBroadcastResult<B extends Wait | Block | Sync | Async, C extends TxSuccess | TxError | {}> = B & C;
export interface TxSuccess {
    logs: TxLog[];
}
export interface TxError {
    code: number | string;
    codespace?: string;
}
export declare type WaitTxBroadcastResult = TxBroadcastResult<Wait, TxSuccess | TxError>;
export declare type BlockTxBroadcastResult = TxBroadcastResult<Block, TxSuccess | TxError>;
export declare type SyncTxBroadcastResult = TxBroadcastResult<Sync, TxError | {}>;
export declare type AsyncTxBroadcastResult = TxBroadcastResult<Async, {}>;
export declare function isTxError<T extends TxBroadcastResult<B, C>, B extends Wait | Block | Sync, C extends TxSuccess | TxError | {}>(x: T): x is T & TxBroadcastResult<B, TxError>;
export declare namespace BlockTxBroadcastResult {
    interface Data {
        height: string;
        txhash: string;
        raw_log: string;
        gas_wanted: string;
        gas_used: string;
        logs: TxLog.Data[];
        code: number | string;
        codespace: string;
        info: string;
        data: string;
        timestamp: string;
    }
}
export declare namespace AsyncTxBroadcastResult {
    type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash'>;
}
export declare namespace SyncTxBroadcastResult {
    type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash' | 'raw_log' | 'code' | 'codespace'>;
}
export interface SignerOptions {
    address: string;
    sequenceNumber?: number;
    publicKey?: PublicKey | null;
}
export interface SignerData {
    sequenceNumber: number;
    publicKey?: PublicKey | null;
}
export interface CreateTxOptions {
    msgs: Msg[];
    fee?: Fee;
    memo?: string;
    gas?: string;
    gasPrices?: Coins.Input;
    gasAdjustment?: Numeric.Input;
    feeDenoms?: string[];
    timeoutHeight?: number;
}
export interface TxResult {
    tx: TxInfo;
}
export declare namespace TxResult {
    interface Data {
        tx: Tx.Data;
        tx_response: TxInfo.Data;
    }
}
export interface TxSearchResult {
    pagination: Pagination;
    txs: TxInfo[];
}
export declare namespace TxSearchResult {
    interface Data {
        txs: Tx.Data[];
        tx_responses: TxInfo.Data[];
        pagination: Pagination;
    }
}
export declare class SimulateResponse {
    gas_info: {
        gas_wanted: number;
        gas_used: number;
    };
    result: {
        data: string;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    };
    constructor(gas_info: {
        gas_wanted: number;
        gas_used: number;
    }, result: {
        data: string;
        log: string;
        events: {
            type: string;
            attributes: {
                key: string;
                value: string;
            }[];
        }[];
    });
    static fromData(data: SimulateResponse.Data): SimulateResponse;
}
export declare namespace SimulateResponse {
    interface Data {
        gas_info: {
            gas_wanted: string;
            gas_used: string;
        };
        result: {
            data: string;
            log: string;
            events: {
                type: string;
                attributes: {
                    key: string;
                    value: string;
                }[];
            }[];
        };
    }
}
export interface TxSearchOptions extends PaginationOptions {
    events: {
        key: string;
        value: string;
    }[];
}
export declare class TxAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Looks up a transaction on the blockchain, addressed by its hash
     * @param txHash transaction's hash
     */
    txInfo(txHash: string, params?: APIParams): Promise<TxInfo>;
    /**
     * Builds a [[StdSignMsg]] that is ready to be signed by a [[Key]]. The appropriate
     * account number and sequence will be fetched live from the blockchain and added to
     * the resultant [[StdSignMsg]]. If no fee is provided, fee will be automatically
     * estimated using the parameters, simulated using a "dummy fee" with sourceAddress's
     * nonzero denominations in its balance.
     *
     * @param sourceAddress account address of signer
     * @param options TX generation options
     */
    create(signers: SignerOptions[], options: CreateTxOptions): Promise<Tx>;
    /**
     * Looks up transactions on the blockchain for the block height. If height is undefined,
     * gets the transactions for the latest block.
     * @param height block height
     */
    txInfosByHeight(height: number | undefined): Promise<TxInfo[]>;
    /**
     * Estimates the transaction's fee by simulating it within the node
     * @param sourceAddress address that will pay the bill
     * @param msgs standard messages
     * @param options options for fee estimation
     */
    estimateFee(signers: SignerData[], options: CreateTxOptions): Promise<Fee>;
    estimateGas(tx: Tx, options?: {
        gasAdjustment?: Numeric.Input;
        signers?: SignerData[];
    }): Promise<number>;
    computeTax(): Promise<Coins>;
    /**
     * Encode a transaction to base64-encoded protobuf
     * @param tx transaction to encode
     */
    encode(tx: Tx): string;
    /**
     * Decode a transaction from base64-encoded protobuf
     * @param tx transaction string to decode
     */
    decode(encodedTx: string): Tx;
    /**
     * Get the transaction's hash
     * @param tx transaction to hash
     */
    hash(tx: Tx): Promise<string>;
    private _broadcast;
    /**
     * Broadcast the transaction using "sync" mode, then wait for its inclusion in a block.
     *
     * This method polls txInfo using the txHash to confirm the transaction's execution.
     *
     * @param tx      transaction to broadcast
     * @param timeout time in milliseconds to wait for transaction to be included in a block. defaults to 30000
     */
    broadcast(tx: Tx, timeout?: number): Promise<WaitTxBroadcastResult>;
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx transaction to broadcast
     */
    broadcastBlock(tx: Tx): Promise<BlockTxBroadcastResult>;
    /**
     * NOTE: This is not a synchronous function and is unconventionally named. This function
     * can be await as it returns a `Promise`.
     *
     * Broadcast the transaction using the "sync" mode, returning after CheckTx() is performed.
     * @param tx transaction to broadcast
     */
    broadcastSync(tx: Tx): Promise<SyncTxBroadcastResult>;
    /**
     * Broadcast the transaction using the "async" mode, returns immediately (transaction might fail).
     * @param tx transaction to broadcast
     */
    broadcastAsync(tx: Tx): Promise<AsyncTxBroadcastResult>;
    /**
     * Search for transactions based on event attributes.
     * @param options
     */
    search(options: Partial<TxSearchOptions>): Promise<TxSearchResult>;
}
export {};
