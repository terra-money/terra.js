import { Denom } from '../Denom';
import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { Dec } from '../numeric';
import { LazyGradedVestingAccount as LazyGradedVestingAccount_pb, Schedule as Schedule_pb, VestingSchedule as VestingSchedule_pb } from '@classic-terra/terra.proto/terra/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PublicKey } from '../PublicKey';
/**
 * Holds information about a Account which has vesting information.
 */
export declare class LazyGradedVestingAccount extends JSONSerializable<LazyGradedVestingAccount.Amino, LazyGradedVestingAccount.Data, LazyGradedVestingAccount.Proto> {
    base_vesting_account: BaseVestingAccount;
    vesting_schedules: LazyGradedVestingAccount.VestingSchedule[];
    /**
     *
     * @param base_vesting_account account information
     * @param vesting_schedules Entries that make up vesting
     */
    constructor(base_vesting_account: BaseVestingAccount, vesting_schedules: LazyGradedVestingAccount.VestingSchedule[]);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(_?: boolean): LazyGradedVestingAccount.Amino;
    static fromAmino(data: LazyGradedVestingAccount.Amino, _?: boolean): LazyGradedVestingAccount;
    toData(_?: boolean): LazyGradedVestingAccount.Data;
    static fromData(data: LazyGradedVestingAccount.Data, _?: boolean): LazyGradedVestingAccount;
    toProto(_?: boolean): LazyGradedVestingAccount.Proto;
    static fromProto(lazyGradedVestingAccountProto: LazyGradedVestingAccount.Proto, _?: boolean): LazyGradedVestingAccount;
    packAny(isClassic?: boolean): Any;
    static unpackAny(pubkeyAny: Any, isClassic?: boolean): LazyGradedVestingAccount;
}
export declare namespace LazyGradedVestingAccount {
    interface Amino {
        type: 'core/LazyGradedVestingAccount';
        value: {
            base_vesting_account: BaseVestingAccount.AminoValue;
            vesting_schedules: VestingSchedule.Amino[];
        };
    }
    interface Data {
        '@type': '/terra.vesting.v1beta1.LazyGradedVestingAccount';
        base_vesting_account: BaseVestingAccount.DataValue;
        vesting_schedules: VestingSchedule.Data[];
    }
    type Proto = LazyGradedVestingAccount_pb;
    class VestingSchedule extends JSONSerializable<VestingSchedule.Amino, VestingSchedule.Data, VestingSchedule.Proto> {
        denom: Denom;
        schedules: VestingSchedule.Entry[];
        constructor(denom: Denom, schedules: VestingSchedule.Entry[]);
        toAmino(): VestingSchedule.Amino;
        static fromAmino(data: VestingSchedule.Amino): VestingSchedule;
        toData(): VestingSchedule.Data;
        static fromData(data: VestingSchedule.Data): VestingSchedule;
        toProto(): VestingSchedule.Proto;
        static fromProto(vestingScheduleProto: VestingSchedule.Proto): VestingSchedule;
    }
    namespace VestingSchedule {
        interface Amino {
            denom: Denom;
            schedules: VestingSchedule.Entry.Amino[];
        }
        interface Data {
            denom: Denom;
            schedules: VestingSchedule.Entry.Data[];
        }
        type Proto = VestingSchedule_pb;
        class Entry extends JSONSerializable<Entry.Amino, Entry.Data, Entry.Proto> {
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
            static fromAmino(data: Entry.Amino): Entry;
            toAmino(): Entry.Amino;
            static fromData(data: Entry.Data): Entry;
            toData(): Entry.Data;
            static fromProto(entryProto: Entry.Proto): Entry;
            toProto(): Entry.Proto;
        }
        namespace Entry {
            interface Amino {
                start_time: string;
                end_time: string;
                ratio: string;
            }
            interface Data {
                start_time: string;
                end_time: string;
                ratio: string;
            }
            type Proto = Schedule_pb;
        }
    }
}
