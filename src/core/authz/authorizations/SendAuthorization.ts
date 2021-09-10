import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { SendAuthorization as SendAuthorization_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

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
    return new SendAuthorization(Coins.fromProto(proto.spendLimit));
  }

  public toProto(): SendAuthorization.Proto {
    return SendAuthorization_pb.fromPartial({
      spendLimit: this.spend_limit.toProto(),
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
      value: SendAuthorization_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): SendAuthorization {
    return SendAuthorization.fromProto(
      SendAuthorization_pb.decode(msgAny.value)
    );
  }
}

export namespace SendAuthorization {
  export interface Data {
    type: 'msgauth/SendAuthorization';
    value: {
      spend_limit: Coins.Data;
    };
  }

  export type Proto = SendAuthorization_pb;
}
