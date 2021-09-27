import { BaseAPI } from './BaseAPI';
import {
  Msg,
  StdTx,
  StdSignMsg,
  StdFee,
  Coins,
  TxInfo,
  Numeric,
  AccAddress,
} from '../../../core';
import { hashTxBytes } from '../../../util/hash';
import { LCDClient } from '../LCDClient';
import { TxLog } from '../../../core';
import { APIParams } from '../APIRequester';

/** Transaction broadcasting modes  */
export enum Broadcast {
  /** Wait until the transaction has been included in the block */
  BLOCK = 'block',

  /** Return after DeliverTx() */
  SYNC = 'sync',

  /** Return after CheckTx() */
  ASYNC = 'async',
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

export type TxBroadcastResult<
  B extends Block | Sync | Async,
  C extends TxSuccess | TxError | {}
> = B & C;

export interface TxSuccess {
  logs: TxLog[];
}

export interface TxError {
  code: number;
  codespace?: string;
}

export type BlockTxBroadcastResult = TxBroadcastResult<
  Block,
  TxSuccess | TxError
>;
export type SyncTxBroadcastResult = TxBroadcastResult<Sync, TxError | {}>;
export type AsyncTxBroadcastResult = TxBroadcastResult<Async, {}>;

export function isTxError<
  T extends TxBroadcastResult<B, C>,
  B extends Block | Sync,
  C extends TxSuccess | TxError | {}
>(x: T): x is T & TxBroadcastResult<B, TxError> {
  return (x as T & TxError).code !== undefined;
}

export interface BroadcastOptions {
  sequences?: number[];
  feeGranter?: AccAddress;
}

export namespace BlockTxBroadcastResult {
  export interface Data {
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
  gas?: string;
  gasPrices?: Coins.Input;
  gasAdjustment?: Numeric.Input;
  feeDenoms?: string[];
  account_number?: number;
  sequence?: number;
  timeout_height?: number;
}

export namespace AsyncTxBroadcastResult {
  export type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash'>;
}

export namespace SyncTxBroadcastResult {
  export type Data = Pick<
    BlockTxBroadcastResult.Data,
    'height' | 'txhash' | 'raw_log' | 'code' | 'codespace'
  >;
}

export interface TxSearchResult {
  total_count: number;
  count: number;
  page_number: number;
  page_total: number;
  limit: number;
  txs: TxInfo[];
}

export namespace TxSearchResult {
  export interface Data {
    total_count: string;
    count: string;
    page_number: string;
    page_total: string;
    limit: string;
    txs?: TxInfo.Data[];
  }
}

export interface TxSearchOptions {
  page: number;
  limit: number;
}

export class TxAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Looks up a transaction on the blockchain, addressed by its hash
   * @param txHash transaction's hash
   */
  public async txInfo(txHash: string, params: APIParams = {}): Promise<TxInfo> {
    return this.c
      .getRaw<TxInfo.Data>(`/txs/${txHash}`, params)
      .then(TxInfo.fromData);
  }

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
  public async create(
    sourceAddress: string,
    options: CreateTxOptions
  ): Promise<StdSignMsg> {
    let { fee, memo } = options;
    const { msgs } = options;
    memo = memo || '';

    if (!options.account_number || !options.sequence) {
      const account = await this.lcd.auth.accountInfo(sourceAddress);
      if (!options.account_number) {
        options.account_number = account.account_number;
      }

      if (!options.sequence) {
        options.sequence = account.sequence;
      }
    }

    if (fee === undefined) {
      fee = await this.lcd.tx.estimateFee(sourceAddress, msgs, options);
    }

    return new StdSignMsg(
      this.lcd.config.chainID,
      options.account_number,
      options.sequence,
      fee,
      msgs,
      memo,
      options.timeout_height
    );
  }

  /**
   * Looks up transactions on the blockchain for the block height. If height is undefined,
   * gets the transactions for the latest block.
   * @param height block height
   */
  public async txInfosByHeight(height: number | undefined): Promise<TxInfo[]> {
    const blockInfo = await this.lcd.tendermint.blockInfo(height);
    const { txs } = blockInfo.block.data;
    if (!txs) {
      return [];
    } else {
      const txhashes = txs.map(txdata => hashTxBytes(txdata));
      return Promise.all(txhashes.map(txhash => this.txInfo(txhash)));
    }
  }

