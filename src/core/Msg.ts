import { BankMsg, MsgMultiSend, MsgSend } from './bank/msgs';
import {
  DistributionMsg,
  MsgModifyWithdrawAddress,
  MsgWithdrawDelegationReward,
  MsgWithdrawValidatorCommission,
} from './distribution/msgs';
import { GovMsg, MsgDeposit, MsgSubmitProposal, MsgVote } from './gov/msgs';
import { MarketMsg, MsgSwap } from './market/msgs';
import {
  MsgDelegateFeedConsent,
  MsgExchangeRatePrevote,
  MsgExchangeRateVote,
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

export type Msg =
  | BankMsg
  | DistributionMsg
  | GovMsg
  | MarketMsg
  | OracleMsg
  | SlashingMsg
  | StakingMsg;

export namespace Msg {
  export type Data =
    | BankMsg.Data
    | DistributionMsg.Data
    | GovMsg.Data
    | MarketMsg.Data
    | OracleMsg.Data
    | SlashingMsg.Data
    | StakingMsg.Data;

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

      // oracle
      case 'oracle/MsgExchangeRateVote':
        return MsgExchangeRateVote.fromData(data);
      case 'oracle/MsgExchangeRatePrevote':
        return MsgExchangeRatePrevote.fromData(data);
      case 'oracle/MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromData(data);

      // slashing
      case 'cosmos/MsgUnjail':
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
    }
  }
}
