import { BankMsg, MsgMultiSend, MsgSend } from './bank/msgs';
import {
  DistributionMsg,
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
  MsgFundCommunityPool,
} from './distribution/msgs';
import {
  MsgGrantAllowance,
  MsgRevokeAllowance,
  FeeGrantMsg,
} from './feegrant/msgs';
import {
  GovMsg,
  MsgDeposit,
  MsgSubmitProposal,
  MsgVote,
  MsgVoteWeighted,
} from './gov/msgs';
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
import { MsgTransfer, IbcTransferMsg } from './ibc/applications/transfer';
import {
  MsgCreateClient,
  MsgUpdateClient,
  MsgUpgradeClient,
  MsgSubmitMisbehaviour,
  IbcClientMsg,
} from './ibc/msgs/client';
import {
  MsgConnectionOpenInit,
  MsgConnectionOpenTry,
  MsgConnectionOpenConfirm,
  MsgConnectionOpenAck,
  IbcConnectionMsg,
} from './ibc/msgs/connection';
import {
  MsgChannelOpenInit,
  MsgChannelOpenTry,
  MsgChannelOpenConfirm,
  MsgChannelOpenAck,
  MsgChannelCloseInit,
  MsgChannelCloseConfirm,
  MsgRecvPacket,
  MsgAcknowledgement,
  MsgTimeout,
  MsgTimeoutOnClose,
  IbcChannelMsg,
} from './ibc/msgs/channel';
import { MsgVerifyInvariant, CrisisMsg } from './crisis';
import { Any } from '@terra-money/terra.proto/google/protobuf/any';

export type Msg =
  | BankMsg
  | DistributionMsg
  | FeeGrantMsg
  | GovMsg
  | MarketMsg
  | MsgAuthMsg
  | OracleMsg
  | SlashingMsg
  | StakingMsg
  | WasmMsg
  | IbcTransferMsg
  | IbcClientMsg
  | IbcConnectionMsg
  | IbcChannelMsg
  | CrisisMsg;

export namespace Msg {
  export type Amino =
    | BankMsg.Amino
    | DistributionMsg.Amino
    | FeeGrantMsg.Amino
    | GovMsg.Amino
    | MarketMsg.Amino
    | MsgAuthMsg.Amino
    | OracleMsg.Amino
    | SlashingMsg.Amino
    | StakingMsg.Amino
    | WasmMsg.Amino
    | IbcTransferMsg.Amino
    | CrisisMsg.Amino;

  export type Data =
    | BankMsg.Data
    | DistributionMsg.Data
    | FeeGrantMsg.Data
    | GovMsg.Data
    | MarketMsg.Data
    | MsgAuthMsg.Data
    | OracleMsg.Data
    | SlashingMsg.Data
    | StakingMsg.Data
    | WasmMsg.Data
    | IbcTransferMsg.Data
    | IbcClientMsg.Data
    | IbcConnectionMsg.Data
    | IbcChannelMsg.Data
    | CrisisMsg.Data;

  export type Proto =
    | BankMsg.Proto
    | DistributionMsg.Proto
    | FeeGrantMsg.Proto
    | GovMsg.Proto
    | MarketMsg.Proto
    | MsgAuthMsg.Proto
    | OracleMsg.Proto
    | SlashingMsg.Proto
    | StakingMsg.Proto
    | WasmMsg.Proto
    | IbcTransferMsg.Proto
    | IbcClientMsg.Proto
    | IbcConnectionMsg.Proto
    | IbcChannelMsg.Proto
    | CrisisMsg.Proto;

