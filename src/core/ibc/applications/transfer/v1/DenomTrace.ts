import { DenomTrace as DenomTrace_pb } from '@terra-money/legacy.proto/ibc/applications/transfer/v1/transfer';
import { JSONSerializable } from '../../../../../util/json';

/**
 * DenomTrace is a monotonically increasing data type
 * that can be compared against another DenomTrace for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionDenomTrace is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionDenomTrace
 * gets reset
 */
export class DenomTrace extends JSONSerializable<
  DenomTrace.Amino,
  DenomTrace.Data,
  DenomTrace.Proto
> {
  /**
   * @param path the revision that the client is currently on
   * @param base_denom the height within the given revision
   */
  constructor(public path: string, public base_denom: string) {
    super();
  }

  public static fromAmino(data: DenomTrace.Amino): DenomTrace {
    const { path, base_denom } = data;
    return new DenomTrace(path, base_denom);
  }

  public toAmino(): DenomTrace.Amino {
    const { path, base_denom } = this;
    const res: DenomTrace.Amino = {
      path,
      base_denom,
    };
    return res;
  }

  public static fromData(data: DenomTrace.Data): DenomTrace {
    const { path, base_denom } = data;
    return new DenomTrace(path, base_denom);
  }

  public toData(): DenomTrace.Data {
    const { path, base_denom } = this;
    const res: DenomTrace.Data = {
      path,
      base_denom,
    };
    return res;
  }

  public static fromProto(proto: DenomTrace.Proto): DenomTrace {
    return new DenomTrace(proto.path, proto.baseDenom);
  }

  public toProto(): DenomTrace.Proto {
    const { path, base_denom } = this;
    return DenomTrace_pb.fromPartial({ path, baseDenom: base_denom });
  }
}

export namespace DenomTrace {
  export interface Amino {
    path: string;
    base_denom: string;
  }

  export interface Data {
    path: string;
    base_denom: string;
  }

  export type Proto = DenomTrace_pb;
}
