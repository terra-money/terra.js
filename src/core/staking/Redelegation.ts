import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';

/**
 * A redelegation is when a delegator decides to stop staking with one validator and
 * transfer their delegation to another validator. Rather than unbonding (which takes
 * some time) and re-staking, the funds can be redelegated immediately if a
 * [[Redelegation.Entry]] can be created.
 *
 * A redelegation, like an unbonding delegation, is implemented through
 * [[Redelegation.Entry]] objects, limited by the `max_entry` parameter in the staking
 * module params. For each pair of source and target validators, you cannot redelegate
 * more times than the amount of entries. Entries are cleared when the redelegation is
 * completed, the same amount of time as unbonding.
 */
export class Redelegation extends JSONSerializable<Redelegation.Data> {
  /**
   *
   * @param delegator_address delegator's account address
   * @param validator_src_address source validator's operator address (from)
   * @param validator_dst_address target validator's operator address (to)
   * @param entries entries
   */
  constructor(
    public delegator_address: AccAddress,
    public validator_src_address: ValAddress,
    public validator_dst_address: ValAddress,
    public entries: Redelegation.Entry[]
  ) {
    super();
  }

  public static fromData(data: Redelegation.Data): Redelegation {
    const {
      redelegation: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
      },
      entries,
    } = data;
    return new Redelegation(
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries.map(e => Redelegation.Entry.fromData(e))
    );
  }

  public toData(): Redelegation.Data {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries,
    } = this;
    return {
      redelegation: {
        delegator_address,
        validator_src_address,
        validator_dst_address,
      },
      entries: entries.map(e => e.toData()),
    };
  }
}

export namespace Redelegation {
  export interface Data {
    redelegation: {
      delegator_address: AccAddress;
      validator_src_address: ValAddress;
      validator_dst_address: ValAddress;
    };
    entries: Redelegation.Entry.Data[];
  }

  export class Entry extends JSONSerializable<Entry.Data> {
    /**
     *
     * @param initial_balance balance of delegation prior to initiating redelegation
     * @param balance 	balance of delegation after initiating redelegation
     * @param shares_dst
     * @param creation_height 	height of blockchain when entry was created
     * @param completion_time time when redelegation entry will be removed
     */
    constructor(
      public initial_balance: Int,
      public balance: Int,
      public shares_dst: Dec,
      public creation_height: number,
      public completion_time: Date
    ) {
      super();
    }

    public toData(): Entry.Data {
      return {
        redelegation_entry: {
          initial_balance: this.initial_balance.toString(),
          shares_dst: this.shares_dst.toString(),
          creation_height: this.creation_height,
          completion_time: this.completion_time.toISOString(),
        },
        balance: this.balance.toString(),
      };
    }

    public static fromData(data: Entry.Data): Entry {
      const {
        redelegation_entry: {
          initial_balance,
          shares_dst,
          creation_height,
          completion_time,
        },
        balance,
      } = data;
      return new Entry(
        new Int(initial_balance),
        new Int(balance),
        new Dec(shares_dst),
        creation_height,
        new Date(completion_time)
      );
    }
  }

  export namespace Entry {
    export interface Data {
      redelegation_entry: {
        creation_height: number;
        completion_time: string;
        initial_balance: string;
        shares_dst: string;
      };
      balance: string;
    }
  }
}
