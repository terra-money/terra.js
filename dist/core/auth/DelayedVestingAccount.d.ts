import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { PublicKey } from '../PublicKey';
import { DelayedVestingAccount as DelayedVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export declare class DelayedVestingAccount extends JSONSerializable<DelayedVestingAccount.Amino, DelayedVestingAccount.Data, DelayedVestingAccount.Proto> {
    base_vesting_account: BaseVestingAccount;
    /**
     *
     * @param base_vesting_account account information
     */
    constructor(base_vesting_account: BaseVestingAccount);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(isClassic?: boolean): DelayedVestingAccount.Amino;
    static fromAmino(data: DelayedVestingAccount.Amino, isClassic?: boolean): DelayedVestingAccount;
    toData(isClassic?: boolean): DelayedVestingAccount.Data;
    static fromData(data: DelayedVestingAccount.Data, isClassic?: boolean): DelayedVestingAccount;
    toProto(isClassic?: boolean): DelayedVestingAccount.Proto;
    static fromProto(DelayedVestingAccountProto: DelayedVestingAccount.Proto, isClassic?: boolean): DelayedVestingAccount;
    packAny(isClassic?: boolean): Any;
    static unpackAny(pubkeyAny: Any, isClassic?: boolean): DelayedVestingAccount;
}
export declare namespace DelayedVestingAccount {
    interface Amino {
        type: 'cosmos-sdk/DelayedVestingAccount';
        value: {
            base_vesting_account: BaseVestingAccount.AminoValue;
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.DelayedVestingAccount';
        base_vesting_account: BaseVestingAccount.DataValue;
    }
    type Proto = DelayedVestingAccount_pb;
}
