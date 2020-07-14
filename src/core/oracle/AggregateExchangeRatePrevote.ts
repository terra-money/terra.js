import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../strings';

/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
export class AggregateExchangeRatePrevote extends JSONSerializable<
  AggregateExchangeRatePrevote.Data
> {
  /**
   * @param hash aggregate vote hash
   * @param voter validator
   * @param submit_block block during which aggregate prevote was submitted
   */
  constructor(
    public hash: string,
    public voter: ValAddress,
    public submit_block: number
  ) {
    super();
  }

  public static fromData(
    data: AggregateExchangeRatePrevote.Data
  ): AggregateExchangeRatePrevote {
    const { hash, voter, submit_block } = data;
    return new AggregateExchangeRatePrevote(
      hash,
      voter,
      Number.parseInt(submit_block)
    );
  }

  public toData(): AggregateExchangeRatePrevote.Data {
    const { hash, voter, submit_block } = this;
    return {
      hash,
      voter,
      submit_block: submit_block.toFixed(),
    };
  }
}

export namespace AggregateExchangeRatePrevote {
  export interface Data {
    hash: string;
    voter: ValAddress;
    submit_block: string;
  }
}
