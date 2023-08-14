import { BaseAPI } from './BaseAPI';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { DenomTrace } from '../../../core/ibc/applications/transfer/v1/DenomTrace';
import { LCDClient } from '../LCDClient';
export interface IbcTransferParams {
    send_enabled: boolean;
    receive_enabled: boolean;
}
export declare namespace IbcTransferParams {
    interface Data {
        send_enabled: boolean;
        receive_enabled: boolean;
    }
}
export declare class IbcTransferAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /** Gets a denomTrace for the hash */
    denomTrace(hash: string): Promise<DenomTrace>;
    /** Gets a list of denomTraces */
    denomTraces(params?: Partial<PaginationOptions & APIParams>): Promise<[DenomTrace[], Pagination]>;
    /** Gets a denomination hash information */
    denomHash(trace: string, params?: Partial<PaginationOptions & APIParams>): Promise<string>;
    /**
     * Gets the current transfer application parameters.
     */
    parameters(params?: APIParams): Promise<IbcTransferParams>;
}
