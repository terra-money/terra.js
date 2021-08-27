import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization } from './GenericAuthorization';
import { SendAuthorization } from './SendAuthorization';
import { StakeAuthorization } from './StakeAuthorization';

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
