import { JSONSerializable } from '../../util/json';
import { Coins } from '../Coins';

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
    return {
      authorization: authorization.toData(),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }
}

export namespace AuthorizationGrant {
  export interface Data {
    authorization: Authorization.Data;
    expiration: string;
  }
}

export type Authorization = SendAuthorization | GenericAuthorization;

export namespace Authorization {
  export type Data = SendAuthorization.Data | GenericAuthorization.Data;
  export function fromData(data: Authorization.Data): Authorization {
    switch (data.type) {
      case 'msgauth/SendAuthorization':
        return SendAuthorization.fromData(data);
      case 'msgauth/GenericAuthorization':
        return GenericAuthorization.fromData(data);
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
}

export class GenericAuthorization extends JSONSerializable<GenericAuthorization.Data> {
  constructor(public grant_msg_type: string) {
    super();
  }

  public static fromData(
    data: GenericAuthorization.Data
  ): GenericAuthorization {
    return new GenericAuthorization(data.value.grant_msg_type);
  }

  public toData(): GenericAuthorization.Data {
    const { grant_msg_type } = this;
    return {
      type: 'msgauth/GenericAuthorization',
      value: {
        grant_msg_type,
      },
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
}
export namespace GenericAuthorization {
  export interface Data {
    type: 'msgauth/GenericAuthorization';
    value: {
      grant_msg_type: string;
    };
  }
}
