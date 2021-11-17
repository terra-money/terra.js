import { MsgSetWithdrawAddress } from './MsgSetWithdrawAddress';
import { MsgWithdrawDelegatorReward } from './MsgWithdrawDelegatorReward';
import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';
import { MsgFundCommunityPool } from './MsgFundCommunityPool';

export * from './MsgSetWithdrawAddress';
export * from './MsgWithdrawDelegatorReward';
export * from './MsgWithdrawValidatorCommission';
export * from './MsgFundCommunityPool';

export type DistributionMsg =
  | MsgSetWithdrawAddress
  | MsgWithdrawDelegatorReward
  | MsgWithdrawValidatorCommission
  | MsgFundCommunityPool;

export namespace DistributionMsg {
  export type Amino =
    | MsgSetWithdrawAddress.Amino
    | MsgWithdrawDelegatorReward.Amino
    | MsgWithdrawValidatorCommission.Amino
    | MsgFundCommunityPool.Amino;

  export type Data =
    | MsgSetWithdrawAddress.Data
    | MsgWithdrawDelegatorReward.Data
    | MsgWithdrawValidatorCommission.Data
    | MsgFundCommunityPool.Data;

  export type Proto =
    | MsgSetWithdrawAddress.Proto
    | MsgWithdrawDelegatorReward.Proto
    | MsgWithdrawValidatorCommission.Proto
    | MsgFundCommunityPool.Proto;
}
