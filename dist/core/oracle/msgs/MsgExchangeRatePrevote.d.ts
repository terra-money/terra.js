import { Denom } from '../..';
import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../..';
/**
 * In order to prevent validators from copying each others' price votes, voting occurs
 * in 2 stages. Firstly, you must pre-commit to a price by submitting a
 * MsgExchangeRatePrevote containing a hash, and then reveal your price in the
 * subsequent vote period.
 *
 * The vote hash reported in the prevote must match the hash of the vote's data in order
 * for the vote to count. Otherwise, it is automatically a miss.
 */
export declare class MsgExchangeRatePrevote extends JSONSerializable<MsgExchangeRatePrevote.Data> {
    hash: string;
    denom: Denom;
    feeder: AccAddress;
    validator: ValAddress;
    /**
     * @param hash vote hash
     * @param denom denom for reporting the exchange rate
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    constructor(hash: string, denom: Denom, feeder: AccAddress, validator: ValAddress);
    static fromData(data: MsgExchangeRatePrevote.Data): MsgExchangeRatePrevote;
    toData(): MsgExchangeRatePrevote.Data;
}
export declare namespace MsgExchangeRatePrevote {
    interface Data {
        type: 'oracle/MsgExchangeRatePrevote';
        value: {
            hash: string;
            denom: Denom;
            feeder: AccAddress;
            validator: ValAddress;
        };
    }
}
