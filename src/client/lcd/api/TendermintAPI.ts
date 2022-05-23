import { BaseAPI } from './BaseAPI';
import { BlockInfo, DelegateValidator } from '../../../core';
import { APIParams, Pagination } from '../APIRequester';
import { LCDClient } from '../LCDClient';

export class TendermintAPI extends BaseAPI {

  constructor(public lcd: LCDClient) {
    super(lcd.apiRequester);
  }

  /**
   * Gets the node's information.
   */
  public async nodeInfo(params: APIParams = {}): Promise<object> {
    return this.c.getRaw(`/cosmos/base/tendermint/v1beta1/node_info`, params);
  }

  /**
   * Gets whether the node is currently in syncing mode to catch up with blocks.
   */
  public async syncing(params: APIParams = {}): Promise<boolean> {
    return this.c
      .getRaw<{ syncing: boolean }>(
        `/cosmos/base/tendermint/v1beta1/syncing`,
        params
      )
      .then(d => d.syncing);
  }

  /**
   * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
   * @param height block height
   */
  public async validatorSet(
    height?: number,
    params: APIParams = {}
  ): Promise<[DelegateValidator[], Pagination]> {
    const url =
      height !== undefined
        ? `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`
        : `/cosmos/base/tendermint/v1beta1/validatorsets/latest`;
    return this.c
      .get<{
        block_height: string;
        validators: DelegateValidator[];
        pagination: Pagination;
      }>(url, params)
      .then(d => [d.validators, d.pagination]);
  }

  /**
   * Gets the block information at the specified height. If no height is given, the latest block is returned.
   * @param height block height.
   */
  public async blockInfo(
    height?: number,
    params: APIParams = {}
  ): Promise<BlockInfo> {
    const url =
      height !== undefined
        ? `/cosmos/base/tendermint/v1beta1/blocks/${height}`
        : `/cosmos/base/tendermint/v1beta1/blocks/latest`;
    return this.c.getRaw<BlockInfo>(url, params);
  }
}
