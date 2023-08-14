import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Allowance } from '../allowances';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgGrantAllowance as MsgGrantAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx';
/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export declare class MsgGrantAllowance extends JSONSerializable<MsgGrantAllowance.Amino, MsgGrantAllowance.Data, MsgGrantAllowance.Proto> {
    granter: AccAddress;
    grantee: AccAddress;
    allowance: Allowance;
    /**
     *
     * @param granter granter's account address
     * @param grantee grantee's account address
     * @param allowance allowance willing to grant
     */
    constructor(granter: AccAddress, grantee: AccAddress, allowance: Allowance);
    static fromAmino(data: MsgGrantAllowance.Amino, isClassic?: boolean): MsgGrantAllowance;
    toAmino(isClassic?: boolean): MsgGrantAllowance.Amino;
    static fromData(data: MsgGrantAllowance.Data, isClassic?: boolean): MsgGrantAllowance;
    toData(isClassic?: boolean): MsgGrantAllowance.Data;
    static fromProto(proto: MsgGrantAllowance.Proto, isClassic?: boolean): MsgGrantAllowance;
    toProto(isClassic?: boolean): MsgGrantAllowance.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgGrantAllowance;
}
export declare namespace MsgGrantAllowance {
    interface Amino {
        type: 'feegrant/MsgGrantAllowance' | 'cosmos-sdk/MsgGrantAllowance';
        value: {
            granter: AccAddress;
            grantee: AccAddress;
            allowance: Allowance.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance';
        granter: AccAddress;
        grantee: AccAddress;
        allowance: Allowance.Data;
    }
    type Proto = MsgGrantAllowance_pb;
}
