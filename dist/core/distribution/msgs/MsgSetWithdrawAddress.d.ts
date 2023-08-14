import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgSetWithdrawAddress as MsgSetWithdrawAddress_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export declare class MsgSetWithdrawAddress extends JSONSerializable<MsgSetWithdrawAddress.Amino, MsgSetWithdrawAddress.Data, MsgSetWithdrawAddress.Proto> {
    delegator_address: AccAddress;
    withdraw_address: AccAddress;
    /**
     * @param delegator_address delegator's account address
     * @param withdraw_address desired new withdraw address
     */
    constructor(delegator_address: AccAddress, withdraw_address: AccAddress);
    static fromAmino(data: MsgSetWithdrawAddress.Amino, _?: boolean): MsgSetWithdrawAddress;
    toAmino(isClassic?: boolean): MsgSetWithdrawAddress.Amino;
    static fromData(data: MsgSetWithdrawAddress.Data, _?: boolean): MsgSetWithdrawAddress;
    toData(_?: boolean): MsgSetWithdrawAddress.Data;
    static fromProto(proto: MsgSetWithdrawAddress.Proto, _?: boolean): MsgSetWithdrawAddress;
    toProto(_?: boolean): MsgSetWithdrawAddress.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgSetWithdrawAddress;
}
export declare namespace MsgSetWithdrawAddress {
    interface Amino {
        type: 'distribution/MsgModifyWithdrawAddress' | 'cosmos-sdk/MsgModifyWithdrawAddress';
        value: {
            delegator_address: AccAddress;
            withdraw_address: AccAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress';
        delegator_address: AccAddress;
        withdraw_address: AccAddress;
    }
    type Proto = MsgSetWithdrawAddress_pb;
}
