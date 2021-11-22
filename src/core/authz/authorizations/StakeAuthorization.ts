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

  public static fromAmino(_: any): StakeAuthorizationValidators {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(data: StakeAuthorization.Data): StakeAuthorization {
    return new StakeAuthorization(
      authorizationTypeFromJSON(data.authorization_type),
      data.max_tokens ? Coin.fromProto(data.max_tokens) : undefined,
      data.allow_list
        ? StakeAuthorizationValidators.fromData(data.allow_list)
        : undefined,
      data.deny_list
        ? StakeAuthorizationValidators.fromData(data.deny_list)
        : undefined
    );
  }

  public toData(): StakeAuthorization.Data {
    const { max_tokens, allow_list, deny_list, authorization_type } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.StakeAuthorization',
      authorization_type: authorizationTypeToJSON(authorization_type),
      max_tokens: max_tokens?.toData(),
      allow_list: allow_list?.toData(),
      deny_list: deny_list?.toData(),
    };
  }

  public static fromProto(proto: StakeAuthorization.Proto): StakeAuthorization {
    return new StakeAuthorization(
      proto.authorizationType,
      proto.maxTokens ? Coin.fromProto(proto.maxTokens) : undefined,
      proto.allowList
        ? StakeAuthorizationValidators.fromProto(proto.allowList)
        : undefined,
      proto.denyList
        ? StakeAuthorizationValidators.fromProto(proto.denyList)
        : undefined
    );
  }

  public toProto(): StakeAuthorization.Proto {
    const { max_tokens, allow_list, deny_list, authorization_type } = this;
    return StakeAuthorization_pb.fromPartial({
      allowList: allow_list?.toProto(),
      authorizationType: authorization_type,
      denyList: deny_list?.toProto(),
      maxTokens: max_tokens?.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
      value: StakeAuthorization_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): StakeAuthorization {
    return StakeAuthorization.fromProto(
      StakeAuthorization_pb.decode(msgAny.value)
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

  public static fromAmino(_: any): StakeAuthorizationValidators {
    _;
    throw new Error('Amino not supported');
  }

  public toAmino(): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: StakeAuthorizationValidators.Data
  ): StakeAuthorizationValidators {
    return new StakeAuthorizationValidators(data.address);
  }

  public toData(): StakeAuthorizationValidators.Data {
    return {
      address: this.address,
    };
  }

  public static fromProto(
    proto: StakeAuthorizationValidators.Proto
  ): StakeAuthorizationValidators {
    return new StakeAuthorizationValidators(proto.address);
  }

  public toProto(): StakeAuthorizationValidators.Proto {
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
