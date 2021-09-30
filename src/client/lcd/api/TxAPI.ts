import { BaseAPI } from './BaseAPI';
import {
  Msg,
  Tx,
  Coins,
  TxInfo,
  Numeric,
  TxBody,
  AuthInfo,
  SignerInfo,
  SimplePublicKey,
  ModeInfo,
  Fee,
  Dec,
} from '../../../core';
import { hashAmino } from '../../../util/hash';
import { LCDClient } from '../LCDClient';
import { TxLog } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { BroadcastMode } from '@terra-money/terra.proto/cosmos/tx/v1beta1/service';

interface Block {
  height: number;
  txhash: string;
  raw_log: string;
  gas_wanted: number;
  gas_used: number;
  data: string;
  logs: TxLog.Data[];
  timestamp: string;
  info: string;
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
  code: number | string;
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
  return (
    (x as T & TxError).code !== undefined &&
    (x as T & TxError).code !== 0 &&
    (x as T & TxError).code !== '0'
  );
}

export namespace BlockTxBroadcastResult {
  export interface Data {
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

export namespace AsyncTxBroadcastResult {
  export type Data = Pick<BlockTxBroadcastResult.Data, 'height' | 'txhash'>;
}

export namespace SyncTxBroadcastResult {
  export type Data = Pick<
    BlockTxBroadcastResult.Data,
    'height' | 'txhash' | 'raw_log' | 'code' | 'codespace'
  >;
}

export interface CreateTxOptions {
  msgs: Msg[];
  fee?: Fee;
  memo?: string;
  gas?: string;
  gasPrices?: Coins.Input;
  gasAdjustment?: Numeric.Input;
  feeDenoms?: string[];
  accountNumber?: number;
  sequence?: number;
  timeoutHeight?: number;
  signMode?: ModeInfo.SignMode;
}

export interface TxResult {
  tx: TxInfo;
}

export namespace TxResult {
  export interface Data {
    tx: Tx.Data;
    tx_response: TxInfo.Data;
  }
}

export interface TxSearchResult {
  pagination: Pagination;
  txs: TxInfo[];
}

export namespace TxSearchResult {
  export interface Data {
    txs: Tx.Data[];
    tx_responses: TxInfo.Data[];
    pagination: Pagination;
  }
}

export class SimulateResponse {
  constructor(
    public gas_info: { gas_wanted: number; gas_used: number },
    public result: {
      data: string;
      log: string;
      events: { type: string; attributes: { key: string; value: string }[] }[];
    }
  ) {}

