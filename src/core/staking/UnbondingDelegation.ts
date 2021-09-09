import { JSONSerializable } from '../../util/json';
import { Int } from '../numeric';
import { AccAddress, ValAddress } from '../bech32';
import {
  UnbondingDelegation as UnbondingDelegation_pb,
  UnbondingDelegationEntry as UnbondingDelegationEntry_pb,
} from '@terra-money/terra.proto/src/cosmos/staking/v1beta1/staking_pb';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';

/**
 * When a delegator decides to take out their funds from the staking pool, they must
 * unbond their tokens which takes an amount of time specified by `unbonding_time`
 * parameter in the staking module.
 *
 * An unbonding delegation is implemented through creating [[UnbondingDelegation.Entry]]
 * objects, limited by the max_entry parameter in the staking module params. You cannot
 * initiate unbonds more times than the amount of entries permitted. Entries are cleared
 * when their unbonding periods are completed and the funds are returned to the
 * delegator's account balance to be spent freely.
 */
export class UnbondingDelegation extends JSONSerializable<UnbondingDelegation.Data> {
  constructor(
    public delegator_address: AccAddress,
    public validator_address: ValAddress,
    public entries: UnbondingDelegation.Entry[]
  ) {
    super();
  }

  public static fromData(data: UnbondingDelegation.Data): UnbondingDelegation {
    const { delegator_address, validator_address, entries } = data;
    return new UnbondingDelegation(
      delegator_address,
      validator_address,
      entries.map(e => UnbondingDelegation.Entry.fromData(e))
    );
  }

  public toProto(): UnbondingDelegation.Proto {
    const { delegator_address, validator_address, entries } = this;
    const unbondingDelegationProto = new UnbondingDelegation_pb();
    unbondingDelegationProto.setDelegatorAddress(delegator_address);
    unbondingDelegationProto.setValidatorAddress(validator_address);
    unbondingDelegationProto.setEntriesList(entries.map(e => e.toProto()));
    return unbondingDelegationProto;
  }

  public static fromProto(
    proto: UnbondingDelegation.Proto
  ): UnbondingDelegation {
    return new UnbondingDelegation(
      proto.getDelegatorAddress(),
      proto.getValidatorAddress(),
      proto.getEntriesList().map(e => UnbondingDelegation.Entry.fromProto(e))
    );
  }

  public toData(): UnbondingDelegation.Data {
    const { delegator_address, validator_address, entries } = this;
    return {
      delegator_address,
      validator_address,
      entries: entries.map(e => e.toData()),
    };
  }
}

export namespace UnbondingDelegation {
  export interface Data {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    entries: UnbondingDelegation.Entry.Data[];
  }

  export type Proto = UnbondingDelegation_pb;

  export class Entry extends JSONSerializable<Entry.Data> {
    /**
     * Note that the size of the undelegation is `initial_balance - balance`
     * @param initial_balance balance of delegation prior to initiating unbond
     * @param balance balance of delegation after initiating unbond
     * @param creation_height height of blockchain when entry was created
     * @param completion_time time when unbonding will be completed
     */
    constructor(
      public initial_balance: Int,
      public balance: Int,
      public creation_height: number,
      public completion_time: Date
    ) {
      super();
    }

    public toData(): Entry.Data {
      return {
        initial_balance: this.initial_balance.toString(),
        balance: this.balance.toString(),
        creation_height: this.creation_height.toFixed(),
        completion_time: this.completion_time.toISOString(),
      };
    }

    public static fromData(data: Entry.Data): Entry {
      const { initial_balance, balance, creation_height, completion_time } =
        data;
      return new Entry(
        new Int(initial_balance),
        new Int(balance),
        Number.parseInt(creation_height),
        new Date(completion_time)
      );
    }

    public toProto(): Entry.Proto {
      const { initial_balance, balance, creation_height, completion_time } =
        this;
      const entryProto = new UnbondingDelegationEntry_pb();
      entryProto.setInitialBalance(initial_balance.toString());
      entryProto.setBalance(balance.toString());
      entryProto.setCreationHeight(creation_height);
      entryProto.setCompletionTime(Timestamp.fromDate(completion_time));
      return entryProto;
    }

    public static fromProto(proto: Entry.Proto): Entry {
      return new Entry(
        new Int(proto.getInitialBalance()),
        new Int(proto.getBalance()),
        proto.getCreationHeight(),
        proto.getCompletionTime()?.toDate() as Date
      );
    }
  }

  export namespace Entry {
    export interface Data {
      initial_balance: string;
      balance: string;
      creation_height: string;
      completion_time: string;
    }

    export type Proto = UnbondingDelegationEntry_pb;
  }
}
