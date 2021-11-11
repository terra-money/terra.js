import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
//import { DenomTrace } from '@terra-money/terra.proto/ibc/applications/transfer/v1/query'
import { DenomTrace } from '../../../core/ibc-transfer/DenomTrace';

export interface IbcTransferParams {
  send_enabled: boolean;
  receive_enabled: boolean;
}

export namespace IbcTransferParams {
  export interface Data {
    send_enabled: boolean;
    receive_enabled: boolean;
  }
}

export class IbcTransferAPI extends BaseAPI {
  /** Gets a denomTrace for the hash */
  public async denomTrace(hash: string): Promise<DenomTrace> {

    return this.c.get<{ denom_trace: DenomTrace.Data }>(
      `/ibc/apps/transfer/v1/denom_traces/${hash}`
    ).then(d => DenomTrace.fromData(d.denom_trace));
  }

  /** Gets a list of denomTraces */
  public async denomTraces(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[DenomTrace[], Pagination]> {
    return this.c
      .get<{ denom_traces: DenomTrace[]; pagination: Pagination }>(
        `/ibc/apps/transfer/v1/denom_traces`,
        params
      )
      .then(d => [d.denom_traces.map(DenomTrace.fromData), d.pagination]);
  }

  /* not supoorted
    public async escrowAddress(
        port: string,
        channelId: string
    ): Promise<[Coins, Pagination]> {
    }
    */

  /**
   * Gets the current transfer application parameters.
   */
  public async parameters(params: APIParams = {}): Promise<IbcTransferParams> {
    return this.c
      .get<{ params: IbcTransferParams.Data }>(
        `/ibc/apps/transfer/v1/params`,
        params
      )
      .then(({ params: d }) => ({
        send_enabled: d.send_enabled,
        receive_enabled: d.receive_enabled,
      }));
  }
}
