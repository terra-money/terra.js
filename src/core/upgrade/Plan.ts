import { JSONSerializable } from '../../util/json';
import { Plan as Plan_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';
import Long from 'long';

/*
 * Plan specifies information about a planned upgrade and when it should occur.
 */
export class Plan extends JSONSerializable<Plan.Amino, Plan.Data, Plan.Proto> {
  public name: string;
  public time?: Date;
  public height: string;
  public info: string;
  public upgraded_client_state?: any;
  /**
   * @param name This name will be used by the upgraded  version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied.
   * @param time Deprecated
   * @param height  The height at which the upgrade must be performed. Only used if Time is not set.
   * @param info Any application specific upgrade info to be included on-chain such as a git commit that validators could automatically upgrade to
   * @param upgraded_client_state Deprecated
   */
  constructor(
    name: string,
    time: Date | undefined,
    height: string,
    info: string,
    upgraded_client_state: any | undefined
  ) {
    super();
    this.name = name;
    this.time = time;
    this.height = height;
    this.info = info;
    this.upgraded_client_state = upgraded_client_state;
  }

  public static fromAmino(data: Plan.Amino): Plan {
    const { name, time, height, info, upgraded_client_state } = data;
    return new Plan(
      name,
      time ? new Date(time) : undefined,
      height,
      info,
      upgraded_client_state
    );
  }

  public toAmino(): Plan.Amino {
    const { name, time, height, info, upgraded_client_state } = this;
    const res: Plan.Amino = {
      name,
      time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
      height,
      info,
      upgraded_client_state,
    };
    return res;
  }

  public static fromData(data: Plan.Data): Plan {
    const { name, time, height, info, upgraded_client_state } = data;
    return new Plan(
      name,
      time ? new Date(time) : undefined,
      height,
      info,
      upgraded_client_state
    );
  }

  public toData(): Plan.Data {
    const { name, time, height, info, upgraded_client_state } = this;
    const res: Plan.Data = {
      name,
      time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
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
      proto.height.toString(),
      proto.info,
      proto.upgradedClientState
    );
  }

  public toProto(): Plan.Proto {
    const { name, time, height, info, upgraded_client_state } = this;
    return Plan_pb.fromPartial({
      name,
      time,
      height: Long.fromString(height),
      info,
      upgradedClientState: upgraded_client_state,
    });
  }
}

export namespace Plan {
  export interface Amino {
    name: string;
    time?: string;
    height: string;
    info: string;
    upgraded_client_state?: any;
  }

  export interface Data {
    name: string;
    time?: string;
    height: string;
    info: string;
    upgraded_client_state?: any;
  }

  export type Proto = Plan_pb;
}
