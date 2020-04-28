import { Denom } from '../Denom';
import { JSONSerializable } from '../../util/json';
import { Dec } from '../numeric';
import { ValAddress } from '../strings';

/**
 * The following objects capture information from the Oracle API. To submit exchange
 * rate votes or prevotes, you'll need to create a transaction with [[MsgExchangeRateVote]]
 * or [[MsgExchangeRatePrevote]] and broadcast it.
 *
 *
 */

/**
 * Stores information about data about Oracle votes fetched from the blockchain.
 */
export class ExchangeRateVote extends JSONSerializable<ExchangeRateVote.Data> {
  /**
   *
   * @param exchange_rate Exchange rate reported.
   * @param denom Denomination against LUNA reported.
   * @param voter Voting validator's operator address.
   */
  constructor(
    public exchange_rate: Dec,
    public denom: Denom,
    public voter: ValAddress
  ) {
    super();
  }

  public static fromData(data: ExchangeRateVote.Data): ExchangeRateVote {
    const { exchange_rate, denom, voter } = data;
    return new ExchangeRateVote(new Dec(exchange_rate), denom, voter);
  }

  public toData(): ExchangeRateVote.Data {
    const { exchange_rate, denom, voter } = this;
    return {
      exchange_rate: exchange_rate.toString(),
      denom,
      voter,
    };
  }
}

export namespace ExchangeRateVote {
  export interface Data {
    exchange_rate: string;
    denom: Denom;
    voter: ValAddress;
  }
}
