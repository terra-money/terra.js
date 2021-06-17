import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { Coins } from '../../Coins';
import SHA256 from 'crypto-js/sha256';

/**
 * Calculates the aggregate vote hash
 * @param exchangeRates exchange rates
 * @param salt salt
 * @param validator validator operator address
 */
export function aggregateVoteHash(
  exchangeRates: Coins,
  salt: string,
  validator: ValAddress
): string {
  const payload = `${salt}:${exchangeRates
    .toDecCoins()
    .toString()}:${validator}`;
  return SHA256(payload).toString().substring(0, 40);
}

/**
 * Aggregate analog of MsgExchangeRateVote: submits an oracle vote for multiple denominations
 * through a single message rather than multiple messages.
 */
export class MsgAggregateExchangeRateVote extends JSONSerializable<MsgAggregateExchangeRateVote.Data> {
  public exchange_rates: Coins;

  /**
   * @param exchange_rate exchange rates
   * @param salt salt
   * @param feeder feeder address
   * @param validator validator operator address
   */
  constructor(
    exchange_rates: Coins.Input,
    public salt: string,
    public feeder: AccAddress,
    public validator: ValAddress
  ) {
    super();
    this.exchange_rates = new Coins(exchange_rates).toDecCoins();
  }

  public static fromData(
    data: MsgAggregateExchangeRateVote.Data
  ): MsgAggregateExchangeRateVote {
    const {
      value: { exchange_rates, salt, feeder, validator },
    } = data;
    const xrs = Coins.fromString(exchange_rates);
    return new MsgAggregateExchangeRateVote(xrs, salt, feeder, validator);
  }

  public toData(): MsgAggregateExchangeRateVote.Data {
    const { exchange_rates, salt, feeder, validator } = this;
    return {
      type: 'oracle/MsgAggregateExchangeRateVote',
      value: {
        exchange_rates: exchange_rates.toDecCoins().toString(),
        salt,
        feeder,
        validator,
      },
    };
  }

  /**
   * Gets the aggregate vote hash for the MsgAggregateExchangeRateVote, for the creation of
   *  the corresponding prevote message.
   */
  public getAggregateVoteHash(): string {
    return aggregateVoteHash(this.exchange_rates, this.salt, this.validator);
  }

  /**
   * You can generate the corresponding aggregate prevote message.
   * This will return a [[MsgAggregateExchangeRatePrevote]] with the proper vote hash and values,
   * determined by the current attributes of the object.
   *
   * @returns the corresponding prevote message to send
   */
  public getPrevote(): MsgAggregateExchangeRatePrevote {
    return new MsgAggregateExchangeRatePrevote(
      this.getAggregateVoteHash(),
      this.feeder,
      this.validator
    );
  }
}

export namespace MsgAggregateExchangeRateVote {
  export interface Data {
    type: 'oracle/MsgAggregateExchangeRateVote';
    value: {
      exchange_rates: string;
      salt: string;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }
}
