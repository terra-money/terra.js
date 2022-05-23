import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
import { BaseAccount } from './BaseAccount';
import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
import { ContinuousVestingAccount } from './ContinuousVestingAccount';
import { DelayedVestingAccount } from './DelayedVestingAccount';
import { PeriodicVestingAccount } from './PeriodicVestingAccount';
import { BaseVestingAccount } from './BaseVestingAccount';

export type Account =
  | BaseAccount
  | BaseVestingAccount
  | LazyGradedVestingAccount
  | ContinuousVestingAccount
  | DelayedVestingAccount
  | PeriodicVestingAccount;
/**
 * Stores information about an account fetched from the blockchain.
 */
export namespace Account {
  export type Amino =
    | BaseAccount.Amino
    | BaseVestingAccount.Amino
    | LazyGradedVestingAccount.Amino
    | ContinuousVestingAccount.Amino
    | DelayedVestingAccount.Amino
    | PeriodicVestingAccount.Amino;
  export type Data =
    | BaseAccount.Data
    | BaseVestingAccount.Data
    | LazyGradedVestingAccount.Data
    | ContinuousVestingAccount.Data
    | DelayedVestingAccount.Data
    | PeriodicVestingAccount.Data;
  export type Proto = Any;

  export function fromAmino(amino: Account.Amino, legacy?: boolean): Account {
    switch (amino.type) {
      case 'core/Account':
      case 'cosmos-sdk/BaseAccount':
        return BaseAccount.fromAmino(amino, legacy);
      case 'core/BaseVestingAccount':
      case 'cosmos-sdk/BaseVestingAccount':
        return BaseVestingAccount.fromAmino(amino, legacy);
      case 'core/LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromAmino(amino, legacy);
      case 'cosmos-sdk/ContinuousVestingAccount':
        return ContinuousVestingAccount.fromAmino(amino, legacy);
      case 'cosmos-sdk/DelayedVestingAccount':
        return DelayedVestingAccount.fromAmino(amino, legacy);
      case 'cosmos-sdk/PeriodicVestingAccount':
        return PeriodicVestingAccount.fromAmino(amino, legacy);
    }
  }

  export function fromData(data: Account.Data, legacy?: boolean): Account {
    switch (data['@type']) {
      case '/cosmos.auth.v1beta1.BaseAccount':
        return BaseAccount.fromData(data, legacy);
      case '/cosmos.vesting.v1beta1.BaseVestingAccount':
        return BaseVestingAccount.fromData(data, legacy);
      case '/terra.vesting.v1beta1.LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromData(data, legacy);
      case '/cosmos.vesting.v1beta1.ContinuousVestingAccount':
        return ContinuousVestingAccount.fromData(data, legacy);
      case '/cosmos.vesting.v1beta1.DelayedVestingAccount':
        return DelayedVestingAccount.fromData(data, legacy);
      case '/cosmos.vesting.v1beta1.PeriodicVestingAccount':
        return PeriodicVestingAccount.fromData(data, legacy);
    }
  }

  export function fromProto(
    accountAny: Account.Proto,
    legacy?: boolean
  ): Account {
    const typeUrl = accountAny.typeUrl;
    if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
      return BaseAccount.unpackAny(accountAny, legacy);
    } else if (typeUrl === '/terra.vesting.v1beta1.LazyGradedVestingAccount') {
      return LazyGradedVestingAccount.unpackAny(accountAny, legacy);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.ContinuousVestingAccount') {
      return ContinuousVestingAccount.unpackAny(accountAny, legacy);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.DelayedVestingAccount') {
      return DelayedVestingAccount.unpackAny(accountAny, legacy);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.PeriodicVestingAccount') {
      return PeriodicVestingAccount.unpackAny(accountAny, legacy);
    }

    throw new Error(`Account type ${typeUrl} not recognized`);
  }
}
