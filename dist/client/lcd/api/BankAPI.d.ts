import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export interface SendEnabled {
    denom: string;
    enabled: boolean;
}
export declare namespace SendEnabled {
    interface Data {
        denom: string;
        enabled: boolean;
    }
}
export interface BankParams {
    send_enabled: SendEnabled[];
    default_send_enabled: boolean;
}
export declare namespace BankParams {
    interface Data {
        send_enabled: SendEnabled.Data[];
        default_send_enabled: boolean;
    }
}
export declare class BankAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Look up the balance of an account by its address.
     * @param address address of account to look up.
     */
    balance(address: AccAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[Coins, Pagination]>;
    /**
     * Get the total supply of tokens in circulation for all denominations.
     */
    total(params?: Partial<PaginationOptions & APIParams>): Promise<[Coins, Pagination]>;
    /**
     * Lqueries the spenable balance of all coins for a single account.
     * @param address address of account to look up.
     */
    spendableBalances(address: AccAddress, params?: Partial<PaginationOptions & APIParams>): Promise<[Coins, Pagination]>;
    parameters(params?: APIParams): Promise<BankParams>;
}
