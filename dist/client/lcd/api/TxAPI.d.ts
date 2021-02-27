import { BaseAPI } from './BaseAPI';
import { Msg, StdTx, StdSignMsg, StdFee, Coins, TxInfo, Numeric } from '../../../core';
import { LCDClient } from '../LCDClient';
import { TxLog } from '../../../core';
/** Transaction broadcasting modes  */
export declare enum Broadcast {
    /** Wait until the transaction has been included in the block */
    BLOCK = "block",
    /** Return after DeliverTx() */
    SYNC = "sync",
    /** Return after CheckTx() */
    ASYNC = "async"
}
interface Block {
    height: number;
    txhash: string;
    raw_log: string;
    gas_wanted: number;
    gas_used: number;
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
export declare type TxBroadcastResult<B extends Block | Sync | Async, C extends TxSuccess | TxError | {}> = B & C;
export interface TxSuccess {
    logs: TxLog[];
}
export interface TxError {
    code: number;
    codespace?: string;
}
export declare type BlockTxBroadcastResult = TxBroadcastResult<Block, TxSuccess | TxError>;
export declare type SyncTxBroadcastResult = TxBroadcastResult<Sync, TxError | {}>;
export declare type AsyncTxBroadcastResult = TxBroadcastResult<Async, {}>;
export declare function isTxError<T extends TxBroadcastResult<B, C>, B extends Block | Sync, C extends TxSuccess | TxError | {}>(x: T): x is T & TxBroadcastResult<B, TxError>;
export declare namespace BlockTxBroadcastResult {
    interface Data {
        height: string;
        txhash: string;
        raw_log: string;
        gas_wanted: string;
        gas_used: string;
        logs?: TxLog.Data[];
        code?: number;
        codespace?: string;
    }
}
export interface CreateTxOptions {
    msgs: Msg[];
    fee?: StdFee;
    memo?: string;
    gasPrices?: Coins.Input;
    gasAdjustment?: Numeric.Input;
    feeDenoms?: string[];
    account_number?: number;
    sequence?: number;
}
export declare namespace AsyncTxBroadcastResult {
    type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash'>;
}
export declare namespace SyncTxBroadcastResult {
    type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash' | 'raw_log' | 'code' | 'codespace'>;
}
export interface TxSearchResult {
    total_count: number;
    count: number;
    page_number: number;
    page_total: number;
    limit: number;
    txs: TxInfo[];
}
export declare namespace TxSearchResult {
    interface Data {
        total_count: string;
        count: string;
        page_number: string;
        page_total: string;
        limit: string;
        txs: TxInfo.Data[];
    }
}
export interface TxSearchOptions {
    page: number;
    limit: number;
}
export declare class TxAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Looks up a transaction on the blockchain, addressed by its hash
     * @param txHash transaction's hash
     */
    txInfo(txHash: string): Promise<TxInfo>;
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
    create(sourceAddress: string, options: CreateTxOptions): Promise<StdSignMsg>;
    /**
     * Looks up transactions on the blockchain for the block height. If height is undefined,
     * gets the transactions for the latest block.
     * @param height block height
     */
    txInfosByHeight(height: number | undefined): Promise<TxInfo[]>;
    /**
     * Estimates the transaction's fee by simulating it within the node
     * @param tx transaction for which to estimate fee
     * @param options options for fee estimation
     */
    estimateFee(tx: StdTx | StdSignMsg, options?: {
        gasPrices?: Coins.Input;
        gasAdjustment?: Numeric.Input;
        feeDenoms?: string[];
    }): Promise<StdFee>;
    /**
     * Encode a transaction to Amino-encoding
     * @param tx transaction to encode
     */
    encode(tx: StdTx): Promise<string>;
    /**
     * Get the transaction's hash
     * @param tx transaction to hash
     */
    hash(tx: StdTx): Promise<string>;
    private _broadcast;
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx tranasaction to broadcast
     */
    broadcast(tx: StdTx): Promise<BlockTxBroadcastResult>;
    /**
     * NOTE: This is not a synchronous function and is unconventionally named. This function
     * can be await as it returns a `Promise`.
     *
     * Broadcast the transaction using the "sync" mode, returning after DeliverTx() is performed.
     * @param tx transaction to broadcast
     */
    broadcastSync(tx: StdTx): Promise<SyncTxBroadcastResult>;
    /**
     * Broadcast the transaction using the "async" mode, returning after CheckTx() is performed.
     * @param tx transaction to broadcast
     */
    broadcastAsync(tx: StdTx): Promise<AsyncTxBroadcastResult>;
    /**
     * Search for transactions based on event attributes.
     * @param options
     */
    search(options: Partial<TxSearchOptions> | {}): Promise<TxSearchResult>;
}
export {};
