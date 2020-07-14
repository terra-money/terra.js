import { JSONSerializable } from '../../util/json';
import { ValAddress, Denom } from '..';
import { Coin } from '../Coin';
import { Coins } from '../Coins';

/**
 * Stores information about data about Oracle aggregate vote fetched from the blockchain.
 */
export class AggregateExchangeRateVote extends JSONSerializable<
  AggregateExchangeRateVote.Data
> {
  /**
   * @param exchange_rate_tuples exchange rates for LUNA
   * @param voter validator
   */
  constructor(public exchange_rate_tuples: Coins, public voter: ValAddress) {
    super();
  }

  public static fromData(
    data: AggregateExchangeRateVote.Data
  ): AggregateExchangeRateVote {
    const { exchange_rate_tuples, voter } = data;
    const xr_coins = new Coins(
      exchange_rate_tuples.map(t => new Coin(t.denom, t.exchange_rate))
    ).toDecCoins();
    return new AggregateExchangeRateVote(xr_coins, voter);
  }

  public toData(): AggregateExchangeRateVote.Data {
    const { exchange_rate_tuples, voter } = this;
    return {
      exchange_rate_tuples: exchange_rate_tuples.map(c => ({
        denom: c.denom,
        exchange_rate: c.amount.toString(),
      })),
      voter,
    };
  }
}

export interface ExchangeRateTuple {
  denom: Denom;
  exchange_rate: string;
}

export namespace AggregateExchangeRateVote {
  export interface Data {
    exchange_rate_tuples: ExchangeRateTuple[];
    voter: ValAddress;
  }
}
