import { SHA256 } from 'jscrypto/SHA256';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../bech32';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { Coins } from '../../Coins';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { MsgAggregateExchangeRateVote as MsgAggregateExchangeRateVote_pb } from '@terra-money/terra.proto/terra/oracle/v1beta1/tx';

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
  return SHA256.hash(payload).toString().substring(0, 40);
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

  public static fromProto(
    proto: MsgAggregateExchangeRateVote.Proto
  ): MsgAggregateExchangeRateVote {
    const xrs = Coins.fromString(proto.exchangeRates);
    return new MsgAggregateExchangeRateVote(
      xrs,
      proto.salt,
      proto.feeder,
      proto.validator
    );
  }

  public toProto(): MsgAggregateExchangeRateVote.Proto {
    const { exchange_rates, salt, feeder, validator } = this;
    return MsgAggregateExchangeRateVote_pb.fromPartial({
      exchangeRates: exchange_rates.toString(),
      feeder,
      salt,
      validator,
    });
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

  public packAny(): Any {
    return Any.fromPartial({
      typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote',
      value: MsgAggregateExchangeRateVote_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any): MsgAggregateExchangeRateVote {
    return MsgAggregateExchangeRateVote.fromProto(
      MsgAggregateExchangeRateVote_pb.decode(msgAny.value)
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

  export type Proto = MsgAggregateExchangeRateVote_pb;
}
