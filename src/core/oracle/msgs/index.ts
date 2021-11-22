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
  export type Amino =
    | MsgDelegateFeedConsent.Amino
    | MsgAggregateExchangeRateVote.Amino
    | MsgAggregateExchangeRatePrevote.Amino;
  export type Data =
    | MsgDelegateFeedConsent.Data
    | MsgAggregateExchangeRateVote.Data
    | MsgAggregateExchangeRatePrevote.Data;
  export type Proto =
    | MsgDelegateFeedConsent.Proto
    | MsgAggregateExchangeRateVote.Proto
    | MsgAggregateExchangeRatePrevote.Proto;
}
