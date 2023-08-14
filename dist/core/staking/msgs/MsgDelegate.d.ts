import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgDelegate as MsgDelegate_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
export declare class MsgDelegate extends JSONSerializable<MsgDelegate.Amino, MsgDelegate.Data, MsgDelegate.Proto> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin;
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount amount of LUNA to be sent for delegation
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress, amount: Coin);
    static fromAmino(data: MsgDelegate.Amino, _?: boolean): MsgDelegate;
    toAmino(isClassic?: boolean): MsgDelegate.Amino;
    static fromProto(proto: MsgDelegate.Proto, _?: boolean): MsgDelegate;
    toProto(_?: boolean): MsgDelegate.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgDelegate;
    static fromData(data: MsgDelegate.Data, _?: boolean): MsgDelegate;
    toData(_?: boolean): MsgDelegate.Data;
}
export declare namespace MsgDelegate {
    interface Amino {
        type: 'staking/MsgDelegate' | 'cosmos-sdk/MsgDelegate';
        value: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
            amount: Coin.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.staking.v1beta1.MsgDelegate';
        delegator_address: AccAddress;
        validator_address: ValAddress;
        amount: Coin.Data;
    }
    type Proto = MsgDelegate_pb;
}
