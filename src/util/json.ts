export function prepareSignBytes(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(prepareSignBytes);
  }

  // string, number, or null
  if (typeof obj !== `object` || obj === null) {
    return obj;
  }

  const sorted: any = {};

  Object.keys(obj)
    .sort()
    .forEach(key => {
      if (obj[key] === undefined || obj[key] === null) return;
      sorted[key] = prepareSignBytes(obj[key]);
    });
  return sorted;
}

export abstract class JSONSerializable<A, D, P> {
  public abstract toAmino(legacy?: boolean): A;
  public abstract toData(legacy?: boolean): D;
  public abstract toProto(legacy?: boolean): P;
  public toJSON(legacy?: boolean): string {
    return JSON.stringify(prepareSignBytes(this.toData(legacy)));
  }
  public toAminoJSON(legacy?: boolean): string {
    return JSON.stringify(prepareSignBytes(this.toAmino(legacy)));
  }
}

export function removeNull(obj: any): any {
  if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj)
      .filter(([, v]) => v != null)
      .reduce(
        (acc, [k, v]) => ({
          ...acc,
          [k]: v === Object(v) && !Array.isArray(v) ? removeNull(v) : v,
        }),
        {}
      );
  }

  return obj;
}
