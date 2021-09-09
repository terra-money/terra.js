import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { SendAuthorization as SendAuthorization_pb } from '@terra-money/terra.proto/src/cosmos/bank/v1beta1/authz_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

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
    return new SendAuthorization(Coins.fromProto(proto.getSpendLimitList()));
  }

  public toProto(): SendAuthorization.Proto {
    const { spend_limit } = this;
    const sendAuthorizationProto = new SendAuthorization_pb();
    sendAuthorizationProto.setSpendLimitList(spend_limit.toProto());
    return sendAuthorizationProto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.bank.v1beta1.SendAuthorization');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): SendAuthorization {
    return SendAuthorization.fromProto(
      SendAuthorization_pb.deserializeBinary(msgAny.getValue_asU8())
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
