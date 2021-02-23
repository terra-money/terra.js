import { JSONSerializable } from '../util/json';
import { Coins } from './Coins';
/**
 * A transaction must include a fee, otherwise it will be rejected.
 */
export declare class StdFee extends JSONSerializable<StdFee.Data> {
    readonly gas: number;
    /** Fee amount to be paid */
    readonly amount: Coins;
    /**
     * Creates a new StdFee object.
     * @param gas gas limit
     * @param amount amount to be paid to validator
     */
    constructor(gas: number, amount: Coins.Input);
    static fromData(data: StdFee.Data): StdFee;
    toData(): StdFee.Data;
    /**
     * Gets the mininimum gas prices implied by the fee. Minimum gas prices are `fee amount / gas`.
     */
    gasPrices(): Coins;
}
export declare namespace StdFee {
    interface Data {
        gas: string;
        amount: Coins.Data;
    }
}
