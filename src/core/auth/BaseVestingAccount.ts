import { Coins } from '../Coins';
import { BaseAccount } from './BaseAccount';
import { AccAddress } from '../bech32';
import { PublicKey } from '../PublicKey';
import { BaseAccount as BaseAccount_pb } from '@terra-money/terra.proto/cosmos/auth/v1beta1/auth';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting';
import * as Long from 'long';

/**
 * Holds information about a Account which has vesting information.
 */
export class BaseVestingAccount {
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
    public public_key: PublicKey | null,
    public account_number: number,
    public sequence: number,
    public original_vesting: Coins,
    public delegated_free: Coins,
    public delegated_vesting: Coins,
    public end_time: number
  ) {}

  public toProto(): BaseVestingAccount.Proto {
    const {
      address,
      public_key,
      account_number,
      sequence,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
    } = this;

    const baseAccount = new BaseAccount(
      address,
      public_key,
      account_number,
      sequence
    );
    return BaseVestingAccount_pb.fromPartial({
      baseAccount: baseAccount.toProto(),
      delegatedFree: delegated_free.toProto(),
      delegatedVesting: delegated_vesting.toProto(),
      endTime: Long.fromNumber(end_time),
      originalVesting: original_vesting.toProto(),
    });
  }

  public static fromProto(
    baseVestingAccountProto: BaseVestingAccount.Proto
  ): BaseVestingAccount {
    const baseAccount = BaseAccount.fromProto(
      baseVestingAccountProto.baseAccount as BaseAccount_pb
    );

    return new BaseVestingAccount(
      baseAccount.address,
      baseAccount.public_key,
      baseAccount.account_number,
      baseAccount.sequence,
      Coins.fromProto(baseVestingAccountProto.originalVesting),
      Coins.fromProto(baseVestingAccountProto.delegatedFree),
      Coins.fromProto(baseVestingAccountProto.delegatedVesting),
      baseVestingAccountProto.endTime.toNumber()
    );
  }
}

export namespace BaseVestingAccount {
  export interface Value {
    original_vesting: Coins.Data;
    delegated_free: Coins.Data;
    delegated_vesting: Coins.Data;
    end_time: string;
  }

  export type Proto = BaseVestingAccount_pb;
}
