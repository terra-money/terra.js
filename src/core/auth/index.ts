import { Account } from './Account';
import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';

export * from './Account';
export * from './BaseAccount';
export * from './LazyGradedVestingAccount';

export function isVesting(
  account: Account
): account is LazyGradedVestingAccount {
  return account instanceof LazyGradedVestingAccount;
}
