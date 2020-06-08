import { BaseAPI } from './BaseAPI';
import { BlockInfo, ValidatorSet } from '../../../core';

export class TendermintAPI extends BaseAPI {
  /**
   * Gets the node's information.
   */
  public async nodeInfo(): Promise<object> {
    return this.c.getRaw(`/node_info`);
  }

  /**
   * Gets whether the node is currently in syncing mode to catch up with blocks.
   */
  public async syncing(): Promise<boolean> {
    return this.c.getRaw<{ syncing: boolean }>(`/syncing`).then(d => d.syncing);
  }

  /**
   * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
   * @param height block height
   */
  public async validatorSet(height?: number): Promise<ValidatorSet> {
    const url =
      height !== undefined
        ? `/validatorsets/${height}`
        : `/validatorsets/latest`;
    return this.c.get<ValidatorSet>(url).then(d => d.result);
  }

  /**
   * Gets the block information at the specified height. If no height is given, the latest block is returned.
   * @param height block height.
   */
  public async block(height?: number): Promise<BlockInfo> {
    const url = height !== undefined ? `/blocks/${height}` : `/blocks/latest`;
    return this.c.getRaw<BlockInfo>(url);
  }
}
