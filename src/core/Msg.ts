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
} from './authz/msgs';
import {
  MsgDelegateFeedConsent,
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
  MsgMigrateCode,
  MsgInstantiateContract,
  MsgExecuteContract,
  MsgMigrateContract,
  MsgUpdateContractAdmin,
  MsgClearContractAdmin,
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
  | WasmMsg
  | any; // TODO: support all message type gracefully

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

  export type Proto =
    | BankMsg.Proto
    | DistributionMsg.Proto
    | GovMsg.Proto
    | MarketMsg.Proto
    | MsgAuthMsg.Proto
    | OracleMsg.Proto
    | SlashingMsg.Proto
    | StakingMsg.Proto
    | WasmMsg.Proto;

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
      case 'wasm/MsgMigrateCode':
        return MsgMigrateCode.fromData(data);
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContract.fromData(data);
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContract.fromData(data);
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContract.fromData(data);
      case 'wasm/MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.fromData(data);
      case 'wasm/MsgClearContractAdmin':
        return MsgClearContractAdmin.fromData(data);
      default:
        throw new Error(`unable to parse msg: ${data} unrecognized`);
    }
  }

  export function fromProto(proto: Msg.Proto): Msg {
    switch (proto['@type']) {
      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.fromProto(proto);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.fromProto(proto);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgModifyWithdrawAddress.fromProto(proto);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegationReward.fromProto(proto);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromProto(proto);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.fromProto(proto);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.fromProto(proto);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.fromProto(proto);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.fromProto(proto);

      // market
      case '/terra.market.v1beta1.MsgSwap':
        return MsgSwap.fromProto(proto);
      case '/terra.market.v1beta1.MsgSwapSend':
        return MsgSwapSend.fromProto(proto);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.fromProto(proto);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.fromProto(proto);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.fromProto(proto);

      // oracle
      case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromProto(proto);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromProto(proto);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromProto(proto);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.fromProto(proto);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.fromProto(proto);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.fromProto(proto);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.fromProto(proto);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.fromProto(proto);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.fromProto(proto);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
        return MsgStoreCode.fromProto(proto);
      case '/terra.wasm.v1beta1.MsgMigrateCode':
        return MsgMigrateCode.fromProto(proto);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
        return MsgInstantiateContract.fromProto(proto);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
        return MsgExecuteContract.fromProto(proto);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
        return MsgMigrateContract.fromProto(proto);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.fromProto(proto);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
        return MsgClearContractAdmin.fromProto(proto);
      default:
        return proto;
    }
  }
}
