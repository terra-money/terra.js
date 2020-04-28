import { Denom } from '../Denom';
import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../strings';

/**
 * Stores information about data about Oracle prevotes fetched from the blockchain.
 */
export class ExchangeRatePrevote extends JSONSerializable<
  ExchangeRatePrevote.Data
> {
  /**
   *
   * @param hash vote hash.
   * @param denom denomination against LUNA reported
   * @param voter voting validator's operator address
   * @param submit_block height of block during which prevote was submitted
   */
  constructor(
    public hash: string,
    public denom: Denom,
    public voter: ValAddress,
    public submit_block: number
  ) {
    super();
  }

  public static fromData(data: ExchangeRatePrevote.Data): ExchangeRatePrevote {
    const { hash, denom, voter, submit_block } = data;
    return new ExchangeRatePrevote(
      hash,
      denom,
      voter,
      Number.parseInt(submit_block)
    );
  }

  public toData(): ExchangeRatePrevote.Data {
    const { hash, denom, voter } = this;
    return {
      hash,
      denom,
      voter,
      submit_block: this.submit_block.toFixed(),
    };
  }
}

export namespace ExchangeRatePrevote {
  export interface Data {
    hash: string;
    denom: Denom;
    voter: ValAddress;
    submit_block: string;
  }
}
