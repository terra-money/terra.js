import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgRevokeAllowance as MsgRevokeAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx';
/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
export declare class MsgRevokeAllowance extends JSONSerializable<MsgRevokeAllowance.Amino, MsgRevokeAllowance.Data, MsgRevokeAllowance.Proto> {
    granter: AccAddress;
    grantee: AccAddress;
    /**
     *
     * @param granter granter's account address
     * @param grantee grantee's account address
     */
    constructor(granter: AccAddress, grantee: AccAddress);
    static fromAmino(data: MsgRevokeAllowance.Amino, _?: boolean): MsgRevokeAllowance;
    toAmino(isClassic?: boolean): MsgRevokeAllowance.Amino;
    static fromData(proto: MsgRevokeAllowance.Data, _?: boolean): MsgRevokeAllowance;
    toData(_?: boolean): MsgRevokeAllowance.Data;
    static fromProto(proto: MsgRevokeAllowance.Proto, _?: boolean): MsgRevokeAllowance;
    toProto(_?: boolean): MsgRevokeAllowance.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgRevokeAllowance;
}
export declare namespace MsgRevokeAllowance {
    interface Amino {
        type: 'feegrant/MsgRevokeAllowance' | 'cosmos-sdk/MsgRevokeAllowance';
        value: {
            granter: AccAddress;
            grantee: AccAddress;
        };
    }
    interface Data {
        '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance';
        granter: AccAddress;
        grantee: AccAddress;
    }
    type Proto = MsgRevokeAllowance_pb;
}
