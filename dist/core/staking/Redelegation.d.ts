import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { AccAddress, ValAddress } from '../strings';
/**
 * A redelegation is when a delegator decides to stop staking with one validator and
 * transfer their delegation to another validator. Rather than unbonding (which takes
 * some time) and re-staking, the funds can be redelegated immediately if a
 * [[Redelegation.Entry]] can be created.
 *
 * A redelegation, like an unbonding delegation, is implemented through
 * [[Redelegation.Entry]] objects, limited by the `max_entry` parameter in the staking
 * module params. For each pair of source and target validators, you cannot redelegate
 * more times than the amount of entries. Entries are cleared when the redelegation is
 * completed, the same amount of time as unbonding.
 */
export declare class Redelegation extends JSONSerializable<Redelegation.Data> {
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    entries: Redelegation.Entry[];
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address source validator's operator address (from)
     * @param validator_dst_address target validator's operator address (to)
     * @param entries entries
     */
    constructor(delegator_address: AccAddress, validator_src_address: ValAddress, validator_dst_address: ValAddress, entries: Redelegation.Entry[]);
    static fromData(data: Redelegation.Data): Redelegation;
    toData(): Redelegation.Data;
}
export declare namespace Redelegation {
    interface Data {
        delegator_address: AccAddress;
        validator_src_address: ValAddress;
        validator_dst_address: ValAddress;
        entries: Redelegation.Entry.Data[];
    }
    class Entry extends JSONSerializable<Entry.Data> {
        initial_balance: Int;
        balance: Int;
        shares_dst: Dec;
        creation_height: number;
        completion_time: Date;
        /**
         *
         * @param initial_balance balance of delegation prior to initiating redelegation
         * @param balance 	balance of delegation after initiating redelegation
         * @param shares_dst
         * @param creation_height 	height of blockchain when entry was created
         * @param completion_time time when redelegation entry will be removed
         */
        constructor(initial_balance: Int, balance: Int, shares_dst: Dec, creation_height: number, completion_time: Date);
        toData(): Entry.Data;
        static fromData(data: Entry.Data): Entry;
    }
    namespace Entry {
        interface Data {
            initial_balance: string;
            balance: string;
            shares_dst: string;
            creation_height: number;
            completion_time: string;
        }
    }
}
