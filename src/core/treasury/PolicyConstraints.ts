import { JSONSerializable } from '../../util/json';
import { Coin } from '../Coin';
import { Dec, Numeric } from '../numeric';
import { PolicyConstraints as PolicyConstraints_pb } from '@terra-money/legacy.proto/terra/treasury/v1beta1/treasury';

/**
 * This captures the Treasury module's `tax_policy` and `reward_policy` parameters, which
 * determine how the Tax Rate and Reward Weight values are allowed to change.
 */
export class PolicyConstraints extends JSONSerializable<
  PolicyConstraints.Amino,
  PolicyConstraints.Data,
  PolicyConstraints.Proto
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
  public change_rate_max: Dec;

  /**
   *
   * @param rate_min minimum value
   * @param rate_max maximum value
   * @param cap Tax Cap (only applicable for Tax Rate)
   * @param change_rate_max max change %
   */
  constructor(
    rate_min: Numeric.Input,
    rate_max: Numeric.Input,
    public cap: Coin,
    change_rate_max: Numeric.Input
  ) {
    super();
    this.rate_min = new Dec(rate_min);
    this.rate_max = new Dec(rate_max);
    this.change_rate_max = new Dec(change_rate_max);
  }

  public static fromAmino(data: PolicyConstraints.Amino): PolicyConstraints {
    const { rate_min, rate_max, cap, change_rate_max } = data;
    return new PolicyConstraints(
      rate_min,
      rate_max,
      Coin.fromAmino(cap),
      change_rate_max
    );
  }

  public toAmino(): PolicyConstraints.Amino {
    const { rate_min, rate_max, cap, change_rate_max } = this;
    return {
      rate_min: rate_min.toString(),
      rate_max: rate_max.toString(),
      cap: cap.toAmino(),
      change_rate_max: change_rate_max.toString(),
    };
  }

  public static fromData(data: PolicyConstraints.Data): PolicyConstraints {
    const { rate_min, rate_max, cap, change_rate_max } = data;
    return new PolicyConstraints(
      rate_min,
      rate_max,
      Coin.fromData(cap),
      change_rate_max
    );
  }

  public toData(): PolicyConstraints.Data {
    const { rate_min, rate_max, cap, change_rate_max } = this;
    return {
      rate_min: rate_min.toString(),
      rate_max: rate_max.toString(),
      cap: cap.toData(),
      change_rate_max: change_rate_max.toString(),
    };
  }

  public static fromProto(proto: PolicyConstraints.Proto): PolicyConstraints {
    return new PolicyConstraints(
      proto.rateMax,
      proto.rateMin,
      Coin.fromProto(proto.cap as Coin.Proto),
      proto.changeRateMax
    );
  }

  public toProto(): PolicyConstraints.Proto {
    const { rate_min, rate_max, cap, change_rate_max } = this;
    return PolicyConstraints_pb.fromPartial({
      cap: cap.toProto(),
      changeRateMax: change_rate_max.toString(),
      rateMax: rate_max.toString(),
      rateMin: rate_min.toString(),
    });
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
      if (delta.gt(this.change_rate_max)) {
        n = p.add(this.change_rate_max);
      }
    } else {
      if (delta.abs().gt(this.change_rate_max)) {
        n = p.sub(this.change_rate_max);
      }
    }
    return n;
  }
}

export namespace PolicyConstraints {
  export interface Amino {
    rate_min: string;
    rate_max: string;
    cap: Coin.Amino;
    change_rate_max: string;
  }

  export interface Data {
    rate_min: string;
    rate_max: string;
    cap: Coin.Data;
    change_rate_max: string;
  }

  export type Proto = PolicyConstraints_pb;
}