  export function fromAmino(data: Msg.Amino, legacy?: boolean): Msg {
    switch (data.type) {
      // bank
      case 'bank/MsgSend':
      case 'cosmos-sdk/MsgSend':
        return MsgSend.fromAmino(data, legacy);
      case 'bank/MsgMultiSend':
      case 'cosmos-sdk/MsgMultiSend':
        return MsgMultiSend.fromAmino(data, legacy);

      // distribution
      case 'distribution/MsgModifyWithdrawAddress':
      case 'cosmos-sdk/MsgModifyWithdrawAddress':
        return MsgSetWithdrawAddress.fromAmino(data, legacy);
      case 'distribution/MsgWithdrawDelegationReward':
      case 'cosmos-sdk/MsgWithdrawDelegationReward':
        return MsgWithdrawDelegatorReward.fromAmino(data, legacy);
      case 'distribution/MsgWithdrawValidatorCommission':
      case 'cosmos-sdk/MsgWithdrawValCommission':
        return MsgWithdrawValidatorCommission.fromAmino(data, legacy);
      case 'distribution/MsgFundCommunityPool':
      case 'cosmos-sdk/MsgFundCommunityPool':
        return MsgFundCommunityPool.fromAmino(data, legacy);

      // feegrant
      case 'feegrant/MsgGrantAllowance':
      case 'cosmos-sdk/MsgGrantAllowance':
        return MsgGrantAllowance.fromAmino(data, legacy);
      case 'feegrant/MsgRevokeAllowance':
      case 'cosmos-sdk/MsgRevokeAllowance':
        return MsgRevokeAllowance.fromAmino(data, legacy);
      // gov
      case 'gov/MsgDeposit':
      case 'cosmos-sdk/MsgDeposit':
        return MsgDeposit.fromAmino(data, legacy);
      case 'gov/MsgSubmitProposal':
      case 'cosmos-sdk/MsgSubmitProposal':
        return MsgSubmitProposal.fromAmino(data, legacy);
      case 'gov/MsgVote':
      case 'cosmos-sdk/MsgVote':
        return MsgVote.fromAmino(data, legacy);
      case 'gov/MsgVoteWeighted':
      case 'cosmos-sdk/MsgVoteWeighted':
        return MsgVoteWeighted.fromAmino(data, legacy);

      // market
      case 'market/MsgSwap':
        return MsgSwap.fromAmino(data, legacy);
      case 'market/MsgSwapSend':
        return MsgSwapSend.fromAmino(data, legacy);

      // msgauth
      case 'msgauth/MsgGrantAuthorization':
      case 'cosmos-sdk/MsgGrant':
        return MsgGrantAuthorization.fromAmino(data, legacy);
      case 'msgauth/MsgRevokeAuthorization':
      case 'cosmos-sdk/MsgRevoke':
        return MsgRevokeAuthorization.fromAmino(data, legacy);
      case 'msgauth/MsgExecAuthorized':
      case 'cosmos-sdk/MsgExec':
        return MsgExecAuthorized.fromAmino(data, legacy);

      // oracle
      case 'oracle/MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromAmino(data, legacy);
      case 'oracle/MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromAmino(data, legacy);
      case 'oracle/MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromAmino(data, legacy);
      // slashing
      case 'slashing/MsgUnjail':
      case 'cosmos-sdk/MsgUnjail':
        return MsgUnjail.fromAmino(data, legacy);

      // staking
      case 'staking/MsgDelegate':
      case 'cosmos-sdk/MsgDelegate':
        return MsgDelegate.fromAmino(data, legacy);
      case 'staking/MsgUndelegate':
      case 'cosmos-sdk/MsgUndelegate':
        return MsgUndelegate.fromAmino(data, legacy);
      case 'staking/MsgBeginRedelegate':
      case 'cosmos-sdk/MsgBeginRedelegate':
        return MsgBeginRedelegate.fromAmino(data, legacy);
      case 'staking/MsgCreateValidator':
      case 'cosmos-sdk/MsgCreateValidator':
        return MsgCreateValidator.fromAmino(data, legacy);
      case 'staking/MsgEditValidator':
      case 'cosmos-sdk/MsgEditValidator':
        return MsgEditValidator.fromAmino(data, legacy);

      // wasm
      case 'wasm/MsgStoreCode':
        return MsgStoreCode.fromAmino(data, legacy);
      case 'wasm/MsgMigrateCode':
        return MsgMigrateCode.fromAmino(data, legacy);
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContract.fromAmino(data, legacy);
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContract.fromAmino(data, legacy);
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContract.fromAmino(data, legacy);
      case 'wasm/MsgUpdateContractAdmin':
      case 'wasm/MsgUpdateAdmin':
        return MsgUpdateContractAdmin.fromAmino(data, legacy);
      case 'wasm/MsgClearContractAdmin':
      case 'wasm/MsgClearAdmin':
        return MsgClearContractAdmin.fromAmino(data, legacy);
      // ibc-transfer
      case 'cosmos-sdk/MsgTransfer':
        return MsgTransfer.fromAmino(data, legacy);
      // crisis
      case 'crisis/MsgVerifyInvariant':
      case 'cosmos-sdk/MsgVerifyInvariant':
        return MsgVerifyInvariant.fromAmino(data, legacy);
    }
  }
  export function fromData(data: Msg.Data, legacy?: boolean): Msg {
    switch (data['@type']) {
      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.fromData(data, legacy);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.fromData(data, legacy);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.fromData(data, legacy);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.fromData(data, legacy);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromData(data, legacy);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.fromData(data, legacy);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.fromData(data, legacy);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.fromData(data, legacy);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.fromData(data, legacy);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.fromData(data, legacy);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.fromData(data, legacy);
      case '/cosmos.gov.v1beta1.MsgVoteWeighted':
        return MsgVoteWeighted.fromData(data, legacy);

      // market
      case '/terra.market.v1beta1.MsgSwap':
        return MsgSwap.fromData(data, legacy);
      case '/terra.market.v1beta1.MsgSwapSend':
        return MsgSwapSend.fromData(data, legacy);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.fromData(data, legacy);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.fromData(data, legacy);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.fromData(data, legacy);

      // oracle
      case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromData(data, legacy);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromData(data, legacy);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromData(data, legacy);
      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.fromData(data, legacy);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.fromData(data, legacy);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.fromData(data, legacy);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.fromData(data, legacy);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.fromData(data, legacy);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.fromData(data, legacy);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
      case '/cosmwasm.wasm.v1.MsgStoreCode':
        return MsgStoreCode.fromData(data, legacy);
      case '/terra.wasm.v1beta1.MsgMigrateCode': // legacy only
        return MsgMigrateCode.fromData(data, legacy);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
      case '/cosmwasm.wasm.v1.MsgInstantiateContract':
        return MsgInstantiateContract.fromData(data, legacy);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
      case '/cosmwasm.wasm.v1.MsgExecuteContract':
        return MsgExecuteContract.fromData(data, legacy);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
      case '/cosmwasm.wasm.v1.MsgMigrateContract':
        return MsgMigrateContract.fromData(data, legacy);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
      case '/cosmwasm.wasm.v1.MsgUpdateAdmin':
        return MsgUpdateContractAdmin.fromData(data, legacy);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
      case '/cosmwasm.wasm.v1.MsgClearAdmin':
        return MsgClearContractAdmin.fromData(data, legacy);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.fromData(data, legacy);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClient.fromData(data, legacy);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClient.fromData(data, legacy);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClient.fromData(data, legacy);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.fromData(data, legacy);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInit.fromData(data, legacy);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTry.fromData(data, legacy);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.fromData(data, legacy);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAck.fromData(data, legacy);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInit.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTry.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAck.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInit.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacket.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgement.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeout.fromData(data, legacy);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnClose.fromData(data, legacy);

      // crisis
      case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
        return MsgVerifyInvariant.fromData(data, legacy);
      default:
        throw Error(`not supported msg ${data['@type']}`);
    }
  }

