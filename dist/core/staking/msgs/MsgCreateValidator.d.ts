import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { Int } from '../../numeric';
import { AccAddress, ValAddress } from '../../bech32';
import { Validator } from '../Validator';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgCreateValidator as MsgCreateValidator_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/tx';
import { ValConsPublicKey } from '../../PublicKey';
/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
export declare class MsgCreateValidator extends JSONSerializable<MsgCreateValidator.Amino, MsgCreateValidator.Data, MsgCreateValidator.Proto> {
    description: Validator.Description;
    commission: Validator.CommissionRates;
    min_self_delegation: Int;
    delegator_address: AccAddress;
    validator_address: ValAddress;
    pubkey: ValConsPublicKey;
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
    constructor(description: Validator.Description, commission: Validator.CommissionRates, min_self_delegation: Int, delegator_address: AccAddress, validator_address: ValAddress, pubkey: ValConsPublicKey, value: Coin);
    static fromAmino(data: MsgCreateValidator.Amino, _?: boolean): MsgCreateValidator;
    toAmino(isClassic?: boolean): MsgCreateValidator.Amino;
    static fromData(data: MsgCreateValidator.Data, _?: boolean): MsgCreateValidator;
    toData(_?: boolean): MsgCreateValidator.Data;
    static fromProto(proto: MsgCreateValidator.Proto, _?: boolean): MsgCreateValidator;
    toProto(_?: boolean): MsgCreateValidator.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgCreateValidator;
}
export declare namespace MsgCreateValidator {
    interface Amino {
        type: 'staking/MsgCreateValidator' | 'cosmos-sdk/MsgCreateValidator';
        value: {
            description: Validator.Description;
            commission: Validator.CommissionRates.Amino;
            min_self_delegation: string;
            delegator_address: AccAddress;
            validator_address: ValAddress;
            pubkey: ValConsPublicKey.Amino;
            value: Coin.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.staking.v1beta1.MsgCreateValidator';
        description: Validator.Description;
        commission: Validator.CommissionRates.Data;
        min_self_delegation: string;
        delegator_address: AccAddress;
        validator_address: ValAddress;
        pubkey: ValConsPublicKey.Data;
        value: Coin.Data;
    }
    type Proto = MsgCreateValidator_pb;
}
