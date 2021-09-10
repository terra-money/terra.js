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
import { APIParams } from '../APIRequester';
import {
  GetTxsEventResponse as GetTxsEventResponse_pb,
  BroadcastMode,
  SimulateResponse,
  SimulateRequest,
  ServiceClient,
  BroadcastTxRequest,
  BroadcastTxResponse,
} from '@terra-money/terra.proto/cosmos/tx/v1beta1/service';
import { Tx as Tx_pb } from '@terra-money/terra.proto/cosmos/tx/v1beta1/tx';
import {
  ServiceClient as TerraServiceClient,
  ComputeTaxRequest,
  ComputeTaxResponse,
} from '@terra-money/terra.proto/terra/tx/v1beta1/service';
import { TxResponse as TxResponse_pb } from '@terra-money/terra.proto/cosmos/base/abci/v1beta1/abci';
import { ChannelCredentials } from '@grpc/grpc-js';

/** Transaction broadcasting modes  */
export type Broadcast = BroadcastMode;

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
  export type Proto = BroadcastTxResponse;
}

export namespace AsyncTxBroadcastResult {
  export type Proto = BlockTxBroadcastResult.Proto;
}

export namespace SyncTxBroadcastResult {
  export type Proto = BlockTxBroadcastResult.Proto;
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
  export interface Proto {
    tx: Tx.Proto;
    tx_response: TxInfo.Proto;
  }
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
  export type Proto = GetTxsEventResponse_pb;
}

export interface TxSearchOptions {
  page: number;
  limit: number;
  [key: string]: any;
}

export interface PaginationOptions {
  'pagination.limit': string;
  'pagination.offset': string;
  [key: string]: any;
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
      .getRaw<TxResult.Proto>(`/cosmos/tx/v1beta1/txs/${txHash}`, params)
      .then(v => TxInfo.fromProto(v.tx_response));
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
        accountNumber = account.account_number;
      }

      if (!sequence) {
        sequence = account.sequence;
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
      const client = new ServiceClient(
        '3.34.120.243:9090',
        ChannelCredentials.createInsecure()
      );
      const simulateRes: SimulateResponse = await new Promise(
        (resolve, reject) => {
          client.simulate(
            SimulateRequest.fromPartial({ txBytes: tx.toBytes() }),
            (err, res) => {
              if (err !== null) {
                return reject(err);
              }

              return resolve(res);
            }
          );
        }
      );

      gas = new Dec(gasAdjustment)
        .mul(simulateRes.gasInfo?.gasUsed.toNumber() || 0)
        .toString();
    }

    const client = new TerraServiceClient(
      '3.34.120.243:9090',
      ChannelCredentials.createInsecure()
    );
    const computeTaxRes: ComputeTaxResponse = await new Promise(
      (resolve, reject) => {
        client.computeTax(
          ComputeTaxRequest.fromPartial({ tx: tx.toProto() }),
          (err, res) => {
            if (err !== null) {
              return reject(err);
            }

            return resolve(res);
          }
        );
      }
    );
    const taxAmount = Coins.fromProto(computeTaxRes.taxAmount);
    const feeAmount = gasPricesCoins
      ? taxAmount.add(gasPricesCoins.mul(gas).toIntCoins())
      : taxAmount;
    return new Fee(Number.parseInt(gas), feeAmount, '', '');
  }

  /**
   * Encode a transaction to Amino-encoding
   * @param tx transaction to encode
   */
  public async encode(tx: Tx): Promise<string> {
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

  private async _broadcast(
    tx: Tx,
    mode: Broadcast
  ): Promise<BroadcastTxResponse> {
    const client = new ServiceClient(
      '3.34.120.243:9090',
      ChannelCredentials.createInsecure()
    );
    console.log(JSON.stringify(Tx_pb.toJSON(tx.toProto())));
    const broadcastTxRes: BroadcastTxResponse = await new Promise(
      (resolve, reject) => {
        client.broadcastTx(
          BroadcastTxRequest.fromPartial({ txBytes: tx.toBytes(), mode }),
          (err, res) => {
            if (err !== null) {
              return reject(err);
            }

            return resolve(res);
          }
        );
      }
    );

    return broadcastTxRes;
  }

  /**
   * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
   * @param tx transaction to broadcast
   */
  public async broadcast(tx: Tx): Promise<BlockTxBroadcastResult> {
    return this._broadcast(tx, BroadcastMode.BROADCAST_MODE_BLOCK).then(d => {
      console.log(d);
      const txResponse = d.txResponse as TxResponse_pb;
      const blockResult: any = {
        txhash: txResponse.txhash,
        raw_log: txResponse.rawLog,
        gas_wanted: txResponse.gasWanted.toNumber(),
        gas_used: txResponse.gasUsed,
      };

      if (txResponse.height) {
        blockResult.height = +txResponse.height;
      }

      if (txResponse.logs) {
        blockResult.logs = txResponse.logs.map(l => TxLog.fromProto(l));
      }

      if (txResponse.code) {
        blockResult.code = txResponse.code;
      }

      if (txResponse.codespace) {
        blockResult.codespace = txResponse.codespace;
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
  public async broadcastSync(tx: Tx): Promise<SyncTxBroadcastResult> {
    return this._broadcast(tx, BroadcastMode.BROADCAST_MODE_SYNC).then(d => {
      const txResponse = d.txResponse as TxResponse_pb;
      const blockResult: any = {
        height: +txResponse.height,
        txhash: txResponse.txhash,
        raw_log: txResponse.rawLog,
      };

      if (txResponse.code) {
        blockResult.code = txResponse.code;
      }

      if (txResponse.codespace) {
        blockResult.codespace = txResponse.codespace;
      }

      return blockResult;
    });
  }

  /**
   * Broadcast the transaction using the "async" mode, returning after CheckTx() is performed.
   * @param tx transaction to broadcast
   */
  public async broadcastAsync(tx: Tx): Promise<AsyncTxBroadcastResult> {
    return this._broadcast(tx, BroadcastMode.BROADCAST_MODE_ASYNC).then(d => {
      const txResponse = d.txResponse as TxResponse_pb;
      return {
        height: +txResponse.height,
        txhash: txResponse.txhash,
      };
    });
  }

  /**
   * Search for transactions based on event attributes.
   * @param options
   */
  public async search(
    options: Partial<TxSearchOptions>
  ): Promise<TxSearchResult> {
    const page_number = options.page || 1;
    const limit = options.limit || 100;
    const offset = (page_number - 1) * (options.limit || 100);

    // remove already spend items
    delete options['page'];
    delete options['limit'];

    const pagination_options: Partial<PaginationOptions> = {
      'pagination.limit': limit.toString(),
      'pagination.offset': offset.toString(),
      events: Object.entries(options)
        .map(v => `${v[0]}=${v[1]}`)
        .reduce((prev, cur) => `${prev},${cur}`),
    };

    return this.c
      .getRaw<TxSearchResult.Proto>(`cosmos/tx/v1beta1/txs`, pagination_options)
      .then(d => {
        const total_count = d.pagination?.total.toNumber() || 0;
        const page_total =
          Math.floor(total_count / limit) + (total_count % limit == 0 ? 0 : 1);
        return {
          total_count: total_count,
          count: d.txs.length,
          page_number,
          page_total,
          limit,
          txs: d.txResponses.map(tx_response => TxInfo.fromProto(tx_response)),
        };
      });
  }
}
