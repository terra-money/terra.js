import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { MsgRevoke as MsgRevoke_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/tx';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class MsgRevokeAuthorization extends JSONSerializable<
  MsgRevokeAuthorization.Amino,
  MsgRevokeAuthorization.Data,
  MsgRevokeAuthorization.Proto
> {
  /**
   * @param granter authorization granter
   * @param grantee authorization grantee
   * @param authorization_msg_type type of message to revoke
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public msg_type_url: string
  ) {
    super();
  }

  public static fromAmino(
    data: MsgRevokeAuthorization.Amino
  ): MsgRevokeAuthorization {
    const {
      value: { granter, grantee, msg_type_url },
    } = data;
    return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
  }

  public toAmino(): MsgRevokeAuthorization.Amino {
    const { granter, grantee, msg_type_url } = this;
    return {
      type: 'msgauth/MsgRevokeAuthorization',
      value: {
        granter,
        grantee,
        msg_type_url,
      },
    };
  }

  public static fromData(
    data: MsgRevokeAuthorization.Data
  ): MsgRevokeAuthorization {
    const { granter, grantee, msg_type_url } = data;
    return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
  }

  public toData(): MsgRevokeAuthorization.Data {
    const { granter, grantee, msg_type_url } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.MsgRevoke',
      granter,
      grantee,
      msg_type_url,
    };
  }

  public static fromProto(
    proto: MsgRevokeAuthorization.Proto
  ): MsgRevokeAuthorization {
    return new MsgRevokeAuthorization(
      proto.granter,
      proto.grantee,
      proto.msgTypeUrl
    );
  }

  public toProto(): MsgRevokeAuthorization.Proto {
    const { granter, grantee, msg_type_url } = this;
    return MsgRevoke_pb.fromPartial({
      grantee,
      granter,
      msgTypeUrl: msg_type_url,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
      value: MsgRevoke_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgRevokeAuthorization {
    return MsgRevokeAuthorization.fromProto(MsgRevoke_pb.decode(msgAny.value));
  }
}

export namespace MsgRevokeAuthorization {
  export interface Amino {
    type: 'msgauth/MsgRevokeAuthorization';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      msg_type_url: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.authz.v1beta1.MsgRevoke';
    granter: AccAddress;
    grantee: AccAddress;
    msg_type_url: string;
  }

  export type Proto = MsgRevoke_pb;
}
