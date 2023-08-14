import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization } from './GenericAuthorization';
import { SendAuthorization } from './SendAuthorization';
import { StakeAuthorization } from './StakeAuthorization';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Grant as Grant_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/authz';
export declare class AuthorizationGrant extends JSONSerializable<AuthorizationGrant.Amino, AuthorizationGrant.Data, AuthorizationGrant.Proto> {
    authorization: Authorization;
    expiration: Date;
    constructor(authorization: Authorization, expiration: Date);
    static fromAmino(amino: AuthorizationGrant.Amino, isClassic?: boolean): AuthorizationGrant;
    toAmino(isClassic?: boolean): AuthorizationGrant.Amino;
    static fromData(data: AuthorizationGrant.Data, isClassic?: boolean): AuthorizationGrant;
    toData(isClassic?: boolean): AuthorizationGrant.Data;
    static fromProto(proto: AuthorizationGrant.Proto, isClassic?: boolean): AuthorizationGrant;
    toProto(isClassic?: boolean): AuthorizationGrant.Proto;
}
export declare namespace AuthorizationGrant {
    interface Amino {
        authorization: Authorization.Amino;
        expiration: string;
    }
    interface Data {
        authorization: Authorization.Data;
        expiration: string;
    }
    type Proto = Grant_pb;
}
export declare type Authorization = SendAuthorization | GenericAuthorization | StakeAuthorization;
export declare namespace Authorization {
    type Amino = SendAuthorization.Amino | GenericAuthorization.Amino;
    type Data = SendAuthorization.Data | GenericAuthorization.Data | StakeAuthorization.Data;
    type Proto = Any;
    function fromAmino(data: Authorization.Amino, isClassic?: boolean): Authorization;
    function fromData(data: Authorization.Data, isClassic?: boolean): Authorization;
    function fromProto(proto: Authorization.Proto, isClassic?: boolean): Authorization;
}
