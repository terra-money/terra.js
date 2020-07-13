import { AccAddress, Coins } from '../../../core';
import { BaseAPI } from './BaseAPI';

export class MsgAuthAPI extends BaseAPI {
  /**
   * Get the message authorization grants for a specific granter and grantee
   */
  public async grants(
    granter: AccAddress,
    grantee: AccAddress,
    msgType?: string
  ): Promise<Coins> {
    if (msgType === undefined) {
      return this.c
        .get<Coins.Data>(
          `/msgauth/granters/${granter}/grantees/${grantee}/grants`
        )
        .then(d => Coins.fromData(d.result));
    } else {
      return this.c
        .get<Coins.Data>(
          `/msgauth/granters/${granter}/grantees/${grantee}/grants/${msgType}`
        )
        .then(d => Coins.fromData(d.result));
    }
  }
}