  /**
   * Estimates the transaction's fee by simulating it within the node
   * @param sourceAddress address that will pay the bill
   * @param msgs standard messages
   * @param options options for fee estimation
   */
  public async estimateFee(
    sourceAddress: string,
    msgs: Msg[],
    options?: {
      memo?: string;
      gas?: string;
      gasPrices?: Coins.Input;
      gasAdjustment?: Numeric.Input;
      feeDenoms?: string[];
    }
  ): Promise<StdFee> {
    const memo = options?.memo;
    const gas = options?.gas;
    const gasPrices = options?.gasPrices || this.lcd.config.gasPrices;
    const gasAdjustment =
      options?.gasAdjustment || this.lcd.config.gasAdjustment;
    const feeDenoms = options?.feeDenoms || ['uluna'];

    let gasPricesCoins: Coins | undefined;
    if (gasPrices) {
      gasPricesCoins = new Coins(gasPrices);
      if (feeDenoms) {
        const gasPricesCoinsFiltered = gasPricesCoins.filter(c =>
          feeDenoms.includes(c.denom)
        );
        if (gasPricesCoinsFiltered.toArray().length > 0) {
          gasPricesCoins = gasPricesCoinsFiltered;
        }
      }
    }

    const data = {
      base_req: {
        chain_id: this.lcd.config.chainID,
        memo,
        from: sourceAddress,
        gas: gas || 'auto',
        gas_prices: gasPricesCoins && gasPricesCoins.toData(),
        gas_adjustment: gasAdjustment && gasAdjustment.toString(),
      },
      msgs: msgs.map(m => m.toData()),
    };
    return this.c
      .post<{ fee: StdFee.Data }>(`/txs/estimate_fee`, data)
      .then(({ result: { fee } }) => StdFee.fromData(fee));
  }

  /**
   * Encode a transaction to Amino-encoding
   * @param tx transaction to encode
   */
  public async encode(tx: StdTx, options?: BroadcastOptions): Promise<string> {
    return this.c
      .postRaw<{ tx: string }>(`/txs/encode`, {
        tx: tx.toData().value,
        sequences: options?.sequences?.map(s => s.toFixed()),
        fee_granter: options?.feeGranter,
      })
      .then(d => d.tx);
  }

  /**
   * Get the transaction's hash
   * @param tx transaction to hash
   */
  public async hash(tx: StdTx): Promise<string> {
    const amino = await this.encode(tx);
    return hashTxBytes(amino);
  }

  private async _broadcast<T>(
    tx: StdTx,
    mode: Broadcast,
    options?: BroadcastOptions
  ): Promise<T> {
    return this.c.postRaw<any>(`/txs`, {
      tx: tx.toData().value,
      mode,
      sequences: options?.sequences?.map(s => s.toFixed()),
      fee_granter: options?.feeGranter,
    });
  }

  /**
   * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
   * @param tx tranasaction to broadcast
   */
  public async broadcast(
    tx: StdTx,
    options?: BroadcastOptions
  ): Promise<BlockTxBroadcastResult> {
    return this._broadcast<BlockTxBroadcastResult.Data>(
      tx,
      Broadcast.BLOCK,
      options
    ).then(d => {
      const blockResult: any = {
        txhash: d.txhash,
        raw_log: d.raw_log,
        gas_wanted: Number.parseInt(d.gas_wanted),
        gas_used: Number.parseInt(d.gas_used),
      };

      if (d.height) {
        blockResult.height = +d.height;
      }

      if (d.logs) {
        blockResult.logs = d.logs.map(l => TxLog.fromData(l));
      }

      if (d.code) {
        blockResult.code = d.code;
      }

      if (d.codespace) {
        blockResult.codespace = d.codespace;
      }

      return blockResult;
    });
  }

  /**
   * NOTE: This is not a synchronous function and is unconventionally named. This function
   * can be await as it returns a `Promise`.
   *
   * Broadcast the transaction using the "sync" mode, returning after DeliverTx() is performed.
   * @param tx transaction to broadcast
   */
  public async broadcastSync(
    tx: StdTx,
    options?: BroadcastOptions
  ): Promise<SyncTxBroadcastResult> {
    return this._broadcast<SyncTxBroadcastResult.Data>(
      tx,
      Broadcast.SYNC,
      options
    ).then(d => {
      const blockResult: any = {
        height: +d.height,
        txhash: d.txhash,
        raw_log: d.raw_log,
      };

      if (d.code) {
        blockResult.code = d.code;
      }

      if (d.codespace) {
        blockResult.codespace = d.codespace;
      }

      return blockResult;
    });
  }

  /**
   * Broadcast the transaction using the "async" mode, returning after CheckTx() is performed.
   * @param tx transaction to broadcast
   */
  public async broadcastAsync(
    tx: StdTx,
    options?: BroadcastOptions
  ): Promise<AsyncTxBroadcastResult> {
    return this._broadcast<AsyncTxBroadcastResult.Data>(
      tx,
      Broadcast.ASYNC,
      options
    ).then(d => ({
      height: +d.height,
      txhash: d.txhash,
    }));
  }

  /**
   * Search for transactions based on event attributes.
   * @param options
   */
  public async search(
    options: Partial<TxSearchOptions> | {}
  ): Promise<TxSearchResult> {
    return this.c.getRaw<TxSearchResult.Data>(`/txs`, options).then(d => ({
      total_count: Number.parseInt(d.total_count),
      count: Number.parseInt(d.count),
      page_number: Number.parseInt(d.page_number),
      page_total: Number.parseInt(d.page_total),
      limit: Number.parseInt(d.limit),
      txs: d.txs ? d.txs.map(txdata => TxInfo.fromData(txdata)) : [],
    }));
  }
}
