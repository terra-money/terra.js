import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgBeginRedelegate as MsgBeginRedelegate_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
export declare class MsgBeginRedelegate extends JSONSerializable<MsgBeginRedelegate.Amino, MsgBeginRedelegate.Data, MsgBeginRedelegate.Proto> {
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    amount: Coin;
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address validator to undelegate from
     * @param validator_dst_address validator to delegate to
     * @param amount LUNA to be redelegated
     */
    constructor(delegator_address: AccAddress, validator_src_address: ValAddress, validator_dst_address: ValAddress, amount: Coin);
    static fromAmino(data: MsgBeginRedelegate.Amino, _?: boolean): MsgBeginRedelegate;
    toAmino(isClassic?: boolean): MsgBeginRedelegate.Amino;
    static fromData(data: MsgBeginRedelegate.Data, _?: boolean): MsgBeginRedelegate;
    toData(_?: boolean): MsgBeginRedelegate.Data;
    static fromProto(proto: MsgBeginRedelegate.Proto, _?: boolean): MsgBeginRedelegate;
    toProto(_?: boolean): MsgBeginRedelegate.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgBeginRedelegate;
}
export declare namespace MsgBeginRedelegate {
    interface Amino {
        type: 'staking/MsgBeginRedelegate' | 'cosmos-sdk/MsgBeginRedelegate';
        value: {
            delegator_address: AccAddress;
            validator_src_address: ValAddress;
            validator_dst_address: ValAddress;
            amount: Coin.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate';
        delegator_address: AccAddress;
        validator_src_address: ValAddress;
        validator_dst_address: ValAddress;
        amount: Coin.Data;
    }
    type Proto = MsgBeginRedelegate_pb;
}
