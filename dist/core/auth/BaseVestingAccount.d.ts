import { JSONSerializable } from '../../util/json';
import { Coins } from '../Coins';
import { BaseAccount } from './BaseAccount';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { PublicKey } from '../PublicKey';
/**
 * Holds information about a Account which has vesting information.
 */
export declare class BaseVestingAccount extends JSONSerializable<BaseVestingAccount.Amino, BaseVestingAccount.Data, BaseVestingAccount.Proto> {
    base_account: BaseAccount;
    original_vesting: Coins;
    delegated_free: Coins;
    delegated_vesting: Coins;
    end_time: number;
    /**
     *
     * @param base_account account information
     * @param original_vesting initial vesting amount
     * @param delegated_free
     * @param delegated_vesting
     * @param end_time
     */
    constructor(base_account: BaseAccount, original_vesting: Coins, delegated_free: Coins, delegated_vesting: Coins, end_time: number);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(isClassic?: boolean): BaseVestingAccount.Amino;
    static fromAmino(amino: BaseVestingAccount.Amino, isClassic?: boolean): BaseVestingAccount;
    toData(_?: boolean): BaseVestingAccount.Data;
    static fromData(data: BaseVestingAccount.Data, _?: boolean): BaseVestingAccount;
    toProto(_?: boolean): BaseVestingAccount.Proto;
    static fromProto(proto: BaseVestingAccount.Proto, _?: boolean): BaseVestingAccount;
}
export declare namespace BaseVestingAccount {
    interface AminoValue {
        base_account: BaseAccount.AminoValue;
        original_vesting: Coins.Amino;
        delegated_free: Coins.Amino;
        delegated_vesting: Coins.Amino;
        end_time: string;
    }
    interface Amino {
        type: 'core/BaseVestingAccount' | 'cosmos-sdk/BaseVestingAccount';
        value: AminoValue;
    }
    interface DataValue {
        base_account: BaseAccount.DataValue;
        original_vesting: Coins.Amino;
        delegated_free: Coins.Amino;
        delegated_vesting: Coins.Amino;
        end_time: string;
    }
    interface Data extends DataValue {
        '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount';
    }
    type Proto = BaseVestingAccount_pb;
}
