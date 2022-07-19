import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { Coins } from '../Coins';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import {
  PeriodicVestingAccount as PeriodicVestingAccount_pb,
  Period as Period_pb,
} from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import * as Long from 'long';
import { PublicKey } from '../PublicKey';

/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export class PeriodicVestingAccount extends JSONSerializable<
  PeriodicVestingAccount.Amino,
  PeriodicVestingAccount.Data,
  PeriodicVestingAccount.Proto
> {
  /**
   *
   * @param base_vesting_account account information
   * @param start_time vesting start time
   * @param vesting_periods vesting period entries
   */
  constructor(
    public base_vesting_account: BaseVestingAccount,
    public start_time: number,
    public vesting_periods: PeriodicVestingAccount.Period[]
  ) {
    super();
  }

  public getAccountNumber(): number {
    return this.base_vesting_account.getAccountNumber();
  }

  public getSequenceNumber(): number {
    return this.base_vesting_account.getSequenceNumber();
  }

  public getPublicKey(): PublicKey | null {
    return this.base_vesting_account.base_account.public_key;
  }

  public toAmino(isClassic?: boolean): PeriodicVestingAccount.Amino {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, start_time, vesting_periods } = this;
    return {
      type: 'cosmos-sdk/PeriodicVestingAccount',
      value: {
        base_vesting_account: base_vesting_account.toAmino().value,
        start_time: start_time.toFixed(),
        vesting_periods: vesting_periods.map(vs => vs.toAmino()),
      },
    };
  }

  public static fromAmino(
    data: PeriodicVestingAccount.Amino,
    isClassic?: boolean
  ): PeriodicVestingAccount {
    const base_vesting_account = BaseVestingAccount.fromAmino({
      type: 'cosmos-sdk/BaseVestingAccount',
      value: data.value.base_vesting_account,
    });
    if (isClassic) {
      throw new Error('Not supported for the network');
    }

    return new PeriodicVestingAccount(
      base_vesting_account,
      Number.parseInt(data.value.start_time),
      data.value.vesting_periods.map(vs =>
        PeriodicVestingAccount.Period.fromAmino(vs)
      )
    );
  }

  public toData(isClassic?: boolean): PeriodicVestingAccount.Data {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, start_time, vesting_periods } = this;
    return {
      '@type': '/cosmos.vesting.v1beta1.PeriodicVestingAccount',
      base_vesting_account: base_vesting_account.toData(),
      start_time: start_time.toFixed(),
      vesting_periods: vesting_periods.map(vs => vs.toData()),
    };
  }

  public static fromData(
    data: PeriodicVestingAccount.Data,
    isClassic?: boolean
  ): PeriodicVestingAccount {
    const base_vesting_account = BaseVestingAccount.fromData({
      '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
      ...data.base_vesting_account,
    });
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return new PeriodicVestingAccount(
      base_vesting_account,
      Number.parseInt(data.start_time),
      data.vesting_periods.map(vs => PeriodicVestingAccount.Period.fromData(vs))
    );
  }

  public toProto(isClassic?: boolean): PeriodicVestingAccount.Proto {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const { base_vesting_account, vesting_periods } = this;

    return PeriodicVestingAccount_pb.fromPartial({
      baseVestingAccount: base_vesting_account.toProto(),
      vestingPeriods: vesting_periods.map(s => s.toProto()),
    });
  }

  public static fromProto(
    proto: PeriodicVestingAccount.Proto,
    isClassic?: boolean
  ): PeriodicVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    const baseVestingAccount = BaseVestingAccount.fromProto(
      proto.baseVestingAccount as BaseVestingAccount_pb
    );

    return new PeriodicVestingAccount(
      baseVestingAccount,
      proto.startTime.toNumber(),
      proto.vestingPeriods.map(s => this.Period.fromProto(s))
    );
  }

  public packAny(isClassic?: boolean): Any {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return Any.fromPartial({
      typeUrl: '/cosmos.vesting.v1beta1.PeriodicVestingAccount',
      value: PeriodicVestingAccount_pb.encode(this.toProto(isClassic)).finish(),
    });
  }

  public static unpackAny(
    pubkeyAny: Any,
    isClassic?: boolean
  ): PeriodicVestingAccount {
    if (isClassic) {
      throw new Error('Not supported for the network');
    }
    return PeriodicVestingAccount.fromProto(
      PeriodicVestingAccount_pb.decode(pubkeyAny.value),
      isClassic
    );
  }
}

export namespace PeriodicVestingAccount {
  export interface Amino {
    type: 'cosmos-sdk/PeriodicVestingAccount';
    value: {
      base_vesting_account: BaseVestingAccount.AminoValue;
      start_time: string;
      vesting_periods: Period.Amino[];
    };
  }

  export interface Data {
    '@type': '/cosmos.vesting.v1beta1.PeriodicVestingAccount';
    base_vesting_account: BaseVestingAccount.DataValue;
    start_time: string;
    vesting_periods: Period.Data[];
  }

  export type Proto = PeriodicVestingAccount_pb;

  export class Period extends JSONSerializable<
    Period.Amino,
    Period.Data,
    Period.Proto
  > {
    constructor(public length: number, public amount: Coins) {
      super();
    }
    public toAmino(): Period.Amino {
      const { length, amount } = this;
      return {
        length: length.toFixed(),
        amount: amount.toAmino(),
      };
    }

    public static fromAmino(data: Period.Amino): Period {
      const { length, amount } = data;
      return new Period(Number.parseInt(length), Coins.fromAmino(amount));
    }

    public toData(): Period.Data {
      const { length, amount } = this;
      return {
        length: length.toFixed(),
        amount: amount.toData(),
      };
    }

    public static fromData(data: Period.Data): Period {
      const { length, amount } = data;
      return new Period(Number.parseInt(length), Coins.fromData(amount));
    }

    public toProto(): Period.Proto {
      const { length, amount } = this;
      return Period_pb.fromPartial({
        length: Long.fromNumber(length),
        amount: amount.toProto(),
      });
    }

    public static fromProto(proto: Period.Proto): Period {
      return new Period(proto.length.toNumber(), Coins.fromProto(proto.amount));
    }
  }

  export namespace Period {
    export interface Amino {
      length: string;
      amount: Coins.Amino;
    }

    export interface Data {
      length: string;
      amount: Coins.Amino;
    }

    export type Proto = Period_pb;
  }
}
