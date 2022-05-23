import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { IdentifiedClientState } from '../../../core/ibc/msgs/client/IdentifiedClient';
import { ClientConsensusStates } from '../../../core/ibc/msgs/client/ClientConsensusStates';
import { LCDClient } from '../LCDClient';
import { Params as ControllerParams } from '../../../core/ibc/applications/interchain-account/controller/Params';
import { Params as HostParams } from '../../../core/ibc/applications/interchain-account/host/Params';
export interface IbcClientParams {
  allowed_clients: string[];
}

export namespace IbcClientParams {
  export interface Data {
    allowed_clients: string[];
  }
}

export interface Status {
  status: string;
}

export namespace Status {
  export interface Data {
    status: string;
  }
}

export class IbcAPI extends BaseAPI {

  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the current transfer application parameters.
   */
  public async parameters(params: APIParams = {}): Promise<IbcClientParams> {
    return this.c
      .get<{ params: IbcClientParams.Data }>(`/ibc/client/v1/params`, params)
      .then(({ params: d }) => ({
        allowed_clients: d.allowed_clients,
      }));
  }

  public async client_states(
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[IdentifiedClientState[], Pagination]> {
    return this.c
      .get<{
        client_states: IdentifiedClientState.Data[];
        pagination: Pagination;
      }>(`/ibc/core/client/v1/client_states`, params)
      .then(d => [
        d.client_states.map(IdentifiedClientState.fromData),
        d.pagination,
      ]);
  }

  public async client_state(
    client_id: string,
    params: APIParams = {}
  ): Promise<IdentifiedClientState> {
    return this.c
      .get<{
        client_state: IdentifiedClientState.Data;
      }>(`/ibc/core/client/v1/client_states/${client_id}`, params)
      .then();
  }

  public async client_status(
    client_id: string,
    params: APIParams = {}
  ): Promise<Status> {
    return this.c
      .get<{
        client_state: Status.Data;
      }>(`/ibc/core/client/v1/client_status/${client_id}`, params)
      .then();
  }

  public async consensus_states(
    client_id: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<[ClientConsensusStates, Pagination]> {
    return this.c
      .get<{
        consensus_states: ClientConsensusStates.Data;
        pagination: Pagination;
      }>(`/ibc/core/client/v1/consensus_states/${client_id}`, params)
      .then();
  }
  /**
   * Gets paramaters for interchain account controller.
   */
  public async interchainAccountControllerParameters(params: APIParams = {}): Promise<ControllerParams> {
    return this.c
      .get<{ params: ControllerParams.Data }>(`/ibc/apps/interchain_accounts/controller/v1/params`, params)
      .then(({ params: d }) => (
        ControllerParams.fromData(d)
      ));
  }

  /**
   * Gets paramaters for interchain account host.
   */
  public async interchainAccountHostParameters(params: APIParams = {}): Promise<HostParams> {
    return this.c
      .get<{ params: HostParams.Data }>(`/ibc/apps/interchain_accounts/host/v1/params`, params)
      .then(({ params: d }) => (
        HostParams.fromData(d)
      ));
  }
}
