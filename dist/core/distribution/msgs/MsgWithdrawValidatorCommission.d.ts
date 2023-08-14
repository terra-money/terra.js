import { JSONSerializable } from '../../../util/json';
import { ValAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgWithdrawValidatorCommission as MsgWithdrawValidatorCommission_pb } from '@terra-money/terra.proto/cosmos/distribution/v1beta1/tx';
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
export declare class MsgWithdrawValidatorCommission extends JSONSerializable<MsgWithdrawValidatorCommission.Amino, MsgWithdrawValidatorCommission.Data, MsgWithdrawValidatorCommission.Proto> {
    validator_address: ValAddress;
    /**
     * @param validator_address validator's operator address
     */
    constructor(validator_address: ValAddress);
    static fromAmino(data: MsgWithdrawValidatorCommission.Amino, _?: boolean): MsgWithdrawValidatorCommission;
    toAmino(isClassic?: boolean): MsgWithdrawValidatorCommission.Amino;
    static fromData(proto: MsgWithdrawValidatorCommission.Data, _?: boolean): MsgWithdrawValidatorCommission;
    toData(_?: boolean): MsgWithdrawValidatorCommission.Data;
    static fromProto(proto: MsgWithdrawValidatorCommission.Proto, _?: boolean): MsgWithdrawValidatorCommission;
    toProto(_?: boolean): MsgWithdrawValidatorCommission.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgWithdrawValidatorCommission;
}
export declare namespace MsgWithdrawValidatorCommission {
    interface Amino {
        type: 'distribution/MsgWithdrawValidatorCommission' | 'cosmos-sdk/MsgWithdrawValidatorCommission';
        value: {
            validator_address: ValAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission';
        validator_address: ValAddress;
    }
    type Proto = MsgWithdrawValidatorCommission_pb;
}
