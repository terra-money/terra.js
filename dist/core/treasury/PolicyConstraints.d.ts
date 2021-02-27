import { JSONSerializable } from '../../util/json';
import { Coin } from '../Coin';
import { Dec, Numeric } from '../numeric';
/**
 * This captures the Treasury module's `tax_policy` and `reward_policy` parameters, which
 * determine how the Tax Rate and Reward Weight values are allowed to change.
 */
export declare class PolicyConstraints extends JSONSerializable<PolicyConstraints.Data> {
    cap: Coin;
    /**
     * Minimum value for rate.
     */
    rate_min: Dec;
    /**
     * Maximum value for rate.
     */
    rate_max: Dec;
    /**
     * Ratio of current value that rate is allowed to change in one update.
     */
    change_max: Dec;
    /**
     *
     * @param rate_min minimum value
     * @param rate_max maximum value
     * @param cap Tax Cap (only applicable for Tax Rate)
     * @param change_max max change %
     */
    constructor(rate_min: Numeric.Input, rate_max: Numeric.Input, cap: Coin, change_max: Numeric.Input);
    static fromData(data: PolicyConstraints.Data): PolicyConstraints;
    toData(): PolicyConstraints.Data;
    /**
     * You can simulate the result of the clamping algorithm, which subjects updates in
     * rate to the rules defined by the `PolicyConstraints`.
     *
     * @param prevRate previous rate
     * @param newRate next rate
     * @returns New rate, after clamping constraints have been applied
     */
    clamp(prevRate: Numeric.Input, newRate: Numeric.Input): Dec;
}
export declare namespace PolicyConstraints {
    interface Data {
        rate_min: string;
        rate_max: string;
        cap: Coin.Data;
        change_max: string;
    }
}
