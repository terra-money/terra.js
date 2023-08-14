import { Coins } from '../../Coins';
import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateVestingAccount as MsgCreateVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/tx';
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting account.
 */
export declare class MsgCreateVestingAccount extends JSONSerializable<MsgCreateVestingAccount.Amino, MsgCreateVestingAccount.Data, MsgCreateVestingAccount.Proto> {
    from_address: AccAddress;
    to_address: AccAddress;
    end_time: number;
    delayed: boolean;
    amount: Coins;
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    constructor(from_address: AccAddress, to_address: AccAddress, amount: Coins.Input, end_time: number, delayed: boolean);
    static fromAmino(data: MsgCreateVestingAccount.Amino, isClassic?: boolean): MsgCreateVestingAccount;
    toAmino(isClassic?: boolean): MsgCreateVestingAccount.Amino;
    static fromData(data: MsgCreateVestingAccount.Data, isClassic?: boolean): MsgCreateVestingAccount;
    toData(isClassic?: boolean): MsgCreateVestingAccount.Data;
    static fromProto(proto: MsgCreateVestingAccount.Proto, isClassic?: boolean): MsgCreateVestingAccount;
    toProto(isClassic?: boolean): MsgCreateVestingAccount.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgCreateVestingAccount;
}
export declare namespace MsgCreateVestingAccount {
    interface Amino {
        type: 'cosmos-sdk/MsgCreateVestingAccount';
        value: {
            from_address: AccAddress;
            to_address: AccAddress;
            amount: Coins.Amino;
            end_time: string;
            delayed: boolean;
        };
    }
    interface Data {
        '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount';
        from_address: AccAddress;
        to_address: AccAddress;
        amount: Coins.Data;
        end_time: string;
        delayed: boolean;
    }
    type Proto = MsgCreateVestingAccount_pb;
}
