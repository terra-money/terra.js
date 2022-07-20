import { MsgCreatePeriodicVestingAccount } from './MsgCreatePeriodicVestingAccount';
import { MsgCreateVestingAccount } from './MsgCreateVestingAccount';
import { MsgDonateAllVestingTokens } from './MsgDonateAllVestingTokens';

export * from './MsgCreatePeriodicVestingAccount';
export * from './MsgCreateVestingAccount';
export * from './MsgDonateAllVestingTokens';

export type VestingMsg =
  | MsgCreatePeriodicVestingAccount
  | MsgCreateVestingAccount
  | MsgDonateAllVestingTokens;

export namespace VestingMsg {
  export type Amino =
    | MsgCreatePeriodicVestingAccount.Amino
    | MsgCreateVestingAccount.Amino
    | MsgDonateAllVestingTokens.Amino;
  export type Data =
    | MsgCreatePeriodicVestingAccount.Data
    | MsgCreateVestingAccount.Data
    | MsgDonateAllVestingTokens.Data;
  export type Proto =
    | MsgCreatePeriodicVestingAccount.Proto
    | MsgCreateVestingAccount.Proto
    | MsgDonateAllVestingTokens.Proto;
}
