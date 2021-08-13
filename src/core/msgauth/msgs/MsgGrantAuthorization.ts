import { JSONSerializable } from '../../../util/json';
import { AccAddress } from '../../bech32';
import { Authorization } from '../Authorization';

export class MsgGrantAuthorization extends JSONSerializable<MsgGrantAuthorization.Data> {
  /**
   * @param depositor depositor's account address
   * @param amount coins to fund the community pool
   */
  constructor(
    public granter: AccAddress,
    public grantee: AccAddress,
    public authorization: Authorization,
    public expiration: Date
  ) {
    super();
  }

  public static fromData(
    data: MsgGrantAuthorization.Data
  ): MsgGrantAuthorization {
    const {
      value: {
        granter,
        grantee,
        grant: { authorization, expiration },
      },
    } = data;
    return new MsgGrantAuthorization(
      granter,
      grantee,
      Authorization.fromData(authorization),
      new Date(expiration)
    );
  }

  public toData(): MsgGrantAuthorization.Data {
    const { granter, grantee, authorization, expiration } = this;
    return {
      type: 'msgauth/MsgGrantAuthorization',
      value: {
        granter,
        grantee,
        grant: {
          authorization: authorization.toData(),
          expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
        },
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
      grant: {
        authorization: Authorization.Data;
        expiration: string;
      };
    };
  }
}
