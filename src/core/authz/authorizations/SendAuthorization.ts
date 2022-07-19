import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { SendAuthorization as SendAuthorization_pb } from '@terra-money/terra.proto/cosmos/bank/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class SendAuthorization extends JSONSerializable<
  SendAuthorization.Amino,
  SendAuthorization.Data,
  SendAuthorization.Proto
> {
  public spend_limit: Coins;
  constructor(spend_limit: Coins.Input) {
    super();
    this.spend_limit = new Coins(spend_limit);
  }

  public static fromAmino(
    data: SendAuthorization.Amino,
    _?: boolean
  ): SendAuthorization {
    _;
    return new SendAuthorization(Coins.fromAmino(data.value.spend_limit));
  }

  public toAmino(isClassic?: boolean): SendAuthorization.Amino {
    const { spend_limit } = this;
    return {
      type: isClassic
        ? 'msgauth/SendAuthorization'
        : 'cosmos-sdk/SendAuthorization',
      value: {
        spend_limit: spend_limit.toAmino(),
      },
    };
  }

  public static fromData(
    data: SendAuthorization.Data,
    _?: boolean
  ): SendAuthorization {
    _;
    return new SendAuthorization(Coins.fromData(data.spend_limit));
  }

  public toData(_?: boolean): SendAuthorization.Data {
    _;
    const { spend_limit } = this;
    return {
      '@type': '/cosmos.bank.v1beta1.SendAuthorization',
      spend_limit: spend_limit.toAmino(),
    };
  }

  public static fromProto(
    proto: SendAuthorization.Proto,
    _?: boolean
  ): SendAuthorization {
    _;
    return new SendAuthorization(Coins.fromProto(proto.spendLimit));
  }

  public toProto(_?: boolean): SendAuthorization.Proto {
    _;
    return SendAuthorization_pb.fromPartial({
      spendLimit: this.spend_limit.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
      value: SendAuthorization_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): SendAuthorization {
    return SendAuthorization.fromProto(
      SendAuthorization_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace SendAuthorization {
  export interface Amino {
    type: 'msgauth/SendAuthorization' | 'cosmos-sdk/SendAuthorization';
    value: {
      spend_limit: Coins.Amino;
    };
  }

  export interface Data {
    '@type': '/cosmos.bank.v1beta1.SendAuthorization';
    spend_limit: Coins.Data;
  }

  export type Proto = SendAuthorization_pb;
}
