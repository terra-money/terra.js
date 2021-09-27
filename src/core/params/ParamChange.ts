import { JSONSerializable } from '../../util/json';

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
}

export namespace ParamChanges {
  export type Data = ParamChange.Data[];
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
}

export namespace ParamChange {
  export interface Data {
    subspace: string;
    key: string;
    value: string;
  }
}
