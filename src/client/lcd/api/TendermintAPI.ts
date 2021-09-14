import { BaseAPI } from './BaseAPI';
import { BlockInfo, ValidatorSet } from '../../../core';
import { APIParams } from '../APIRequester';

export class TendermintAPI extends BaseAPI {
  /**
   * Gets the node's information.
   */
  public async nodeInfo(params: APIParams = {}): Promise<object> {
    return this.c.getRaw(`/node_info`, params);
  }

  /**
   * Gets whether the node is currently in syncing mode to catch up with blocks.
   */
  public async syncing(params: APIParams = {}): Promise<boolean> {
    return this.c
      .getRaw<{ syncing: boolean }>(`/syncing`, params)
      .then(d => d.syncing);
  }

  /**
   * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
   * @param height block height
   */
  public async validatorSet(
    height?: number,
    params: APIParams = {}
  ): Promise<ValidatorSet> {
    const url =
      height !== undefined
        ? `/validatorsets/${height}`
        : `/validatorsets/latest`;
    return this.c
      .get<{ result: ValidatorSet }>(url, params)
      .then(d => d.result);
  }

  /**
   * Gets the block information at the specified height. If no height is given, the latest block is returned.
   * @param height block height.
   */
  public async blockInfo(
    height?: number,
    params: APIParams = {}
  ): Promise<BlockInfo> {
    const url = height !== undefined ? `/blocks/${height}` : `/blocks/latest`;
    return this.c.getRaw<BlockInfo>(url, params);
  }
}
