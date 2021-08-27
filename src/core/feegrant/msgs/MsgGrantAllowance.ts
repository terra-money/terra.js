import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Allowance } from '../allowances';

/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
export class MsgGrantAllowance extends JSONSerializable<MsgGrantAllowance.Data> {
  /**
   *
   * @param granter granter's account address
   * @param grantee grantee's account address
   * @param allowance allowance willing to grant
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public allowance: Allowance
  ) {
    super();
  }

  public static fromData(data: MsgGrantAllowance.Data): MsgGrantAllowance {
    const {
      value: { granter, grantee, allowance },
    } = data;
    return new MsgGrantAllowance(
      granter,
      grantee,
      Allowance.fromData(allowance)
    );
  }

  public toData(): MsgGrantAllowance.Data {
    const { granter, grantee, allowance } = this;
    return {
      type: 'feegrant/MsgGrantAllowance',
      value: {
        granter,
        grantee,
        allowance: allowance.toData(),
      },
    };
  }

  public static fromProto(proto: MsgGrantAllowance.Proto): MsgGrantAllowance {
    const { granter, grantee, allowance } = proto;
    return new MsgGrantAllowance(
      granter,
      grantee,
      Allowance.fromProto(allowance)
    );
  }

  public toProto(): MsgGrantAllowance.Proto {
    const { granter, grantee, allowance } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
      granter,
      grantee,
      allowance: allowance.toProto(),
    };
  }
}

export namespace MsgGrantAllowance {
  export interface Data {
    type: 'feegrant/MsgGrantAllowance';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      allowance: Allowance.Data;
    };
  }

  export interface Proto {
    '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance';
    granter: AccAddress;
    grantee: AccAddress;
    allowance: Allowance.Proto;
  }
}
