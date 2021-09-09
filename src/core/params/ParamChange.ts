import { JSONSerializable } from 'util/json';
import { ParamChange as ParamChange_pb } from '@terra-money/terra.proto/src/cosmos/params/v1beta1/params_pb';

export class ParamChanges extends JSONSerializable<ParamChanges.Data> {
  constructor(public paramChanges: ParamChange[]) {
    super();
  }

  public static fromData(proto: ParamChanges.Data | null): ParamChanges {
    return new ParamChanges((proto ?? []).map(ParamChange.fromData));
  }

  public toData(): ParamChanges.Data {
    return this.paramChanges.map(c => c.toData());
  }

  public static fromProto(proto: ParamChanges.Proto | null): ParamChanges {
    return new ParamChanges((proto ?? []).map(ParamChange.fromProto));
  }

  public toProto(): ParamChanges.Proto {
    return this.paramChanges.map(c => c.toProto());
  }
}

export namespace ParamChanges {
  export type Data = ParamChange.Data[];
  export type Proto = ParamChange.Proto[];
}

export class ParamChange extends JSONSerializable<ParamChange.Data> {
  constructor(
    public subspace: string,
    public key: string,
    public value: string
  ) {
    super();
  }

  public static fromData(data: ParamChange.Data): ParamChange {
    const { subspace, key, value } = data;
    return new ParamChange(subspace, key, value);
  }

  public toData(): ParamChange.Data {
    const { subspace, key, value } = this;
    return {
      subspace,
      key,
      value,
    };
  }

  public static fromProto(proto: ParamChange.Proto): ParamChange {
    return new ParamChange(
      proto.getSubspace(),
      proto.getKey(),
      proto.getValue()
    );
  }

  public toProto(): ParamChange.Proto {
    const { subspace, key, value } = this;
    const paramChangeProto = new ParamChange_pb();
    paramChangeProto.setSubspace(subspace);
    paramChangeProto.setKey(key);
    paramChangeProto.setValue(value);
    return paramChangeProto;
  }
}

export namespace ParamChange {
  export interface Data {
    subspace: string;
    key: string;
    value: string;
  }

  export type Proto = ParamChange_pb;
}
