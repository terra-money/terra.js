import { JSONSerializable } from '../../util/json';
import { Int } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';
import { UnbondingDelegation as UnbondingDelegation_pb, UnbondingDelegationEntry as UnbondingDelegationEntry_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/staking';
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
export declare class UnbondingDelegation extends JSONSerializable<UnbondingDelegation.Amino, UnbondingDelegation.Data, UnbondingDelegation.Proto> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    entries: UnbondingDelegation.Entry[];
    constructor(delegator_address: AccAddress, validator_address: ValAddress, entries: UnbondingDelegation.Entry[]);
    static fromAmino(data: UnbondingDelegation.Amino): UnbondingDelegation;
    toAmino(): UnbondingDelegation.Amino;
    static fromData(data: UnbondingDelegation.Data): UnbondingDelegation;
    toData(): UnbondingDelegation.Data;
    toProto(): UnbondingDelegation.Proto;
    static fromProto(proto: UnbondingDelegation.Proto): UnbondingDelegation;
}
export declare namespace UnbondingDelegation {
    interface Amino {
        delegator_address: AccAddress;
        validator_address: ValAddress;
        entries: UnbondingDelegation.Entry.Amino[];
    }
    interface Data {
        delegator_address: AccAddress;
        validator_address: ValAddress;
        entries: UnbondingDelegation.Entry.Data[];
    }
    type Proto = UnbondingDelegation_pb;
    class Entry extends JSONSerializable<Entry.Amino, Entry.Data, Entry.Proto> {
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
        toAmino(): Entry.Amino;
        static fromAmino(data: Entry.Amino): Entry;
        toData(): Entry.Data;
        static fromData(data: Entry.Data): Entry;
        toProto(): Entry.Proto;
        static fromProto(proto: Entry.Proto): Entry;
    }
    namespace Entry {
        interface Amino {
            initial_balance: string;
            balance: string;
            creation_height: string;
            completion_time: string;
        }
        interface Data {
            initial_balance: string;
            balance: string;
            creation_height: string;
            completion_time: string;
        }
        type Proto = UnbondingDelegationEntry_pb;
    }
}
