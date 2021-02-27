import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../strings';
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export declare class MsgWithdrawValidatorCommission extends JSONSerializable<MsgWithdrawValidatorCommission.Data> {
    validator_address: ValAddress;
    /**
     * @param validator_address validator's operator address
     */
    constructor(validator_address: ValAddress);
    static fromData(data: MsgWithdrawValidatorCommission.Data): MsgWithdrawValidatorCommission;
    toData(): MsgWithdrawValidatorCommission.Data;
}
export declare namespace MsgWithdrawValidatorCommission {
    interface Data {
        type: 'distribution/MsgWithdrawValidatorCommission';
        value: {
            validator_address: ValAddress;
        };
    }
}
