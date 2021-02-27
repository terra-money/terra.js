import { JSONSerializable } from '../../../util/json';
import { Dec, Int } from '../../numeric';
import { ValAddress } from '../../strings';
import { Validator } from '../Validator';
/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
export declare class MsgEditValidator extends JSONSerializable<MsgEditValidator.Data> {
    Description: Validator.Description;
    address: ValAddress;
    commission_rate?: Dec | undefined;
    min_self_delegation?: Int | undefined;
    /**
     * @param Description new description to apply
     * @param address new address to apply
     * @param commission_rate new commission rates to apply
     * @param min_self_delegation new min self delegation
     */
    constructor(Description: Validator.Description, address: ValAddress, commission_rate?: Dec | undefined, min_self_delegation?: Int | undefined);
    static fromData(data: MsgEditValidator.Data): MsgEditValidator;
    toData(): MsgEditValidator.Data;
}
export declare namespace MsgEditValidator {
    const DESC_DO_NOT_MODIFY: Validator.Description;
    interface Data {
        type: 'staking/MsgEditValidator';
        value: {
            Description: any;
            address: ValAddress;
            commission_rate: string | null;
            min_self_delegation: string | null;
        };
    }
}
