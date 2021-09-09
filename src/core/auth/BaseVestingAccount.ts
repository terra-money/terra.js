import { Coins } from '../Coins';
import { BaseAccount } from './BaseAccount';
import { AccAddress } from '../bech32';
import { PublicKey } from '../PublicKey';
import { BaseAccount as BaseAccount_pb } from '@terra-money/terra.proto/src/cosmos/auth/v1beta1/auth_pb';
import { BaseVestingAccount as BaseVestingAccount_pb } from '@terra-money/terra.proto/src/cosmos/vesting/v1beta1/vesting_pb';

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
    public coins: Coins,
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
      coins,
      sequence,
      original_vesting,
      delegated_free,
      delegated_vesting,
      end_time,
    } = this;
    const baseVestingAccountProto = new BaseVestingAccount_pb();
    const baseAccount = new BaseAccount(
      address,
      coins,
      public_key,
      account_number,
      sequence
    );
    baseVestingAccountProto.setBaseAccount(baseAccount.toProto());
    baseVestingAccountProto.setOriginalVestingList(original_vesting.toProto());
    baseVestingAccountProto.setDelegatedFreeList(delegated_free.toProto());
    baseVestingAccountProto.setDelegatedVestingList(
      delegated_vesting.toProto()
    );
    baseVestingAccountProto.setEndTime(end_time);

    return baseVestingAccountProto;
  }

  public static fromProto(
    baseVestingAccountProto: BaseVestingAccount.Proto
  ): BaseVestingAccount {
    const baseAccount = BaseAccount.fromProto(
      baseVestingAccountProto.getBaseAccount() as BaseAccount_pb
    );

    return new BaseVestingAccount(
      baseAccount.address,
      baseAccount.coins,
      baseAccount.public_key,
      baseAccount.account_number,
      baseAccount.sequence,
      Coins.fromProto(baseVestingAccountProto.getOriginalVestingList()),
      Coins.fromProto(baseVestingAccountProto.getDelegatedFreeList()),
      Coins.fromProto(baseVestingAccountProto.getDelegatedVestingList()),
      baseVestingAccountProto.getEndTime()
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
