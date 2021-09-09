import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../bech32';
import { Denom } from '../Denom';
import {
  ExchangeRateTuple as ExchangeRateTuple_pb,
  AggregateExchangeRateVote as AggregateExchangeRateVote_pb,
} from '@terra-money/terra.proto/src/terra/oracle/v1beta1/oracle_pb';
import { Numeric, Dec } from 'core/numeric';

/**
 * Stores information about data about Oracle aggregate vote fetched from the blockchain.
 */
export class AggregateExchangeRateVote extends JSONSerializable<AggregateExchangeRateVote.Data> {
  /**
   * @param exchange_rate_tuples exchange rates for LUNA
   * @param voter validator
   */
  constructor(
    public exchange_rate_tuples: ExchangeRateTuple[],
    public voter: ValAddress
  ) {
    super();
  }

  public static fromData(
    data: AggregateExchangeRateVote.Data
  ): AggregateExchangeRateVote {
    const { exchange_rate_tuples, voter } = data;
    return new AggregateExchangeRateVote(
      exchange_rate_tuples.map(t => ExchangeRateTuple.fromData(t)),
      voter
    );
  }

  public toData(): AggregateExchangeRateVote.Data {
    const { exchange_rate_tuples, voter } = this;
    return {
      exchange_rate_tuples: exchange_rate_tuples.map(e => e.toData()),
      voter,
    };
  }

  public static fromProto(
    data: AggregateExchangeRateVote.Proto
  ): AggregateExchangeRateVote {
    return new AggregateExchangeRateVote(
      data.getExchangeRateTuplesList().map(t => ExchangeRateTuple.fromProto(t)),
      data.getVoter()
    );
  }

  public toProto(): AggregateExchangeRateVote.Proto {
    const { exchange_rate_tuples, voter } = this;
    const aggregateExchangeRateVoteProto = new AggregateExchangeRateVote_pb();
    aggregateExchangeRateVoteProto.setExchangeRateTuplesList(
      exchange_rate_tuples.map(c => c.toProto())
    );
    aggregateExchangeRateVoteProto.setVoter(voter);
    return aggregateExchangeRateVoteProto;
  }
}

export namespace AggregateExchangeRateVote {
  export interface Data {
    exchange_rate_tuples: ExchangeRateTuple.Data[];
    voter: ValAddress;
  }
  export type Proto = AggregateExchangeRateVote_pb;
}

export class ExchangeRateTuple extends JSONSerializable<ExchangeRateTuple.Data> {
  public exchange_rate: Dec;
  constructor(public denom: Denom, exchange_rate: Numeric.Input) {
    super();
    this.exchange_rate = new Dec(exchange_rate);
  }

  public static fromData(data: ExchangeRateTuple.Data): ExchangeRateTuple {
    const { denom, exchange_rate } = data;
    return new ExchangeRateTuple(denom, exchange_rate);
  }

  public toData(): ExchangeRateTuple.Data {
    const { denom, exchange_rate } = this;
    return {
      denom,
      exchange_rate: exchange_rate.toString(),
    };
  }

  public static fromProto(proto: ExchangeRateTuple.Proto): ExchangeRateTuple {
    return new ExchangeRateTuple(proto.getDenom(), proto.getExchangeRate());
  }

  public toProto(): ExchangeRateTuple.Proto {
    const { denom, exchange_rate } = this;
    const exchangeRateTupleProto = new ExchangeRateTuple_pb();
    exchangeRateTupleProto.setDenom(denom);
    exchangeRateTupleProto.setExchangeRate(exchange_rate.toString());
    return exchangeRateTupleProto;
  }
}

export namespace ExchangeRateTuple {
  export interface Data {
    denom: Denom;
    exchange_rate: string;
  }

  export type Proto = ExchangeRateTuple_pb;
}
