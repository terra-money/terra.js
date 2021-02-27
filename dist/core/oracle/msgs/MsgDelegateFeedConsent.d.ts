import { JSONSerializable } from '../../../util/json';
import { AccAddress, ValAddress } from '../../strings';
/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
export declare class MsgDelegateFeedConsent extends JSONSerializable<MsgDelegateFeedConsent.Data> {
    operator: ValAddress;
    delegate: AccAddress;
    /**
     * @param operator validator's operator address
     * @param delegate account address to set to feeder
     */
    constructor(operator: ValAddress, delegate: AccAddress);
    static fromData(data: MsgDelegateFeedConsent.Data): MsgDelegateFeedConsent;
    toData(): MsgDelegateFeedConsent.Data;
}
export declare namespace MsgDelegateFeedConsent {
    interface Data {
        type: 'oracle/MsgDelegateFeedConsent';
        value: {
            operator: ValAddress;
            delegate: AccAddress;
        };
    }
}
