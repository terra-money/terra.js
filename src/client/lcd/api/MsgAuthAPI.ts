import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { AuthorizationGrant } from '../../../core/msgauth/Authorization';
import { APIParams } from '../APIRequester';

export class MsgAuthAPI extends BaseAPI {
  /**
   * Get the message authorization grants for a specific granter and grantee
   */
  public async grants(
    granter: AccAddress,
    grantee: AccAddress,
    msgType?: string,
    params: APIParams = {}
  ): Promise<AuthorizationGrant[]> {
    if (msgType === undefined) {
      return this.c
        .get<AuthorizationGrant.Data[]>(
          `/msgauth/granters/${granter}/grantees/${grantee}/grants`,
          params
        )
        .then(d => d.result.map(AuthorizationGrant.fromData));
    } else {
      return this.c
        .get<AuthorizationGrant.Data>(
          `/msgauth/granters/${granter}/grantees/${grantee}/grants/${msgType}`,
          params
        )
        .then(d => {
          if (d.result === null) {
            return [];
          }
          return [AuthorizationGrant.fromData(d.result)];
        });
    }
  }
}
