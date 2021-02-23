import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../..';
/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
export declare class MsgAggregateExchangeRatePrevote extends JSONSerializable<MsgAggregateExchangeRatePrevote.Data> {
    hash: string;
    feeder: AccAddress;
    validator: ValAddress;
    /**
     * @param hash vote hash
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    constructor(hash: string, feeder: AccAddress, validator: ValAddress);
    static fromData(data: MsgAggregateExchangeRatePrevote.Data): MsgAggregateExchangeRatePrevote;
    toData(): MsgAggregateExchangeRatePrevote.Data;
}
export declare namespace MsgAggregateExchangeRatePrevote {
    interface Data {
        type: 'oracle/MsgAggregateExchangeRatePrevote';
        value: {
            hash: string;
            feeder: AccAddress;
            validator: ValAddress;
        };
    }
}
