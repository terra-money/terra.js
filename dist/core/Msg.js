"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Msg = void 0;
var msgs_1 = require("./bank/msgs");
var msgs_2 = require("./distribution/msgs");
var msgs_3 = require("./feegrant/msgs");
var msgs_4 = require("./gov/msgs");
var msgs_5 = require("./market/msgs");
var msgs_6 = require("./authz/msgs");
var msgs_7 = require("./oracle/msgs");
var msgs_8 = require("./slashing/msgs");
var msgs_9 = require("./staking/msgs");
var msgs_10 = require("./vesting/msgs");
var msgs_11 = require("./wasm/msgs");
var transfer_1 = require("./ibc/applications/transfer");
var client_1 = require("./ibc/msgs/client");
var connection_1 = require("./ibc/msgs/connection");
var channel_1 = require("./ibc/msgs/channel");
var crisis_1 = require("./crisis");
var Msg;
(function (Msg) {
    function fromAmino(data, isClassic) {
        switch (data.type) {
            // bank
            case 'bank/MsgSend':
            case 'cosmos-sdk/MsgSend':
                return msgs_1.MsgSend.fromAmino(data, isClassic);
            case 'bank/MsgMultiSend':
            case 'cosmos-sdk/MsgMultiSend':
                return msgs_1.MsgMultiSend.fromAmino(data, isClassic);
            // distribution
            case 'distribution/MsgModifyWithdrawAddress':
            case 'cosmos-sdk/MsgModifyWithdrawAddress':
                return msgs_2.MsgSetWithdrawAddress.fromAmino(data, isClassic);
            case 'distribution/MsgWithdrawDelegationReward':
            case 'cosmos-sdk/MsgWithdrawDelegationReward':
                return msgs_2.MsgWithdrawDelegatorReward.fromAmino(data, isClassic);
            case 'distribution/MsgWithdrawValidatorCommission':
            case 'cosmos-sdk/MsgWithdrawValidatorCommission':
                return msgs_2.MsgWithdrawValidatorCommission.fromAmino(data, isClassic);
            case 'distribution/MsgFundCommunityPool':
            case 'cosmos-sdk/MsgFundCommunityPool':
                return msgs_2.MsgFundCommunityPool.fromAmino(data, isClassic);
            // feegrant
            case 'feegrant/MsgGrantAllowance':
            case 'cosmos-sdk/MsgGrantAllowance':
                return msgs_3.MsgGrantAllowance.fromAmino(data, isClassic);
            case 'feegrant/MsgRevokeAllowance':
            case 'cosmos-sdk/MsgRevokeAllowance':
                return msgs_3.MsgRevokeAllowance.fromAmino(data, isClassic);
            // gov
            case 'gov/MsgDeposit':
            case 'cosmos-sdk/MsgDeposit':
                return msgs_4.MsgDeposit.fromAmino(data, isClassic);
            case 'gov/MsgSubmitProposal':
            case 'cosmos-sdk/MsgSubmitProposal':
                return msgs_4.MsgSubmitProposal.fromAmino(data, isClassic);
            case 'gov/MsgVote':
            case 'cosmos-sdk/MsgVote':
                return msgs_4.MsgVote.fromAmino(data, isClassic);
            case 'gov/MsgVoteWeighted':
            case 'cosmos-sdk/MsgVoteWeighted':
                return msgs_4.MsgVoteWeighted.fromAmino(data, isClassic);
            // market
            case 'market/MsgSwap':
                return msgs_5.MsgSwap.fromAmino(data, isClassic);
            case 'market/MsgSwapSend':
                return msgs_5.MsgSwapSend.fromAmino(data, isClassic);
            // msgauth
            case 'msgauth/MsgGrantAuthorization':
            case 'cosmos-sdk/MsgGrant':
                return msgs_6.MsgGrantAuthorization.fromAmino(data, isClassic);
            case 'msgauth/MsgRevokeAuthorization':
            case 'cosmos-sdk/MsgRevoke':
                return msgs_6.MsgRevokeAuthorization.fromAmino(data, isClassic);
            case 'msgauth/MsgExecAuthorized':
            case 'cosmos-sdk/MsgExec':
                return msgs_6.MsgExecAuthorized.fromAmino(data, isClassic);
            // oracle
            case 'oracle/MsgDelegateFeedConsent':
                return msgs_7.MsgDelegateFeedConsent.fromAmino(data, isClassic);
            case 'oracle/MsgAggregateExchangeRatePrevote':
                return msgs_7.MsgAggregateExchangeRatePrevote.fromAmino(data, isClassic);
            case 'oracle/MsgAggregateExchangeRateVote':
                return msgs_7.MsgAggregateExchangeRateVote.fromAmino(data, isClassic);
            // slashing
            case 'slashing/MsgUnjail':
            case 'cosmos-sdk/MsgUnjail':
                return msgs_8.MsgUnjail.fromAmino(data, isClassic);
            // staking
            case 'staking/MsgDelegate':
            case 'cosmos-sdk/MsgDelegate':
                return msgs_9.MsgDelegate.fromAmino(data, isClassic);
            case 'staking/MsgUndelegate':
            case 'cosmos-sdk/MsgUndelegate':
                return msgs_9.MsgUndelegate.fromAmino(data, isClassic);
            case 'staking/MsgBeginRedelegate':
            case 'cosmos-sdk/MsgBeginRedelegate':
                return msgs_9.MsgBeginRedelegate.fromAmino(data, isClassic);
            case 'staking/MsgCreateValidator':
            case 'cosmos-sdk/MsgCreateValidator':
                return msgs_9.MsgCreateValidator.fromAmino(data, isClassic);
            case 'staking/MsgEditValidator':
            case 'cosmos-sdk/MsgEditValidator':
                return msgs_9.MsgEditValidator.fromAmino(data, isClassic);
            // vesting
            case 'cosmos-sdk/MsgCreatePeriodicVestingAccount':
                return msgs_10.MsgCreatePeriodicVestingAccount.fromAmino(data, isClassic);
            case 'cosmos-sdk/MsgCreateVestingAccount':
                return msgs_10.MsgCreateVestingAccount.fromAmino(data, isClassic);
            case 'cosmos-sdk/MsgDonateAllVestingTokens':
                return msgs_10.MsgDonateAllVestingTokens.fromAmino(data, isClassic);
            // wasm
            case 'wasm/MsgStoreCode':
                return msgs_11.MsgStoreCode.fromAmino(data, isClassic);
            case 'wasm/MsgMigrateCode':
                return msgs_11.MsgMigrateCode.fromAmino(data, isClassic);
            case 'wasm/MsgInstantiateContract':
                return msgs_11.MsgInstantiateContract.fromAmino(data, isClassic);
            case 'wasm/MsgExecuteContract':
                return msgs_11.MsgExecuteContract.fromAmino(data, isClassic);
            case 'wasm/MsgMigrateContract':
                return msgs_11.MsgMigrateContract.fromAmino(data, isClassic);
            case 'wasm/MsgUpdateContractAdmin':
            case 'wasm/MsgUpdateAdmin':
                return msgs_11.MsgUpdateContractAdmin.fromAmino(data, isClassic);
            case 'wasm/MsgClearContractAdmin':
            case 'wasm/MsgClearAdmin':
                return msgs_11.MsgClearContractAdmin.fromAmino(data, isClassic);
            // ibc-transfer
            case 'cosmos-sdk/MsgTransfer':
                return transfer_1.MsgTransfer.fromAmino(data, isClassic);
            // crisis
            case 'crisis/MsgVerifyInvariant':
            case 'cosmos-sdk/MsgVerifyInvariant':
                return crisis_1.MsgVerifyInvariant.fromAmino(data, isClassic);
        }
    }
    Msg.fromAmino = fromAmino;
    function fromData(data, isClassic) {
        switch (data['@type']) {
            // bank
            case '/cosmos.bank.v1beta1.MsgSend':
                return msgs_1.MsgSend.fromData(data, isClassic);
            case '/cosmos.bank.v1beta1.MsgMultiSend':
                return msgs_1.MsgMultiSend.fromData(data, isClassic);
            // distribution
            case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
                return msgs_2.MsgSetWithdrawAddress.fromData(data, isClassic);
            case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
                return msgs_2.MsgWithdrawDelegatorReward.fromData(data, isClassic);
            case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
                return msgs_2.MsgWithdrawValidatorCommission.fromData(data, isClassic);
            case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
                return msgs_2.MsgFundCommunityPool.fromData(data, isClassic);
            // feegrant
            case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
                return msgs_3.MsgGrantAllowance.fromData(data, isClassic);
            case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
                return msgs_3.MsgRevokeAllowance.fromData(data, isClassic);
            // gov
            case '/cosmos.gov.v1beta1.MsgDeposit':
                return msgs_4.MsgDeposit.fromData(data, isClassic);
            case '/cosmos.gov.v1beta1.MsgSubmitProposal':
                return msgs_4.MsgSubmitProposal.fromData(data, isClassic);
            case '/cosmos.gov.v1beta1.MsgVote':
            case '/cosmos.gov.v1.MsgVote':
                return msgs_4.MsgVote.fromData(data, isClassic);
            case '/cosmos.gov.v1beta1.MsgVoteWeighted':
                return msgs_4.MsgVoteWeighted.fromData(data, isClassic);
            // market
            case '/terra.market.v1beta1.MsgSwap':
                return msgs_5.MsgSwap.fromData(data, isClassic);
            case '/terra.market.v1beta1.MsgSwapSend':
                return msgs_5.MsgSwapSend.fromData(data, isClassic);
            // authz
            case '/cosmos.authz.v1beta1.MsgGrant':
                return msgs_6.MsgGrantAuthorization.fromData(data, isClassic);
            case '/cosmos.authz.v1beta1.MsgRevoke':
                return msgs_6.MsgRevokeAuthorization.fromData(data, isClassic);
            case '/cosmos.authz.v1beta1.MsgExec':
                return msgs_6.MsgExecAuthorized.fromData(data, isClassic);
            // oracle
            case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
                return msgs_7.MsgDelegateFeedConsent.fromData(data, isClassic);
            case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
                return msgs_7.MsgAggregateExchangeRatePrevote.fromData(data, isClassic);
            case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
                return msgs_7.MsgAggregateExchangeRateVote.fromData(data, isClassic);
            // slashing
            case '/cosmos.slashing.v1beta1.MsgUnjail':
                return msgs_8.MsgUnjail.fromData(data, isClassic);
            // staking
            case '/cosmos.staking.v1beta1.MsgDelegate':
                return msgs_9.MsgDelegate.fromData(data, isClassic);
            case '/cosmos.staking.v1beta1.MsgUndelegate':
                return msgs_9.MsgUndelegate.fromData(data, isClassic);
            case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
                return msgs_9.MsgBeginRedelegate.fromData(data, isClassic);
            case '/cosmos.staking.v1beta1.MsgCreateValidator':
                return msgs_9.MsgCreateValidator.fromData(data, isClassic);
            case '/cosmos.staking.v1beta1.MsgEditValidator':
                return msgs_9.MsgEditValidator.fromData(data, isClassic);
            // vesting
            case '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount':
                return msgs_10.MsgCreatePeriodicVestingAccount.fromData(data, isClassic);
            case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
                return msgs_10.MsgCreateVestingAccount.fromData(data, isClassic);
            case '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens':
                return msgs_10.MsgDonateAllVestingTokens.fromData(data, isClassic);
            // wasm
            case '/terra.wasm.v1beta1.MsgStoreCode':
            case '/cosmwasm.wasm.v1.MsgStoreCode':
                return msgs_11.MsgStoreCode.fromData(data, isClassic);
            case '/terra.wasm.v1beta1.MsgMigrateCode': // isClassic only
                return msgs_11.MsgMigrateCode.fromData(data, isClassic);
            case '/terra.wasm.v1beta1.MsgInstantiateContract':
            case '/cosmwasm.wasm.v1.MsgInstantiateContract':
                return msgs_11.MsgInstantiateContract.fromData(data, isClassic);
            case '/terra.wasm.v1beta1.MsgExecuteContract':
            case '/cosmwasm.wasm.v1.MsgExecuteContract':
                return msgs_11.MsgExecuteContract.fromData(data, isClassic);
            case '/terra.wasm.v1beta1.MsgMigrateContract':
            case '/cosmwasm.wasm.v1.MsgMigrateContract':
                return msgs_11.MsgMigrateContract.fromData(data, isClassic);
            case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
            case '/cosmwasm.wasm.v1.MsgUpdateAdmin':
                return msgs_11.MsgUpdateContractAdmin.fromData(data, isClassic);
            case '/terra.wasm.v1beta1.MsgClearContractAdmin':
            case '/cosmwasm.wasm.v1.MsgClearAdmin':
                return msgs_11.MsgClearContractAdmin.fromData(data, isClassic);
            // ibc-transfer
            case '/ibc.applications.transfer.v1.MsgTransfer':
                return transfer_1.MsgTransfer.fromData(data, isClassic);
            // ibc-client
            case '/ibc.core.client.v1.MsgCreateClient':
                return client_1.MsgCreateClient.fromData(data, isClassic);
            case '/ibc.core.client.v1.MsgUpdateClient':
                return client_1.MsgUpdateClient.fromData(data, isClassic);
            case '/ibc.core.client.v1.MsgUpgradeClient':
                return client_1.MsgUpgradeClient.fromData(data, isClassic);
            case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
                return client_1.MsgSubmitMisbehaviour.fromData(data, isClassic);
            // ibc-connection
            case '/ibc.core.connection.v1.MsgConnectionOpenInit':
                return connection_1.MsgConnectionOpenInit.fromData(data, isClassic);
            case '/ibc.core.connection.v1.MsgConnectionOpenTry':
                return connection_1.MsgConnectionOpenTry.fromData(data, isClassic);
            case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
                return connection_1.MsgConnectionOpenConfirm.fromData(data, isClassic);
            case '/ibc.core.connection.v1.MsgConnectionOpenAck':
                return connection_1.MsgConnectionOpenAck.fromData(data, isClassic);
            // ibc-channel
            case '/ibc.core.channel.v1.MsgChannelOpenInit':
                return channel_1.MsgChannelOpenInit.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgChannelOpenTry':
                return channel_1.MsgChannelOpenTry.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
                return channel_1.MsgChannelOpenConfirm.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgChannelOpenAck':
                return channel_1.MsgChannelOpenAck.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgChannelCloseInit':
                return channel_1.MsgChannelCloseInit.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
                return channel_1.MsgChannelCloseConfirm.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgRecvPacket':
                return channel_1.MsgRecvPacket.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgAcknowledgement':
                return channel_1.MsgAcknowledgement.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgTimeout':
                return channel_1.MsgTimeout.fromData(data, isClassic);
            case '/ibc.core.channel.v1.MsgTimeoutOnClose':
                return channel_1.MsgTimeoutOnClose.fromData(data, isClassic);
            // crisis
            case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
                return crisis_1.MsgVerifyInvariant.fromData(data, isClassic);
            default:
                throw Error("not supported msg ".concat(data['@type']));
        }
    }
    Msg.fromData = fromData;
    function fromProto(proto, isClassic) {
        switch (proto.typeUrl) {
            // bank
            case '/cosmos.bank.v1beta1.MsgSend':
                return msgs_1.MsgSend.unpackAny(proto, isClassic);
            case '/cosmos.bank.v1beta1.MsgMultiSend':
                return msgs_1.MsgMultiSend.unpackAny(proto, isClassic);
            // distribution
            case '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress':
                return msgs_2.MsgSetWithdrawAddress.unpackAny(proto, isClassic);
            case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
                return msgs_2.MsgWithdrawDelegatorReward.unpackAny(proto, isClassic);
            case '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission':
                return msgs_2.MsgWithdrawValidatorCommission.unpackAny(proto, isClassic);
            case '/cosmos.distribution.v1beta1.MsgFundCommunityPool':
                return msgs_2.MsgFundCommunityPool.unpackAny(proto, isClassic);
            // feegrant
            case '/cosmos.feegrant.v1beta1.MsgGrantAllowance':
                return msgs_3.MsgGrantAllowance.unpackAny(proto, isClassic);
            case '/cosmos.feegrant.v1beta1.MsgRevokeAllowance':
                return msgs_3.MsgRevokeAllowance.unpackAny(proto, isClassic);
            // gov
            case '/cosmos.gov.v1beta1.MsgDeposit':
                return msgs_4.MsgDeposit.unpackAny(proto, isClassic);
            case '/cosmos.gov.v1beta1.MsgSubmitProposal':
                return msgs_4.MsgSubmitProposal.unpackAny(proto, isClassic);
            case '/cosmos.gov.v1beta1.MsgVote':
            case '/cosmos.gov.v1.MsgVote':
                return msgs_4.MsgVote.unpackAny(proto, isClassic);
            // market
            case '/terra.market.v1beta1.MsgSwap':
                return msgs_5.MsgSwap.unpackAny(proto, isClassic);
            case '/terra.market.v1beta1.MsgSwapSend':
                return msgs_5.MsgSwapSend.unpackAny(proto, isClassic);
            // authz
            case '/cosmos.authz.v1beta1.MsgGrant':
                return msgs_6.MsgGrantAuthorization.unpackAny(proto, isClassic);
            case '/cosmos.authz.v1beta1.MsgRevoke':
                return msgs_6.MsgRevokeAuthorization.unpackAny(proto, isClassic);
            case '/cosmos.authz.v1beta1.MsgExec':
                return msgs_6.MsgExecAuthorized.unpackAny(proto, isClassic);
            // oracle
            case '/terra.oracle.v1beta1.MsgDelegateFeedConsent':
                return msgs_7.MsgDelegateFeedConsent.unpackAny(proto, isClassic);
            case '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote':
                return msgs_7.MsgAggregateExchangeRatePrevote.unpackAny(proto, isClassic);
            case '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote':
                return msgs_7.MsgAggregateExchangeRateVote.unpackAny(proto, isClassic);
            // slashing
            case '/cosmos.slashing.v1beta1.MsgUnjail':
                return msgs_8.MsgUnjail.unpackAny(proto, isClassic);
            // staking
            case '/cosmos.staking.v1beta1.MsgDelegate':
                return msgs_9.MsgDelegate.unpackAny(proto, isClassic);
            case '/cosmos.staking.v1beta1.MsgUndelegate':
                return msgs_9.MsgUndelegate.unpackAny(proto, isClassic);
            case '/cosmos.staking.v1beta1.MsgBeginRedelegate':
                return msgs_9.MsgBeginRedelegate.unpackAny(proto, isClassic);
            case '/cosmos.staking.v1beta1.MsgCreateValidator':
                return msgs_9.MsgCreateValidator.unpackAny(proto, isClassic);
            case '/cosmos.staking.v1beta1.MsgEditValidator':
                return msgs_9.MsgEditValidator.unpackAny(proto, isClassic);
            // vesting
            case '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount':
                return msgs_10.MsgCreatePeriodicVestingAccount.unpackAny(proto, isClassic);
            case '/cosmos.vesting.v1beta1.MsgCreateVestingAccount':
                return msgs_10.MsgCreateVestingAccount.unpackAny(proto, isClassic);
            case '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens':
                return msgs_10.MsgDonateAllVestingTokens.unpackAny(proto, isClassic);
            // wasm
            case '/terra.wasm.v1beta1.MsgStoreCode':
            case '/cosmwasm.wasm.v1.MsgStoreCode':
                return msgs_11.MsgStoreCode.unpackAny(proto, isClassic);
            case '/terra.wasm.v1beta1.MsgMigrateCode': // isClassic only
                return msgs_11.MsgMigrateCode.unpackAny(proto, isClassic);
            case '/terra.wasm.v1beta1.MsgInstantiateContract':
            case '/cosmwasm.wasm.v1.MsgInstantiateContract':
                return msgs_11.MsgInstantiateContract.unpackAny(proto, isClassic);
            case '/terra.wasm.v1beta1.MsgExecuteContract':
            case '/cosmwasm.wasm.v1.MsgExecuteContract':
                return msgs_11.MsgExecuteContract.unpackAny(proto, isClassic);
            case '/terra.wasm.v1beta1.MsgMigrateContract':
            case '/cosmwasm.wasm.v1beta1.MsgMigrateContract':
                return msgs_11.MsgMigrateContract.unpackAny(proto, isClassic);
            case '/terra.wasm.v1beta1.MsgUpdateContractAdmin':
            case '/cosmwasm.wasm.v1beta1.MsgUpdateAdmin':
                return msgs_11.MsgUpdateContractAdmin.unpackAny(proto, isClassic);
            case '/terra.wasm.v1beta1.MsgClearContractAdmin':
            case '/cosmwasm.wasm.v1.MsgClearAdmin':
                return msgs_11.MsgClearContractAdmin.unpackAny(proto, isClassic);
            // ibc-transfer
            case '/ibc.applications.transfer.v1.MsgTransfer':
                return transfer_1.MsgTransfer.unpackAny(proto, isClassic);
            // ibc-client
            case '/ibc.core.client.v1.MsgCreateClient':
                return client_1.MsgCreateClient.unpackAny(proto, isClassic);
            case '/ibc.core.client.v1.MsgUpdateClient':
                return client_1.MsgUpdateClient.unpackAny(proto, isClassic);
            case '/ibc.core.client.v1.MsgUpgradeClient':
                return client_1.MsgUpgradeClient.unpackAny(proto, isClassic);
            case '/ibc.core.client.v1.MsgSubmitMisbehaviour':
                return client_1.MsgSubmitMisbehaviour.unpackAny(proto, isClassic);
            // ibc-connection
            case '/ibc.core.connection.v1.MsgConnectionOpenInit':
                return connection_1.MsgConnectionOpenInit.unpackAny(proto, isClassic);
            case '/ibc.core.connection.v1.MsgConnectionOpenTry':
                return connection_1.MsgConnectionOpenTry.unpackAny(proto, isClassic);
            case '/ibc.core.connection.v1.MsgConnectionOpenConfirm':
                return connection_1.MsgConnectionOpenConfirm.unpackAny(proto, isClassic);
            case '/ibc.core.connection.v1.MsgConnectionOpenAck':
                return connection_1.MsgConnectionOpenAck.unpackAny(proto, isClassic);
            // ibc-channel
            case '/ibc.core.channel.v1.MsgChannelOpenInit':
                return channel_1.MsgChannelOpenInit.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgChannelOpenTry':
                return channel_1.MsgChannelOpenTry.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgChannelOpenConfirm':
                return channel_1.MsgChannelOpenConfirm.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgChannelOpenAck':
                return channel_1.MsgChannelOpenAck.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgChannelCloseInit':
                return channel_1.MsgChannelCloseInit.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgChannelCloseConfirm':
                return channel_1.MsgChannelCloseConfirm.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgRecvPacket':
                return channel_1.MsgRecvPacket.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgAcknowledgement':
                return channel_1.MsgAcknowledgement.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgTimeout':
                return channel_1.MsgTimeout.unpackAny(proto, isClassic);
            case '/ibc.core.channel.v1.MsgTimeoutOnClose':
                return channel_1.MsgTimeoutOnClose.unpackAny(proto, isClassic);
            // crisis
            case '/cosmos.crisis.v1beta1.MsgVerifyInvariant':
                return crisis_1.MsgVerifyInvariant.unpackAny(proto, isClassic);
            default:
                throw Error("not supported msg ".concat(proto.typeUrl));
        }
    }
    Msg.fromProto = fromProto;
})(Msg = exports.Msg || (exports.Msg = {}));
//# sourceMappingURL=Msg.js.map