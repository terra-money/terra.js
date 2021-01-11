import { BankMsg, MsgMultiSend, MsgSend } from './bank/msgs';
import {
  DistributionMsg,
  MsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
} from './distribution/msgs';
import { GovMsg, MsgDeposit, MsgSubmitProposal, MsgVote } from './gov/msgs';
import { MarketMsg, MsgSwap, MsgSwapSend } from './market/msgs';
import {
  MsgGrantAuthorization,
  MsgRevokeAuthorization,
  MsgExecAuthorized,
  MsgAuthMsg,
} from './msgauth/msgs';
import {
  MsgDelegateFeedConsent,
  MsgExchangeRatePrevote,
  MsgExchangeRateVote,
  MsgAggregateExchangeRatePrevote,
  MsgAggregateExchangeRateVote,
  OracleMsg,
} from './oracle/msgs';
import { MsgUnjail, SlashingMsg } from './slashing/msgs';
import {
  MsgBeginRedelegate,
  MsgCreateValidator,
  MsgDelegate,
  MsgEditValidator,
  MsgUndelegate,
  StakingMsg,
} from './staking/msgs';
import {
  MsgStoreCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgUpdateContractOwner,
  WasmMsg,
} from './wasm/msgs';

export type Msg =
  | BankMsg
  | DistributionMsg
  | GovMsg
  | MarketMsg
  | MsgAuthMsg
  | OracleMsg
  | SlashingMsg
  | StakingMsg
  | WasmMsg;

export namespace Msg {
  export type Data =
    | BankMsg.Data
    | DistributionMsg.Data
    | GovMsg.Data
    | MarketMsg.Data
    | MsgAuthMsg.Data
    | OracleMsg.Data
    | SlashingMsg.Data
    | StakingMsg.Data
    | WasmMsg.Data;

  export function fromData(data: Msg.Data): Msg {
    switch (data.type) {
      // bank
      case 'bank/MsgSend':
        return MsgSend.fromData(data);
      case 'bank/MsgMultiSend':
        return MsgMultiSend.fromData(data);

      // distribution
      case 'distribution/MsgModifyWithdrawAddress':
        return MsgModifyWithdrawAddress.fromData(data);
      case 'distribution/MsgWithdrawDelegationReward':
        return MsgWithdrawDelegationReward.fromData(data);
      case 'distribution/MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromData(data);
      case 'distribution/MsgFundCommunityPool':
        return MsgFundCommunityPool.fromData(data);

      // gov
      case 'gov/MsgDeposit':
        return MsgDeposit.fromData(data);
      case 'gov/MsgSubmitProposal':
        return MsgSubmitProposal.fromData(data);
      case 'gov/MsgVote':
        return MsgVote.fromData(data);

      // market
      case 'market/MsgSwap':
        return MsgSwap.fromData(data);
      case 'market/MsgSwapSend':
        return MsgSwapSend.fromData(data);

      // msgauth
      case 'msgauth/MsgGrantAuthorization':
        return MsgGrantAuthorization.fromData(data);
      case 'msgauth/MsgRevokeAuthorization':
        return MsgRevokeAuthorization.fromData(data);
      case 'msgauth/MsgExecAuthorized':
        return MsgExecAuthorized.fromData(data);

      // oracle
      case 'oracle/MsgExchangeRateVote':
        return MsgExchangeRateVote.fromData(data);
      case 'oracle/MsgExchangeRatePrevote':
        return MsgExchangeRatePrevote.fromData(data);
      case 'oracle/MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromData(data);
      case 'oracle/MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromData(data);
      case 'oracle/MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromData(data);

      // slashing
      case 'slashing/MsgUnjail':
        return MsgUnjail.fromData(data);

      // staking
      case 'staking/MsgDelegate':
        return MsgDelegate.fromData(data);
      case 'staking/MsgUndelegate':
        return MsgUndelegate.fromData(data);
      case 'staking/MsgBeginRedelegate':
        return MsgBeginRedelegate.fromData(data);
      case 'staking/MsgCreateValidator':
        return MsgCreateValidator.fromData(data);
      case 'staking/MsgEditValidator':
        return MsgEditValidator.fromData(data);

      // wasm
      case 'wasm/MsgStoreCode':
        return MsgStoreCode.fromData(data);
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContract.fromData(data);
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContract.fromData(data);
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContract.fromData(data);
      case 'wasm/MsgUpdateContractOwner':
        return MsgUpdateContractOwner.fromData(data);
    }

    throw new Error(`unable to parse msg: ${data} unrecognized`);
  }
}
