import { BaseAPI } from './BaseAPI';
import { Coins, AccAddress } from '../../../core';
export declare class BankAPI extends BaseAPI {
    /**
     * Look up the balance of an account by its address.
     * @param address address of account to look up.
     */
    balance(address: AccAddress): Promise<Coins>;
}
