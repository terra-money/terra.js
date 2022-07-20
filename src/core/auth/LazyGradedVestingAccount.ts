import { Denom } from '../Denom';
import { JSONSerializable } from '../../util/json';
import { BaseVestingAccount } from './BaseVestingAccount';
import { Dec } from '../numeric';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/legacy.proto/cosmos/vesting/v1beta1/vesting';
import {
  LazyGradedVestingAccount as LazyGradedVestingAccount_pb,
  Schedule as Schedule_pb,
  VestingSchedule as VestingSchedule_pb,
} from '@terra-money/legacy.proto/terra/vesting/v1beta1/vesting';
import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import * as Long from 'long';
import { PublicKey } from '../PublicKey';

/**
 * Holds information about a Account which has vesting information.
 */
export class LazyGradedVestingAccount extends JSONSerializable<
  LazyGradedVestingAccount.Amino,
  LazyGradedVestingAccount.Data,
  LazyGradedVestingAccount.Proto
> {
  /**
   *
   * @param base_vesting_account account information
   * @param vesting_schedules Entries that make up vesting
   */
  constructor(
    public base_vesting_account: BaseVestingAccount,
    public vesting_schedules: LazyGradedVestingAccount.VestingSchedule[]
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

  public toAmino(_?: boolean): LazyGradedVestingAccount.Amino {
    _;
    const { base_vesting_account, vesting_schedules } = this;
    return {
      type: 'core/LazyGradedVestingAccount',
      value: {
        base_vesting_account: base_vesting_account.toAmino().value,
        vesting_schedules: vesting_schedules.map(vs => vs.toAmino()),
      },
    };
  }

  public static fromAmino(
    data: LazyGradedVestingAccount.Amino,
    _?: boolean
  ): LazyGradedVestingAccount {
    _;
    const base_vesting_account = BaseVestingAccount.fromAmino({
      type: 'core/BaseVestingAccount',
      value: data.value.base_vesting_account,
    });

    return new LazyGradedVestingAccount(
      base_vesting_account,
      data.value.vesting_schedules.map(vs =>
        LazyGradedVestingAccount.VestingSchedule.fromAmino(vs)
      )
    );
  }

  public toData(_?: boolean): LazyGradedVestingAccount.Data {
    _;
    const { base_vesting_account, vesting_schedules } = this;
    return {
      '@type': '/terra.vesting.v1beta1.LazyGradedVestingAccount',
      base_vesting_account: base_vesting_account.toData(),
      vesting_schedules: vesting_schedules.map(vs => vs.toData()),
    };
  }

  public static fromData(
    data: LazyGradedVestingAccount.Data,
    _?: boolean
  ): LazyGradedVestingAccount {
    _;
    const base_vesting_account = BaseVestingAccount.fromData({
      '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
      ...data.base_vesting_account,
    });

    return new LazyGradedVestingAccount(
      base_vesting_account,
      data.vesting_schedules.map(vs =>
        LazyGradedVestingAccount.VestingSchedule.fromData(vs)
      )
    );
  }

  public toProto(_?: boolean): LazyGradedVestingAccount.Proto {
    _;
    const { base_vesting_account, vesting_schedules } = this;

    return LazyGradedVestingAccount_pb.fromPartial({
      baseVestingAccount: base_vesting_account.toProto(),
      vestingSchedules: vesting_schedules.map(s => s.toProto()),
    });
  }

  public static fromProto(
    lazyGradedVestingAccountProto: LazyGradedVestingAccount.Proto,
    _?: boolean
  ): LazyGradedVestingAccount {
    _;
    const baseVestingAccount = BaseVestingAccount.fromProto(
      lazyGradedVestingAccountProto.baseVestingAccount as BaseVestingAccount_pb
    );

    return new LazyGradedVestingAccount(
      baseVestingAccount,
      lazyGradedVestingAccountProto.vestingSchedules.map(s =>
        this.VestingSchedule.fromProto(s)
      )
    );
  }

  public packAny(isClassic?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/terra.vesting.v1beta1.LazyGradedVestingAccount',
      value: LazyGradedVestingAccount_pb.encode(
        this.toProto(isClassic)
      ).finish(),
    });
  }

  public static unpackAny(
    pubkeyAny: Any,
    isClassic?: boolean
  ): LazyGradedVestingAccount {
    return LazyGradedVestingAccount.fromProto(
      LazyGradedVestingAccount_pb.decode(pubkeyAny.value),
      isClassic
    );
  }
}

