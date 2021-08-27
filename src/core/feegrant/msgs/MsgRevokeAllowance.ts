import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';

/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
export class MsgRevokeAllowance extends JSONSerializable<MsgRevokeAllowance.Data> {
  /**
   *
   * @param granter granter's account address
   * @param grantee grantee's account address
   */
  constructor(public granter: AccAddress, public grantee: AccAddress) {
    super();
  }

  public static fromData(data: MsgRevokeAllowance.Data): MsgRevokeAllowance {
    const {
      value: { granter, grantee },
    } = data;
    return new MsgRevokeAllowance(granter, grantee);
  }

  public toData(): MsgRevokeAllowance.Data {
    const { granter, grantee } = this;
    return {
      type: 'feegrant/MsgRevokeAllowance',
      value: {
        granter,
        grantee,
      },
    };
  }

  public static fromProto(proto: MsgRevokeAllowance.Proto): MsgRevokeAllowance {
    const { granter, grantee } = proto;
    return new MsgRevokeAllowance(granter, grantee);
  }

  public toProto(): MsgRevokeAllowance.Proto {
    const { granter, grantee } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
      granter,
      grantee,
    };
  }
}

export namespace MsgRevokeAllowance {
  export interface Data {
    type: 'feegrant/MsgRevokeAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
    };
  }

  export interface Proto {
    '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance';
    granter: AccAddress;
    grantee: AccAddress;
  }
}
