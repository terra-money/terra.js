"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proposal = void 0;
var Coins_1 = require("./Coins");
var proposals_1 = require("./distribution/proposals");
var proposals_2 = require("./gov/proposals");
var proposals_3 = require("./treasury/proposals");
var json_1 = require("../util/json");
var numeric_1 = require("./numeric");
var proposals_4 = require("./params/proposals");
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
     * @param proposal_status proposal's status
     * @param final_tally_result tally result
     * @param submit_time time proposal was submitted and deposit period started
     * @param deposit_end_time time deposit period will end
     * @param total_deposit amount of coins deposited by all users
     * @param voting_start_time time voting period will start
     * @param voting_end_time time voting period will end
     */
    function Proposal(id, content, proposal_status, final_tally_result, submit_time, deposit_end_time, total_deposit, voting_start_time, voting_end_time) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.content = content;
        _this.proposal_status = proposal_status;
        _this.final_tally_result = final_tally_result;
        _this.submit_time = submit_time;
        _this.deposit_end_time = deposit_end_time;
        _this.total_deposit = total_deposit;
        _this.voting_start_time = voting_start_time;
        _this.voting_end_time = voting_end_time;
        return _this;
    }
    Proposal.fromData = function (data) {
        var id = data.id, content = data.content, proposal_status = data.proposal_status, final_tally_result = data.final_tally_result, submit_time = data.submit_time, deposit_end_time = data.deposit_end_time, total_deposit = data.total_deposit, voting_start_time = data.voting_start_time, voting_end_time = data.voting_end_time;
        var ftr;
        if (final_tally_result) {
            ftr = {
                yes: new numeric_1.Int(final_tally_result.yes),
                no: new numeric_1.Int(final_tally_result.no),
                abstain: new numeric_1.Int(final_tally_result.abstain),
                no_with_veto: new numeric_1.Int(final_tally_result.no_with_veto),
            };
        }
        return new Proposal(Number.parseInt(id), Proposal.Content.fromData(content), proposal_status, ftr, new Date(submit_time), new Date(deposit_end_time), Coins_1.Coins.fromData(total_deposit), new Date(voting_start_time), new Date(voting_end_time));
    };
    Proposal.prototype.toData = function () {
        var _a = this, proposal_status = _a.proposal_status, final_tally_result = _a.final_tally_result;
        var ftr;
        if (final_tally_result) {
            ftr = {
                yes: final_tally_result.yes.toString(),
                no: final_tally_result.no.toString(),
                abstain: final_tally_result.abstain.toString(),
                no_with_veto: final_tally_result.no_with_veto.toString(),
            };
        }
        return {
            id: this.id.toFixed(),
            content: this.content.toData(),
            proposal_status: proposal_status,
            final_tally_result: ftr,
            submit_time: this.submit_time.toISOString(),
            deposit_end_time: this.deposit_end_time.toISOString(),
            total_deposit: this.total_deposit.toData(),
            voting_start_time: this.voting_start_time.toISOString(),
            voting_end_time: this.voting_end_time.toISOString(),
        };
    };
    return Proposal;
}(json_1.JSONSerializable));
exports.Proposal = Proposal;
(function (Proposal) {
    var Content;
    (function (Content) {
        function fromData(data) {
            switch (data.type) {
                case 'gov/TextProposal':
                    return proposals_2.TextProposal.fromData(data);
                case 'distribution/CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.fromData(data);
                case 'treasury/TaxRateUpdateProposal':
                    return proposals_3.TaxRateUpdateProposal.fromData(data);
                case 'treasury/RewardWeightUpdateProposal':
                    return proposals_3.RewardWeightUpdateProposal.fromData(data);
                case 'params/ParameterChangeProposal':
                    return proposals_4.ParameterChangeProposal.fromData(data);
            }
        }
        Content.fromData = fromData;
    })(Content = Proposal.Content || (Proposal.Content = {}));
    var Status;
    (function (Status) {
        Status["NIL"] = "";
        Status["DEPOSIT_PERIOD"] = "DepositPeriod";
        Status["VOTING_PERIOD"] = "VotingPeriod";
        Status["PASSED"] = "Passed";
        Status["REJECTED"] = "Rejected";
        Status["FAILED"] = "Failed";
    })(Status = Proposal.Status || (Proposal.Status = {}));
})(Proposal = exports.Proposal || (exports.Proposal = {}));
exports.Proposal = Proposal;
//# sourceMappingURL=Proposal.js.map