import { AccAddress, Account } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export interface AuthParams {
    max_memo_characters: number;
    tx_sig_limit: number;
    tx_size_cost_per_byte: number;
    sig_verify_cost_ed25519: number;
    sig_verify_cost_secp256k1: number;
}
export declare namespace AuthParams {
    interface Data {
        max_memo_characters: string;
        tx_sig_limit: string;
        tx_size_cost_per_byte: string;
        sig_verify_cost_ed25519: string;
        sig_verify_cost_secp256k1: string;
    }
}
export declare class AuthAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Looks up the account information using its Terra account address. If the account has
     * vesting, it will be one of [LazyGradedVestingAccount, DelayedVestingAccount, PeriodicVestingAccount, ContinuousVestingAccount]
     *
     * @param address address of account to look up
     */
    accountInfo(address: AccAddress, params?: APIParams): Promise<Account>;
    parameters(params?: APIParams): Promise<AuthParams>;
}
