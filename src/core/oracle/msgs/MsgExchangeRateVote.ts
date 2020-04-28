import { Denom } from '../../Denom';
import { JSONSerializable } from '../../../util/json';
import { Dec, Numeric } from '../../numeric';
import { AccAddress, ValAddress } from '../../strings';
import { MsgExchangeRatePrevote } from './MsgExchangeRatePrevote';
import SHA256 from 'crypto-js/sha256';

/**
 * Calculates the vote hash
 * @param exchangeRate exchange rate
 * @param denom denomination
 * @param salt salt
 * @param validator validator operator address
 */
export function voteHash(
  exchangeRate: string,
  denom: Denom,
  salt: string,
  validator: ValAddress
): string {
  const payload = `${salt}:${exchangeRate}:${denom}:${validator}`;
  return SHA256(payload).toString().substring(0, 40);
}

/**
 * Every validator in the validating set (top 100 in total bonded Luna) is required to
 * submit a vote for the current exchange rate of LUNA for every active denomination
 * once per vote period.
 *
 * Votes are registered through submitting a [[MsgExchangeRateVote]] message, which must
 * correspond to a [[MsgExchangeRatePrevote]] submitted in the previous vote period.
 */
export class MsgExchangeRateVote extends JSONSerializable<
  MsgExchangeRateVote.Data
> {
  public exchange_rate: Dec;

  /**
   * @param exchange_rate exchange rate
   * @param denom denomination
   * @param salt salt
   * @param feeder feeder address
   * @param validator validator operator address
   */
  constructor(
    exchange_rate: Numeric.Input,
    public denom: Denom,
    public salt: string,
    public feeder: AccAddress,
    public validator: ValAddress
  ) {
    super();
    this.exchange_rate = new Dec(exchange_rate);
  }

  public static fromData(data: MsgExchangeRateVote.Data): MsgExchangeRateVote {
    const {
      value: { exchange_rate, salt, denom, feeder, validator },
    } = data;
    return new MsgExchangeRateVote(
      exchange_rate,
      denom,
      salt,
      feeder,
      validator
    );
  }

  public toData(): MsgExchangeRateVote.Data {
    const { exchange_rate, salt, denom, feeder, validator } = this;
    return {
      type: 'oracle/MsgExchangeRateVote',
      value: {
        exchange_rate: exchange_rate.toString(),
        denom,
        salt,
        feeder,
        validator,
      },
    };
  }

  /**
   * Gets the vote hash for the MsgExchangeRateVote, for the creation of the corresponding
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

export namespace MsgExchangeRateVote {
  export interface Data {
    type: 'oracle/MsgExchangeRateVote';
    value: {
      exchange_rate: string;
      denom: Denom;
      salt: string;
      feeder: AccAddress;
      validator: ValAddress;
    };
  }
}
