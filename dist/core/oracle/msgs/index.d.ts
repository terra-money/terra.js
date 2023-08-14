import { MsgDelegateFeedConsent } from './MsgDelegateFeedConsent';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { MsgAggregateExchangeRateVote } from './MsgAggregateExchangeRateVote';
export * from './MsgDelegateFeedConsent';
export * from './MsgAggregateExchangeRateVote';
export * from './MsgAggregateExchangeRatePrevote';
export declare type OracleMsg = MsgDelegateFeedConsent | MsgAggregateExchangeRateVote | MsgAggregateExchangeRatePrevote;
export declare namespace OracleMsg {
    type Amino = MsgDelegateFeedConsent.Amino | MsgAggregateExchangeRateVote.Amino | MsgAggregateExchangeRatePrevote.Amino;
    type Data = MsgDelegateFeedConsent.Data | MsgAggregateExchangeRateVote.Data | MsgAggregateExchangeRatePrevote.Data;
    type Proto = MsgDelegateFeedConsent.Proto | MsgAggregateExchangeRateVote.Proto | MsgAggregateExchangeRatePrevote.Proto;
}
