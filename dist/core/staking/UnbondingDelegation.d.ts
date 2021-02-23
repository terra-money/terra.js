import { JSONSerializable } from '../../util/json';
import { Int } from '../numeric';
import { AccAddress, ValAddress } from '../strings';
/**
 * When a delegator decides to take out their funds from the staking pool, they must
 * unbond their tokens which takes an amount of time specified by `unbonding_time`
 * parameter in the staking module.
 *
 * An unbonding delegation is implemented through creating [[UnbondingDelegation.Entry]]
 * objects, limited by the max_entry parameter in the staking module params. You cannot
 * initiate unbonds more times than the amount of entries permitted. Entries are cleared
 * when their unbonding periods are completed and the funds are returned to the
 * delegator's account balance to be spent freely.
 */
export declare class UnbondingDelegation extends JSONSerializable<UnbondingDelegation.Data> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    entries: UnbondingDelegation.Entry[];
    constructor(delegator_address: AccAddress, validator_address: ValAddress, entries: UnbondingDelegation.Entry[]);
    static fromData(data: UnbondingDelegation.Data): UnbondingDelegation;
    toData(): UnbondingDelegation.Data;
}
export declare namespace UnbondingDelegation {
    interface Data {
        delegator_address: AccAddress;
        validator_address: ValAddress;
        entries: UnbondingDelegation.Entry.Data[];
    }
    class Entry extends JSONSerializable<Entry.Data> {
        initial_balance: Int;
        balance: Int;
        creation_height: number;
        completion_time: Date;
        /**
         * Note that the size of the undelegation is `initial_balance - balance`
         * @param initial_balance balance of delegation prior to initiating unbond
         * @param balance balance of delegation after initiating unbond
         * @param creation_height height of blockchain when entry was created
         * @param completion_time time when unbonding will be completed
         */
        constructor(initial_balance: Int, balance: Int, creation_height: number, completion_time: Date);
        toData(): Entry.Data;
        static fromData(data: Entry.Data): Entry;
    }
    namespace Entry {
        interface Data {
            initial_balance: string;
            balance: string;
            creation_height: string;
            completion_time: string;
        }
    }
}
