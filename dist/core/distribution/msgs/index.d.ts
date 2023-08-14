import { MsgSetWithdrawAddress } from './MsgSetWithdrawAddress';
import { MsgWithdrawDelegatorReward } from './MsgWithdrawDelegatorReward';
import { MsgWithdrawValidatorCommission } from './MsgWithdrawValidatorCommission';
import { MsgFundCommunityPool } from './MsgFundCommunityPool';
export * from './MsgSetWithdrawAddress';
export * from './MsgWithdrawDelegatorReward';
export * from './MsgWithdrawValidatorCommission';
export * from './MsgFundCommunityPool';
export declare type DistributionMsg = MsgSetWithdrawAddress | MsgWithdrawDelegatorReward | MsgWithdrawValidatorCommission | MsgFundCommunityPool;
export declare namespace DistributionMsg {
    type Amino = MsgSetWithdrawAddress.Amino | MsgWithdrawDelegatorReward.Amino | MsgWithdrawValidatorCommission.Amino | MsgFundCommunityPool.Amino;
    type Data = MsgSetWithdrawAddress.Data | MsgWithdrawDelegatorReward.Data | MsgWithdrawValidatorCommission.Data | MsgFundCommunityPool.Data;
    type Proto = MsgSetWithdrawAddress.Proto | MsgWithdrawDelegatorReward.Proto | MsgWithdrawValidatorCommission.Proto | MsgFundCommunityPool.Proto;
}
