import { Params as Params_pb } from '@terra-money/terra.proto/ibc/core/client/v1/client';
import { JSONSerializable } from '../../../../util/json';

/**
 * Params defines the set of IBC light client parameters.
 */
export class Params extends JSONSerializable<
  Params.Amino,
  Params.Data,
  Params.Proto
> {
  /**
   * @param allowed_clients allowed_clients defines the list of allowed client state types.
   */
  constructor(public allowed_clients: string[]) {
    super();
  }

  public static fromAmino(data: Params.Amino): Params {
    const { allowed_clients } = data;
    return new Params(allowed_clients);
  }

  public toAmino(): Params.Amino {
    const { allowed_clients } = this;
    const res: Params.Amino = {
      allowed_clients: allowed_clients,
    };
    return res;
  }

  public static fromData(data: Params.Data): Params {
    const { allowed_clients } = data;
    return new Params(allowed_clients);
  }

  public toData(): Params.Data {
    const { allowed_clients } = this;
    const res: Params.Data = {
      allowed_clients,
    };
    return res;
  }

  public static fromProto(proto: Params.Proto): Params {
    return new Params(proto.allowedClients);
  }

  public toProto(): Params.Proto {
    const { allowed_clients } = this;
    return Params_pb.fromPartial({
      allowedClients: allowed_clients,
    });
  }
}

export namespace Params {
  export interface Amino {
    allowed_clients: string[];
  }

  export interface Data {
    allowed_clients: string[];
  }

  export type Proto = Params_pb;
}
