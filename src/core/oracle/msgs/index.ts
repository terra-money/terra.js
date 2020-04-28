import { MsgDelegateFeedConsent } from './MsgDelegateFeedConsent';
import { MsgExchangeRatePrevote } from './MsgExchangeRatePrevote';
import { MsgExchangeRateVote } from './MsgExchangeRateVote';

export * from './MsgDelegateFeedConsent';
export * from './MsgExchangeRatePrevote';
export * from './MsgExchangeRateVote';

export type OracleMsg =
  | MsgExchangeRateVote
  | MsgExchangeRatePrevote
  | MsgDelegateFeedConsent;

export namespace OracleMsg {
  export type Data =
    | MsgExchangeRateVote.Data
    | MsgExchangeRatePrevote.Data
    | MsgDelegateFeedConsent.Data;
}
