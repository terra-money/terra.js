import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../strings';
/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
export declare class AggregateExchangeRatePrevote extends JSONSerializable<AggregateExchangeRatePrevote.Data> {
    hash: string;
    voter: ValAddress;
    submit_block: number;
    /**
     * @param hash aggregate vote hash
     * @param voter validator
     * @param submit_block block during which aggregate prevote was submitted
     */
    constructor(hash: string, voter: ValAddress, submit_block: number);
    static fromData(data: AggregateExchangeRatePrevote.Data): AggregateExchangeRatePrevote;
    toData(): AggregateExchangeRatePrevote.Data;
}
export declare namespace AggregateExchangeRatePrevote {
    interface Data {
        hash: string;
        voter: ValAddress;
        submit_block: string;
    }
}
