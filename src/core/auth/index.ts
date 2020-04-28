import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';

export * from './Account';
export * from './LazyGradedVestingAccount';

export function isVesting(
  account: Account | LazyGradedVestingAccount
): account is LazyGradedVestingAccount {
  return account instanceof LazyGradedVestingAccount;
}
