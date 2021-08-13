import { MsgDelegateFeedConsent } from './MsgDelegateFeedConsent';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { MsgAggregateExchangeRateVote } from './MsgAggregateExchangeRateVote';

export * from './MsgDelegateFeedConsent';
export * from './MsgAggregateExchangeRateVote';
export * from './MsgAggregateExchangeRatePrevote';

export type OracleMsg =
  | MsgDelegateFeedConsent
  | MsgAggregateExchangeRateVote
  | MsgAggregateExchangeRatePrevote;

export namespace OracleMsg {
  export type Data =
    | MsgDelegateFeedConsent.Data
    | MsgAggregateExchangeRateVote.Data
    | MsgAggregateExchangeRatePrevote.Data;
}
