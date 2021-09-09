import { JSONSerializable } from '../../../util/json';
import { Coins } from '../../Coins';
import { BasicAllowance } from './BasicAllowance';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { PeriodicAllowance as PeriodicAllowance_pb } from '@terra-money/terra.proto/src/cosmos/feegrant/v1beta1/feegrant_pb';
import { Duration } from 'google-protobuf/google/protobuf/duration_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export class PeriodicAllowance extends JSONSerializable<PeriodicAllowance.Data> {
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

  public static fromData(data: PeriodicAllowance.Data): PeriodicAllowance {
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
      BasicAllowance.fromData(basic),
      Number.parseInt(period),
      Coins.fromData(period_spend_limit),
      Coins.fromData(period_can_spend),
      new Date(period_reset)
    );
  }

  public toData(): PeriodicAllowance.Data {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;
    return {
      type: 'feegrant/PeriodicAllowance',
      value: {
        basic: basic.toData(),
        period: period.toString(),
        period_spend_limit: period_spend_limit.toData(),
        period_can_spend: period_can_spend.toData(),
        period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
      },
    };
  }

  public static fromProto(proto: PeriodicAllowance.Proto): PeriodicAllowance {
    return new PeriodicAllowance(
      BasicAllowance.fromProto(proto.getBasic() as BasicAllowance.Proto),
      proto.getPeriod()?.getSeconds() as number,
      Coins.fromProto(proto.getPeriodSpendLimitList()),
      Coins.fromProto(proto.getPeriodCanSpendList()),
      proto.getPeriodReset()?.toDate() as Date
    );
  }

  public toProto(): PeriodicAllowance.Proto {
    const {
      basic,
      period,
      period_spend_limit,
      period_can_spend,
      period_reset,
    } = this;
    const proto = new PeriodicAllowance_pb();
    proto.setBasic(basic.toProto()),
      proto.setPeriod(new Duration().setSeconds(period));
    proto.setPeriodSpendLimitList(period_spend_limit.toProto());
    proto.setPeriodCanSpendList(period_can_spend.toProto());
    proto.setPeriodReset(Timestamp.fromDate(period_reset));

    return proto;
  }

  public packAny(): Any {
    const msgAny = new Any();
    msgAny.setTypeUrl('/cosmos.feegrant.v1beta1.PeriodicAllowance');
    msgAny.setValue(this.toProto().serializeBinary());
    return msgAny;
  }

  public static unpackAny(msgAny: Any): PeriodicAllowance {
    return PeriodicAllowance.fromProto(
      PeriodicAllowance_pb.deserializeBinary(msgAny.getValue_asU8())
    );
  }
}

export namespace PeriodicAllowance {
  export interface Data {
    type: 'feegrant/PeriodicAllowance';
    value: {
      basic: BasicAllowance.Data;
      period: string;
      period_spend_limit: Coins.Data;
      period_can_spend: Coins.Data;
      period_reset: string;
    };
  }

  export type Proto = PeriodicAllowance_pb;
}
