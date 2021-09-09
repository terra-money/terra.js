import { Denom } from '../Denom';
import { Coins } from '../Coins';
import { JSONSerializable } from '../../util/json';
import { BaseAccount } from './BaseAccount';
import { BaseVestingAccount } from './BaseVestingAccount';
import { Dec } from '../numeric';
import { AccAddress } from '../bech32';
import { PublicKey } from '../PublicKey';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/src/cosmos/vesting/v1beta1/vesting_pb';
import {
  LazyGradedVestingAccount as LazyGradedVestingAccount_pb,
  Schedule as Schedule_pb,
  VestingSchedule as VestingSchedule_pb,
} from '@terra-money/terra.proto/src/terra/vesting/v1beta1/vesting_pb';
import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';

/**
 * Holds information about a Account which has vesting information.
 */
export class LazyGradedVestingAccount extends JSONSerializable<LazyGradedVestingAccount.Data> {
  /**
   *
   * @param BaseAccount account information
   * @param original_vesting initial vesting amount
   * @param delegated_free
   * @param delegated_vesting
   * @param end_time  -not used-
   * @param vesting_schedules Entries that make up vesting
   */
  constructor(
    public address: AccAddress,
    public coins: Coins,
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number,
    public original_vesting: Coins,
    public delegated_free: Coins,
    public delegated_vesting: Coins,
    public end_time: number,
    public vesting_schedules: LazyGradedVestingAccount.VestingSchedule[]
  ) {
    super();
  }

  public toData(): LazyGradedVestingAccount.Data {
    const {
      address,
      coins,
      public_key,
      account_number,
      sequence,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
      vesting_schedules,
    } = this;
    return {
      type: 'core/LazyGradedVestingAccount',
      value: {
        address,
        coins: coins.toData(),
        public_key: public_key && public_key.toData(),
        account_number: account_number.toFixed(),
        sequence: sequence.toFixed(),
        original_vesting: original_vesting.toData(),
        delegated_free: delegated_free.toData(),
        delegated_vesting: delegated_vesting.toData(),
        end_time: end_time.toFixed(),
        vesting_schedules: vesting_schedules.map(vs => vs.toData()),
      },
    };
  }

  public static fromData(
    data: LazyGradedVestingAccount.Data
  ): LazyGradedVestingAccount {
    const {
      value: {
        address,
        coins,
        public_key,
        account_number,
        sequence,
        original_vesting,
        delegated_free,
        delegated_vesting,
        end_time,
        vesting_schedules,
      },
    } = data;
    return new LazyGradedVestingAccount(
      address || '',
      Coins.fromData(coins),
      public_key ? PublicKey.fromData(public_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0,
      Coins.fromData(original_vesting),
      Coins.fromData(delegated_free),
      Coins.fromData(delegated_vesting),
      Number.parseInt(end_time),
      vesting_schedules.map(vs =>
        LazyGradedVestingAccount.VestingSchedule.fromData(vs)
      )
    );
  }

  public toProto(): LazyGradedVestingAccount.Proto {
    const {
      address,
      public_key,
      account_number,
      coins,
      sequence,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
      vesting_schedules,
    } = this;
    const lazyGradedVestingAccountProto = new LazyGradedVestingAccount_pb();
    const baseVestingAccount = new BaseVestingAccount(
      address,
      coins,
      public_key,
      account_number,
      sequence,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time
    );

    lazyGradedVestingAccountProto.setBaseVestingAccount(
      baseVestingAccount.toProto()
    );
    lazyGradedVestingAccountProto.setVestingSchedulesList(
      vesting_schedules.map(s => s.toProto())
    );

    return lazyGradedVestingAccountProto;
  }

  public static fromProto(
    lazyGradedVestingAccountProto: LazyGradedVestingAccount.Proto
  ): LazyGradedVestingAccount {
    const baseVestingAccount = BaseVestingAccount.fromProto(
      lazyGradedVestingAccountProto.getBaseVestingAccount() as BaseVestingAccount_pb
    );

    return new LazyGradedVestingAccount(
      baseVestingAccount.address,
      baseVestingAccount.coins,
      baseVestingAccount.public_key,
      baseVestingAccount.account_number,
      baseVestingAccount.sequence,
      baseVestingAccount.original_vesting,
      baseVestingAccount.delegated_free,
      baseVestingAccount.delegated_vesting,
      baseVestingAccount.end_time,
      lazyGradedVestingAccountProto
        .getVestingSchedulesList()
        .map(s => this.VestingSchedule.fromProto(s))
    );
  }

  public packAny(): Any {
    const pubkeyAny = new Any();
    pubkeyAny.setTypeUrl('/terra.vesting.v1beta1.LazyGradedVestingAccount');
    pubkeyAny.setValue(this.toProto().serializeBinary());
    return pubkeyAny;
  }

  public static unpackAny(pubkeyAny: Any): LazyGradedVestingAccount {
    return LazyGradedVestingAccount.fromProto(
      LazyGradedVestingAccount_pb.deserializeBinary(pubkeyAny.getValue_asU8())
    );
  }
}

export namespace LazyGradedVestingAccount {
  export interface Data {
    type: 'core/LazyGradedVestingAccount';
    value: BaseAccount.Value &
      BaseVestingAccount.Value & {
        vesting_schedules: VestingSchedule.Data[];
      };
  }

  export type Proto = LazyGradedVestingAccount_pb;
  export class VestingSchedule extends JSONSerializable<VestingSchedule.Data> {
    constructor(
      public denom: Denom,
      public schedules: VestingSchedule.Entry[]
    ) {
      super();
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
      const vestingScheduleProto = new VestingSchedule_pb();
      vestingScheduleProto.setDenom(denom);
      vestingScheduleProto.setSchedulesList(schedules.map(s => s.toProto()));
      return vestingScheduleProto;
    }

    public static fromProto(
      vestingScheduleProto: VestingSchedule.Proto
    ): VestingSchedule {
      return new VestingSchedule(
        vestingScheduleProto.getDenom(),
        vestingScheduleProto
          .getSchedulesList()
          .map(s => VestingSchedule.Entry.fromProto(s))
      );
    }
  }

  export namespace VestingSchedule {
    export interface Data {
      denom: Denom;
      schedules: VestingSchedule.Entry.Data[];
    }

    export type Proto = VestingSchedule_pb;

    export class Entry extends JSONSerializable<Entry.Data> {
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
          entryProto.getEndTime(),
          entryProto.getStartTime(),
          new Dec(entryProto.getRatio())
        );
      }

      public toProto(): Entry.Proto {
        const entryProto = new Schedule_pb();
        entryProto.setEndTime(this.end_time);
        entryProto.setRatio(this.ratio.toString());
        entryProto.setStartTime(this.start_time);
        return entryProto;
      }
    }

    export namespace Entry {
      export interface Data {
        start_time: string;
        end_time: string;
        ratio: string;
      }

      export type Proto = Schedule_pb;
    }
  }
}
