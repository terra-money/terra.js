import { JSONSerializable } from '../../util/json';
import { ValAddress, Denom } from '..';
import { Coins } from '../Coins';
/**
 * Stores information about data about Oracle aggregate vote fetched from the blockchain.
 */
export declare class AggregateExchangeRateVote extends JSONSerializable<AggregateExchangeRateVote.Data> {
    exchange_rate_tuples: Coins;
    voter: ValAddress;
    /**
     * @param exchange_rate_tuples exchange rates for LUNA
     * @param voter validator
     */
    constructor(exchange_rate_tuples: Coins, voter: ValAddress);
    static fromData(data: AggregateExchangeRateVote.Data): AggregateExchangeRateVote;
    toData(): AggregateExchangeRateVote.Data;
}
export interface ExchangeRateTuple {
    denom: Denom;
    exchange_rate: string;
}
export declare namespace AggregateExchangeRateVote {
    interface Data {
        exchange_rate_tuples: ExchangeRateTuple[];
        voter: ValAddress;
    }
}
