import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';
import { MsgAggregateExchangeRatePrevote } from './MsgAggregateExchangeRatePrevote';
import { Coins } from '../../Coins';
/**
 * Calculates the aggregate vote hash
 * @param exchangeRates exchange rates
 * @param salt salt
 * @param validator validator operator address
 */
export declare function aggregateVoteHash(exchangeRates: Coins, salt: string, validator: ValAddress): string;
/**
 * Aggregate analog of MsgExchangeRateVote: submits an oracle vote for multiple denominations
 * through a single message rather than multiple messages.
 */
export declare class MsgAggregateExchangeRateVote extends JSONSerializable<MsgAggregateExchangeRateVote.Data> {
    salt: string;
    feeder: AccAddress;
    validator: ValAddress;
    exchange_rates: Coins;
    /**
     * @param exchange_rate exchange rates
     * @param salt salt
     * @param feeder feeder address
     * @param validator validator operator address
     */
    constructor(exchange_rates: Coins.Input, salt: string, feeder: AccAddress, validator: ValAddress);
    static fromData(data: MsgAggregateExchangeRateVote.Data): MsgAggregateExchangeRateVote;
    toData(): MsgAggregateExchangeRateVote.Data;
    /**
     * Gets the aggregate vote hash for the MsgAggregateExchangeRateVote, for the creation of
     *  the corresponding prevote message.
     */
    getAggregateVoteHash(): string;
    /**
     * You can generate the corresponding aggregate prevote message.
     * This will return a [[MsgAggregateExchangeRatePrevote]] with the proper vote hash and values,
     * determined by the current attributes of the object.
     *
     * @returns the corresponding prevote message to send
     */
    getPrevote(): MsgAggregateExchangeRatePrevote;
}
export declare namespace MsgAggregateExchangeRateVote {
    interface Data {
        type: 'oracle/MsgAggregateExchangeRateVote';
        value: {
            exchange_rates: string;
            salt: string;
            feeder: AccAddress;
            validator: ValAddress;
        };
    }
}
