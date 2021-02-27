import { Denom } from '../Denom';
import { JSONSerializable } from '../../util/json';
import { Dec } from '../numeric';
import { ValAddress } from '../strings';
/**
 * The following objects capture information from the Oracle API. To submit exchange
 * rate votes or prevotes, you'll need to create a transaction with [[MsgExchangeRateVote]]
 * or [[MsgExchangeRatePrevote]] and broadcast it.
 *
 *
 */
/**
 * Stores information about data about Oracle votes fetched from the blockchain.
 */
export declare class ExchangeRateVote extends JSONSerializable<ExchangeRateVote.Data> {
    exchange_rate: Dec;
    denom: Denom;
    voter: ValAddress;
    /**
     *
     * @param exchange_rate Exchange rate reported.
     * @param denom Denomination against LUNA reported.
     * @param voter Voting validator's operator address.
     */
    constructor(exchange_rate: Dec, denom: Denom, voter: ValAddress);
    static fromData(data: ExchangeRateVote.Data): ExchangeRateVote;
    toData(): ExchangeRateVote.Data;
}
export declare namespace ExchangeRateVote {
    interface Data {
        exchange_rate: string;
        denom: Denom;
        voter: ValAddress;
    }
}
