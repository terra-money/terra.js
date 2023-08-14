import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { AuthorizationGrant } from '../authorizations';
import { MsgGrant as MsgGrant_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare class MsgGrantAuthorization extends JSONSerializable<MsgGrantAuthorization.Amino, MsgGrantAuthorization.Data, MsgGrantAuthorization.Proto> {
    granter: AccAddress;
    grantee: AccAddress;
    grant: AuthorizationGrant;
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    constructor(granter: AccAddress, grantee: AccAddress, grant: AuthorizationGrant);
    static fromAmino(data: MsgGrantAuthorization.Amino, isClassic?: boolean): MsgGrantAuthorization;
    toAmino(isClassic?: boolean): MsgGrantAuthorization.Amino;
    static fromData(data: MsgGrantAuthorization.Data, isClassic?: boolean): MsgGrantAuthorization;
    toData(isClassic?: boolean): MsgGrantAuthorization.Data;
    static fromProto(data: MsgGrantAuthorization.Proto, isClassic?: boolean): MsgGrantAuthorization;
    toProto(isClassic?: boolean): MsgGrantAuthorization.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): MsgGrantAuthorization;
}
export declare namespace MsgGrantAuthorization {
    interface Amino {
        type: 'msgauth/MsgGrantAuthorization' | 'cosmos-sdk/MsgGrant';
        value: {
            granter: AccAddress;
            grantee: AccAddress;
            grant: AuthorizationGrant.Amino;
        };
    }
    interface Data {
        '@type': '/cosmos.authz.v1beta1.MsgGrant';
        granter: AccAddress;
        grantee: AccAddress;
        grant: AuthorizationGrant.Data;
    }
    type Proto = MsgGrant_pb;
}
