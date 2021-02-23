import { Coins } from '../../../core';
import { BaseAPI } from './BaseAPI';
export declare class SupplyAPI extends BaseAPI {
    /**
     * Get the total supply of tokens in circulation for all denominations.
     */
    total(): Promise<Coins>;
}
