import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';

export class SendAuthorization extends JSONSerializable<SendAuthorization.Data> {
  public spend_limit: Coins;
  constructor(spend_limit: Coins.Input) {
    super();
    this.spend_limit = new Coins(spend_limit);
  }

  public static fromData(data: SendAuthorization.Data): SendAuthorization {
    return new SendAuthorization(Coins.fromData(data.value.spend_limit));
  }

  public toData(): SendAuthorization.Data {
    const { spend_limit } = this;
    return {
      type: 'msgauth/SendAuthorization',
      value: {
        spend_limit: spend_limit.toData(),
      },
    };
  }

  public static fromProto(proto: SendAuthorization.Proto): SendAuthorization {
    return new SendAuthorization(Coins.fromData(proto.spend_limit));
  }

  public toProto(): SendAuthorization.Proto {
    const { spend_limit } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.SendAuthorization',
      spend_limit: spend_limit.toData(),
    };
  }
}

export namespace SendAuthorization {
  export interface Data {
    type: 'msgauth/SendAuthorization';
    value: {
      spend_limit: Coins.Data;
    };
  }

  export interface Proto {
    '@type': '/cosmos.bank.v1beta1.SendAuthorization';
    spend_limit: Coins.Data;
  }
}
