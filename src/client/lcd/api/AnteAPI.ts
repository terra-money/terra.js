import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { Dec } from '../../..';

export interface AnteParams {
  minimumCommissionEnforced: boolean;
}

export namespace AnteParams {
  export interface Data {
    minimumCommissionEnforced: boolean;
  }
}
export class AnteAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the minimum commission.
   */
  public async minimumCommission(params: APIParams = {}): Promise<Dec> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }
    Number.parseFloat;

    return this.c
      .get<{ minimum_commission: string }>(
        `/terra/ante/v2/minimum_commission`,
        params
      )
      .then(d => new Dec(d.minimum_commission));
  }

  /**
   * Gets the current Ante module's parameters.
   */
  public async parameters(params: APIParams = {}): Promise<AnteParams> {
    if (this.lcd.config.isClassic) {
      throw new Error('Not supported for the network');
    }

    return this.c
      .get<{ params: AnteParams.Data }>(`/terra/ante/v2/params`, params)
      .then(d => d.params);
  }
}
