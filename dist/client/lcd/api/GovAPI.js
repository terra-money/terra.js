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
var GovAPI = /** @class */ (function (_super) {
    __extends(GovAPI, _super);
    function GovAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets all proposals.
     */
    GovAPI.prototype.proposals = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/proposals")
                        .then(function (d) { return d.result.map(core_1.Proposal.fromData); })];
            });
        });
    };
    /**
     * Get a specific proposal by its ID
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.proposal = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/proposals/" + proposalId)
                        .then(function (d) { return core_1.Proposal.fromData(d.result); })];
            });
        });
    };
    /**
     * Get the proposal's proposer
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.proposer = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/proposals/" + proposalId + "/proposer")
                        .then(function (d) { return d.result.proposer; })];
            });
        });
    };
    /**
     * Get the deposits for a proposal
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.deposits = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/proposals/" + proposalId + "/deposits")
                        .then(function (d) { return d.result; })];
            });
        });
    };
    /**
     * Get the current votes for a proposal
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.votes = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/proposals/" + proposalId + "/deposits")
                        .then(function (d) { return d.result; })];
            });
        });
    };
    /**
     * Gets the current tally for a proposal.
     * @param proposalId proposal's ID
     */
    GovAPI.prototype.tally = function (proposalId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/proposals/" + proposalId + "/tally")
                        .then(function (_a) {
                        var d = _a.result;
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
    GovAPI.prototype.depositParameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/parameters/deposit")
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            max_deposit_period: Number.parseInt(d.max_deposit_period),
                            min_deposit: core_1.Coins.fromData(d.min_deposit),
                        });
                    })];
            });
        });
    };
    /** Gets the Gov module's voting parameters */
    GovAPI.prototype.votingParameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/parameters/voting")
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            voting_period: Number.parseInt(d.voting_period),
                        });
                    })];
            });
        });
    };
    /** Gets teh Gov module's tally parameters */
    GovAPI.prototype.tallyParameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/gov/parameters/tallying")
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            quorum: new core_1.Dec(d.quorum),
                            veto: new core_1.Dec(d.veto),
                            threshold: new core_1.Dec(d.threshold),
                        });
                    })];
            });
        });
    };
    /** Gets the Gov module's current parameters  */
    GovAPI.prototype.parameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, deposit_params, voting_params, tally_params;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.depositParameters(),
                            this.votingParameters(),
                            this.tallyParameters(),
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