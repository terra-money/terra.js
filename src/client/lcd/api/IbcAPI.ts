import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { IdentifiedClientState } from '../../../core/ibc/core/client/IdentifiedClient';
import { ClientConsensusStates } from '../../../core/ibc/core/client/ClientConsensusStates';
import { LCDClient } from '../LCDClient';
//import { Params as ControllerParams } from '../../../core/ibc/applications/interchain-account/controller/Params';
import { Params as HostParams } from '../../../core/ibc/applications/interchain-account/host/Params';
import { Channel } from '../../../core/ibc/core/channel';
import { IdentifiedConnection } from '../../../core/ibc/core/connection';
import { Height } from '../../../core/ibc/core/client/Height';
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

export interface Port {
  channel: Channel;
  proof: string;
  proof_height: Height;
}
export namespace Port {
  export interface Data {
    channel: Channel.Data;
    proof: string;
    proof_height: Height.Data;
  }
}

export class IbcAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * query all the IBC channels of a chain
   */
  public async channels(
    params: APIParams = {}
  ): Promise<[Channel[], Pagination]> {
    return this.c
      .get<{
        channels: Channel.Data[];
        pagination: Pagination;
      }>(`/ibc/core/channel/v1/channels`, params)
      .then(d => [d.channels.map(Channel.fromData), d.pagination]);
  }

  /**
   * query the information of the port at given channel
   * @param channel_id channel identifier
   * @param port_id port name
   */
  public async port(
    channel_id: string,
    port_id: string,
    params: APIParams = {}
  ): Promise<Port> {
    return this.c
      .get<{
        channel: Channel.Data;
        proof: string;
        proof_height: Height.Data;
      }>(`/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}`, params)
      .then(d => {
        return {
          channel: Channel.fromData(d.channel),
          proof: d.proof,
          proof_height: Height.fromData(d.proof_height),
        };
      });
  }

  /**
   *  query all the IBC connections of a chain
   */
  public async connections(
    params: APIParams = {}
  ): Promise<[IdentifiedConnection[], Pagination]> {
    return this.c
      .get<{
        connections: IdentifiedConnection.Data[];
        pagination: Pagination;
      }>(`/ibc/core/connection/v1/connections`, params)
      .then(d => [
        d.connections.map(IdentifiedConnection.fromData),
        d.pagination,
      ]);
  }

  /**
   * query an IBC connection end
   * @param connection_id connection unique identifier
   */
  public async connection(
    connection_id: string,
    params: APIParams = {}
  ): Promise<IdentifiedConnection> {
    return this.c
      .get<{
        connection: IdentifiedConnection.Data;
      }>(`/ibc/core/connection/v1/connections/${connection_id}`, params)
      .then(d => IdentifiedConnection.fromData(d.connection));
  }

  /**
   * query all the channels associated with a connection end
   * @param connection_id connection unique identifier
   */
  public async connectionChannels(
    connection_id: string,
    params: APIParams = {}
  ): Promise<[Channel[], Height, Pagination]> {
    return this.c
      .get<{
        channels: Channel.Data[];
        pagination: Pagination;
        height: Height.Data;
      }>(`/ibc/core/channel/v1/connections/${connection_id}/channels`, params)
      .then(d => [
        d.channels.map(Channel.fromData),
        Height.fromData(d.height),
        d.pagination,
      ]);
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

  /**
   * query all the IBC light clients of a chain
   */
  public async clientStates(
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

  /**
   * query an IBC light client
   * @param client_id client state unique identifier
   * @returns
   */
  public async clientState(
    client_id: string,
    params: APIParams = {}
  ): Promise<IdentifiedClientState> {
    return this.c
      .get<{
        client_state: IdentifiedClientState.Data;
      }>(`/ibc/core/client/v1/client_states/${client_id}`, params)
      .then(d => IdentifiedClientState.fromData(d.client_state));
  }

  /**
   * query the status of an IBC light client
   * @param client_id client state unique identifier
   * @returns
   */
  public async clientStatus(
    client_id: string,
    params: APIParams = {}
  ): Promise<Status> {
    return this.c
      .get<{
        status: Status.Data;
      }>(`/ibc/core/client/v1/client_status/${client_id}`, params)
      .then();
  }

  /**
   * query all the consensus state associated with a given client
   * @param client_id client identifier
   * @returns
   */
  public async consensusStates(
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
   * NOTE: CURRENTLY LCD DOESN'T SERVE THE ENDPOINT
  /*
  public async interchainAccountControllerParameters(
    params: APIParams = {}
  ): Promise<ControllerParams> {
    return this.c
      .get<{ params: ControllerParams.Data }>(
        `/ibc/apps/interchain_accounts/controller/v1/params`,
        params
      )
      .then(({ params: d }) => ControllerParams.fromData(d));
  }
  */

  /**
   * Gets paramaters for interchain account host.
   */
  public async interchainAccountHostParameters(
    params: APIParams = {}
  ): Promise<HostParams> {
    return this.c
      .get<{ params: HostParams.Data }>(
        `/ibc/apps/interchain_accounts/host/v1/params`,
        params
      )
      .then(({ params: d }) => HostParams.fromData(d));
  }
}
