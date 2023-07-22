import { BaseAPI } from './BaseAPI';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
//import { Params as ControllerParams } from '../../../core/ibc/applications/interchain-accounts/controller/Params';
import { Params as HostParams } from '../../../core/ibc/applications/interchain-accounts/v1/host/Params';

export class IbcInterchainAccountsAPI extends BaseAPI {
  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  controllerOwners(
    owner: string,
    connection_id: string,
    params: APIParams = {}
  ) {
    return this.c.get<{ interchain_account_address: string }>(
      `/ibc/apps/interchain_accounts/controller/v1/owners/${owner}/connections/${connection_id}`,
      params
    );
  }
  /**
   * Gets paramaters for interchain account controller.
   * NOTE: CURRENTLY LCD DOESN'T SERVE THE ENDPOINT
  /*
  public async controllerParameters(
    params: APIParams = {}
  ): Promise<ControllerParams> {
    return this.c
      .get<{ params: ControllerParams.Data }>(
        `/ibc/apps/interchain_accounts/controller/v1/params`,
        params
      )
      .then(({ params: d }) => ControllerParams.fromData(d));
  }
  */

  /**
   * Gets paramaters for interchain account host.
   */
  public async hostParameters(params: APIParams = {}): Promise<HostParams> {
    return this.c
      .get<{ params: HostParams.Data }>(
        `/ibc/apps/interchain_accounts/host/v1/params`,
        params
      )
      .then(({ params: d }) => HostParams.fromData(d));
  }
}
