import { BaseAPI } from './BaseAPI';
import {
  Account,
  Msg,
  StdTx,
  StdSignMsg,
  StdFee,
  Coin,
  Coins,
  TxInfo,
  Numeric,
} from '../../../core';
import { hashAmino } from '../../../util/hash';
import { LCDClient } from '../LCDClient';
import { TxLog } from '../../../core';

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
  gasPrices?: Coins.Input;
  gasAdjustment?: Numeric.Input;
  account_number?: number;
  sequence?: number;
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
    txs: TxInfo.Data[];
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
  public async txInfo(txHash: string): Promise<TxInfo> {
    return this.c.getRaw<TxInfo.Data>(`/txs/${txHash}`).then(TxInfo.fromData);
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
    const estimateFeeOptions = {
      gasPrices: options.gasPrices || this.lcd.config.gasPrices,
      gasAdjustment: options.gasAdjustment || this.lcd.config.gasAdjustment,
    };

    const balance = await this.lcd.bank.balance(sourceAddress);
    const balanceOne = balance.map(c => new Coin(c.denom, 1));
    // create the fake fee

    if (fee === undefined) {
      // estimate the fee
      const stdTx = new StdTx(msgs, new StdFee(0, balanceOne), [], memo);
      fee = await this.lcd.tx.estimateFee(stdTx, estimateFeeOptions);
    }

    let accountNumber = options.account_number;
    let sequence = options.sequence;

    if (!accountNumber || !sequence) {
      const account = await this.lcd.auth.accountInfo(sourceAddress);

      if (account instanceof Account) {
        if (!accountNumber) {
          accountNumber = account.account_number;
        }

        if (!sequence) {
          sequence = account.sequence;
        }
      } else {
        if (!accountNumber) {
          accountNumber = account.BaseAccount.account_number;
        }

        if (!sequence) {
          sequence = account.BaseAccount.sequence;
        }
      }
    }

    return new StdSignMsg(
      this.lcd.config.chainID,
      accountNumber,
      sequence,
      fee,
      msgs,
      memo
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
      const txhashes = txs.map(txdata => hashAmino(txdata));
      return Promise.all(txhashes.map(txhash => this.txInfo(txhash)));
    }
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
    const gasPrices = options?.gasPrices || this.lcd.config.gasPrices;
    const gasAdjustment =
      options?.gasAdjustment || this.lcd.config.gasAdjustment;

    const txValue = {
      ...(tx instanceof StdSignMsg
        ? tx.toStdTx().toData().value
        : tx.toData().value),
    };

    txValue.fee.gas = '0';

    const data = {
      tx: txValue,
      gas_prices: gasPrices && new Coins(gasPrices).toData(),
      gas_adjustment: gasAdjustment && gasAdjustment.toString(),
    };

    return this.c
      .post<EstimateFeeResponse>(`/txs/estimate_fee`, data)
      .then(
        ({ result: d }) =>
          new StdFee(Number.parseInt(d.gas), Coins.fromData(d.fees))
      );
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
    ).then(d => {
      const blockResult: any = {
        height: Number.parseInt(d.height),
        txhash: d.txhash,
        raw_log: d.raw_log,
        gas_wanted: Number.parseInt(d.gas_wanted),
        gas_used: Number.parseInt(d.gas_used),
      };

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
  public async broadcastSync(tx: StdTx): Promise<SyncTxBroadcastResult> {
    return this._broadcast<SyncTxBroadcastResult.Data>(tx, Broadcast.SYNC).then(
      d => {
        const blockResult: any = {
          height: Number.parseInt(d.height),
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
      }
    );
  }

  /**
   * Broadcast the transaction using the "async" mode, returning after CheckTx() is performed.
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
      txs: d.txs.map(txdata => TxInfo.fromData(txdata)),
    }));
  }
}
