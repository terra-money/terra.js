import { Any } from '@terra-money/terra.proto/src/google/protobuf/any_pb';
import { BaseAccount } from './BaseAccount';
import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';

export type Account = BaseAccount | LazyGradedVestingAccount;
/**
 * Stores information about an account fetched from the blockchain.
 */
export namespace Account {
  export type Data = BaseAccount.Data | LazyGradedVestingAccount.Data;
  export type Proto = Any;

  export function fromData(data: Account.Data): Account {
    switch (data.type) {
      case 'core/Account':
        return BaseAccount.fromData(data);
      case 'core/LazyGradedVestingAccount':
        return LazyGradedVestingAccount.fromData(data);
    }
  }

  export function fromProto(accountAny: Account.Proto): Account {
    const typeUrl = accountAny.getTypeUrl();
    if (typeUrl === '/cosmos.auth.v1beta1.BaseAccount') {
      return BaseAccount.unpackAny(accountAny);
    } else if (typeUrl === '/terra.vesting.v1beta1.LazyGradedVestingAccount') {
      return LazyGradedVestingAccount.unpackAny(accountAny);
    }

    throw new Error(`Account type ${typeUrl} not recognized`);
  }
}
