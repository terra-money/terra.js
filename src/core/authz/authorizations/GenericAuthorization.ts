import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization as GenericAuthorization_pb } from '@terra-money/terra.proto/cosmos/authz/v1beta1/authz';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export class GenericAuthorization extends JSONSerializable<GenericAuthorization.Data> {
  constructor(public msg: string) {
    super();
  }

  public static fromData(
    data: GenericAuthorization.Data
  ): GenericAuthorization {
    return new GenericAuthorization(data.value.msg);
  }

  public toData(): GenericAuthorization.Data {
    const { msg } = this;
    return {
      type: 'msgauth/GenericAuthorization',
      value: {
        msg,
      },
    };
  }

  public static fromProto(
    data: GenericAuthorization.Proto
  ): GenericAuthorization {
    return new GenericAuthorization(data.msg);
  }

  public toProto(): GenericAuthorization.Proto {
    return GenericAuthorization_pb.fromPartial({
      msg: this.msg,
    });
  }

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
      value: GenericAuthorization_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): GenericAuthorization {
    return GenericAuthorization.fromProto(
      GenericAuthorization_pb.decode(msgAny.value)
    );
  }
}

export namespace GenericAuthorization {
  export interface Data {
    type: 'msgauth/GenericAuthorization';
    value: {
      msg: string;
    };
  }

  export type Proto = GenericAuthorization_pb;
}
