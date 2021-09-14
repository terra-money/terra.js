import { Any } from '@terra-money/terra.proto/google/protobuf/any';
import { BaseAccount } from './BaseAccount';
import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';

export type Account = BaseAccount | LazyGradedVestingAccount;
/**
 * Stores information about an account fetched from the blockchain.
 */
export namespace Account {
  export type Amino = BaseAccount.Amino | LazyGradedVestingAccount.Amino;
  export type Data = BaseAccount.Data | LazyGradedVestingAccount.Data;
  export type Proto = Any;

  export function fromAmino(amino: Account.Amino): Account {
    switch (amino.type) {
      case 'core/Account':
        return BaseAccount.fromAmino(amino);
      case 'core/LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromAmino(amino);
    }
  }

  export function fromData(data: Account.Data): Account {
    switch (data['@type']) {
      case '/cosmos.auth.v1beta1.BaseAccount':
        return BaseAccount.fromData(data);
      case '/terra.vesting.v1beta1.LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromData(data);
    }
  }

  export function fromProto(accountAny: Account.Proto): Account {
    const typeUrl = accountAny.typeUrl;
    if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
      return BaseAccount.unpackAny(accountAny);
    } else if (typeUrl === '/terra.vesting.v1beta1.LazyGradedVestingAccount') {
      return LazyGradedVestingAccount.unpackAny(accountAny);
    }

    throw new Error(`Account type ${typeUrl} not recognized`);
  }
}
