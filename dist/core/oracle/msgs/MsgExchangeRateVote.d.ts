import { Denom } from '../../Denom';
import { JSONSerializable } from '../../../util/json';
import { Dec, Numeric } from '../../numeric';
import { AccAddress, ValAddress } from '../../strings';
import { MsgExchangeRatePrevote } from './MsgExchangeRatePrevote';
/**
 * Calculates the vote hash
 * @param exchangeRate exchange rate
 * @param denom denomination
 * @param salt salt
 * @param validator validator operator address
 */
export declare function voteHash(exchangeRate: string, denom: Denom, salt: string, validator: ValAddress): string;
/**
 * Every validator in the validating set (top 100 in total bonded Luna) is required to
 * submit a vote for the current exchange rate of LUNA for every active denomination
 * once per vote period.
 *
 * Votes are registered through submitting a [[MsgExchangeRateVote]] message, which must
 * correspond to a [[MsgExchangeRatePrevote]] submitted in the previous vote period.
 */
export declare class MsgExchangeRateVote extends JSONSerializable<MsgExchangeRateVote.Data> {
    denom: Denom;
    salt: string;
    feeder: AccAddress;
    validator: ValAddress;
    exchange_rate: Dec;
    /**
     * @param exchange_rate exchange rate
     * @param denom denomination
     * @param salt salt
     * @param feeder feeder address
     * @param validator validator operator address
     */
    constructor(exchange_rate: Numeric.Input, denom: Denom, salt: string, feeder: AccAddress, validator: ValAddress);
    static fromData(data: MsgExchangeRateVote.Data): MsgExchangeRateVote;
    toData(): MsgExchangeRateVote.Data;
    /**
     * Gets the vote hash for the MsgExchangeRateVote, for the creation of the corresponding
     * prevote message.
     */
    getVoteHash(): string;
    /**
     * You can generate the corresponding prevote message through the prevote property.
     * This will return a [[MsgExchangeRatePrevote]] with the proper vote hash and values,
     * determined by the current attributes of the object.
     *
     * @returns the corresponding prevote message to send
     */
    getPrevote(): MsgExchangeRatePrevote;
}
export declare namespace MsgExchangeRateVote {
    interface Data {
        type: 'oracle/MsgExchangeRateVote';
        value: {
            exchange_rate: string;
            denom: Denom;
            salt: string;
            feeder: AccAddress;
            validator: ValAddress;
        };
    }
}
