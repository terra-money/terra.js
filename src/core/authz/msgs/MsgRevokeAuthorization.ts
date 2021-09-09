import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { MsgRevoke as MsgRevoke_pb } from '@terra-money/terra.proto/src/cosmos/authz/v1beta1/tx_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

export class MsgRevokeAuthorization extends JSONSerializable<MsgRevokeAuthorization.Data> {
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

  public static fromData(
    data: MsgRevokeAuthorization.Data
  ): MsgRevokeAuthorization {
    const {
      value: { granter, grantee, msg_type_url },
    } = data;
    return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
  }

  public toData(): MsgRevokeAuthorization.Data {
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

  public static fromProto(
    proto: MsgRevokeAuthorization.Proto
  ): MsgRevokeAuthorization {
    return new MsgRevokeAuthorization(
      proto.getGranter(),
      proto.getGrantee(),
      proto.getMsgTypeUrl()
    );
  }

  public toProto(): MsgRevokeAuthorization.Proto {
    const { granter, grantee, msg_type_url } = this;
    const msgRevokeAuthorizedProto = new MsgRevoke_pb();
    msgRevokeAuthorizedProto.setGrantee(grantee);
    msgRevokeAuthorizedProto.setGranter(granter);
    msgRevokeAuthorizedProto.setMsgTypeUrl(msg_type_url);
    return msgRevokeAuthorizedProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.authz.v1beta1.MsgRevoke');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): MsgRevokeAuthorization {
    return MsgRevokeAuthorization.fromProto(
      MsgRevoke_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace MsgRevokeAuthorization {
  export interface Data {
    type: 'msgauth/MsgRevokeAuthorization';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      msg_type_url: string;
    };
  }

  export type Proto = MsgRevoke_pb;
}
