import { JSONSerializable } from '../../util/json';
import { Dec, Int } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';
import {
  RedelegationResponse as RedelegationResponse_pb,
  Redelegation as Redelegation_pb,
  RedelegationEntry as RedelegationEntry_pb,
  RedelegationEntryResponse as RedelegationEntryResponse_pb,
} from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/staking_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

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

  public static fromProto(data: Redelegation.Proto): Redelegation {
    const redelegationProto = data.getRedelegation() as Redelegation_pb;
    return new Redelegation(
      redelegationProto.getDelegatorAddress(),
      redelegationProto.getValidatorDstAddress(),
      redelegationProto.getValidatorDstAddress(),
      data.getEntriesList().map(e => Redelegation.Entry.fromProto(e))
    );
  }

  public toProto(): Redelegation.Proto {
    const {
      delegator_address,
      validator_src_address,
      validator_dst_address,
      entries,
    } = this;
    const redelegationProto = new Redelegation_pb();
    redelegationProto.setDelegatorAddress(delegator_address);
    redelegationProto.setValidatorDstAddress(validator_dst_address);
    redelegationProto.setValidatorSrcAddress(validator_src_address);
    redelegationProto.setEntriesList(
      entries.map(
        e => e.toProto().getRedelegationEntry() as RedelegationEntry_pb
      )
    );

    const redelegationResponseProto = new RedelegationResponse_pb();
    redelegationResponseProto.setEntriesList(entries.map(e => e.toProto()));
    redelegationResponseProto.setRedelegation(redelegationProto);
    return redelegationResponseProto;
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

  export type Proto = RedelegationResponse_pb;

  export class Entry extends JSONSerializable<Entry.Data> {
    /**
     *
     * @param initial_balance balance of delegation prior to initiating redelegation
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

    public toProto(): Entry.Proto {
      const {
        initial_balance,
        balance,
        shares_dst,
        creation_height,
        completion_time,
      } = this;

      const redelegationEntryProto = new RedelegationEntry_pb();
      redelegationEntryProto.setCompletionTime(
        Timestamp.fromDate(completion_time)
      );
      redelegationEntryProto.setCreationHeight(creation_height);
      redelegationEntryProto.setSharesDst(shares_dst.toString());
      redelegationEntryProto.setInitialBalance(initial_balance.toString());

      const redelegationEntryResponseProto = new RedelegationEntryResponse_pb();
      redelegationEntryResponseProto.setBalance(balance.toString());
      redelegationEntryResponseProto.setRedelegationEntry(
        redelegationEntryProto
      );

      return redelegationEntryResponseProto;
    }

    public static fromProto(proto: Entry.Proto): Entry {
      const redelegationEntryProto =
        proto.getRedelegationEntry() as RedelegationEntry_pb;

      return new Entry(
        new Int(redelegationEntryProto.getInitialBalance()),
        new Int(proto.getBalance()),
        new Dec(redelegationEntryProto.getSharesDst()),
        redelegationEntryProto.getCreationHeight(),
        redelegationEntryProto.getCompletionTime()?.toDate() as Date
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

    export type Proto = RedelegationEntryResponse_pb;
  }
}
