import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { AuthorizationGrant } from '../../../core/authz/authorizations';
import { APIParams, Pagination } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export declare class AuthzAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Get the message authorization grants for a specific granter and grantee
     */
    grants(granter: AccAddress, grantee: AccAddress, msgTypeUrl?: string, params?: APIParams): Promise<[AuthorizationGrant[], Pagination]>;
    /**
     * get list of `GrantAuthorization`, granted by granter.
     */
    granter(granter: AccAddress, params?: APIParams): Promise<[AuthorizationGrant[], Pagination]>;
    /**
     * get list of `GrantAuthorization`, by grantee.
     */
    grantee(grantee: AccAddress, params?: APIParams): Promise<[AuthorizationGrant[], Pagination]>;
}
