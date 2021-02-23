import { BaseAPI } from './BaseAPI';
import { BlockInfo, ValidatorSet } from '../../../core';
export declare class TendermintAPI extends BaseAPI {
    /**
     * Gets the node's information.
     */
    nodeInfo(): Promise<object>;
    /**
     * Gets whether the node is currently in syncing mode to catch up with blocks.
     */
    syncing(): Promise<boolean>;
    /**
     * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
     * @param height block height
     */
    validatorSet(height?: number): Promise<ValidatorSet>;
    /**
     * Gets the block information at the specified height. If no height is given, the latest block is returned.
     * @param height block height.
     */
    blockInfo(height?: number): Promise<BlockInfo>;
}
