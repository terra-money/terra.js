import { JSONSerializable } from '../../../util/json';
import { GenericAuthorization as GenericAuthorization_pb } from '@terra-money/terra.proto/src/cosmos/authz/v1beta1/authz_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

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
    return new GenericAuthorization(data.getMsg());
  }

  public toProto(): GenericAuthorization.Proto {
    const { msg } = this;
    const genericAuthorization = new GenericAuthorization_pb();
    genericAuthorization.setMsg(msg);
    return genericAuthorization;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.authz.v1beta1.GenericAuthorization');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): GenericAuthorization {
    return GenericAuthorization.fromProto(
      GenericAuthorization_pb.deserializeBinary(msgAny.getValue_asU8())
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
