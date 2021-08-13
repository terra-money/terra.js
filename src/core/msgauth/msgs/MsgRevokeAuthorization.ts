import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

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
}
