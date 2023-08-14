import { BaseAPI } from './BaseAPI';
import { Plan } from '../../../core';
import { APIParams, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export interface ModuleVersion {
    name: string;
    version: number;
}
export declare namespace ModuleVersion {
    interface Data {
        name: string;
        version: string;
    }
}
export declare class UpgradeAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * queries a previously applied upgrade plan by its name.
     * it returns the height of the plan. if there's no plan with given name, it returns 0.
     */
    appliedPlan(name: string, params?: Partial<PaginationOptions & APIParams>): Promise<number>;
    /**
     * Look up the current plan
     */
    currentPlan(params?: APIParams): Promise<Plan | null>;
    /**
     * Look up the versions of the modules
     */
    moduleVersions(params?: APIParams): Promise<ModuleVersion[]>;
}
