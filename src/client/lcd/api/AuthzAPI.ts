import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { AuthorizationGrant } from '../../../core/authz/authorizations';
import { APIParams, Pagination } from '../APIRequester';

export class AuthzAPI extends BaseAPI {
  /**
   * Get the message authorization grants for a specific granter and grantee
   */
  public async grants(
    granter: AccAddress,
    grantee: AccAddress,
    msgTypeUrl?: string,
    params: APIParams = {}
  ): Promise<[AuthorizationGrant[], Pagination]> {
    return this.c
      .get<{ grants: AuthorizationGrant.Data[]; pagination: Pagination }>(
        `/cosmos/authz/v1beta1/grants`,
        Object.assign(
          {
            granter,
            grantee,
            msg_type_url: msgTypeUrl,
          },
          params
        )
      )
      .then(d => [d.grants.map(AuthorizationGrant.fromData), d.pagination]);
  }
}
