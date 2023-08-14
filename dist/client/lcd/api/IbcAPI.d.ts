import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { IdentifiedClientState } from '../../../core/ibc/core/client/IdentifiedClient';
import { ClientConsensusStates } from '../../../core/ibc/core/client/ClientConsensusStates';
import { LCDClient } from '../LCDClient';
import { Params as HostParams } from '../../../core/ibc/applications/interchain-account/host/Params';
import { Channel } from '../../../core/ibc/core/channel';
import { IdentifiedConnection } from '../../../core/ibc/core/connection';
import { Height } from '../../../core/ibc/core/client/Height';
export interface IbcClientParams {
    allowed_clients: string[];
}
export declare namespace IbcClientParams {
    interface Data {
        allowed_clients: string[];
    }
}
export interface Status {
    status: string;
}
export declare namespace Status {
    interface Data {
        status: string;
    }
}
export interface Port {
    channel: Channel;
    proof: string;
    proof_height: Height;
}
export declare namespace Port {
    interface Data {
        channel: Channel.Data;
        proof: string;
        proof_height: Height.Data;
    }
}
export declare class IbcAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * query all the IBC channels of a chain
     */
    channels(params?: APIParams): Promise<[Channel[], Pagination]>;
    /**
     * query the information of the port at given channel
     * @param channel_id channel identifier
     * @param port_id port name
     */
    port(channel_id: string, port_id: string, params?: APIParams): Promise<Port>;
    /**
     *  query all the IBC connections of a chain
     */
    connections(params?: APIParams): Promise<[IdentifiedConnection[], Pagination]>;
    /**
     * query an IBC connection end
     * @param connection_id connection unique identifier
     */
    connection(connection_id: string, params?: APIParams): Promise<IdentifiedConnection>;
    /**
     * query all the channels associated with a connection end
     * @param connection_id connection unique identifier
     */
    connectionChannels(connection_id: string, params?: APIParams): Promise<[Channel[], Height, Pagination]>;
    /**
     * Gets the current transfer application parameters.
     */
    parameters(params?: APIParams): Promise<IbcClientParams>;
    /**
     * query all the IBC light clients of a chain
     */
    clientStates(params?: Partial<PaginationOptions & APIParams>): Promise<[IdentifiedClientState[], Pagination]>;
    /**
     * query an IBC light client
     * @param client_id client state unique identifier
     * @returns
     */
    clientState(client_id: string, params?: APIParams): Promise<IdentifiedClientState>;
    /**
     * query the status of an IBC light client
     * @param client_id client state unique identifier
     * @returns
     */
    clientStatus(client_id: string, params?: APIParams): Promise<Status>;
    /**
     * query all the consensus state associated with a given client
     * @param client_id client identifier
     * @returns
     */
    consensusStates(client_id: string, params?: Partial<PaginationOptions & APIParams>): Promise<[ClientConsensusStates, Pagination]>;
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
    interchainAccountHostParameters(params?: APIParams): Promise<HostParams>;
}
