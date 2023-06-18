import { Params as Params_pb } from '@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/controller';
import { JSONSerializable } from '../../../../../../util/json';

/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the controller submodule.
 */
export class Params extends JSONSerializable<any, Params.Data, Params.Proto> {
  /**
   * @param controller_enabled controller_enabled enables or disables the controller submodule
   */
  constructor(public controller_enabled: boolean) {
    super();
  }

  public static fromAmino() {
    throw new Error('Amino not supported');
  }

  public toAmino() {
    throw new Error('Amino not supported');
  }

  public static fromData(data: Params.Data): Params {
    const { controller_enabled } = data;
    return new Params(controller_enabled);
  }

  public toData(): Params.Data {
    const { controller_enabled } = this;
    return {
      '@type': '/ibc.applications.interchain_accounts.controller.v1.Params',
      controller_enabled,
    };
  }

  public static fromProto(proto: Params.Proto): Params {
    return new Params(proto.controllerEnabled);
  }

  public toProto(): Params.Proto {
    const { controller_enabled } = this;
    return Params_pb.fromPartial({
      controllerEnabled: controller_enabled,
    });
  }
}

export namespace Params {
  export interface Data {
    '@type': '/ibc.applications.interchain_accounts.controller.v1.Params';
    controller_enabled: boolean;
  }

  export type Proto = Params_pb;
}
