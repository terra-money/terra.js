import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';
/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
export declare class MsgWithdrawDelegationReward extends JSONSerializable<MsgWithdrawDelegationReward.Data> {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress);
    static fromData(data: MsgWithdrawDelegationReward.Data): MsgWithdrawDelegationReward;
    toData(): MsgWithdrawDelegationReward.Data;
}
export declare namespace MsgWithdrawDelegationReward {
    interface Data {
        type: 'distribution/MsgWithdrawDelegationReward';
        value: {
            delegator_address: AccAddress;
            validator_address: ValAddress;
        };
    }
}
