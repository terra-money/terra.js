import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { AuthorizationGrant } from '../../../core/msgauth/Authorization';
export declare class MsgAuthAPI extends BaseAPI {
    /**
     * Get the message authorization grants for a specific granter and grantee
     */
    grants(granter: AccAddress, grantee: AccAddress, msgType?: string): Promise<AuthorizationGrant[]>;
}
