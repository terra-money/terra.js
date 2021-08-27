import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';

/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export class BasicAllowance extends JSONSerializable<BasicAllowance.Data> {
  public spend_limit: Coins;

  /**
   * @param spend_limit spend_limit allowed to be spent as fee
   * @param expiration allowance's expiration
   */
  constructor(spend_limit: Coins.Input, public expiration: Date) {
    super();

    this.spend_limit = new Coins(spend_limit);
  }

  public static fromData(data: BasicAllowance.Data): BasicAllowance {
    const {
      value: { spend_limit, expiration },
    } = data;

    return new BasicAllowance(
      Coins.fromData(spend_limit),
      new Date(expiration)
    );
  }

  public toData(): BasicAllowance.Data {
    const { spend_limit, expiration } = this;
    return {
      type: 'feegrant/BasicAllowance',
      value: {
        spend_limit: spend_limit.toData(),
        expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
      },
    };
  }

  public static fromProto(proto: BasicAllowance.Proto): BasicAllowance {
    const { spend_limit, expiration } = proto;
    return new BasicAllowance(
      Coins.fromData(spend_limit),
      new Date(expiration)
    );
  }

  public toProto(): BasicAllowance.Proto {
    const { spend_limit, expiration } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.BasicAllowance',
      spend_limit: spend_limit.toData(),
      expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }
}

export namespace BasicAllowance {
  export interface Data {
    type: 'feegrant/BasicAllowance';
    value: {
      spend_limit: Coins.Data;
      expiration: string;
    };
  }

  export interface Proto {
    '@type': '/cosmos.feegrant.v1beta1.BasicAllowance';
    spend_limit: Coins.Data;
    expiration: string;
  }
}
