import {
  AccessType,
  accessTypeToJSON,
  AccessTypeParam as AccessTypeParam_pb,
} from '@terra-money/terra.proto/cosmwasm/wasm/v1/types';
import { JSONSerializable } from '../../util/json';
import { convertAccessTypeFromJSON } from './util';

export { AccessType };

/**
 *
 */
export class AccessTypeParam extends JSONSerializable<
  AccessTypeParam.Amino,
  AccessTypeParam.Data,
  AccessTypeParam.Proto
> {
  /**
   * @param value access type
   */
  constructor(public value: AccessType) {
    super();
  }

  public static fromAmino(data: AccessTypeParam.Amino): AccessTypeParam {
    return new AccessTypeParam(convertAccessTypeFromJSON(data.value));
  }

  public toAmino(): AccessTypeParam.Amino {
    const res: AccessTypeParam.Amino = {
      value: accessTypeToJSON(this.value),
    };
    return res;
  }

  public static fromData(data: AccessTypeParam.Data): AccessTypeParam {
    return new AccessTypeParam(convertAccessTypeFromJSON(data.value));
  }

  public toData(): AccessTypeParam.Data {
    const res: AccessTypeParam.Data = {
      value: accessTypeToJSON(this.value),
    };
    return res;
  }

  public static fromProto(proto: AccessTypeParam.Proto): AccessTypeParam {
    return new AccessTypeParam(proto.value);
  }

  public toProto(): AccessTypeParam.Proto {
    return AccessTypeParam_pb.fromPartial({
      value: this.value,
    });
  }
}

export namespace AccessTypeParam {
  export interface Amino {
    value: string;
  }

  export interface Data {
    value: string;
  }

  export type Proto = AccessTypeParam_pb;
}
