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
    data: MsgRevokeAuthorization.Amino,
    _?: boolean
  ): MsgRevokeAuthorization {
    _;
    const {
      value: { granter, grantee, msg_type_url },
    } = data;
    return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
  }

  public toAmino(isClassic?: boolean): MsgRevokeAuthorization.Amino {
    const { granter, grantee, msg_type_url } = this;
    return {
      type: isClassic
        ? 'msgauth/MsgRevokeAuthorization'
        : 'cosmos-sdk/MsgRevoke',
      value: {
        granter,
        grantee,
        msg_type_url,
      },
    };
  }

  public static fromData(
    data: MsgRevokeAuthorization.Data,
    _?: boolean
  ): MsgRevokeAuthorization {
    _;
    const { granter, grantee, msg_type_url } = data;
    return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
  }

  public toData(_?: boolean): MsgRevokeAuthorization.Data {
    _;
    const { granter, grantee, msg_type_url } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.MsgRevoke',
      granter,
      grantee,
      msg_type_url,
    };
  }

  public static fromProto(
    proto: MsgRevokeAuthorization.Proto,
    _?: boolean
  ): MsgRevokeAuthorization {
    _;
    return new MsgRevokeAuthorization(
      proto.granter,
      proto.grantee,
      proto.msgTypeUrl
    );
  }

  public toProto(_?: boolean): MsgRevokeAuthorization.Proto {
    _;
    const { granter, grantee, msg_type_url } = this;
    return MsgRevoke_pb.fromPartial({
      grantee,
      granter,
      msgTypeUrl: msg_type_url,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
      value: MsgRevoke_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): MsgRevokeAuthorization {
    return MsgRevokeAuthorization.fromProto(
      MsgRevoke_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace MsgRevokeAuthorization {
  export interface Amino {
    type: 'msgauth/MsgRevokeAuthorization' | 'cosmos-sdk/MsgRevoke';
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
