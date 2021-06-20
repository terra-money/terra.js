import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';

export * from './Account';
export * from './LazyGradedVestingAccount';

export function isVesting(
  acc: Account | LazyGradedVestingAccount
): acc is LazyGradedVestingAccount {
  return acc instanceof LazyGradedVestingAccount;
}
