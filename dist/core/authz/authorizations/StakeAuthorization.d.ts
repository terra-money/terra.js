import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress } from '../../bech32';
import { StakeAuthorization as StakeAuthorization_pb, AuthorizationType, StakeAuthorization_Validators as StakeAuthorizationValidators_pb } from '@terra-money/terra.proto/cosmos/staking/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
export declare class StakeAuthorization extends JSONSerializable<any, StakeAuthorization.Data, StakeAuthorization.Proto> {
    authorization_type: AuthorizationType;
    max_tokens?: Coin | undefined;
    allow_list?: StakeAuthorizationValidators | undefined;
    deny_list?: StakeAuthorizationValidators | undefined;
    constructor(authorization_type: AuthorizationType, max_tokens?: Coin | undefined, allow_list?: StakeAuthorizationValidators | undefined, deny_list?: StakeAuthorizationValidators | undefined);
    static fromAmino(_: any, isClassic?: boolean): StakeAuthorizationValidators;
    toAmino(_?: boolean): any;
    static fromData(data: StakeAuthorization.Data, isClassic?: boolean): StakeAuthorization;
    toData(isClassic?: boolean): StakeAuthorization.Data;
    static fromProto(proto: StakeAuthorization.Proto, isClassic?: boolean): StakeAuthorization;
    toProto(isClassic?: boolean): StakeAuthorization.Proto;
    packAny(isClassic?: boolean): Any;
    static unpackAny(msgAny: Any, isClassic?: boolean): StakeAuthorization;
}
export declare class StakeAuthorizationValidators extends JSONSerializable<any, StakeAuthorizationValidators.Data, StakeAuthorizationValidators.Proto> {
    address: AccAddress[];
    constructor(address: AccAddress[]);
    static fromAmino(_: any, isClassic?: boolean): StakeAuthorizationValidators;
    toAmino(_?: boolean): any;
    static fromData(data: StakeAuthorizationValidators.Data, _?: boolean): StakeAuthorizationValidators;
    toData(_?: boolean): StakeAuthorizationValidators.Data;
    static fromProto(proto: StakeAuthorizationValidators.Proto, _?: boolean): StakeAuthorizationValidators;
    toProto(_?: boolean): StakeAuthorizationValidators.Proto;
}
export declare namespace StakeAuthorizationValidators {
    interface Data {
        address: AccAddress[];
    }
    type Proto = StakeAuthorizationValidators_pb;
}
export declare namespace StakeAuthorization {
    type Type = AuthorizationType;
    const Type: typeof AuthorizationType;
    interface Data {
        '@type': '/cosmos.staking.v1beta1.StakeAuthorization';
        max_tokens?: Coin.Data;
        allow_list?: StakeAuthorizationValidators.Data;
        deny_list?: StakeAuthorizationValidators.Data;
        authorization_type: string;
    }
    type Proto = StakeAuthorization_pb;
}
