import { MsgModifyWithdrawAddress } from './MsgModifyWithdrawAddress';
import { MsgWithdrawDelegationReward } from './MsgWithdrawDelegationReward';
import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';

export * from './MsgModifyWithdrawAddress';
export * from './MsgWithdrawDelegationReward';
export * from './MsgWithdrawValidatorCommission';

export type DistributionMsg =
  | MsgModifyWithdrawAddress
  | MsgWithdrawDelegationReward
  | MsgWithdrawValidatorCommission;

export namespace DistributionMsg {
  export type Data =
    | MsgModifyWithdrawAddress.Data
    | MsgWithdrawDelegationReward.Data
    | MsgWithdrawValidatorCommission.Data;
}
