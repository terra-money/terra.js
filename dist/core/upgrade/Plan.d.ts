import { JSONSerializable } from '../../util/json';
import { Plan as Plan_pb } from '@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade';
export declare class Plan extends JSONSerializable<Plan.Amino, Plan.Data, Plan.Proto> {
    name: string;
    time?: Date;
    height: string;
    info: string;
    upgraded_client_state?: any;
    /**
     * @param name This name will be used by the upgraded  version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied.
     * @param time Deprecated
     * @param height  The height at which the upgrade must be performed. Only used if Time is not set.
     * @param info Any application specific upgrade info to be included on-chain such as a git commit that validators could automatically upgrade to
     * @param upgraded_client_state Deprecated
     */
    constructor(name: string, time: Date | undefined, height: string, info: string, upgraded_client_state: any | undefined);
    static fromAmino(data: Plan.Amino): Plan;
    toAmino(): Plan.Amino;
    static fromData(data: Plan.Data): Plan;
    toData(): Plan.Data;
    static fromProto(proto: Plan.Proto): Plan;
    toProto(): Plan.Proto;
}
export declare namespace Plan {
    interface Amino {
        name: string;
        time?: string;
        height: string;
        info: string;
        upgraded_client_state?: any;
    }
    interface Data {
        name: string;
        time?: string;
        height: string;
        info: string;
        upgraded_client_state?: any;
    }
    type Proto = Plan_pb;
}
