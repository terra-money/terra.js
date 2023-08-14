import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';
import { RedelegationResponse as RedelegationResponse_pb, RedelegationEntryResponse as RedelegationEntryResponse_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/staking';
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
export declare class Redelegation extends JSONSerializable<Redelegation.Amino, Redelegation.Data, Redelegation.Proto> {
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
    static fromAmino(data: Redelegation.Amino): Redelegation;
    toAmino(): Redelegation.Amino;
    static fromData(data: Redelegation.Data): Redelegation;
    toData(): Redelegation.Data;
    static fromProto(data: Redelegation.Proto): Redelegation;
    toProto(): Redelegation.Proto;
}
export declare namespace Redelegation {
    interface Amino {
        redelegation: {
            delegator_address: AccAddress;
            validator_src_address: ValAddress;
            validator_dst_address: ValAddress;
        };
        entries: Redelegation.Entry.Amino[];
    }
    interface Data {
        redelegation: {
            delegator_address: AccAddress;
            validator_src_address: ValAddress;
            validator_dst_address: ValAddress;
        };
        entries: Redelegation.Entry.Data[];
    }
    type Proto = RedelegationResponse_pb;
    class Entry extends JSONSerializable<Entry.Amino, Entry.Data, Entry.Proto> {
        initial_balance: Int;
        balance: Int;
        shares_dst: Dec;
        creation_height: number;
        completion_time: Date;
        /**
         *
         * @param initial_balance balance of delegation prior to initiating redelegation
         * @param shares_dst
         * @param creation_height 	height of blockchain when entry was created
         * @param completion_time time when redelegation entry will be removed
         */
        constructor(initial_balance: Int, balance: Int, shares_dst: Dec, creation_height: number, completion_time: Date);
        toAmino(): Entry.Amino;
        static fromAmino(data: Entry.Amino): Entry;
        toData(): Entry.Data;
        static fromData(data: Entry.Data): Entry;
        toProto(): Entry.Proto;
        static fromProto(proto: Entry.Proto): Entry;
    }
    namespace Entry {
        interface Amino {
            redelegation_entry: {
                creation_height: number;
                completion_time: string;
                initial_balance: string;
                shares_dst: string;
            };
            balance: string;
        }
        interface Data {
            redelegation_entry: {
                creation_height: number;
                completion_time: string;
                initial_balance: string;
                shares_dst: string;
            };
            balance: string;
        }
        type Proto = RedelegationEntryResponse_pb;
    }
}
