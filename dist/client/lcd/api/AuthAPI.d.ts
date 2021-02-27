import { AccAddress, Account, LazyGradedVestingAccount } from '../../../core';
import { BaseAPI } from './BaseAPI';
export declare class AuthAPI extends BaseAPI {
    /**
     * Looks up the account information using its Terra account address. If the account has
     * vesting, it will be a [[LazyGradedVestingAccount]].
     *
     * @param address address of account to look up
     */
    accountInfo(address: AccAddress): Promise<Account | LazyGradedVestingAccount>;
}
