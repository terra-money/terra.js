import { Dec, Denom } from '../../../core';
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
    /**
     * Gets the current minting inflation value
     */
    inflation(): Promise<Dec>;
    /**
     * Gets the current minting annaul provisions value
     */
    annualProvisions(): Promise<Dec>;
    /**
     * Gets the current minting module's parameters.
     */
    parameters(): Promise<MintingParams>;
}
