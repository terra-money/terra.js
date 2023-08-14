import { Coin } from '../../Coin';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgUndelegate as MsgUndelegate_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
/**
 * A delegator can undelegate an amount of bonded Luna, and will begin the unbonding
 * process for those funds. The unbonding process takes 21 days to complete, during
 * which the Luna cannot be transacted or swapped.
 */
export declare class MsgUndelegate extends JSONSerializable<MsgUndelegate.Amino, MsgUndelegate.Data, MsgUndelegate.Proto> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    amount: Coin;
    /**
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount Luna to be undelegated
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress, amount: Coin);
    static fromAmino(data: MsgUndelegate.Amino, _?: boolean): MsgUndelegate;
    toAmino(isClassic?: boolean): MsgUndelegate.Amino;
    static fromProto(proto: MsgUndelegate.Proto, _?: boolean): MsgUndelegate;
    toProto(_?: boolean): MsgUndelegate.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgUndelegate;
    static fromData(data: MsgUndelegate.Data, _?: boolean): MsgUndelegate;
    toData(_?: boolean): MsgUndelegate.Data;
}
export declare namespace MsgUndelegate {
    interface Amino {
        type: 'staking/MsgUndelegate' | 'cosmos-sdk/MsgUndelegate';
        value: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
            amount: Coin.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.staking.v1beta1.MsgUndelegate';
        delegator_address: AccAddress;
        validator_address: ValAddress;
        amount: Coin.Data;
    }
    type Proto = MsgUndelegate_pb;
}
