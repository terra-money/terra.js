import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { Coins } from '../Coins';
import { PeriodicVestingAccount as PeriodicVestingAccount_pb, Period as Period_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PublicKey } from '../PublicKey';
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export declare class PeriodicVestingAccount extends JSONSerializable<PeriodicVestingAccount.Amino, PeriodicVestingAccount.Data, PeriodicVestingAccount.Proto> {
    base_vesting_account: BaseVestingAccount;
    start_time: number;
    vesting_periods: PeriodicVestingAccount.Period[];
    /**
     *
     * @param base_vesting_account account information
     * @param start_time vesting start time
     * @param vesting_periods vesting period entries
     */
    constructor(base_vesting_account: BaseVestingAccount, start_time: number, vesting_periods: PeriodicVestingAccount.Period[]);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(isClassic?: boolean): PeriodicVestingAccount.Amino;
    static fromAmino(data: PeriodicVestingAccount.Amino, isClassic?: boolean): PeriodicVestingAccount;
    toData(isClassic?: boolean): PeriodicVestingAccount.Data;
    static fromData(data: PeriodicVestingAccount.Data, isClassic?: boolean): PeriodicVestingAccount;
    toProto(isClassic?: boolean): PeriodicVestingAccount.Proto;
    static fromProto(proto: PeriodicVestingAccount.Proto, isClassic?: boolean): PeriodicVestingAccount;
    packAny(isClassic?: boolean): Any;
    static unpackAny(pubkeyAny: Any, isClassic?: boolean): PeriodicVestingAccount;
}
export declare namespace PeriodicVestingAccount {
    interface Amino {
        type: 'cosmos-sdk/PeriodicVestingAccount';
        value: {
            base_vesting_account: BaseVestingAccount.AminoValue;
            start_time: string;
            vesting_periods: Period.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.PeriodicVestingAccount';
        base_vesting_account: BaseVestingAccount.DataValue;
        start_time: string;
        vesting_periods: Period.Data[];
    }
    type Proto = PeriodicVestingAccount_pb;
    class Period extends JSONSerializable<Period.Amino, Period.Data, Period.Proto> {
        length: number;
        amount: Coins;
        constructor(length: number, amount: Coins);
        toAmino(): Period.Amino;
        static fromAmino(data: Period.Amino): Period;
        toData(): Period.Data;
        static fromData(data: Period.Data): Period;
        toProto(): Period.Proto;
        static fromProto(proto: Period.Proto): Period;
    }
    namespace Period {
        interface Amino {
            length: string;
            amount: Coins.Amino;
        }
        interface Data {
            length: string;
            amount: Coins.Amino;
        }
        type Proto = Period_pb;
    }
}
