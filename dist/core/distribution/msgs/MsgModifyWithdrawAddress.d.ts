import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export declare class MsgModifyWithdrawAddress extends JSONSerializable<MsgModifyWithdrawAddress.Data> {
    delegator_address: AccAddress;
    withdraw_address: AccAddress;
    /**
     * @param delegator_address delegator's account address
     * @param withdraw_address desired new withdraw address
     */
    constructor(delegator_address: AccAddress, withdraw_address: AccAddress);
    static fromData(data: MsgModifyWithdrawAddress.Data): MsgModifyWithdrawAddress;
    toData(): MsgModifyWithdrawAddress.Data;
}
export declare namespace MsgModifyWithdrawAddress {
    interface Data {
        type: 'distribution/MsgModifyWithdrawAddress';
        value: {
            delegator_address: AccAddress;
            withdraw_address: AccAddress;
        };
    }
}
