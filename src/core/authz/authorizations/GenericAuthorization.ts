import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization as GenericAuthorization_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class GenericAuthorization extends JSONSerializable<
  GenericAuthorization.Amino,
  GenericAuthorization.Data,
  GenericAuthorization.Proto
> {
  constructor(public msg: string) {
    super();
  }

  public static fromAmino(
    data: GenericAuthorization.Amino,
    _?: boolean
  ): GenericAuthorization {
    _;
    return new GenericAuthorization(data.value.msg);
  }

  public toAmino(isClassic?: boolean): GenericAuthorization.Amino {
    const { msg } = this;
    return {
      type: isClassic
        ? 'msgauth/GenericAuthorization'
        : 'cosmos-sdk/GenericAuthorization',
      value: {
        msg,
      },
    };
  }

  public static fromData(
    data: GenericAuthorization.Data,
    _?: boolean
  ): GenericAuthorization {
    _;
    return new GenericAuthorization(data.msg);
  }

  public toData(_?: boolean): GenericAuthorization.Data {
    _;
    const { msg } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
      msg,
    };
  }

  public static fromProto(
    data: GenericAuthorization.Proto,
    _?: boolean
  ): GenericAuthorization {
    _;
    return new GenericAuthorization(data.msg);
  }

  public toProto(_?: boolean): GenericAuthorization.Proto {
    _;
    return GenericAuthorization_pb.fromPartial({
      msg: this.msg,
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
      value: GenericAuthorization_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    msgAny: Any,
    isClassic?: boolean
  ): GenericAuthorization {
    return GenericAuthorization.fromProto(
      GenericAuthorization_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace GenericAuthorization {
  export interface Amino {
    type: 'msgauth/GenericAuthorization' | 'cosmos-sdk/GenericAuthorization';
    value: {
      msg: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.authz.v1beta1.GenericAuthorization';
    msg: string;
  }

  export type Proto = GenericAuthorization_pb;
}
