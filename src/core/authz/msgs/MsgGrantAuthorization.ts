import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { AuthorizationGrant } from '../Authorization';

export class MsgGrantAuthorization extends JSONSerializable<MsgGrantAuthorization.Data> {
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public grant: AuthorizationGrant
  ) {
    super();
  }

  public static fromData(
    data: MsgGrantAuthorization.Data
  ): MsgGrantAuthorization {
    const {
      value: { granter, grantee, grant },
    } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthorizationGrant.fromData(grant)
    );
  }

  public toData(): MsgGrantAuthorization.Data {
    const { granter, grantee, grant } = this;
    return {
      type: 'msgauth/MsgGrantAuthorization',
      value: {
        granter,
        grantee,
        grant: grant.toData(),
      },
    };
  }

  public static fromProto(
    data: MsgGrantAuthorization.Proto
  ): MsgGrantAuthorization {
    const { granter, grantee, grant } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthorizationGrant.fromProto(grant)
    );
  }

  public toProto(): MsgGrantAuthorization.Proto {
    const { granter, grantee, grant } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.MsgGrant',
      granter,
      grantee,
      grant: grant.toProto(),
    };
  }
}

export namespace MsgGrantAuthorization {
  export interface Data {
    type: 'msgauth/MsgGrantAuthorization';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      grant: AuthorizationGrant.Data;
    };
  }

  export interface Proto {
    '@type': '/cosmos.authz.v1beta1.MsgGrant';
    granter: AccAddress;
    grantee: AccAddress;
    grant: AuthorizationGrant.Proto;
  }
}
