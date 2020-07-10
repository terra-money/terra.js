import { MsgDelegateFeedConsent } from './MsgDelegateFeedConsent';
import { MsgExchangeRatePrevote } from './MsgExchangeRatePrevote';
import { MsgExchangeRateVote } from './MsgExchangeRateVote';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { MsgAggregateExchangeRateVote } from './MsgAggregateExchangeRateVote';

export * from './MsgDelegateFeedConsent';
export * from './MsgExchangeRatePrevote';
export * from './MsgExchangeRateVote';
export * from './MsgAggregateExchangeRateVote';
export * from './MsgAggregateExchangeRatePrevote';

export type OracleMsg =
  | MsgExchangeRateVote
  | MsgExchangeRatePrevote
  | MsgDelegateFeedConsent
  | MsgAggregateExchangeRateVote
  | MsgAggregateExchangeRatePrevote;

export namespace OracleMsg {
  export type Data =
    | MsgExchangeRateVote.Data
    | MsgExchangeRatePrevote.Data
    | MsgDelegateFeedConsent.Data
    | MsgAggregateExchangeRateVote.Data
    | MsgAggregateExchangeRatePrevote.Data;
}
