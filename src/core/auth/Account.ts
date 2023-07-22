import { Any } from '@terra-money/terra.proto/google/protobuf/any';
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

  export function fromAmino(amino: Account.Amino): Account {
    switch (amino.type) {
      case 'core/Account':
      case 'cosmos-sdk/BaseAccount':
        return BaseAccount.fromAmino(amino);
      case 'core/BaseVestingAccount':
      case 'cosmos-sdk/BaseVestingAccount':
        return BaseVestingAccount.fromAmino(amino);
      case 'core/LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromAmino(amino);
      case 'cosmos-sdk/ContinuousVestingAccount':
        return ContinuousVestingAccount.fromAmino(amino);
      case 'cosmos-sdk/DelayedVestingAccount':
        return DelayedVestingAccount.fromAmino(amino);
      case 'cosmos-sdk/PeriodicVestingAccount':
        return PeriodicVestingAccount.fromAmino(amino);
    }
  }

  export function fromData(data: Account.Data): Account {
    switch (data['@type']) {
      case '/cosmos.auth.v1beta1.BaseAccount':
        return BaseAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.BaseVestingAccount':
        return BaseVestingAccount.fromData(data);
      case '/terra.vesting.v1beta1.LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.ContinuousVestingAccount':
        return ContinuousVestingAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.DelayedVestingAccount':
        return DelayedVestingAccount.fromData(data);
      case '/cosmos.vesting.v1beta1.PeriodicVestingAccount':
        return PeriodicVestingAccount.fromData(data);
    }
  }

  export function fromProto(accountAny: Account.Proto): Account {
    const typeUrl = accountAny.typeUrl;
    if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
      return BaseAccount.unpackAny(accountAny);
    } else if (typeUrl === '/terra.vesting.v1beta1.LazyGradedVestingAccount') {
      return LazyGradedVestingAccount.unpackAny(accountAny);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.ContinuousVestingAccount') {
      return ContinuousVestingAccount.unpackAny(accountAny);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.DelayedVestingAccount') {
      return DelayedVestingAccount.unpackAny(accountAny);
    } else if (typeUrl === '/cosmos.vesting.v1beta1.PeriodicVestingAccount') {
      return PeriodicVestingAccount.unpackAny(accountAny);
    }

    throw new Error(`Account type ${typeUrl} not recognized`);
  }
}
