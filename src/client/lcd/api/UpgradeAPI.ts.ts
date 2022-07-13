import { BaseAPI } from './BaseAPI';
import { Coins, Plan } from '../../../core';
import { APIParams, Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { publicEncrypt } from 'crypto';

export interface ModuleVersion {
  name: string;
  version: number;
}

export namespace ModuleVersion {
  export interface Data {
    name: string;
    version: string;
  }
}

export class UpgradeAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * queries a previously applied upgrade plan by its name.
   * it returns the height of the plan. if there's no plan with given name, it returns 0.
   */
  public async appliedPlan(
    name: string,
    params: Partial<PaginationOptions & APIParams> = {}
  ): Promise<number> {
    return this.c
      .get<{ height: string }>(
        `/cosmos/upgrade/v1beta1/applied_plan/${name}`,
        params
      )
      .then(d => Number.parseInt(d.height));
  }

  /**
   * Look up the current plan
   */
  public async currentPlan(params: APIParams = {}): Promise<Plan | null> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        plan: Plan.Data | null;
      }>(`/cosmos/upgrade/v1beta1/current_plan`, params)
      .then(d => (d.plan ? Plan.fromData(d.plan) : null));
  }

  /**
   * Look up the versions of the modules
   */
  public async moduleVersions(
    params: APIParams = {}
  ): Promise<ModuleVersion[]> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    return this.c
      .get<{
        module_versions: ModuleVersion.Data[];
      }>(`/cosmos/upgrade/v1beta1/module_versions`, params)
      .then(d =>
        d.module_versions.map(mv => {
          return { name: mv.name, version: Number.parseInt(mv.version) };
        })
      );
  }
}
