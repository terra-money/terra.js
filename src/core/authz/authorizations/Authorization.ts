import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization } from './GenericAuthorization';
import { SendAuthorization } from './SendAuthorization';
import { StakeAuthorization } from './StakeAuthorization';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Grant as Grant_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/authz';

export class AuthorizationGrant extends JSONSerializable<
  AuthorizationGrant.Amino,
  AuthorizationGrant.Data,
  AuthorizationGrant.Proto
> {
  constructor(public authorization: Authorization, public expiration: Date) {
    super();
  }

  public static fromAmino(amino: AuthorizationGrant.Amino, legacy?: boolean): AuthorizationGrant {
    const { authorization, expiration } = amino;
    return new AuthorizationGrant(
      Authorization.fromAmino(authorization, legacy),
      new Date(expiration)
    );
  }

  public toAmino(legacy?: boolean): AuthorizationGrant.Amino {
    const { authorization, expiration } = this;
    return {
      authorization: authorization.toAmino(legacy),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }

  public static fromData(data: AuthorizationGrant.Data, legacy?: boolean): AuthorizationGrant {
    const { authorization, expiration } = data;
    return new AuthorizationGrant(
      Authorization.fromData(authorization, legacy),
      new Date(expiration)
    );
  }

  public toData(legacy?: boolean): AuthorizationGrant.Data {
    const { authorization, expiration } = this;
    return {
      authorization: authorization.toData(legacy),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }

  public static fromProto(proto: AuthorizationGrant.Proto, legacy?: boolean): AuthorizationGrant {
    return new AuthorizationGrant(
      Authorization.fromProto(proto.authorization as Any, legacy),
      proto.expiration as Date
    );
  }

  public toProto(legacy?: boolean): AuthorizationGrant.Proto {
    const { authorization, expiration } = this;
    return Grant_pb.fromPartial({
      authorization: authorization.packAny(legacy),
      expiration,
    });
  }
}

export namespace AuthorizationGrant {
  export interface Amino {
    authorization: Authorization.Amino;
    expiration: string;
  }

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
  export type Amino = SendAuthorization.Amino | GenericAuthorization.Amino;
  export type Data =
    | SendAuthorization.Data
    | GenericAuthorization.Data
    | StakeAuthorization.Data;
  export type Proto = Any;
  export function fromAmino(data: Authorization.Amino, legacy?: boolean): Authorization {
    switch (data.type) {
      case 'msgauth/SendAuthorization':
      case 'cosmos-sdk/SendAuthorization':
        return SendAuthorization.fromAmino(data, legacy);
      case 'msgauth/GenericAuthorization':
      case 'cosmos-sdk/GenericAuthorization':
        return GenericAuthorization.fromAmino(data, legacy);
    }
  }

  export function fromData(data: Authorization.Data, legacy?: boolean): Authorization {
    switch (data['@type']) {
      case '/cosmos.authz.v1beta1.GenericAuthorization':
        return GenericAuthorization.fromData(data, legacy);
      case '/cosmos.bank.v1beta1.SendAuthorization':
        return SendAuthorization.fromData(data, legacy);
      case '/cosmos.staking.v1beta1.StakeAuthorization':
        return StakeAuthorization.fromData(data, legacy);
    }
  }

  export function fromProto(proto: Authorization.Proto, legacy?: boolean): Authorization {
    const typeUrl = proto.typeUrl;
    switch (typeUrl) {
      case '/cosmos.authz.v1beta1.GenericAuthorization':
        return GenericAuthorization.unpackAny(proto, legacy);

      case '/cosmos.bank.v1beta1.SendAuthorization':
        return SendAuthorization.unpackAny(proto, legacy);
      case '/cosmos.staking.v1beta1.StakeAuthorization':
        return StakeAuthorization.unpackAny(proto, legacy);
    }

    throw new Error(`Authorization type ${typeUrl} not recognized`);
  }
}
