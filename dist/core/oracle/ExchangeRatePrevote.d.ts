import { Denom } from '../Denom';
import { JSONSerializable } from '../../util/json';
import { ValAddress } from '../strings';
/**
 * Stores information about data about Oracle prevotes fetched from the blockchain.
 */
export declare class ExchangeRatePrevote extends JSONSerializable<ExchangeRatePrevote.Data> {
    hash: string;
    denom: Denom;
    voter: ValAddress;
    submit_block: number;
    /**
     *
     * @param hash vote hash.
     * @param denom denomination against LUNA reported
     * @param voter voting validator's operator address
     * @param submit_block height of block during which prevote was submitted
     */
    constructor(hash: string, denom: Denom, voter: ValAddress, submit_block: number);
    static fromData(data: ExchangeRatePrevote.Data): ExchangeRatePrevote;
    toData(): ExchangeRatePrevote.Data;
}
export declare namespace ExchangeRatePrevote {
    interface Data {
        hash: string;
        denom: Denom;
        voter: ValAddress;
        submit_block: string;
    }
}
