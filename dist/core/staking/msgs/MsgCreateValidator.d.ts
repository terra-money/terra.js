import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Int } from '../../numeric';
import { AccAddress, ValAddress, ValConsPubKey } from '../../strings';
import { Validator } from '../Validator';
/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
export declare class MsgCreateValidator extends JSONSerializable<MsgCreateValidator.Data> {
    description: Validator.Description;
    commission: Validator.CommissionRates;
    min_self_delegation: Int;
    delegator_address: AccAddress;
    validator_address: ValAddress;
    pubkey: ValConsPubKey;
    value: Coin;
    /**
     *
     * @param description validator's delegate information
     * @param commission validator's commission policy
     * @param min_self_delegation minimum self delegation
     * @param delegator_address validator's account address
     * @param validator_address validator's operator address
     * @param pubkey validator's consensus public key
     * @param value amount to use for self-delegation
     */
    constructor(description: Validator.Description, commission: Validator.CommissionRates, min_self_delegation: Int, delegator_address: AccAddress, validator_address: ValAddress, pubkey: ValConsPubKey, value: Coin);
    static fromData(data: MsgCreateValidator.Data): MsgCreateValidator;
    toData(): MsgCreateValidator.Data;
}
export declare namespace MsgCreateValidator {
    interface Data {
        type: 'staking/MsgCreateValidator';
        value: {
            description: Validator.Description;
            commission: Validator.CommissionRates.Data;
            min_self_delegation: string;
            delegator_address: AccAddress;
            validator_address: ValAddress;
            pubkey: ValConsPubKey;
            value: Coin.Data;
        };
    }
}
