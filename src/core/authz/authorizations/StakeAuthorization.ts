import { Coin } from '../../Coin';
import { AccAddress } from '../../bech32';
import {
  StakeAuthorization as StakeAuthorization_pb,
  AuthorizationType,
  StakeAuthorization_Validators as StakeAuthorizationValidators_pb,
} from '@terra-money/terra.proto/cosmos/staking/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class StakeAuthorization {
  constructor(
    public authorization_type: AuthorizationType,
    public max_tokens?: Coin,
    public allow_list?: StakeAuthorizationValidators,
    public deny_list?: StakeAuthorizationValidators
  ) {}

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

export class StakeAuthorizationValidators {
  constructor(public address: AccAddress[]) {}

  public static fromProto(
    validatorsProto: StakeAuthorizationValidators.Proto
  ): StakeAuthorizationValidators {
    return new StakeAuthorizationValidators(validatorsProto.address);
  }

  public toProto(): StakeAuthorizationValidators.Proto {
    return StakeAuthorizationValidators_pb.fromPartial({
      address: this.address,
    });
  }
}

export namespace StakeAuthorizationValidators {
  export type Proto = StakeAuthorizationValidators_pb;
}

export namespace StakeAuthorization {
  export type Type = AuthorizationType;
  export const Type = AuthorizationType;
  export type Proto = StakeAuthorization_pb;
}
