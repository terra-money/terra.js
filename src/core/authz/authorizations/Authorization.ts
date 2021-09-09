import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization } from './GenericAuthorization';
import { SendAuthorization } from './SendAuthorization';
import { StakeAuthorization } from './StakeAuthorization';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { Grant as Grant_pb } from '@terra-money/terra.proto/src/cosmos/authz/v1beta1/authz_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

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
      `amino is not supported for "${authorization
        .packAny()
        .getTypeUrl()}" authorization`
    );
  }

  public static fromProto(proto: AuthorizationGrant.Proto): AuthorizationGrant {
    return new AuthorizationGrant(
      Authorization.fromProto(proto.getAuthorization() as Any),
      proto.getExpiration()?.toDate() as Date
    );
  }

  public toProto(): AuthorizationGrant.Proto {
    const { authorization, expiration } = this;
    const grantProto = new Grant_pb();
    grantProto.setAuthorization(authorization.packAny() as any);
    grantProto.setExpiration(Timestamp.fromDate(expiration));
    return grantProto;
  }
}

export namespace AuthorizationGrant {
  export interface Data {
    authorization: Authorization.Data;
    expiration: string;
  }

  export type Proto = Grant_pb;
}

export type Authorization =
  | SendAuthorization
  | GenericAuthorization
  | StakeAuthorization;

export namespace Authorization {
  export type Data = SendAuthorization.Data | GenericAuthorization.Data;
  export type Proto = Any;
  export function fromData(data: Authorization.Data): Authorization {
    switch (data.type) {
      case 'msgauth/SendAuthorization':
        return SendAuthorization.fromData(data);
      case 'msgauth/GenericAuthorization':
        return GenericAuthorization.fromData(data);
    }
  }

  export function fromProto(proto: Authorization.Proto): Authorization {
    const typeUrl = proto.getTypeUrl();
    switch (typeUrl) {
      case '/cosmos.authz.v1beta1.GenericAuthorization':
        return GenericAuthorization.unpackAny(proto);

      case '/cosmos.bank.v1beta1.SendAuthorization':
        return SendAuthorization.unpackAny(proto);
      case '/cosmos.staking.v1beta1.StakeAuthorization':
        return StakeAuthorization.unpackAny(proto);
    }

    throw new Error(`Authorization type ${typeUrl} not recognized`);
  }
}
