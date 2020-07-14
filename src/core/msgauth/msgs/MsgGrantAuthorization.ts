import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../strings';
import { Int } from '../../numeric';
import { Authorization } from '../Authorization';

export class MsgGrantAuthorization extends JSONSerializable<
  MsgGrantAuthorization.Data
> {
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public authorization: Authorization,
    public period: Int
  ) {
    super();
  }

  public static fromData(
    data: MsgGrantAuthorization.Data
  ): MsgGrantAuthorization {
    const {
      value: { granter, grantee, authorization, period },
    } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      Authorization.fromData(authorization),
      new Int(period)
    );
  }

  public toData(): MsgGrantAuthorization.Data {
    const { granter, grantee, authorization, period } = this;
    return {
      type: 'msgauth/MsgGrantAuthorization',
      value: {
        granter,
        grantee,
        authorization: authorization.toData(),
        period: period.toFixed(),
      },
    };
  }
}

export namespace MsgGrantAuthorization {
  export interface Data {
    type: 'msgauth/MsgGrantAuthorization';
    value: {
      granter: AccAddress;
      grantee: AccAddress;
      authorization: Authorization.Data;
      period: string;
    };
  }
}
