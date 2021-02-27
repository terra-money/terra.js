import { MsgModifyWithdrawAddress } from './MsgModifyWithdrawAddress';
import { MsgWithdrawDelegationReward } from './MsgWithdrawDelegationReward';
import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';
import { MsgFundCommunityPool } from './MsgFundCommunityPool';
export * from './MsgModifyWithdrawAddress';
export * from './MsgWithdrawDelegationReward';
export * from './MsgWithdrawValidatorCommission';
export * from './MsgFundCommunityPool';
export declare type DistributionMsg = MsgModifyWithdrawAddress | MsgWithdrawDelegationReward | MsgWithdrawValidatorCommission | MsgFundCommunityPool;
export declare namespace DistributionMsg {
    type Data = MsgModifyWithdrawAddress.Data | MsgWithdrawDelegationReward.Data | MsgWithdrawValidatorCommission.Data | MsgFundCommunityPool.Data;
}
