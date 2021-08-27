import { Coin } from '../../Coin';
import { AccAddress } from '../../bech32';

export enum STAKING_AUTHORIZATION_TYPES {
  AUTHORIZATION_TYPE_UNSPECIFIED = 'AUTHORIZATION_TYPE_UNSPECIFIED',
  AUTHORIZATION_TYPE_DELEGATE = 'AUTHORIZATION_TYPE_DELEGATE',
  AUTHORIZATION_TYPE_UNDELEGATE = 'AUTHORIZATION_TYPE_UNDELEGATE',
  AUTHORIZATION_TYPE_REDELEGATE = 'AUTHORIZATION_TYPE_REDELEGATE',
}

export class StakeAuthorization /*extends JSONSerializable<StakeAuthorization.Proto>*/ {
  constructor(
    public authorization_type: STAKING_AUTHORIZATION_TYPES,
    public max_tokens?: Coin,
    public allow_list?: StakeAuthorizationValidators,
    public deny_list?: StakeAuthorizationValidators
  ) {
    // super()
  }

  public static fromProto(proto: StakeAuthorization.Proto): StakeAuthorization {
    return new StakeAuthorization(
      proto.authorization_type,
      proto.max_tokens ? Coin.fromData(proto.max_tokens) : undefined,
      proto.allow_list
        ? StakeAuthorizationValidators.fromProto(proto.allow_list)
        : undefined,
      proto.deny_list
        ? StakeAuthorizationValidators.fromProto(proto.deny_list)
        : undefined
    );
  }

  public toProto(): StakeAuthorization.Proto {
    const { max_tokens, allow_list, deny_list, authorization_type } = this;
    return {
      '@type': '/cosmos.staking.v1beta1.StakeAuthorization',
      max_tokens: max_tokens?.toData(),
      allow_list: allow_list?.toProto(),
      deny_list: deny_list?.toProto(),
      authorization_type,
    };
  }
}

export class StakeAuthorizationValidators /*extends JSONSerializable<StakeAuthorization.Proto>*/ {
  constructor(public address: AccAddress[]) {
    // super()
  }

  public static fromProto(
    proto: StakeAuthorizationValidators.Proto
  ): StakeAuthorizationValidators {
    return new StakeAuthorizationValidators(proto.address);
  }

  public toProto(): StakeAuthorizationValidators.Proto {
    return {
      address: this.address,
    };
  }
}
export namespace StakeAuthorizationValidators {
  export interface Proto {
    address: AccAddress[];
  }
}

export namespace StakeAuthorization {
  export interface Proto {
    '@type': '/cosmos.staking.v1beta1.StakeAuthorization';
    max_tokens?: Coin.Data;
    allow_list?: StakeAuthorizationValidators.Proto;
    deny_list?: StakeAuthorizationValidators.Proto;
    authorization_type: STAKING_AUTHORIZATION_TYPES;
  }
}
