import { Denom } from '../Denom';
import { Coins } from '../Coins';
import { JSONSerializable } from '../../util/json';
import { Account } from './Account';
import { Dec } from '../numeric';
import { AccAddress } from '../bech32';
import { PublicKey } from '../PublicKey';

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
   * @param vesting_schedules Entries that make up vesting
   */
  constructor(
    public address: AccAddress,
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number,
    public original_vesting: Coins,
    public delegated_free: Coins,
    public delegated_vesting: Coins,
    public vesting_schedules: LazyGradedVestingAccount.VestingSchedule[]
  ) {
    super();
  }

  public toData(): LazyGradedVestingAccount.Data {
    const {
      address,
      public_key,
      account_number,
      sequence,
      original_vesting,
      delegated_free,
      delegated_vesting,
      vesting_schedules,
    } = this;
    return {
      type: 'core/LazyGradedVestingAccount',
      value: {
        base_vesting_account: {
          base_account: {
            address,
            public_key: public_key && public_key.toData(),
            account_number: account_number.toFixed(),
            sequence: sequence.toFixed(),
          },
          original_vesting: original_vesting.toData(),
          delegated_free: delegated_free.toData(),
          delegated_vesting: delegated_vesting.toData(),
        },

        vesting_schedules: vesting_schedules.map(vs => vs.toData()),
      },
    };
  }

  public static fromData(
    data: LazyGradedVestingAccount.Data
  ): LazyGradedVestingAccount {
    const {
      value: {
        base_vesting_account: {
          base_account: { address, public_key, account_number, sequence },
          original_vesting,
          delegated_free,
          delegated_vesting,
        },
        vesting_schedules,
      },
    } = data;
    return new LazyGradedVestingAccount(
      address || '',
      public_key ? PublicKey.fromData(public_key) : null,
      Number.parseInt(account_number) || 0,
      Number.parseInt(sequence) || 0,
      Coins.fromData(original_vesting),
      Coins.fromData(delegated_free),
      Coins.fromData(delegated_vesting),
      vesting_schedules.map(vs =>
        LazyGradedVestingAccount.VestingSchedule.fromData(vs)
      )
    );
  }
}

export namespace LazyGradedVestingAccount {
  export interface Data {
    type: 'core/LazyGradedVestingAccount';
    value: {
      base_vesting_account: {
        base_account: Account.Value;
        original_vesting: Coins.Data;
        delegated_free: Coins.Data;
        delegated_vesting: Coins.Data;
      };
      vesting_schedules: VestingSchedule.Data[];
    };
  }

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
  }

  export namespace VestingSchedule {
    export interface Data {
      denom: Denom;
      schedules: VestingSchedule.Entry.Data[];
    }

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
    }

    export namespace Entry {
      export interface Data {
        start_time: string;
        end_time: string;
        ratio: string;
      }
    }
  }
}
