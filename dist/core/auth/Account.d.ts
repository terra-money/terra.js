import { Coins } from '../Coins';
import { PublicKey } from '../PublicKey';
import { JSONSerializable } from '../../util/json';
import { AccAddress } from '../strings';
/**
 * Stores information about an account fetched from the blockchain.
 */
export declare class Account extends JSONSerializable<Account.Data> {
    address: AccAddress;
    coins: Coins;
    public_key: PublicKey | null;
    account_number: number;
    sequence: number;
    /**
     * Creates a new Account object, holding information about a basic account.
     *
     * @param address account address
     * @param coins account's balance
     * @param public_key account's public key information
     * @param account_number account number on the blockchain
     * @param sequence sequence number, or number of transactions that have been posted
     */
    constructor(address: AccAddress, coins: Coins, public_key: PublicKey | null, account_number: number, sequence: number);
    toData(): Account.Data;
    static fromData(data: Account.Data): Account;
}
export declare namespace Account {
    interface Value {
        address: AccAddress;
        coins: Coins.Data;
        public_key: PublicKey.Data | null;
        account_number: string;
        sequence: string;
    }
    interface Data {
        type: 'core/Account';
        value: Value;
    }
}
