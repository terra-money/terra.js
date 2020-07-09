import { Denom } from '../../Denom';
import { JSONSerializable } from '../../../util/json';
import { Dec, Numeric } from '../../numeric';
import { AccAddress, ValAddress } from '../../strings';
import { MsgExchangeRatePrevote } from './MsgExchangeRatePrevote';
import { Coins } from 'core/Coins';
import { Coin } from 'core/Coin';

export class MsgAggregateExchangeRateVote extends JSONSerializable<
  MsgAggregateExchangeRateVote.Data
> {
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
    this.exchange_rates = new Coins(exchange_rates);
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
        exchange_rates: exchange_rates.toString(),
        salt,
        feeder,
        validator,
      },
    };
  }

  /**
   * Gets the vote hash for the MsgAggregateExchangeRateVote, for the creation of the corresponding
   * prevote message.
   */
  public getVoteHash(): string {
    return voteHash(
      this.exchange_rate.toString(),
      this.denom,
      this.salt,
      this.validator
    );
  }

  /**
   * You can generate the corresponding prevote message through the prevote property.
   * This will return a [[MsgExchangeRatePrevote]] with the proper vote hash and values,
   * determined by the current attributes of the object.
   *
   * @returns the corresponding prevote message to send
   */
  public getPrevote(): MsgExchangeRatePrevote {
    return new MsgExchangeRatePrevote(
      this.getVoteHash(),
      this.denom,
      this.feeder,
      this.validator
    );
  }
}

export namespace MsgAggregateExchangeRateVote {
  export interface Data {
    type: 'oracle/MsgAggregateExchangeRateVote';
    value: {
      salt: string;
      exchange_rates: string;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }
}
