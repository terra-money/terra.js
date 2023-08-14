import { BaseAPI } from './BaseAPI';
import { BlockInfo, DelegateValidator } from '../../../core';
import { APIParams, Pagination } from '../APIRequester';
import { LCDClient } from '../LCDClient';
export declare class TendermintAPI extends BaseAPI {
    lcd: LCDClient;
    constructor(lcd: LCDClient);
    /**
     * Gets the node's information.
     */
    nodeInfo(params?: APIParams): Promise<object>;
    /**
     * Gets whether the node is currently in syncing mode to catch up with blocks.
     */
    syncing(params?: APIParams): Promise<boolean>;
    /**
     * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
     * @param height block height
     */
    validatorSet(height?: number, params?: APIParams): Promise<[DelegateValidator[], Pagination]>;
    /**
     * Gets the block information at the specified height. If no height is given, the latest block is returned.
     * @param height block height.
     */
    blockInfo(height?: number, params?: APIParams): Promise<BlockInfo>;
}
