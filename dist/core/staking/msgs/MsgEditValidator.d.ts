import { JSONSerializable } from '../../../util/json';
import { Dec, Int } from '../../numeric';
import { ValAddress } from '../../bech32';
import { Validator } from '../Validator';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgEditValidator as MsgEditValidator_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
export declare class MsgEditValidator extends JSONSerializable<MsgEditValidator.Amino, MsgEditValidator.Data, MsgEditValidator.Proto> {
    description: Validator.Description;
    validator_address: ValAddress;
    commission_rate?: Dec | undefined;
    min_self_delegation?: Int | undefined;
    /**
     * @param Description new description to apply
     * @param address new address to apply
     * @param commission_rate new commission rates to apply
     * @param min_self_delegation new min self delegation
     */
    constructor(description: Validator.Description, validator_address: ValAddress, commission_rate?: Dec | undefined, min_self_delegation?: Int | undefined);
    static fromAmino(data: MsgEditValidator.Amino, _?: boolean): MsgEditValidator;
    toAmino(isClassic?: boolean): MsgEditValidator.Amino;
    static fromProto(data: MsgEditValidator.Proto, _?: boolean): MsgEditValidator;
    toProto(_?: boolean): MsgEditValidator.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgEditValidator;
    static fromData(data: MsgEditValidator.Data, _?: boolean): MsgEditValidator;
    toData(_?: boolean): MsgEditValidator.Data;
}
export declare namespace MsgEditValidator {
    const DESC_DO_NOT_MODIFY: Validator.Description.Amino;
    interface Amino {
        type: 'staking/MsgEditValidator' | 'cosmos-sdk/MsgEditValidator';
        value: {
            description: Validator.Description.Amino;
            validator_address: ValAddress;
            commission_rate?: string;
            min_self_delegation?: string;
        };
    }
    interface Data {
        '@type': '/cosmos.staking.v1beta1.MsgEditValidator';
        description: Validator.Description.Data;
        validator_address: ValAddress;
        commission_rate?: string;
        min_self_delegation?: string;
    }
    type Proto = MsgEditValidator_pb;
}
