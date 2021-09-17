import { JSONSerializable } from '../../util/json';
import { Plan as Plan_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';
import Long from 'long';

/*
 * Plan specifies information about a planned upgrade and when it should occur.
 */
export class Plan extends JSONSerializable<Plan.Amino, Plan.Data, Plan.Proto> {
  /**
   * @param name This name will be used by the upgraded  version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied.
   * @param time Deprecated
   * @param height  The height at which the upgrade must be performed. Only used if Time is not set.
   * @param info Any application specific upgrade info to be included on-chain such as a git commit that validators could automatically upgrade to
   * @param upgraded_client_state Deprecated
   */
  constructor(
    public name: string,
    public time: Date,
    public height: number,
    public info: string,
    public upgraded_client_state: any
  ) {
    super();
  }

  public static fromAmino(data: Plan.Amino): Plan {
    const { name, time, height, info, upgraded_client_state } = data;
    return new Plan(name, new Date(time), height, info, upgraded_client_state);
  }

  public toAmino(): Plan.Amino {
    const { name, time, height, info, upgraded_client_state } = this;
    const res: Plan.Amino = {
      name,
      time: time.toISOString().replace(/\.000Z$/, 'Z'),
      height,
      info,
      upgraded_client_state,
    };
    return res;
  }

  public static fromData(data: Plan.Data): Plan {
    const { name, time, height, info, upgraded_client_state } = data;
    return new Plan(name, new Date(time), height, info, upgraded_client_state);
  }

  public toData(): Plan.Data {
    const { name, time, height, info, upgraded_client_state } = this;
    const res: Plan.Data = {
      name,
      time: time.toISOString().replace(/\.000Z$/, 'Z'),
      height,
      info,
      upgraded_client_state,
    };
    return res;
  }

  public static fromProto(proto: Plan.Proto): Plan {
    return new Plan(
      proto.name,
      proto.time as Date,
      proto.height.toNumber(),
      proto.info,
      proto.upgradedClientState
    );
  }

  public toProto(): Plan.Proto {
    const { name, time, height, info, upgraded_client_state } = this;
    return Plan_pb.fromPartial({
      name,
      time,
      height: Long.fromNumber(height),
      info,
      upgradedClientState: upgraded_client_state,
    });
  }
}

export namespace Plan {
  export interface Amino {
    name: string;
    time: string;
    height: number;
    info: string;
    upgraded_client_state: any;
  }

  export interface Data {
    name: string;
    time: string;
    height: number;
    info: string;
    upgraded_client_state: any;
  }

  export type Proto = Plan_pb;
}
