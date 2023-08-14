"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
var Coins_1 = require("../Coins");
var numeric_1 = require("../numeric");
var json_1 = require("../../util/json");
var proposals_1 = require("../distribution/proposals");
var proposals_2 = require("../params/proposals");
var proposals_3 = require("../ibc/proposals");
var proposals_4 = require("./proposals");
var proposals_5 = require("../upgrade/proposals");
var proposals_6 = require("../wasm/proposals");
var proposals_7 = require("../treasury/proposals");
var gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
var Long = __importStar(require("long"));
/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
var Proposal = /** @class */ (function (_super) {
    __extends(Proposal, _super);
    /**
     *
     * @param id proposal's ID
     * @param content content of the proposal
     * @param status proposal's status
     * @param final_tally_result tally result
     * @param submit_time time proposal was submitted and deposit period started
     * @param deposit_end_time time deposit period will end
     * @param total_deposit amount of coins deposited by all users
     * @param voting_start_time time voting period will start
     * @param voting_end_time time voting period will end
     */
    function Proposal(id, content, status, final_tally_result, submit_time, deposit_end_time, total_deposit, voting_start_time, voting_end_time) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.content = content;
        _this.status = status;
        _this.final_tally_result = final_tally_result;
        _this.submit_time = submit_time;
        _this.deposit_end_time = deposit_end_time;
        _this.total_deposit = total_deposit;
        _this.voting_start_time = voting_start_time;
        _this.voting_end_time = voting_end_time;
        return _this;
    }
    Proposal.fromAmino = function (data, isClassic) {
        var id = data.id, content = data.content, status = data.status, final_tally_result = data.final_tally_result, submit_time = data.submit_time, deposit_end_time = data.deposit_end_time, total_deposit = data.total_deposit, voting_start_time = data.voting_start_time, voting_end_time = data.voting_end_time;
        return new Proposal(Number.parseInt(id), Proposal.Content.fromAmino(content, isClassic), status, {
            yes: new numeric_1.Int(final_tally_result.yes || 0),
            no: new numeric_1.Int(final_tally_result.no || 0),
            abstain: new numeric_1.Int(final_tally_result.abstain || 0),
            no_with_veto: new numeric_1.Int(final_tally_result.no_with_veto || 0),
        }, new Date(submit_time), new Date(deposit_end_time), Coins_1.Coins.fromAmino(total_deposit), new Date(voting_start_time), new Date(voting_end_time));
    };
    Proposal.prototype.toAmino = function (isClassic) {
        var _a = this, status = _a.status, final_tally_result = _a.final_tally_result;
        return {
            id: this.id.toFixed(),
            content: this.content.toAmino(isClassic),
            status: status,
            final_tally_result: {
                yes: final_tally_result.yes.toFixed(),
                no: final_tally_result.no.toFixed(),
                abstain: final_tally_result.abstain.toFixed(),
                no_with_veto: final_tally_result.no_with_veto.toFixed(),
            },
            submit_time: this.submit_time.toISOString(),
            deposit_end_time: this.deposit_end_time.toISOString(),
            total_deposit: this.total_deposit.toAmino(),
            voting_start_time: this.voting_start_time.toISOString(),
            voting_end_time: this.voting_end_time.toISOString(),
        };
    };
    Proposal.fromData = function (data, isClassic) {
        var proposal_id = data.proposal_id, content = data.content, status = data.status, final_tally_result = data.final_tally_result, submit_time = data.submit_time, deposit_end_time = data.deposit_end_time, total_deposit = data.total_deposit, voting_start_time = data.voting_start_time, voting_end_time = data.voting_end_time;
        return new Proposal(Number.parseInt(proposal_id), Proposal.Content.fromData(content, isClassic), (0, gov_1.proposalStatusFromJSON)(status), {
            yes: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.yes) || 0),
            no: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.no) || 0),
            abstain: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.abstain) || 0),
            no_with_veto: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.no_with_veto) || 0),
        }, new Date(submit_time), new Date(deposit_end_time), Coins_1.Coins.fromData(total_deposit), new Date(voting_start_time), new Date(voting_end_time));
    };
    Proposal.prototype.toData = function (isClassic) {
        var _a = this, status = _a.status, final_tally_result = _a.final_tally_result;
        return {
            proposal_id: this.id.toFixed(),
            content: this.content.toData(isClassic),
            status: (0, gov_1.proposalStatusToJSON)(status),
            final_tally_result: {
                yes: final_tally_result.yes.toString(),
                no: final_tally_result.no.toString(),
                abstain: final_tally_result.abstain.toString(),
                no_with_veto: final_tally_result.no_with_veto.toString(),
            },
            submit_time: this.submit_time.toISOString(),
            deposit_end_time: this.deposit_end_time.toISOString(),
            total_deposit: this.total_deposit.toData(),
            voting_start_time: this.voting_start_time.toISOString(),
            voting_end_time: this.voting_end_time.toISOString(),
        };
    };
    Proposal.fromProto = function (data, isClassic) {
        var id = data.proposalId;
        var content = data.content;
        var status = data.status;
        var final_tally_result = data.finalTallyResult;
        var submit_time = data.submitTime;
        var deposit_end_time = data.depositEndTime;
        var total_deposit = data.totalDeposit;
        var voting_start_time = data.votingStartTime;
        var voting_end_time = data.votingEndTime;
        return new Proposal(id.toNumber(), Proposal.Content.fromProto(content, isClassic), status, {
            yes: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.yes) || 0),
            no: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.no) || 0),
            abstain: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.abstain) || 0),
            no_with_veto: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.noWithVeto) || 0),
        }, submit_time, deposit_end_time, Coins_1.Coins.fromProto(total_deposit), voting_start_time, voting_end_time);
    };
    Proposal.prototype.toProto = function (isClassic) {
        var _a = this, status = _a.status, final_tally_result = _a.final_tally_result;
        var ftr;
        if (final_tally_result) {
            ftr = gov_1.TallyResult.fromPartial({
                yes: final_tally_result.yes.toString(),
                no: final_tally_result.no.toString(),
                abstain: final_tally_result.abstain.toString(),
                noWithVeto: final_tally_result.no_with_veto.toString(),
            });
        }
        return gov_1.Proposal.fromPartial({
            proposalId: Long.fromNumber(this.id),
            content: this.content.packAny(isClassic),
            status: status,
            finalTallyResult: ftr,
            submitTime: this.submit_time,
            depositEndTime: this.deposit_end_time,
            totalDeposit: this.total_deposit.toProto(),
            votingEndTime: this.voting_end_time,
            votingStartTime: this.voting_start_time,
        });
    };
    return Proposal;
}(json_1.JSONSerializable));
exports.Proposal = Proposal;
(function (Proposal) {
    Proposal.Status = gov_1.ProposalStatus;
    var Content;
    (function (Content) {
        function fromAmino(amino, isClassic) {
            switch (amino.type) {
                case 'gov/TextProposal':
                case 'cosmos-sdk/TextProposal':
                    return proposals_4.TextProposal.fromAmino(amino, isClassic);
                case 'distribution/CommunityPoolSpendProposal':
                case 'cosmos-sdk/CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.fromAmino(amino, isClassic);
                case 'params/ParameterChangeProposal':
                case 'cosmos-sdk/ParameterChangeProposal':
                    return proposals_2.ParameterChangeProposal.fromAmino(amino, isClassic);
                case 'upgrade/SoftwareUpgradeProposal':
                case 'cosmos-sdk/SoftwareUpgradeProposal':
                    return proposals_5.SoftwareUpgradeProposal.fromAmino(amino, isClassic);
                case 'upgrade/CancelSoftwareUpgradeProposal':
                case 'cosmos-sdk/CancelSoftwareUpgradeProposal':
                    return proposals_5.CancelSoftwareUpgradeProposal.fromAmino(amino, isClassic);
                case 'ibc/ClientUpdateProposal':
                    return proposals_3.ClientUpdateProposal.fromAmino(amino, isClassic);
                case 'wasm/ClearAdminProposal':
                    return proposals_6.ClearAdminProposal.fromAmino(amino, isClassic);
                case 'wasm/ExecuteContractProposal':
                    return proposals_6.ExecuteContractProposal.fromAmino(amino, isClassic);
                case 'wasm/InstantiateContractProposal':
                    return proposals_6.InstantiateContractProposal.fromAmino(amino, isClassic);
                case 'wasm/MigrateContractProposal':
                    return proposals_6.MigrateContractProposal.fromAmino(amino, isClassic);
                case 'wasm/PinCodesProposal':
                    return proposals_6.PinCodesProposal.fromAmino(amino, isClassic);
                case 'wasm/StoreCodeProposal':
                    return proposals_6.StoreCodeProposal.fromAmino(amino, isClassic);
                case 'wasm/SudoContractProposal':
                    return proposals_6.SudoContractProposal.fromAmino(amino, isClassic);
                case 'wasm/UnpinCodesProposal':
                    return proposals_6.UnpinCodesProposal.fromAmino(amino, isClassic);
                case 'wasm/UpdateAdminProposal':
                    return proposals_6.UpdateAdminProposal.fromAmino(amino, isClassic);
                case 'wasm/UpdateInstantiateConfigProposal':
                    return proposals_6.UpdateInstantiateConfigProposal.fromAmino(amino, isClassic);
                case 'treasury/AddBurnTaxExemptionAddressProposal':
                    return proposals_7.AddBurnTaxExemptionAddressProposal.fromAmino(amino, isClassic);
                case 'treasury/RemoveBurnTaxExemptionAddressProposal':
                    return proposals_7.RemoveBurnTaxExemptionAddressProposal.fromAmino(amino, isClassic);
            }
        }
        Content.fromAmino = fromAmino;
        function fromData(data, isClassic) {
            switch (data['@type']) {
                case '/cosmos.gov.v1beta1.TextProposal':
                    return proposals_4.TextProposal.fromData(data, isClassic);
                case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.fromData(data, isClassic);
                case '/cosmos.params.v1beta1.ParameterChangeProposal':
                    return proposals_2.ParameterChangeProposal.fromData(data, isClassic);
                case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
                    return proposals_5.SoftwareUpgradeProposal.fromData(data, isClassic);
                case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
                    return proposals_5.CancelSoftwareUpgradeProposal.fromData(data, isClassic);
                case '/ibc.core.client.v1.ClientUpdateProposal':
                    return proposals_3.ClientUpdateProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.ClearAdminProposal':
                    return proposals_6.ClearAdminProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.ExecuteContractProposal':
                    return proposals_6.ExecuteContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.InstantiateContractProposal':
                    return proposals_6.InstantiateContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.MigrateContractProposal':
                    return proposals_6.MigrateContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.PinCodesProposal':
                    return proposals_6.PinCodesProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.StoreCodeProposal':
                    return proposals_6.StoreCodeProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.SudoContractProposal':
                    return proposals_6.SudoContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.UnpinCodesProposal':
                    return proposals_6.UnpinCodesProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.UpdateAdminProposal':
                    return proposals_6.UpdateAdminProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
                    return proposals_6.UpdateInstantiateConfigProposal.fromData(data, isClassic);
                case '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal':
                    return proposals_7.AddBurnTaxExemptionAddressProposal.fromData(data, isClassic);
                case '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal':
                    return proposals_7.RemoveBurnTaxExemptionAddressProposal.fromData(data, isClassic);
            }
        }
        Content.fromData = fromData;
        function fromProto(anyProto, isClassic) {
            var typeUrl = anyProto.typeUrl;
            switch (typeUrl) {
                case '/cosmos.gov.v1beta1.TextProposal':
                    return proposals_4.TextProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.params.v1beta1.ParameterChangeProposal':
                    return proposals_2.ParameterChangeProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
                    return proposals_5.SoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
                    return proposals_5.CancelSoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
                case '/ibc.core.client.v1.ClientUpdateProposal':
                    return proposals_3.ClientUpdateProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.ClearAdminProposal':
                    return proposals_6.ClearAdminProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.ExecuteContractProposal':
                    return proposals_6.ExecuteContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.InstantiateContractProposal':
                    return proposals_6.InstantiateContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.MigrateContractProposal':
                    return proposals_6.MigrateContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.PinCodesProposal':
                    return proposals_6.PinCodesProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.StoreCodeProposal':
                    return proposals_6.StoreCodeProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.SudoContractProposal':
                    return proposals_6.SudoContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.UnpinCodesProposal':
                    return proposals_6.UnpinCodesProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.UpdateAdminProposal':
                    return proposals_6.UpdateAdminProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
                    return proposals_6.UpdateInstantiateConfigProposal.unpackAny(anyProto, isClassic);
                case '/terra.treasury.v1beta1.AddBurnTaxExemptionAddressProposal':
                    return proposals_7.AddBurnTaxExemptionAddressProposal.unpackAny(anyProto, isClassic);
                case '/terra.treasury.v1beta1.RemoveBurnTaxExemptionAddressProposal':
                    return proposals_7.RemoveBurnTaxExemptionAddressProposal.unpackAny(anyProto, isClassic);
            }
            throw "Proposal content ".concat(typeUrl, " not recognized");
        }
        Content.fromProto = fromProto;
    })(Content = Proposal.Content || (Proposal.Content = {}));
})(Proposal = exports.Proposal || (exports.Proposal = {}));
exports.Proposal = Proposal;
//# sourceMappingURL=Proposal.js.map