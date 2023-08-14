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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
var GovAPI = /** @class */ (function (_super) {
    __extends(GovAPI, _super);
    function GovAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    /**
     * Gets all proposals.
     */
    GovAPI.prototype.proposals = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/gov/v1beta1/proposals", params)
                        .then(function (d) { return [
                        d.proposals.map(function (prop) {
                            return core_1.Proposal.fromData(prop, _this.lcd.config.isClassic);
                        }),
                        d.pagination,
                    ]; })];
            });
        });
    };
    /**
     * Get a specific proposal by its ID
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.proposal = function (proposalId, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/gov/v1beta1/proposals/".concat(proposalId), params)
                        .then(function (d) { return core_1.Proposal.fromData(d.proposal, _this.lcd.config.isClassic); })];
            });
        });
    };
    /**
     * Get the proposal's proposer
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.proposer = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            var creationTx, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proposalId;
                        return [4 /*yield*/, this.searchProposalCreationTx(proposalId)];
                    case 1:
                        creationTx = _a.sent();
                        msg = creationTx.body.messages.find(function (msg) { return msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal'; });
                        if (msg && msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal') {
                            return [2 /*return*/, msg.proposer];
                        }
                        throw Error('failed to fetch submit_proposer tx');
                }
            });
        });
    };
    /**
     * Get the proposal's initial deposit
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.initialDeposit = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            var creationTx, msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proposalId;
                        return [4 /*yield*/, this.searchProposalCreationTx(proposalId)];
                    case 1:
                        creationTx = _a.sent();
                        msg = creationTx.body.messages.find(function (msg) { return msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal'; });
                        if (msg && msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal') {
                            return [2 /*return*/, core_1.Coins.fromData(msg.initial_deposit)];
                        }
                        throw Error('failed to fetch submit_proposer tx');
                }
            });
        });
    };
    /**
     * Get the deposits for a proposal
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.deposits = function (proposalId, _params) {
        if (_params === void 0) { _params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var proposal, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proposalId;
                        _params;
                        return [4 /*yield*/, this.proposal(proposalId)];
                    case 1:
                        proposal = _a.sent();
                        if (proposal.status === gov_1.ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
                            proposal.status === gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
                            return [2 /*return*/, this.c
                                    .get("/cosmos/gov/v1beta1/proposals/".concat(proposalId, "/deposits"), _params)
                                    .then(function (d) { return [
                                    d.deposits.map(function (deposit) { return core_1.Deposit.fromData(deposit); }),
                                    d.pagination,
                                ]; })];
                        }
                        params = new URLSearchParams();
                        params.append('events', "message.action='/cosmos.gov.v1beta1.MsgDeposit'");
                        params.append('events', "proposal_deposit.proposal_id=".concat(proposalId));
                        Object.entries(_params).forEach(function (v) {
                            params.append(v[0], v[1]);
                        });
                        return [2 /*return*/, this.c
                                .get("/cosmos/tx/v1beta1/txs", params)
                                .then(function (d) {
                                var deposits = [];
                                d.txs.map(function (tx) {
                                    return tx.body.messages.forEach(function (msg) {
                                        if (msg['@type'] === '/cosmos.gov.v1beta1.MsgDeposit' &&
                                            Number.parseInt(msg.proposal_id) == proposalId) {
                                            deposits.push(new core_1.Deposit(proposalId, msg.depositor, core_1.Coins.fromData(msg.amount)));
                                        }
                                    }, deposits);
                                });
                                return [deposits, d.pagination];
                            })];
                }
            });
        });
    };
    GovAPI.prototype.searchProposalCreationTx = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = new URLSearchParams();
                params.append('events', "message.action='/cosmos.gov.v1beta1.MsgSubmitProposal'");
                params.append('events', "submit_proposal.proposal_id=".concat(proposalId));
                return [2 /*return*/, this.c
                        .get("/cosmos/tx/v1beta1/txs", params)
                        .then(function (d) {
                        if (d.tx_responses.length === 0) {
                            throw Error('failed to fetch submit_proposer tx');
                        }
                        return d.txs[0];
                    })];
            });
        });
    };
    /**
     * Get the current votes for a proposal
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.votes = function (proposalId, _params) {
        if (_params === void 0) { _params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var proposal, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        proposalId;
                        _params;
                        return [4 /*yield*/, this.proposal(proposalId)];
                    case 1:
                        proposal = _a.sent();
                        if (proposal.status === gov_1.ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD) {
                            return [2 /*return*/, this.c
                                    .get("/cosmos/gov/v1beta1/proposals/".concat(proposalId, "/votes"), _params)
                                    .then(function (d) { return [d.votes.map(function (v) { return core_1.Vote.fromData(v); }), d.pagination]; })];
                        }
                        params = new URLSearchParams();
                        params.append('events', "message.action='/cosmos.gov.v1beta1.MsgVote'");
                        params.append('events', "proposal_vote.proposal_id=".concat(proposalId));
                        Object.entries(_params).forEach(function (v) {
                            params.append(v[0], v[1]);
                        });
                        return [2 /*return*/, this.c
                                .get("/cosmos/tx/v1beta1/txs", params)
                                .then(function (d) {
                                var votes = [];
                                d.txs.map(function (tx) {
                                    return tx.body.messages.forEach(function (msg) {
                                        if (msg['@type'] === '/cosmos.gov.v1beta1.MsgVote' &&
                                            Number.parseInt(msg.proposal_id) == proposalId) {
                                            votes.push(new core_1.Vote(proposalId, msg.voter, [
                                                new core_1.WeightedVoteOption(msg.option, '1'),
                                            ]));
                                        }
                                        else if (msg['@type'] === '/cosmos.gov.v1beta1.MsgVoteWeighted' &&
                                            Number.parseInt(msg.proposal_id) == proposalId) {
                                            votes.push(new core_1.Vote(proposalId, msg.voter, msg.options.map(function (o) { return core_1.WeightedVoteOption.fromData(o); })));
                                        }
                                    }, votes);
                                });
                                return [votes, d.pagination];
                            })];
                }
            });
        });
    };
    /**
     * Gets the current tally for a proposal.
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.tally = function (proposalId, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/gov/v1beta1/proposals/".concat(proposalId, "/tally"), params)
                        .then(function (_a) {
                        var d = _a.tally;
                        return ({
                            yes: new core_1.Int(d.yes),
                            no: new core_1.Int(d.no),
                            no_with_veto: new core_1.Int(d.no_with_veto),
                            abstain: new core_1.Int(d.abstain),
                        });
                    })];
            });
        });
    };
    /** Gets the Gov module's deposit parameters */
    GovAPI.prototype.depositParameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/gov/v1beta1/params/deposit", params)
                        .then(function (_a) {
                        var d = _a.deposit_params;
                        return ({
                            max_deposit_period: Number.parseInt(d.max_deposit_period),
                            min_deposit: core_1.Coins.fromData(d.min_deposit),
                        });
                    })];
            });
        });
    };
    /** Gets the Gov module's voting parameters */
    GovAPI.prototype.votingParameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/gov/v1beta1/params/voting", params)
                        .then(function (_a) {
                        var d = _a.voting_params;
                        return ({
                            voting_period: Number.parseInt(d.voting_period),
                        });
                    })];
            });
        });
    };
    /** Gets teh Gov module's tally parameters */
    GovAPI.prototype.tallyParameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/gov/v1beta1/params/tallying", params)
                        .then(function (_a) {
                        var d = _a.tally_params;
                        return ({
                            quorum: new core_1.Dec(d.quorum),
                            veto_threshold: new core_1.Dec(d.veto_threshold),
                            threshold: new core_1.Dec(d.threshold),
                        });
                    })];
            });
        });
    };
    /** Gets the Gov module's current parameters  */
    GovAPI.prototype.parameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, deposit_params, voting_params, tally_params;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.depositParameters(params),
                            this.votingParameters(params),
                            this.tallyParameters(params),
                        ])];
                    case 1:
                        _a = _b.sent(), deposit_params = _a[0], voting_params = _a[1], tally_params = _a[2];
                        return [2 /*return*/, {
                                deposit_params: deposit_params,
                                voting_params: voting_params,
                                tally_params: tally_params,
                            }];
                }
            });
        });
    };
    return GovAPI;
}(BaseAPI_1.BaseAPI));
exports.GovAPI = GovAPI;
//# sourceMappingURL=GovAPI.js.map