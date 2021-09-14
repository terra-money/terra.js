import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { AuthorizationGrant } from '../authorizations';
import { MsgGrant as MsgGrant_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { Grant as Grant_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/authz';

export class MsgGrantAuthorization extends JSONSerializable<
  MsgGrantAuthorization.Amino,
  MsgGrantAuthorization.Data,
  MsgGrantAuthorization.Proto
> {
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

  public static fromAmino(
    data: MsgGrantAuthorization.Amino
  ): MsgGrantAuthorization {
    const {
      value: { granter, grantee, grant },
    } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthorizationGrant.fromAmino(grant)
    );
  }

  public toAmino(): MsgGrantAuthorization.Amino {
    const { granter, grantee, grant } = this;
    return {
      type: 'msgauth/MsgGrantAuthorization',
      value: {
        granter,
        grantee,
        grant: grant.toAmino(),
      },
    };
  }

  public static fromData(
    data: MsgGrantAuthorization.Data
  ): MsgGrantAuthorization {
    const { granter, grantee, grant } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      AuthorizationGrant.fromData(grant)
    );
  }

  public toData(): MsgGrantAuthorization.Data {
    const { granter, grantee, grant } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.MsgGrant',
      granter,
      grantee,
      grant: grant.toData(),
    };
  }

  public static fromProto(
    data: MsgGrantAuthorization.Proto
  ): MsgGrantAuthorization {
    return new MsgGrantAuthorization(
      data.granter,
      data.grantee,
      AuthorizationGrant.fromProto(data.grant as Grant_pb)
    );
  }

  public toProto(): MsgGrantAuthorization.Proto {
    const { grant, granter, grantee } = this;
    return MsgGrant_pb.fromPartial({
      grant: grant.toProto(),
      grantee,
      granter,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
      value: MsgGrant_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgGrantAuthorization {
    return MsgGrantAuthorization.fromProto(MsgGrant_pb.decode(msgAny.value));
  }
}

export namespace MsgGrantAuthorization {
  export interface Amino {
    type: 'msgauth/MsgGrantAuthorization';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      grant: AuthorizationGrant.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.authz.v1beta1.MsgGrant';
    granter: AccAddress;
    grantee: AccAddress;
    grant: AuthorizationGrant.Data;
  }

  export type Proto = MsgGrant_pb;
}
