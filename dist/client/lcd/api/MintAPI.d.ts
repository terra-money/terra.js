import { Dec, Denom } from '../../../core';
import { APIParams } from '../APIRequester';
import { LCDClient } from '../LCDClient';
import { BaseAPI } from './BaseAPI';
export interface MintingParams {
    mint_denom: Denom;
    inflation_rate_change: Dec;
    inflation_max: Dec;
    inflation_min: Dec;
    goal_bonded: Dec;
    blocks_per_year: number;
}
export declare namespace MintingParams {
    interface Data {
        mint_denom: string;
        inflation_rate_change: string;
        inflation_max: string;
        inflation_min: string;
        goal_bonded: string;
        blocks_per_year: string;
    }
}
export declare class MintAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Gets the current minting inflation value
     */
    inflation(params?: APIParams): Promise<Dec>;
    /**
     * Gets the current minting annual provisions value
     */
    annualProvisions(params?: APIParams): Promise<Dec>;
    /**
     * Gets the current minting module's parameters.
     */
    parameters(params?: APIParams): Promise<MintingParams>;
}
