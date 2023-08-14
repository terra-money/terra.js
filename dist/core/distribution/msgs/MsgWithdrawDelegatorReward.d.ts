import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgWithdrawDelegatorReward as MsgWithdrawDelegatorReward_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';
/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export declare class MsgWithdrawDelegatorReward extends JSONSerializable<MsgWithdrawDelegatorReward.Amino, MsgWithdrawDelegatorReward.Data, MsgWithdrawDelegatorReward.Proto> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress);
    static fromAmino(data: MsgWithdrawDelegatorReward.Amino, _?: boolean): MsgWithdrawDelegatorReward;
    toAmino(isClassic?: boolean): MsgWithdrawDelegatorReward.Amino;
    static fromData(proto: MsgWithdrawDelegatorReward.Data, _?: boolean): MsgWithdrawDelegatorReward;
    toData(_?: boolean): MsgWithdrawDelegatorReward.Data;
    static fromProto(proto: MsgWithdrawDelegatorReward.Proto, _?: boolean): MsgWithdrawDelegatorReward;
    toProto(_?: boolean): MsgWithdrawDelegatorReward.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgWithdrawDelegatorReward;
}
export declare namespace MsgWithdrawDelegatorReward {
    interface Amino {
        type: 'distribution/MsgWithdrawDelegationReward' | 'cosmos-sdk/MsgWithdrawDelegationReward';
        value: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward';
        delegator_address: AccAddress;
        validator_address: ValAddress;
    }
    type Proto = MsgWithdrawDelegatorReward_pb;
}
