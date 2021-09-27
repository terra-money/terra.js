import { JSONSerializable } from '../../util/json';

/*
 * Plan specifies information about a planned upgrade and when it should occur.
 */
export class Plan extends JSONSerializable<Plan.Data> {
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
}

export namespace Plan {
  export interface Data {
    name: string;
    time?: string;
    height: string;
    info: string;
    upgraded_client_state?: any;
  }
}
