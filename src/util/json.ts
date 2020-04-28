export function prepareSignBytes(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(prepareSignBytes);
  }

  // string or number
  if (typeof obj !== `object`) {
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

export abstract class JSONSerializable<T> {
  public abstract toData(): T;
  public toJSON(): string {
    return JSON.stringify(prepareSignBytes(this.toData()));
  }
}
