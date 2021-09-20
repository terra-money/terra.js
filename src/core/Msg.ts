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
import { MsgTransfer, IbcTransferMsg } from './ibc-transfer/msgs';
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
  | IbcChannelMsg;

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
    | IbcClientMsg.Amino
    | IbcConnectionMsg.Amino
    | IbcChannelMsg.Amino;

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
    | IbcChannelMsg.Data;

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
    | IbcChannelMsg.Proto;

  export function fromAmino(data: Msg.Amino): Msg {
    switch (data.type) {
      // bank
      case 'bank/MsgSend':
        return MsgSend.fromAmino(data);
      case 'bank/MsgMultiSend':
        return MsgMultiSend.fromAmino(data);

      // distribution
      case 'distribution/MsgModifyWithdrawAddress':
        return MsgSetWithdrawAddress.fromAmino(data);
      case 'distribution/MsgWithdrawDelegationReward':
        return MsgWithdrawDelegatorReward.fromAmino(data);
      case 'distribution/MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromAmino(data);
      case 'distribution/MsgFundCommunityPool':
        return MsgFundCommunityPool.fromAmino(data);

      // feegrant
      case 'feegrant/MsgGrantAllowance':
        return MsgGrantAllowance.fromAmino(data);
      case 'feegrant/MsgRevokeAllowance':
        return MsgRevokeAllowance.fromAmino(data);

      // gov
      case 'gov/MsgDeposit':
        return MsgDeposit.fromAmino(data);
      case 'gov/MsgSubmitProposal':
        return MsgSubmitProposal.fromAmino(data);
      case 'gov/MsgVote':
        return MsgVote.fromAmino(data);
      case 'gov/MsgVoteWeighted':
        return MsgVoteWeighted.fromAmino(data);

      // market
      case 'market/MsgSwap':
        return MsgSwap.fromAmino(data);
      case 'market/MsgSwapSend':
        return MsgSwapSend.fromAmino(data);

      // msgauth
      case 'msgauth/MsgGrantAuthorization':
        return MsgGrantAuthorization.fromAmino(data);
      case 'msgauth/MsgRevokeAuthorization':
        return MsgRevokeAuthorization.fromAmino(data);
      case 'msgauth/MsgExecAuthorized':
        return MsgExecAuthorized.fromAmino(data);

      // oracle
      case 'oracle/MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromAmino(data);
      case 'oracle/MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromAmino(data);
      case 'oracle/MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromAmino(data);

      // slashing
      case 'slashing/MsgUnjail':
        return MsgUnjail.fromAmino(data);

      // staking
      case 'staking/MsgDelegate':
        return MsgDelegate.fromAmino(data);
      case 'staking/MsgUndelegate':
        return MsgUndelegate.fromAmino(data);
      case 'staking/MsgBeginRedelegate':
        return MsgBeginRedelegate.fromAmino(data);
      case 'staking/MsgCreateValidator':
        return MsgCreateValidator.fromAmino(data);
      case 'staking/MsgEditValidator':
        return MsgEditValidator.fromAmino(data);

      // wasm
      case 'wasm/MsgStoreCode':
        return MsgStoreCode.fromAmino(data);
      case 'wasm/MsgMigrateCode':
        return MsgMigrateCode.fromAmino(data);
      case 'wasm/MsgInstantiateContract':
        return MsgInstantiateContract.fromAmino(data);
      case 'wasm/MsgExecuteContract':
        return MsgExecuteContract.fromAmino(data);
      case 'wasm/MsgMigrateContract':
        return MsgMigrateContract.fromAmino(data);
      case 'wasm/MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.fromAmino(data);
      case 'wasm/MsgClearContractAdmin':
        return MsgClearContractAdmin.fromAmino(data);

      // ibc-transfer
      case 'cosmos-sdk/MsgTransfer':
        return MsgTransfer.fromAmino(data);

      // ibc-client
      case 'cosmos-sdk/MsgCreateClient':
        return MsgCreateClient.fromAmino(data);
      case 'cosmos-sdk/MsgUpdateClient':
        return MsgUpdateClient.fromAmino(data);
      case 'cosmos-sdk/MsgUpgradeClient':
        return MsgUpgradeClient.fromAmino(data);
      case 'cosmos-sdk/MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.fromAmino(data);

      // ibc-connection
      case 'cosmos-sdk/MsgConnectionOpenInit':
        return MsgConnectionOpenInit.fromAmino(data);
      case 'cosmos-sdk/MsgConnectionOpenTry':
        return MsgConnectionOpenTry.fromAmino(data);
      case 'cosmos-sdk/MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.fromAmino(data);
      case 'cosmos-sdk/MsgConnectionOpenAck':
        return MsgConnectionOpenAck.fromAmino(data);

      // ibc-channel
      case 'cosmos-sdk/MsgChannelOpenInit':
        return MsgChannelOpenInit.fromAmino(data);
      case 'cosmos-sdk/MsgChannelOpenTry':
        return MsgChannelOpenTry.fromAmino(data);
      case 'cosmos-sdk/MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.fromAmino(data);
      case 'cosmos-sdk/MsgChannelOpenAck':
        return MsgChannelOpenAck.fromAmino(data);
      case 'cosmos-sdk/MsgChannelCloseInit':
        return MsgChannelCloseInit.fromAmino(data);
      case 'cosmos-sdk/MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.fromAmino(data);
      case 'cosmos-sdk/MsgRecvPacket':
        return MsgRecvPacket.fromAmino(data);
      case 'cosmos-sdk/MsgAcknowledgement':
        return MsgAcknowledgement.fromAmino(data);
      case 'cosmos-sdk/MsgTimeout':
        return MsgTimeout.fromAmino(data);
      case 'cosmos-sdk/MsgTimeoutOnClose':
        return MsgTimeoutOnClose.fromAmino(data);
    }
  }
  export function fromData(data: Msg.Data): Msg {
    switch (data['@type']) {
      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.fromData(data);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.fromData(data);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.fromData(data);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.fromData(data);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.fromData(data);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.fromData(data);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.fromData(data);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.fromData(data);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.fromData(data);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.fromData(data);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.fromData(data);
      case '/cosmos.gov.v1beta1.MsgVoteWeighted':
        return MsgVoteWeighted.fromData(data);

      // market
      case '/terra.market.v1beta1.MsgSwap':
        return MsgSwap.fromData(data);
      case '/terra.market.v1beta1.MsgSwapSend':
        return MsgSwapSend.fromData(data);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.fromData(data);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.fromData(data);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.fromData(data);

      // oracle
      case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.fromData(data);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.fromData(data);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.fromData(data);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.fromData(data);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.fromData(data);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.fromData(data);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.fromData(data);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.fromData(data);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.fromData(data);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
        return MsgStoreCode.fromData(data);
      case '/terra.wasm.v1beta1.MsgMigrateCode':
        return MsgMigrateCode.fromData(data);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
        return MsgInstantiateContract.fromData(data);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
        return MsgExecuteContract.fromData(data);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
        return MsgMigrateContract.fromData(data);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.fromData(data);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
        return MsgClearContractAdmin.fromData(data);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.MsgTransfer':
        return MsgTransfer.fromData(data);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClient.fromData(data);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClient.fromData(data);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClient.fromData(data);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.fromData(data);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInit.fromData(data);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTry.fromData(data);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.fromData(data);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAck.fromData(data);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInit.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTry.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAck.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInit.fromData(data);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.fromData(data);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacket.fromData(data);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgement.fromData(data);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeout.fromData(data);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnClose.fromData(data);
    }
  }

  export function fromProto(proto: Any): Msg {
    switch (proto.typeUrl) {
      // bank
      case '/cosmos.bank.v1beta1.MsgSend':
        return MsgSend.unpackAny(proto);
      case '/cosmos.bank.v1beta1.MsgMultiSend':
        return MsgMultiSend.unpackAny(proto);

      // distribution
      case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
        return MsgSetWithdrawAddress.unpackAny(proto);
      case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
        return MsgWithdrawDelegatorReward.unpackAny(proto);
      case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
        return MsgWithdrawValidatorCommission.unpackAny(proto);
      case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
        return MsgFundCommunityPool.unpackAny(proto);

      // feegrant
      case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
        return MsgGrantAllowance.unpackAny(proto);
      case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
        return MsgRevokeAllowance.unpackAny(proto);

      // gov
      case '/cosmos.gov.v1beta1.MsgDeposit':
        return MsgDeposit.unpackAny(proto);
      case '/cosmos.gov.v1beta1.MsgSubmitProposal':
        return MsgSubmitProposal.unpackAny(proto);
      case '/cosmos.gov.v1beta1.MsgVote':
        return MsgVote.unpackAny(proto);

      // market
      case '/terra.market.v1beta1.MsgSwap':
        return MsgSwap.unpackAny(proto);
      case '/terra.market.v1beta1.MsgSwapSend':
        return MsgSwapSend.unpackAny(proto);

      // authz
      case '/cosmos.authz.v1beta1.MsgGrant':
        return MsgGrantAuthorization.unpackAny(proto);
      case '/cosmos.authz.v1beta1.MsgRevoke':
        return MsgRevokeAuthorization.unpackAny(proto);
      case '/cosmos.authz.v1beta1.MsgExec':
        return MsgExecAuthorized.unpackAny(proto);

      // oracle
      case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
        return MsgDelegateFeedConsent.unpackAny(proto);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
        return MsgAggregateExchangeRatePrevote.unpackAny(proto);
      case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
        return MsgAggregateExchangeRateVote.unpackAny(proto);

      // slashing
      case '/cosmos.slashing.v1beta1.MsgUnjail':
        return MsgUnjail.unpackAny(proto);

      // staking
      case '/cosmos.staking.v1beta1.MsgDelegate':
        return MsgDelegate.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgUndelegate':
        return MsgUndelegate.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
        return MsgBeginRedelegate.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgCreateValidator':
        return MsgCreateValidator.unpackAny(proto);
      case '/cosmos.staking.v1beta1.MsgEditValidator':
        return MsgEditValidator.unpackAny(proto);

      // wasm
      case '/terra.wasm.v1beta1.MsgStoreCode':
        return MsgStoreCode.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgMigrateCode':
        return MsgMigrateCode.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgInstantiateContract':
        return MsgInstantiateContract.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgExecuteContract':
        return MsgExecuteContract.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgMigrateContract':
        return MsgMigrateContract.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
        return MsgUpdateContractAdmin.unpackAny(proto);
      case '/terra.wasm.v1beta1.MsgClearContractAdmin':
        return MsgClearContractAdmin.unpackAny(proto);

      // ibc-transfer
      case '/ibc.applications.transfer.v1.Msg/Transfer':
        return MsgTransfer.unpackAny(proto);

      // ibc-client
      case '/ibc.core.client.v1.MsgCreateClient':
        return MsgCreateClient.unpackAny(proto);
      case '/ibc.core.client.v1.MsgUpdateClient':
        return MsgUpdateClient.unpackAny(proto);
      case '/ibc.core.client.v1.MsgUpgradeClient':
        return MsgUpgradeClient.unpackAny(proto);
      case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
        return MsgSubmitMisbehaviour.unpackAny(proto);

      // ibc-connection
      case '/ibc.core.connection.v1.MsgConnectionOpenInit':
        return MsgConnectionOpenInit.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgConnectionOpenTry':
        return MsgConnectionOpenTry.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
        return MsgConnectionOpenConfirm.unpackAny(proto);
      case '/ibc.core.connection.v1.MsgConnectionOpenAck':
        return MsgConnectionOpenAck.unpackAny(proto);

      // ibc-channel
      case '/ibc.core.channel.v1.MsgChannelOpenInit':
        return MsgChannelOpenInit.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelOpenTry':
        return MsgChannelOpenTry.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
        return MsgChannelOpenConfirm.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelOpenAck':
        return MsgChannelOpenAck.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelCloseInit':
        return MsgChannelCloseInit.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
        return MsgChannelCloseConfirm.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgRecvPacket':
        return MsgRecvPacket.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgAcknowledgement':
        return MsgAcknowledgement.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgTimeout':
        return MsgTimeout.unpackAny(proto);
      case '/ibc.core.channel.v1.MsgTimeoutOnClose':
        return MsgTimeoutOnClose.unpackAny(proto);
      default:
        throw Error(`not supported msg ${proto.typeUrl}`);
    }
  }
}
