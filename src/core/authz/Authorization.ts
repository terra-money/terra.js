import { JSONSerializable } from '../../util/json';
import { Coins } from '../Coins';
import { Coin } from 'core/Coin';
import { AccAddress } from 'core/bech32';

export class AuthorizationGrant extends JSONSerializable<AuthorizationGrant.Data> {
  constructor(public authorization: Authorization, public expiration: Date) {
    super();
  }

  public static fromData(data: AuthorizationGrant.Data): AuthorizationGrant {
    const { authorization, expiration } = data;
    return new AuthorizationGrant(
      Authorization.fromData(authorization),
      new Date(expiration)
    );
  }

  public toData(): AuthorizationGrant.Data {
    const { authorization, expiration } = this;
    if ('toData' in authorization) {
      return {
        authorization: authorization.toData(),
        expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
      };
    }

    throw new Error(
      `amino is not supported for "${
        authorization.toProto()['@type']
      }" authorization`
    );
  }

  public static fromProto(data: AuthorizationGrant.Proto): AuthorizationGrant {
    const { authorization, expiration } = data;
    return new AuthorizationGrant(
      Authorization.fromProto(authorization),
      new Date(expiration)
    );
  }

  public toProto(): AuthorizationGrant.Proto {
    const { authorization, expiration } = this;
    return {
      authorization: authorization.toProto(),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }
}

export namespace AuthorizationGrant {
  export interface Data {
    authorization: Authorization.Data;
    expiration: string;
  }

  export interface Proto {
    authorization: Authorization.Proto;
    expiration: string;
  }
}

export type Authorization =
  | SendAuthorization
  | GenericAuthorization
  | StakeAuthorization;

export namespace Authorization {
  export type Data = SendAuthorization.Data | GenericAuthorization.Data;
  export type Proto =
    | SendAuthorization.Proto
    | GenericAuthorization.Proto
    | StakeAuthorization.Proto;
  export function fromData(data: Authorization.Data): Authorization {
    switch (data.type) {
      case 'msgauth/SendAuthorization':
        return SendAuthorization.fromData(data);
      case 'msgauth/GenericAuthorization':
        return GenericAuthorization.fromData(data);
    }
  }

  export function fromProto(proto: Authorization.Proto): Authorization {
    switch (proto['@type']) {
      case '/cosmos.authz.v1beta1.GenericAuthorization':
        return GenericAuthorization.fromProto(proto);
      case '/cosmos.bank.v1beta1.SendAuthorization':
        return SendAuthorization.fromProto(proto);
      case '/cosmos.staking.v1beta1.StakeAuthorization':
        return StakeAuthorization.fromProto(proto);
    }
  }
}

export class SendAuthorization extends JSONSerializable<SendAuthorization.Data> {
  public spend_limit: Coins;
  constructor(spend_limit: Coins.Input) {
    super();
    this.spend_limit = new Coins(spend_limit);
  }

  public static fromData(data: SendAuthorization.Data): SendAuthorization {
    return new SendAuthorization(Coins.fromData(data.value.spend_limit));
  }

  public toData(): SendAuthorization.Data {
    const { spend_limit } = this;
    return {
      type: 'msgauth/SendAuthorization',
      value: {
        spend_limit: spend_limit.toData(),
      },
    };
  }

  public static fromProto(proto: SendAuthorization.Proto): SendAuthorization {
    return new SendAuthorization(Coins.fromData(proto.spend_limit));
  }

  public toProto(): SendAuthorization.Proto {
    const { spend_limit } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.SendAuthorization',
      spend_limit: spend_limit.toData(),
    };
  }
}

export namespace SendAuthorization {
  export interface Data {
    type: 'msgauth/SendAuthorization';
    value: {
      spend_limit: Coins.Data;
    };
  }

  export interface Proto {
    '@type': '/cosmos.bank.v1beta1.SendAuthorization';
    spend_limit: Coins.Data;
  }
}

export class GenericAuthorization extends JSONSerializable<GenericAuthorization.Data> {
  constructor(public msg: string) {
    super();
  }

  public static fromData(
    data: GenericAuthorization.Data
  ): GenericAuthorization {
    return new GenericAuthorization(data.value.msg);
  }

  public toData(): GenericAuthorization.Data {
    const { msg } = this;
    return {
      type: 'msgauth/GenericAuthorization',
      value: {
        msg,
      },
    };
  }

  public static fromProto(
    data: GenericAuthorization.Proto
  ): GenericAuthorization {
    return new GenericAuthorization(data.msg);
  }

  public toProto(): GenericAuthorization.Proto {
    const { msg } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
      msg,
    };
  }
}

export namespace GenericAuthorization {
  export interface Data {
    type: 'msgauth/GenericAuthorization';
    value: {
      msg: string;
    };
  }

  export interface Proto {
    '@type': '/cosmos.authz.v1beta1.GenericAuthorization';
    msg: string;
  }
}

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
