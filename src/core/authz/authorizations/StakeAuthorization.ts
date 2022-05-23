import { JSONSerializable } from '../../../util/json';
import { Coin } from '../../Coin';
import { AccAddress } from '../../bech32';
import {
  StakeAuthorization as StakeAuthorization_pb,
  AuthorizationType,
  StakeAuthorization_Validators as StakeAuthorizationValidators_pb,
  authorizationTypeFromJSON,
  authorizationTypeToJSON,
} from '@terra-money/terra.proto/cosmos/staking/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class StakeAuthorization extends JSONSerializable<
  any,
  StakeAuthorization.Data,
  StakeAuthorization.Proto
> {
  constructor(
    public authorization_type: AuthorizationType,
    public max_tokens?: Coin,
    public allow_list?: StakeAuthorizationValidators,
    public deny_list?: StakeAuthorizationValidators
  ) {
    super();
  }

  public static fromAmino(_: any, legacy?: boolean): StakeAuthorizationValidators {
    _; legacy;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(data: StakeAuthorization.Data, legacy?: boolean): StakeAuthorization {
    return new StakeAuthorization(
      authorizationTypeFromJSON(data.authorization_type),
      data.max_tokens ? Coin.fromProto(data.max_tokens) : undefined,
      data.allow_list
        ? StakeAuthorizationValidators.fromData(data.allow_list, legacy)
        : undefined,
      data.deny_list
        ? StakeAuthorizationValidators.fromData(data.deny_list, legacy)
        : undefined
    );
  }

  public toData(legacy?: boolean): StakeAuthorization.Data {
    const { max_tokens, allow_list, deny_list, authorization_type } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.StakeAuthorization',
      authorization_type: authorizationTypeToJSON(authorization_type),
      max_tokens: max_tokens?.toData(),
      allow_list: allow_list?.toData(legacy),
      deny_list: deny_list?.toData(legacy),
    };
  }

  public static fromProto(proto: StakeAuthorization.Proto, legacy?: boolean): StakeAuthorization {
    return new StakeAuthorization(
      proto.authorizationType,
      proto.maxTokens ? Coin.fromProto(proto.maxTokens) : undefined,
      proto.allowList
        ? StakeAuthorizationValidators.fromProto(proto.allowList, legacy)
        : undefined,
      proto.denyList
        ? StakeAuthorizationValidators.fromProto(proto.denyList, legacy)
        : undefined
    );
  }

  public toProto(legacy?: boolean): StakeAuthorization.Proto {
    const { max_tokens, allow_list, deny_list, authorization_type } = this;
    return StakeAuthorization_pb.fromPartial({
      allowList: allow_list?.toProto(legacy),
      authorizationType: authorization_type,
      denyList: deny_list?.toProto(legacy),
      maxTokens: max_tokens?.toProto(),
    });
  }

  public packAny(legacy?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
      value: StakeAuthorization_pb.encode(this.toProto(legacy)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, legacy?: boolean): StakeAuthorization {
    return StakeAuthorization.fromProto(
      StakeAuthorization_pb.decode(msgAny.value), legacy
    );
  }
}

export class StakeAuthorizationValidators extends JSONSerializable<
  any,
  StakeAuthorizationValidators.Data,
  StakeAuthorizationValidators.Proto
> {
  constructor(public address: AccAddress[]) {
    super();
  }

  public static fromAmino(_: any, legacy?: boolean): StakeAuthorizationValidators {
    _; legacy;
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    _;
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: StakeAuthorizationValidators.Data,
    _?: boolean
  ): StakeAuthorizationValidators {
    _;
    return new StakeAuthorizationValidators(data.address);
  }

  public toData(_?: boolean): StakeAuthorizationValidators.Data {
    _;
    return {
      address: this.address,
    };
  }

  public static fromProto(
    proto: StakeAuthorizationValidators.Proto,
    _?: boolean
  ): StakeAuthorizationValidators {
    _;
    return new StakeAuthorizationValidators(proto.address);
  }

  public toProto(_?: boolean): StakeAuthorizationValidators.Proto {
    _;
    return StakeAuthorizationValidators_pb.fromPartial({
      address: this.address,
    });
  }
}

export namespace StakeAuthorizationValidators {
  export interface Data {
    address: AccAddress[];
  }

  export type Proto = StakeAuthorizationValidators_pb;
}

export namespace StakeAuthorization {
  export type Type = AuthorizationType;
  export const Type = AuthorizationType;

  export interface Data {
    '@type': '/cosmos.staking.v1beta1.StakeAuthorization';
    max_tokens?: Coin.Data;
    allow_list?: StakeAuthorizationValidators.Data;
    deny_list?: StakeAuthorizationValidators.Data;
    authorization_type: string;
  }

  export type Proto = StakeAuthorization_pb;
}
