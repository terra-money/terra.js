import { JSONSerializable } from '../../../util/json';

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
    const { msg } = this;
    return {
      '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
      msg,
    };
  }
}

export namespace GenericAuthorization {
  export interface Data {
    type: 'msgauth/GenericAuthorization';
    value: {
      msg: string;
    };
  }

  export interface Proto {
    '@type': '/cosmos.authz.v1beta1.GenericAuthorization';
    msg: string;
  }
}
