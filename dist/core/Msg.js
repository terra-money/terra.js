"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Msg = void 0;
var msgs_1 = require("./bank/msgs");
var msgs_2 = require("./distribution/msgs");
var msgs_3 = require("./gov/msgs");
var msgs_4 = require("./market/msgs");
var msgs_5 = require("./msgauth/msgs");
var msgs_6 = require("./oracle/msgs");
var msgs_7 = require("./slashing/msgs");
var msgs_8 = require("./staking/msgs");
var msgs_9 = require("./wasm/msgs");
var Msg;
(function (Msg) {
    function fromData(data) {
        switch (data.type) {
            // bank
            case 'bank/MsgSend':
                return msgs_1.MsgSend.fromData(data);
            case 'bank/MsgMultiSend':
                return msgs_1.MsgMultiSend.fromData(data);
            // distribution
            case 'distribution/MsgModifyWithdrawAddress':
                return msgs_2.MsgModifyWithdrawAddress.fromData(data);
            case 'distribution/MsgWithdrawDelegationReward':
                return msgs_2.MsgWithdrawDelegationReward.fromData(data);
            case 'distribution/MsgWithdrawValidatorCommission':
                return msgs_2.MsgWithdrawValidatorCommission.fromData(data);
            case 'distribution/MsgFundCommunityPool':
                return msgs_2.MsgFundCommunityPool.fromData(data);
            // gov
            case 'gov/MsgDeposit':
                return msgs_3.MsgDeposit.fromData(data);
            case 'gov/MsgSubmitProposal':
                return msgs_3.MsgSubmitProposal.fromData(data);
            case 'gov/MsgVote':
                return msgs_3.MsgVote.fromData(data);
            // market
            case 'market/MsgSwap':
                return msgs_4.MsgSwap.fromData(data);
            case 'market/MsgSwapSend':
                return msgs_4.MsgSwapSend.fromData(data);
            // msgauth
            case 'msgauth/MsgGrantAuthorization':
                return msgs_5.MsgGrantAuthorization.fromData(data);
            case 'msgauth/MsgRevokeAuthorization':
                return msgs_5.MsgRevokeAuthorization.fromData(data);
            case 'msgauth/MsgExecAuthorized':
                return msgs_5.MsgExecAuthorized.fromData(data);
            // oracle
            case 'oracle/MsgExchangeRateVote':
                return msgs_6.MsgExchangeRateVote.fromData(data);
            case 'oracle/MsgExchangeRatePrevote':
                return msgs_6.MsgExchangeRatePrevote.fromData(data);
            case 'oracle/MsgDelegateFeedConsent':
                return msgs_6.MsgDelegateFeedConsent.fromData(data);
            case 'oracle/MsgAggregateExchangeRatePrevote':
                return msgs_6.MsgAggregateExchangeRatePrevote.fromData(data);
            case 'oracle/MsgAggregateExchangeRateVote':
                return msgs_6.MsgAggregateExchangeRateVote.fromData(data);
            // slashing
            case 'slashing/MsgUnjail':
                return msgs_7.MsgUnjail.fromData(data);
            // staking
            case 'staking/MsgDelegate':
                return msgs_8.MsgDelegate.fromData(data);
            case 'staking/MsgUndelegate':
                return msgs_8.MsgUndelegate.fromData(data);
            case 'staking/MsgBeginRedelegate':
                return msgs_8.MsgBeginRedelegate.fromData(data);
            case 'staking/MsgCreateValidator':
                return msgs_8.MsgCreateValidator.fromData(data);
            case 'staking/MsgEditValidator':
                return msgs_8.MsgEditValidator.fromData(data);
            // wasm
            case 'wasm/MsgStoreCode':
                return msgs_9.MsgStoreCode.fromData(data);
            case 'wasm/MsgInstantiateContract':
                return msgs_9.MsgInstantiateContract.fromData(data);
            case 'wasm/MsgExecuteContract':
                return msgs_9.MsgExecuteContract.fromData(data);
            case 'wasm/MsgMigrateContract':
                return msgs_9.MsgMigrateContract.fromData(data);
            case 'wasm/MsgUpdateContractOwner':
                return msgs_9.MsgUpdateContractOwner.fromData(data);
        }
        throw new Error("unable to parse msg: " + data + " unrecognized");
    }
    Msg.fromData = fromData;
})(Msg = exports.Msg || (exports.Msg = {}));
//# sourceMappingURL=Msg.js.map