  public static fromData(data: SimulateResponse.Data): SimulateResponse {
    return new SimulateResponse(
      {
        gas_wanted: Number.parseInt(data.gas_info.gas_wanted),
        gas_used: Number.parseInt(data.gas_info.gas_used),
      },
      data.result
    );
  }
}

export namespace SimulateResponse {
  export interface Data {
    gas_info: {
      gas_wanted: string;
      gas_used: string;
    };
    result: {
      data: string;
      log: string;
      events: { type: string; attributes: { key: string; value: string }[] }[];
    };
  }
}

export interface TxSearchOptions extends PaginationOptions {
  events: { key: string; value: string }[];
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
      .getRaw<TxResult.Data>(`/cosmos/tx/v1beta1/txs/${txHash}`, params)
      .then(v => TxInfo.fromData(v.tx_response));
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
  ): Promise<Tx> {
    let { fee, memo } = options;
    const { msgs } = options;
    memo = memo || '';

    let accountNumber = options.accountNumber;
    let sequence = options.sequence;

    if (!accountNumber || !sequence) {
      const account = await this.lcd.auth.accountInfo(sourceAddress);
      if (!accountNumber) {
        accountNumber = account.getAccountNumber();
      }

      if (!sequence) {
        sequence = account.getSequenceNumber();
      }
    }

    options.sequence = sequence;
    options.accountNumber = accountNumber;

    if (fee === undefined) {
      fee = await this.lcd.tx.estimateFee(msgs, options);
    }

    return new Tx(
      new TxBody(msgs, memo || '', options.timeoutHeight || 0),
      new AuthInfo([], fee),
      []
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
   * @param sourceAddress address that will pay the bill
   * @param msgs standard messages
   * @param options options for fee estimation
   */
  public async estimateFee(
    msgs: Msg[],
    options?: {
      memo?: string;
      gas?: string;
      gasPrices?: Coins.Input;
      gasAdjustment?: Numeric.Input;
      feeDenoms?: string[];
      signMode?: ModeInfo.SignMode;
      sequence?: number;
    }
  ): Promise<Fee> {
    const memo = options?.memo;
    let gas = options?.gas;
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

    // fill empty signature
    const signerInfo = new SignerInfo(
      new SimplePublicKey(''),
      options?.sequence || 0,
      new ModeInfo(
        new ModeInfo.Single(
          options?.signMode || ModeInfo.SignMode.SIGN_MODE_DIRECT
        )
      )
    );
    const txBody = new TxBody(msgs, memo || '', 0);
    const authInfo = new AuthInfo(
      [signerInfo],
      new Fee(0, new Coins(), '', '')
    );
    const tx = new Tx(txBody, authInfo, ['']);

    // simulate gas
    if (!gas || gas === 'auto' || gas === '0') {
      const simulateRes = await this.c
        .post<SimulateResponse.Data>(`/cosmos/tx/v1beta1/simulate`, {
          tx_bytes: this.encode(tx),
        })
        .then(d => SimulateResponse.fromData(d));

      gas = new Dec(gasAdjustment)
        .mul(simulateRes.gas_info.gas_used)
        .toString();
    }

    const taxAmount = await this.c
      .post<{ tax_amount: Coins.Data }>(`/terra/tx/v1beta1/compute_tax`, {
        // tx: tx.toData(),
        tx_bytes: this.encode(tx),
      })
      .then(d => Coins.fromData(d.tax_amount))
      .catch(err => {
        console.error(err);
        throw err;
      });

    const feeAmount = gasPricesCoins
      ? taxAmount.add(gasPricesCoins.mul(gas).toIntCeilCoins())
      : taxAmount;
    return new Fee(Number.parseInt(gas), feeAmount, '', '');
  }

  /**
   * Encode a transaction to Amino-encoding
   * @param tx transaction to encode
   */
  public encode(tx: Tx): string {
    return Buffer.from(tx.toBytes()).toString('base64');
  }

  /**
   * Get the transaction's hash
   * @param tx transaction to hash
   */
  public async hash(tx: Tx): Promise<string> {
    const txBytes = await this.encode(tx);
    return hashAmino(txBytes);
  }

  private async _broadcast<T>(
    tx: Tx,
    mode: keyof typeof BroadcastMode
  ): Promise<T> {
    return await this.c.post<any>(`/cosmos/tx/v1beta1/txs`, {
      tx_bytes: this.encode(tx),
      mode,
    });
  }

  /**
   * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
   * @param tx transaction to broadcast
   */
  public async broadcast(tx: Tx): Promise<BlockTxBroadcastResult> {
    return this._broadcast<{ tx_response: BlockTxBroadcastResult.Data }>(
      tx,
      'BROADCAST_MODE_BLOCK'
    ).then(({ tx_response: d }) => {
      const blockResult: BlockTxBroadcastResult = {
        txhash: d.txhash,
        raw_log: d.raw_log,
        gas_wanted: Number.parseInt(d.gas_wanted),
        gas_used: Number.parseInt(d.gas_used),
        height: +d.height,
        logs: d.logs.map(l => TxLog.fromData(l)),
        code: d.code,
        codespace: d.codespace,
        data: d.data,
        info: d.info,
        timestamp: d.timestamp,
      };

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
  public async broadcastSync(tx: Tx): Promise<SyncTxBroadcastResult> {
    return this._broadcast<{ tx_response: SyncTxBroadcastResult.Data }>(
      tx,
      'BROADCAST_MODE_SYNC'
    ).then(({ tx_response: d }) => {
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
  public async broadcastAsync(tx: Tx): Promise<AsyncTxBroadcastResult> {
    return this._broadcast<{ tx_response: AsyncTxBroadcastResult.Data }>(
      tx,
      'BROADCAST_MODE_ASYNC'
    ).then(({ tx_response: d }) => ({
      height: +d.height,
      txhash: d.txhash,
    }));
  }

  /**
   * Search for transactions based on event attributes.
   * @param options
   */
  public async search(
    options: Partial<TxSearchOptions>
  ): Promise<TxSearchResult> {
    const params = new URLSearchParams();

    // build search params
    options.events?.forEach(v =>
      params.append(
        'events',
        v.key === 'tx.height' ? `${v.key}=${v.value}` : `${v.key}='${v.value}'`
      )
    );

    delete options['events'];

    Object.entries(options).forEach(v => {
      params.append(v[0], v[1] as string);
    });

    return this.c
      .getRaw<TxSearchResult.Data>(`cosmos/tx/v1beta1/txs`, params)
      .then(d => {
        return {
          txs: d.tx_responses.map(tx_response => TxInfo.fromData(tx_response)),
          pagination: d.pagination,
        };
      });
  }
}
