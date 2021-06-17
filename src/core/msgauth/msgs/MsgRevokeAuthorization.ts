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
    public authorization_msg_type: string
  ) {
    super();
  }

  public static fromData(
    data: MsgRevokeAuthorization.Data
  ): MsgRevokeAuthorization {
    const {
      value: { granter, grantee, authorization_msg_type },
    } = data;
    return new MsgRevokeAuthorization(granter, grantee, authorization_msg_type);
  }

  public toData(): MsgRevokeAuthorization.Data {
    const { granter, grantee, authorization_msg_type } = this;
    return {
      type: 'msgauth/MsgRevokeAuthorization',
      value: {
        granter,
        grantee,
        authorization_msg_type,
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
      authorization_msg_type: string;
    };
  }
}
