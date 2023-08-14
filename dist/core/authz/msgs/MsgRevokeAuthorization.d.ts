import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { MsgRevoke as MsgRevoke_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare class MsgRevokeAuthorization extends JSONSerializable<MsgRevokeAuthorization.Amino, MsgRevokeAuthorization.Data, MsgRevokeAuthorization.Proto> {
    granter: AccAddress;
    grantee: AccAddress;
    msg_type_url: string;
    /**
     * @param granter authorization granter
     * @param grantee authorization grantee
     * @param authorization_msg_type type of message to revoke
     */
    constructor(granter: AccAddress, grantee: AccAddress, msg_type_url: string);
    static fromAmino(data: MsgRevokeAuthorization.Amino, _?: boolean): MsgRevokeAuthorization;
    toAmino(isClassic?: boolean): MsgRevokeAuthorization.Amino;
    static fromData(data: MsgRevokeAuthorization.Data, _?: boolean): MsgRevokeAuthorization;
    toData(_?: boolean): MsgRevokeAuthorization.Data;
    static fromProto(proto: MsgRevokeAuthorization.Proto, _?: boolean): MsgRevokeAuthorization;
    toProto(_?: boolean): MsgRevokeAuthorization.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgRevokeAuthorization;
}
export declare namespace MsgRevokeAuthorization {
    interface Amino {
        type: 'msgauth/MsgRevokeAuthorization' | 'cosmos-sdk/MsgRevoke';
        value: {
            granter: AccAddress;
            grantee: AccAddress;
            msg_type_url: string;
        };
    }
    interface Data {
        '@type': '/cosmos.authz.v1beta1.MsgRevoke';
        granter: AccAddress;
        grantee: AccAddress;
        msg_type_url: string;
    }
    type Proto = MsgRevoke_pb;
}
