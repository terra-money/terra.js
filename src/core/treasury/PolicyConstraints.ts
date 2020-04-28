import { JSONSerializable } from '../../util/json';
import { Coin } from '../Coin';
import { Dec, Numeric } from '../numeric';

/**
 * This captures the Treasury module's `tax_policy` and `reward_policy` parameters, which
 * determine how the Tax Rate and Reward Weight values are allowed to change.
 */
export class PolicyConstraints extends JSONSerializable<
  PolicyConstraints.Data
> {
  /**
   * Minimum value for rate.
   */
  public rate_min: Dec;

  /**
   * Maximum value for rate.
   */
  public rate_max: Dec;

  /**
   * Ratio of current value that rate is allowed to change in one update.
   */
  public change_max: Dec;

  /**
   *
   * @param rate_min minimum value
   * @param rate_max maximum value
   * @param cap Tax Cap (only applicable for Tax Rate)
   * @param change_max max change %
   */
  constructor(
    rate_min: Numeric.Input,
    rate_max: Numeric.Input,
    public cap: Coin,
    change_max: Numeric.Input
  ) {
    super();
    this.rate_min = new Dec(rate_min);
    this.rate_max = new Dec(rate_max);
    this.change_max = new Dec(change_max);
  }

  public static fromData(data: PolicyConstraints.Data): PolicyConstraints {
    const { rate_min, rate_max, cap, change_max } = data;
    return new PolicyConstraints(
      rate_min,
      rate_max,
      Coin.fromData(cap),
      change_max
    );
  }

  public toData(): PolicyConstraints.Data {
    const { rate_min, rate_max, cap, change_max } = this;
    return {
      rate_min: rate_min.toString(),
      rate_max: rate_max.toString(),
      cap: cap.toData(),
      change_max: change_max.toString(),
    };
  }

  /**
   * You can simulate the result of the clamping algorithm, which subjects updates in
   * rate to the rules defined by the `PolicyConstraints`.
   *
   * @param prevRate previous rate
   * @param newRate next rate
   * @returns New rate, after clamping constraints have been applied
   */
  public clamp(prevRate: Numeric.Input, newRate: Numeric.Input): Dec {
    const p: Dec = new Dec(prevRate); // prev
    let n: Dec = new Dec(newRate); // new

    if (n.lt(this.rate_min)) {
      n = this.rate_min;
    } else if (n.gt(this.rate_max)) {
      n = this.rate_max;
    }

    const delta: Dec = n.sub(p);
    if (n.gt(p)) {
      if (delta.gt(this.change_max)) {
        n = p.add(this.change_max);
      }
    } else {
      if (delta.abs().gt(this.change_max)) {
        n = p.sub(this.change_max);
      }
    }
    return n;
  }
}

export namespace PolicyConstraints {
  export interface Data {
    rate_min: string;
    rate_max: string;
    cap: Coin.Data;
    change_max: string;
  }
}
