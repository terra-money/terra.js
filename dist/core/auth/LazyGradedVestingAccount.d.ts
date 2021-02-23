import { Denom } from '../Denom';
import { Coins } from '../Coins';
import { JSONSerializable } from '../../util/json';
import { Account } from './Account';
import { Dec } from '../numeric';
import { AccAddress } from '../strings';
import { PublicKey } from '../PublicKey';
/**
 * Holds information about a Account which has vesting information.
 */
export declare class LazyGradedVestingAccount extends JSONSerializable<LazyGradedVestingAccount.Data> {
    address: AccAddress;
    coins: Coins;
    public_key: PublicKey | null;
    account_number: number;
    sequence: number;
    original_vesting: Coins;
    delegated_free: Coins;
    delegated_vesting: Coins;
    end_time: number;
    vesting_schedules: LazyGradedVestingAccount.VestingSchedule[];
    /**
     *
     * @param BaseAccount account information
     * @param original_vesting initial vesting amount
     * @param delegated_free
     * @param delegated_vesting
     * @param end_time  -not used-
     * @param vesting_schedules Entries that make up vesting
     */
    constructor(address: AccAddress, coins: Coins, public_key: PublicKey | null, account_number: number, sequence: number, original_vesting: Coins, delegated_free: Coins, delegated_vesting: Coins, end_time: number, vesting_schedules: LazyGradedVestingAccount.VestingSchedule[]);
    toData(): LazyGradedVestingAccount.Data;
    static fromData(data: LazyGradedVestingAccount.Data): LazyGradedVestingAccount;
}
export declare namespace LazyGradedVestingAccount {
    interface Data {
        type: 'core/LazyGradedVestingAccount';
        value: Account.Value & {
            original_vesting: Coins.Data;
            delegated_free: Coins.Data;
            delegated_vesting: Coins.Data;
            end_time: string;
            vesting_schedules: VestingSchedule.Data[];
        };
    }
    class VestingSchedule extends JSONSerializable<VestingSchedule.Data> {
        denom: Denom;
        schedules: VestingSchedule.Entry[];
        constructor(denom: Denom, schedules: VestingSchedule.Entry[]);
        toData(): VestingSchedule.Data;
        static fromData(data: VestingSchedule.Data): VestingSchedule;
    }
    namespace VestingSchedule {
        interface Data {
            denom: Denom;
            schedules: VestingSchedule.Entry.Data[];
        }
        class Entry extends JSONSerializable<Entry.Data> {
            start_time: number;
            end_time: number;
            ratio: Dec;
            /**
             *
             * @param start_time Starting time (block height)
             * @param end_time Ending time (block height)
             * @param ratio Ratio (percentage of vested funds that should be released)
             */
            constructor(start_time: number, end_time: number, ratio: Dec);
            static fromData(data: Entry.Data): Entry;
            toData(): Entry.Data;
        }
        namespace Entry {
            interface Data {
                start_time: string;
                end_time: string;
                ratio: string;
            }
        }
    }
}
