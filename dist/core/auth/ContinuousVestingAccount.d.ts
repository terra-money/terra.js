import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { PublicKey } from '../PublicKey';
import { ContinuousVestingAccount as ContinuousVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export declare class ContinuousVestingAccount extends JSONSerializable<ContinuousVestingAccount.Amino, ContinuousVestingAccount.Data, ContinuousVestingAccount.Proto> {
    base_vesting_account: BaseVestingAccount;
    start_time: number;
    /**
     *
     * @param base_vesting_account account information
     * @param start_time vesting start time
     */
    constructor(base_vesting_account: BaseVestingAccount, start_time: number);
    getAccountNumber(): number;
    getSequenceNumber(): number;
    getPublicKey(): PublicKey | null;
    toAmino(isClassic?: boolean): ContinuousVestingAccount.Amino;
    static fromAmino(data: ContinuousVestingAccount.Amino, isClassic?: boolean): ContinuousVestingAccount;
    toData(isClassic?: boolean): ContinuousVestingAccount.Data;
    static fromData(data: ContinuousVestingAccount.Data, isClassic?: boolean): ContinuousVestingAccount;
    toProto(isClassic?: boolean): ContinuousVestingAccount.Proto;
    static fromProto(ContinuousVestingAccountProto: ContinuousVestingAccount.Proto, isClassic?: boolean): ContinuousVestingAccount;
    packAny(isClassic?: boolean): Any;
    static unpackAny(pubkeyAny: Any, isClassic?: boolean): ContinuousVestingAccount;
}
export declare namespace ContinuousVestingAccount {
    interface Amino {
        type: 'cosmos-sdk/ContinuousVestingAccount';
        value: {
            base_vesting_account: BaseVestingAccount.AminoValue;
            start_time: string;
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.ContinuousVestingAccount';
        base_vesting_account: BaseVestingAccount.DataValue;
        start_time: string;
    }
    type Proto = ContinuousVestingAccount_pb;
}
