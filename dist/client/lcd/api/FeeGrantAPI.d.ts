import { AccAddress } from '../../../core';
import { BaseAPI } from './BaseAPI';
import { Allowance } from '../../../core/feegrant/allowances';
import { Pagination, PaginationOptions } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export declare class FeeGrantAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    allowances(grantee: AccAddress, params?: Partial<PaginationOptions>): Promise<{
        allowances: {
            granter: AccAddress;
            grantee: AccAddress;
            allowance: Allowance;
        }[];
        pagination: Pagination;
    }>;
    allowance(granter: AccAddress, grantee: AccAddress): Promise<Allowance>;
    allowancesByGranter(granter: AccAddress, params?: Partial<PaginationOptions>): Promise<{
        allowances: {
            granter: AccAddress;
            grantee: AccAddress;
            allowance: Allowance;
        }[];
        pagination: Pagination;
    }>;
}