  export function fromProto(proto: Any, legacy?: boolean): Msg {
    switch (proto.typeUrl) {
      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.unpackAny(proto, legacy);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.unpackAny(proto, legacy);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.unpackAny(proto, legacy);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.unpackAny(proto, legacy);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.unpackAny(proto, legacy);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.unpackAny(proto, legacy);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.unpackAny(proto, legacy);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.unpackAny(proto, legacy);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.unpackAny(proto, legacy);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.unpackAny(proto, legacy);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.unpackAny(proto, legacy);

      // market
      case '/terra.market.v1beta1.MsgSwap':
        return MsgSwap.unpackAny(proto, legacy);
      case '/terra.market.v1beta1.MsgSwapSend':
        return MsgSwapSend.unpackAny(proto, legacy);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.unpackAny(proto, legacy);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.unpackAny(proto, legacy);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.unpackAny(proto, legacy);

      // oracle
      case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.unpackAny(proto, legacy);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.unpackAny(proto, legacy);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.unpackAny(proto, legacy);
      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.unpackAny(proto, legacy);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.unpackAny(proto, legacy);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.unpackAny(proto, legacy);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.unpackAny(proto, legacy);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.unpackAny(proto, legacy);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.unpackAny(proto, legacy);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
      case '/cosmwasm.wasm.v1.MsgStoreCode':
        return MsgStoreCode.unpackAny(proto, legacy);
      case '/terra.wasm.v1beta1.MsgMigrateCode': // legacy only
        return MsgMigrateCode.unpackAny(proto, legacy);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
      case '/cosmwasm.wasm.v1.MsgInstantiateContract':
        return MsgInstantiateContract.unpackAny(proto, legacy);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
      case '/cosmwasm.wasm.v1.MsgExecuteContract':
        return MsgExecuteContract.unpackAny(proto, legacy);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
      case '/cosmwasm.wasm.v1beta1.MsgMigrateContract':
        return MsgMigrateContract.unpackAny(proto, legacy);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
      case '/cosmwasm.wasm.v1beta1.MsgUpdateAdmin':
        return MsgUpdateContractAdmin.unpackAny(proto, legacy);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
      case '/cosmwasm.wasm.v1.MsgClearAdmin':
        return MsgClearContractAdmin.unpackAny(proto, legacy);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.unpackAny(proto, legacy);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClient.unpackAny(proto, legacy);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClient.unpackAny(proto, legacy);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClient.unpackAny(proto, legacy);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.unpackAny(proto, legacy);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInit.unpackAny(proto, legacy);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTry.unpackAny(proto, legacy);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.unpackAny(proto, legacy);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAck.unpackAny(proto, legacy);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInit.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTry.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAck.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInit.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacket.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgement.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeout.unpackAny(proto, legacy);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnClose.unpackAny(proto, legacy);

      // crisis
      case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
        return MsgVerifyInvariant.unpackAny(proto, legacy);
      default:
        throw Error(`not supported msg ${proto.typeUrl}`);
    }
  }
}