export namespace LazyGradedVestingAccount {
  export interface Amino {
    type: 'core/LazyGradedVestingAccount';
    value: {
      base_vesting_account: BaseVestingAccount.AminoValue;
      vesting_schedules: VestingSchedule.Amino[];
    };
  }

  export interface Data {
    '@type': '/terra.vesting.v1beta1.LazyGradedVestingAccount';
    base_vesting_account: BaseVestingAccount.DataValue;
    vesting_schedules: VestingSchedule.Data[];
  }

  export type Proto = LazyGradedVestingAccount_pb;
  export class VestingSchedule extends JSONSerializable<
    VestingSchedule.Amino,
    VestingSchedule.Data,
    VestingSchedule.Proto
  > {
    constructor(
      public denom: Denom,
      public schedules: VestingSchedule.Entry[]
    ) {
      super();
    }
    public toAmino(): VestingSchedule.Amino {
      const { denom, schedules } = this;
      return {
        denom,
        schedules: schedules.map(s => s.toAmino()),
      };
    }

    public static fromAmino(data: VestingSchedule.Amino): VestingSchedule {
      const { denom, schedules } = data;
      return new VestingSchedule(
        denom,
        schedules.map(s => VestingSchedule.Entry.fromAmino(s))
      );
    }

    public toData(): VestingSchedule.Data {
      const { denom, schedules } = this;
      return {
        denom,
        schedules: schedules.map(s => s.toData()),
      };
    }

    public static fromData(data: VestingSchedule.Data): VestingSchedule {
      const { denom, schedules } = data;
      return new VestingSchedule(
        denom,
        schedules.map(s => VestingSchedule.Entry.fromData(s))
      );
    }

    public toProto(): VestingSchedule.Proto {
      const { denom, schedules } = this;
      return VestingSchedule_pb.fromPartial({
        denom,
        schedules: schedules.map(s => s.toProto()),
      });
    }

    public static fromProto(
      vestingScheduleProto: VestingSchedule.Proto
    ): VestingSchedule {
      return new VestingSchedule(
        vestingScheduleProto.denom,
        vestingScheduleProto.schedules.map(s =>
          VestingSchedule.Entry.fromProto(s)
        )
      );
    }
  }

  export namespace VestingSchedule {
    export interface Amino {
      denom: Denom;
      schedules: VestingSchedule.Entry.Amino[];
    }

    export interface Data {
      denom: Denom;
      schedules: VestingSchedule.Entry.Data[];
    }

    export type Proto = VestingSchedule_pb;

    export class Entry extends JSONSerializable<
      Entry.Amino,
      Entry.Data,
      Entry.Proto
    > {
      /**
       *
       * @param start_time Starting time (block height)
       * @param end_time Ending time (block height)
       * @param ratio Ratio (percentage of vested funds that should be released)
       */
      constructor(
        public start_time: number,
        public end_time: number,
        public ratio: Dec
      ) {
        super();
      }

      public static fromAmino(data: Entry.Amino): Entry {
        const { start_time, end_time, ratio } = data;
        return new Entry(
          Number.parseInt(start_time),
          Number.parseInt(end_time),
          new Dec(ratio)
        );
      }

      public toAmino(): Entry.Amino {
        return {
          start_time: this.start_time.toFixed(),
          end_time: this.end_time.toFixed(),
          ratio: this.ratio.toString(),
        };
      }

      public static fromData(data: Entry.Data): Entry {
        const { start_time, end_time, ratio } = data;
        return new Entry(
          Number.parseInt(start_time),
          Number.parseInt(end_time),
          new Dec(ratio)
        );
      }

      public toData(): Entry.Data {
        return {
          start_time: this.start_time.toFixed(),
          end_time: this.end_time.toFixed(),
          ratio: this.ratio.toString(),
        };
      }

      public static fromProto(entryProto: Entry.Proto): Entry {
        return new Entry(
          entryProto.endTime.toNumber(),
          entryProto.startTime.toNumber(),
          new Dec(entryProto.ratio)
        );
      }

      public toProto(): Entry.Proto {
        return Schedule_pb.fromPartial({
          endTime: Long.fromNumber(this.end_time),
          ratio: this.ratio.toString(),
          startTime: Long.fromNumber(this.start_time),
        });
      }
    }

    export namespace Entry {
      export interface Amino {
        start_time: string;
        end_time: string;
        ratio: string;
      }

      export interface Data {
        start_time: string;
        end_time: string;
        ratio: string;
      }

      export type Proto = Schedule_pb;
    }
  }
}
