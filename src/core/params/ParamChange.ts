import { JSONSerializable } from '../../util/json';
import { ParamChange as ParamChange_pb } from '@terra-money/legacy.proto/cosmos/params/v1beta1/params';

export class ParamChanges extends JSONSerializable<
  ParamChanges.Amino,
  ParamChanges.Data,
  ParamChanges.Proto
> {
  constructor(public paramChanges: ParamChange[]) {
    super();
  }

  public static fromAmino(proto: ParamChanges.Amino | null): ParamChanges {
    return new ParamChanges((proto ?? []).map(ParamChange.fromAmino));
  }

  public toAmino(): ParamChanges.Amino {
    return this.paramChanges.map(c => c.toAmino());
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
  export type Amino = ParamChange.Amino[];
  export type Data = ParamChange.Data[];
  export type Proto = ParamChange.Proto[];
}

export class ParamChange extends JSONSerializable<
  ParamChange.Amino,
  ParamChange.Data,
  ParamChange.Proto
> {
  constructor(
    public subspace: string,
    public key: string,
    public value: string
  ) {
    super();
  }

  public static fromAmino(data: ParamChange.Amino): ParamChange {
    const { subspace, key, value } = data;
    return new ParamChange(subspace, key, value);
  }

  public toAmino(): ParamChange.Amino {
    const { subspace, key, value } = this;
    return {
      subspace,
      key,
      value,
    };
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
    return new ParamChange(proto.subspace, proto.key, proto.value);
  }

  public toProto(): ParamChange.Proto {
    const { subspace, key, value } = this;
    return ParamChange_pb.fromPartial({
      key,
      subspace,
      value,
    });
  }
}

export namespace ParamChange {
  export interface Amino {
    subspace: string;
    key: string;
    value: string;
  }

  export interface Data {
    subspace: string;
    key: string;
    value: string;
  }

  export type Proto = ParamChange_pb;
}
