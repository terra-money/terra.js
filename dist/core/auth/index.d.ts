import { LazyGradedVestingAccount } from './LazyGradedVestingAccount';
export * from './Account';
export * from './LazyGradedVestingAccount';
export declare function isVesting(account: Account | LazyGradedVestingAccount): account is LazyGradedVestingAccount;
