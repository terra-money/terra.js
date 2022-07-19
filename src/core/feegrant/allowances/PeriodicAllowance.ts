import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { PeriodicAllowance as PeriodicAllowance_pb } from '@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant';
import * as Long from 'long';
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export class PeriodicAllowance extends JSONSerializable<
  PeriodicAllowance.Amino,
  PeriodicAllowance.Data,
  PeriodicAllowance.Proto
> {
  public period_spend_limit: Coins;
  public period_can_spend: Coins;

  /**
   * @param basic basic allowance given per period
   * @param period the time duration in which period_spend_limit coins can be spent before that allowance is reset
   * @param period_spend_limit the maximum number of coins that can be spent in the period
   * @param period_can_spend the number of coins left to be spent before the period_reset time
   * @param period_reset the time at which this period resets and a new one begins
   */
  constructor(
    public basic: BasicAllowance,
    public period: number,
    period_spend_limit: Coins.Input,
    period_can_spend: Coins.Input,
    public period_reset: Date
  ) {
    super();

    this.period_spend_limit = new Coins(period_spend_limit);
    this.period_can_spend = new Coins(period_can_spend);
  }

  public static fromAmino(
    data: PeriodicAllowance.Amino,
    isClassic?: boolean
  ): PeriodicAllowance {
    const {
      value: {
        basic,
        period,
        period_spend_limit,
        period_can_spend,
        period_reset,
      },
    } = data;

    return new PeriodicAllowance(
      BasicAllowance.fromAmino(basic, isClassic),
      Number.parseInt(period),
      Coins.fromAmino(period_spend_limit),
      Coins.fromAmino(period_can_spend),
      new Date(period_reset)
    );
  }

  public toAmino(isClassic?: boolean): PeriodicAllowance.Amino {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;
    return {
      type: isClassic
        ? 'feegrant/PeriodicAllowance'
        : 'cosmos-sdk/PeriodicAllowance',
      value: {
        basic: basic.toAmino(isClassic),
        period: period.toString(),
        period_spend_limit: period_spend_limit.toAmino(),
        period_can_spend: period_can_spend.toAmino(),
        period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
      },
    };
  }

  public static fromData(
    proto: PeriodicAllowance.Data,
    _?: boolean
  ): PeriodicAllowance {
    _;
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = proto;
    return new PeriodicAllowance(
      BasicAllowance.fromData(basic),
      Number.parseInt(period),
      Coins.fromData(period_spend_limit),
      Coins.fromData(period_can_spend),
      new Date(period_reset)
    );
  }

  public toData(_?: boolean): PeriodicAllowance.Data {
    _;
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;
    return {
      '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance',
      basic: basic.toData(),
      period: period.toString(),
      period_spend_limit: period_spend_limit.toData(),
      period_can_spend: period_can_spend.toData(),
      period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
    };
  }

  public static fromProto(
    proto: PeriodicAllowance.Proto,
    _?: boolean
  ): PeriodicAllowance {
    _;
    return new PeriodicAllowance(
      BasicAllowance.fromProto(proto.basic as BasicAllowance.Proto),
      proto.period?.seconds.toNumber() as number,
      Coins.fromProto(proto.periodSpendLimit),
      Coins.fromProto(proto.periodCanSpend),
      proto.periodReset as Date
    );
  }

  public toProto(_?: boolean): PeriodicAllowance.Proto {
    _;
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;

    return PeriodicAllowance_pb.fromPartial({
      basic,
      period: { seconds: Long.fromNumber(period) },
      periodCanSpend: period_can_spend.toProto(),
      periodReset: period_reset,
      periodSpendLimit: period_spend_limit.toProto(),
    });
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
      value: PeriodicAllowance_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(msgAny: Any, isClassic?: boolean): PeriodicAllowance {
    return PeriodicAllowance.fromProto(
      PeriodicAllowance_pb.decode(msgAny.value),
      isClassic
    );
  }
}

export namespace PeriodicAllowance {
  export interface Amino {
    type: 'feegrant/PeriodicAllowance' | 'cosmos-sdk/PeriodicAllowance';
    value: {
      basic: BasicAllowance.Amino;
      period: string;
      period_spend_limit: Coins.Amino;
      period_can_spend: Coins.Amino;
      period_reset: string;
    };
  }

  export interface Data {
    '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance';
    basic: BasicAllowance.Data;
    period: string;
    period_spend_limit: Coins.Data;
    period_can_spend: Coins.Data;
    period_reset: string;
  }

  export type Proto = PeriodicAllowance_pb;
}
