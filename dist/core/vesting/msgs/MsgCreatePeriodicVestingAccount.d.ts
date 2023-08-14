import { Period } from '../Period';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreatePeriodicVestingAccount as MsgCreatePeriodicVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/tx';
/**
 * CreatePeriodicVestingAccount defines a method that enables creating a periodic vesting account.
 */
export declare class MsgCreatePeriodicVestingAccount extends JSONSerializable<MsgCreatePeriodicVestingAccount.Amino, MsgCreatePeriodicVestingAccount.Data, MsgCreatePeriodicVestingAccount.Proto> {
    from_address: AccAddress;
    to_address: AccAddress;
    start_time: number;
    vesting_periods: Period[];
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     */
    constructor(from_address: AccAddress, to_address: AccAddress, start_time: number, vesting_periods: Period[]);
    static fromAmino(data: MsgCreatePeriodicVestingAccount.Amino, isClassic?: boolean): MsgCreatePeriodicVestingAccount;
    toAmino(isClassic?: boolean): MsgCreatePeriodicVestingAccount.Amino;
    static fromData(data: MsgCreatePeriodicVestingAccount.Data, isClassic?: boolean): MsgCreatePeriodicVestingAccount;
    toData(isClassic?: boolean): MsgCreatePeriodicVestingAccount.Data;
    static fromProto(proto: MsgCreatePeriodicVestingAccount.Proto, isClassic?: boolean): MsgCreatePeriodicVestingAccount;
    toProto(isClassic?: boolean): MsgCreatePeriodicVestingAccount.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgCreatePeriodicVestingAccount;
}
export declare namespace MsgCreatePeriodicVestingAccount {
    interface Amino {
        type: 'cosmos-sdk/MsgCreatePeriodicVestingAccount';
        value: {
            from_address: AccAddress;
            to_address: AccAddress;
            start_time: string;
            vesting_periods: Period.Amino[];
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount';
        from_address: AccAddress;
        to_address: AccAddress;
        start_time: string;
        vesting_periods: Period.Data[];
    }
    type Proto = MsgCreatePeriodicVestingAccount_pb;
}
