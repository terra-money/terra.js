import { BaseAPI } from './BaseAPI';
import {
  StdTx,
  StdSignMsg,
  StdFee,
  Coins,
  TxInfo,
  Numeric,
} from '../../../core';
import { hashAmino } from '../../../util/hash';
import { LCDClient } from '../LCDClient';
import { Event, TxLog } from '../../../core';

interface EstimateFeeResponse {
  gas: string;
  fees: Coins.Data;
}

/** Transaction broadcasting modes  */
export enum Broadcast {
  /** Wait until the transaction has been included in the block */
  BLOCK = 'block',

  /** Return after DeliverTx() */
  SYNC = 'sync',

  /** Return after CheckTx() */
  ASYNC = 'async',
}

export interface BlockTxBroadcastResult {
  height: number;
  txhash: string;
  raw_log: string;
  logs: TxLog[];
  gas_wanted: number;
  gas_used: number;
  events: Event;
}

export namespace BlockTxBroadcastResult {
  export interface Data {
    height: string;
    txhash: string;
    raw_log: string;
    logs: TxLog[];
    gas_wanted: string;
    gas_used: string;
    events: Event;
  }
}

export type AsyncTxBroadcastResult = Pick<
  BlockTxBroadcastResult,
  'height' | 'txhash'
>;
export namespace AsyncTxBroadcastResult {
  export type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash'>;
}

export type SyncTxBroadcastResult = Pick<
  BlockTxBroadcastResult,
  'height' | 'txhash' | 'raw_log' | 'logs'
>;
export namespace SyncTxBroadcastResult {
  export type Data = Pick<
    BlockTxBroadcastResult.Data,
    'height' | 'txhash' | 'raw_log' | 'logs'
  >;
}

export class TxAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Looks up a transaction on the blockchain, addressed by its hash
   * @param txHash transaction's hash
   */
  public async txInfo(txHash: string): Promise<TxInfo> {
    return this.c.getRaw<TxInfo.Data>(`/txs/${txHash}`).then(TxInfo.fromData);
  }

  /**
   * Estimates the transaction's fee by simulating it within the node
   * @param tx transaction for which to estimate fee
   * @param options options for fee estimation
   */
  public async estimateFee(
    tx: StdTx | StdSignMsg,
    options?: { gasPrices?: Coins.Input; gasAdjustment?: Numeric.Input }
  ): Promise<StdFee> {
    let gasOptions = {
      gasPrices: this.lcd.config.gasPrices,
      gasAdjustment: this.lcd.config.gasAdjustment,
    };

    gasOptions = {
      ...gasOptions,
      ...options,
    };

    const { gasPrices, gasAdjustment } = gasOptions;

    const data = {
      tx: tx instanceof StdSignMsg ? tx.toStdTx().toData() : tx.toData(),
      gas_prices: gasPrices && new Coins(gasPrices).toData(),
      gas_adjustment: gasAdjustment && gasAdjustment.toString(),
    };

    return this.c
      .post<EstimateFeeResponse>(`/txs/estimate_fee`, data)
      .then(d => d.result)
      .then(d => new StdFee(Number.parseInt(d.gas), Coins.fromData(d.fees)));
  }

  /**
   * Encode a transaction to Amino-encoding
   * @param tx transaction to encode
   */
  public async encode(tx: StdTx): Promise<string> {
    return this.c
      .postRaw<{ tx: string }>(`/txs/encode`, tx.toData())
      .then(d => d.tx);
  }

  /**
   * Get the transaction's hash
   * @param tx transaction to hash
   */
  public async hash(tx: StdTx): Promise<string> {
    const amino = await this.encode(tx);
    return hashAmino(amino);
  }

  private async _broadcast<T>(tx: StdTx, mode: Broadcast): Promise<T> {
    const data = {
      tx: tx.toData().value,
      mode,
    };
    return this.c.postRaw<any>(`/txs`, data);
  }

  /**
   * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
   * @param tx tranasaction to broadcast
   */
  public async broadcast(tx: StdTx): Promise<BlockTxBroadcastResult> {
    return this._broadcast<BlockTxBroadcastResult.Data>(
      tx,
      Broadcast.BLOCK
    ).then(d => ({
      height: Number.parseInt(d.height),
      txhash: d.txhash,
      logs: d.logs,
      raw_log: d.raw_log,
      gas_wanted: Number.parseInt(d.gas_wanted),
      gas_used: Number.parseInt(d.gas_used),
      events: d.events,
    }));
  }

  /**
   * NOTE: This is not a synchronous function and is unconventionally named. This function
   * can be await as it returns a `Promise`.
   *
   * Broadcast the transaction using the "sync" mode, returning after DeliverTx() is performed.
   * @param tx transaction to broadcast
   */
  public async broadcastSync(tx: StdTx): Promise<SyncTxBroadcastResult> {
    return this._broadcast<SyncTxBroadcastResult.Data>(tx, Broadcast.SYNC).then(
      d => ({
        height: Number.parseInt(d.height),
        txhash: d.txhash,
        logs: d.logs,
        raw_log: d.raw_log,
      })
    );
  }

  /**
   * Broadcast the transaction using the "sync" mode, returning after CheckTx() is performed.
   * @param tx transaction to broadcast
   */
  public async broadcastAsync(tx: StdTx): Promise<AsyncTxBroadcastResult> {
    return this._broadcast<AsyncTxBroadcastResult.Data>(
      tx,
      Broadcast.ASYNC
    ).then(d => ({
      height: Number.parseInt(d.height),
      txhash: d.txhash,
    }));
  }
}
