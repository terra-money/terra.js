import { Coin } from '../../Coin';
import { AccAddress } from '../../bech32';
import {
  StakeAuthorization as StakeAuthorization_pb,
  AuthorizationTypeMap,
  AuthorizationType,
} from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/authz_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

export class StakeAuthorization {
  constructor(
    public authorization_type: AuthorizationTypeMap[keyof AuthorizationTypeMap],
    public max_tokens?: Coin,
    public allow_list?: StakeAuthorizationValidators,
    public deny_list?: StakeAuthorizationValidators
  ) {
    if (!(authorization_type in StakeAuthorization.Type)) {
      throw new Error(
        'not recognized stake authorization type, please check StakeAuthorization.Type'
      );
    }
  }

  public static fromProto(proto: StakeAuthorization.Proto): StakeAuthorization {
    const maxTokens = proto.getMaxTokens();
    const allowList = proto.getAllowList();
    const denyList = proto.getDenyList();

    return new StakeAuthorization(
      proto.getAuthorizationType(),
      maxTokens ? Coin.fromProto(maxTokens) : undefined,
      allowList ? StakeAuthorizationValidators.fromProto(allowList) : undefined,
      denyList ? StakeAuthorizationValidators.fromProto(denyList) : undefined
    );
  }

  public toProto(): StakeAuthorization.Proto {
    const { max_tokens, allow_list, deny_list, authorization_type } = this;
    const stakeAuthorizationProto = new StakeAuthorization_pb();
    stakeAuthorizationProto.setAllowList(allow_list?.toProto());
    stakeAuthorizationProto.setDenyList(deny_list?.toProto());
    stakeAuthorizationProto.setMaxTokens(max_tokens?.toProto());
    stakeAuthorizationProto.setAuthorizationType(authorization_type);

    return stakeAuthorizationProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.staking.v1beta1.StakeAuthorization');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): StakeAuthorization {
    return StakeAuthorization.fromProto(
      StakeAuthorization_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export class StakeAuthorizationValidators {
  constructor(public address: AccAddress[]) {}

  public static fromProto(
    validatorsProto: StakeAuthorizationValidators.Proto
  ): StakeAuthorizationValidators {
    return new StakeAuthorizationValidators(validatorsProto.getAddressList());
  }

  public toProto(): StakeAuthorizationValidators.Proto {
    const validatorsProto = new StakeAuthorization_pb.Validators();
    validatorsProto.setAddressList(this.address);
    return validatorsProto;
  }
}

export namespace StakeAuthorizationValidators {
  export type Proto = StakeAuthorization_pb.Validators;
}

export namespace StakeAuthorization {
  export const Type: AuthorizationTypeMap = AuthorizationType;
  export type Proto = StakeAuthorization_pb;
}
