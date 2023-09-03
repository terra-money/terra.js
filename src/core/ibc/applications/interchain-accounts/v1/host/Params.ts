import { Params as Params_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/host/v1/host';
import { JSONSerializable } from '../../../../../../util/json';

/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
export class Params extends JSONSerializable<any, Params.Data, Params.Proto> {
  /**
   * @param host_enabled host_enabled enables or disables the host submodule.
   */
  constructor(public host_enabled: boolean, public allowed_messages: string[]) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino() {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Params.Data): Params {
    const { host_enabled, allowed_messages } = data;
    return new Params(host_enabled, allowed_messages);
  }

  public toData(): Params.Data {
    const { host_enabled, allowed_messages } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.host.v1.Params',
      host_enabled,
      allowed_messages,
    };
  }

  public static fromProto(proto: Params.Proto): Params {
    return new Params(proto.hostEnabled, proto.allowMessages);
  }

  public toProto(): Params.Proto {
    const { host_enabled, allowed_messages } = this;
    return Params_pb.fromPartial({
      hostEnabled: host_enabled,
      allowMessages: allowed_messages,
    });
  }
}

export namespace Params {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.host.v1.Params';
    host_enabled: boolean;
    allowed_messages: string[];
  }

  export type Proto = Params_pb;
}
