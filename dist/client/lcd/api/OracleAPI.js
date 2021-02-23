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
exports.OracleAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var OracleAPI = /** @class */ (function (_super) {
    __extends(OracleAPI, _super);
    function OracleAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Query the currently casted votes for the exchange rate of LUNA, filterable by validator or denom.
     *
     * At least one of the parameters **must** be provided.
     * @param denom denomination to query votes for
     * @param validator validator operator address to query votes for
     */
    OracleAPI.prototype.votes = function (denom, validator) {
        return __awaiter(this, void 0, void 0, function () {
            var vote, votes, votes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(validator !== undefined && denom !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.c.get("/oracle/denoms/" + denom + "/votes/" + validator)];
                    case 1:
                        vote = _a.sent();
                        return [2 /*return*/, [core_1.ExchangeRateVote.fromData(vote.result)]];
                    case 2:
                        if (!(validator !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.c.get("/oracle/voters/" + validator + "/votes")];
                    case 3:
                        votes = _a.sent();
                        return [2 /*return*/, votes.result.map(core_1.ExchangeRateVote.fromData)];
                    case 4:
                        if (!(denom !== undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.c.get("/oracle/denoms/" + denom + "/votes")];
                    case 5:
                        votes = _a.sent();
                        return [2 /*return*/, votes.result.map(core_1.ExchangeRateVote.fromData)];
                    case 6: throw new Error('both denom and validator cannot both be undefined');
                }
            });
        });
    };
    /**
     * Query the currently casted vprevotes, filterable by validator or denom.
     *
     * At least one of the parameters **must** be provided.
     * @param denom denomination to query prevotes for
     * @param validator validator operator address to query prevotes for
     */
    OracleAPI.prototype.prevotes = function (denom, validator) {
        return __awaiter(this, void 0, void 0, function () {
            var prevote, prevotes, prevotes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(validator !== undefined && denom !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.c.get("/oracle/denoms/" + denom + "/prevotes/" + validator)];
                    case 1:
                        prevote = _a.sent();
                        return [2 /*return*/, [core_1.ExchangeRatePrevote.fromData(prevote.result)]];
                    case 2:
                        if (!(validator !== undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.c.get("/oracle/voters/" + validator + "/prevotes")];
                    case 3:
                        prevotes = _a.sent();
                        return [2 /*return*/, prevotes.result.map(core_1.ExchangeRatePrevote.fromData)];
                    case 4:
                        if (!(denom !== undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.c.get("/oracle/denoms/" + denom + "/prevotes")];
                    case 5:
                        prevotes = _a.sent();
                        return [2 /*return*/, prevotes.result.map(core_1.ExchangeRatePrevote.fromData)];
                    case 6: throw new Error('both denom and validator cannot both be undefined');
                }
            });
        });
    };
    /**
     * Gets the Oracle module's currently registered exchange rate for LUNA in all available denominations.
     */
    OracleAPI.prototype.exchangeRates = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c.get("/oracle/denoms/exchange_rates").then(function (d) {
                        if (d === null || d === void 0 ? void 0 : d.result) {
                            return core_1.Coins.fromData(d.result);
                        }
                        else {
                            return new core_1.Coins({});
                        }
                    })];
            });
        });
    };
    /**
     * Gets the Oracle module's currently registered exchange rate for the specific denomination.
     * @param denom denomination in which to get the exchange rate of LUNA
     */
    OracleAPI.prototype.exchangeRate = function (denom) {
        return __awaiter(this, void 0, void 0, function () {
            var rates;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exchangeRates()];
                    case 1:
                        rates = _a.sent();
                        return [2 /*return*/, rates.get(denom)];
                }
            });
        });
    };
    /**
     * Gets the current list of active denominations.
     */
    OracleAPI.prototype.activeDenoms = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c.get("/oracle/denoms/actives").then(function (d) { return d.result; })];
            });
        });
    };
    /**
     * Gets the registered feeder address associated with the validator. The feeder address is the
     * Terra account that is permitted to sign Oracle vote messages in the validator's name.
     * @param validator validator's operator address
     */
    OracleAPI.prototype.feederAddress = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/oracle/voters/" + validator + "/feeder")
                        .then(function (d) { return d.result; })];
            });
        });
    };
    /**
     * Gets the number of missed oracle votes for the validator over the current slash window.
     * @param validator validator's operator address
     */
    OracleAPI.prototype.misses = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/oracle/voters/" + validator + "/miss")
                        .then(function (d) { return Number.parseInt(d.result); })];
            });
        });
    };
    /**
     * Gets the validator's current submitted aggregate prevote
     * @param validator validator's operator address
     */
    OracleAPI.prototype.aggregatePrevote = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/oracle/voters/" + validator + "/aggregate_prevote")
                        .then(function (d) { return core_1.AggregateExchangeRatePrevote.fromData(d.result); })];
            });
        });
    };
    /**
     * Gets the validator's current submitted aggregate vote
     * @param validator validator's operator address
     */
    OracleAPI.prototype.aggregateVote = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/oracle/voters/" + validator + "/aggregate_vote")
                        .then(function (d) { return core_1.AggregateExchangeRateVote.fromData(d.result); })];
            });
        });
    };
    /**
     * Gets the current Oracle module's parameters.
     */
    OracleAPI.prototype.parameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/oracle/parameters")
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            vote_period: Number.parseInt(d.vote_period),
                            vote_threshold: new core_1.Dec(d.vote_threshold),
                            reward_band: new core_1.Dec(d.reward_band),
                            reward_distribution_window: Number.parseInt(d.reward_distribution_window),
                            whitelist: d.whitelist.map(function (x) { return ({
                                name: x.name,
                                tobin_tax: new core_1.Dec(x.tobin_tax),
                            }); }),
                            slash_fraction: new core_1.Dec(d.slash_fraction),
                            slash_window: Number.parseInt(d.slash_window),
                            min_valid_per_window: new core_1.Dec(d.min_valid_per_window),
                        });
                    })];
            });
        });
    };
    return OracleAPI;
}(BaseAPI_1.BaseAPI));
exports.OracleAPI = OracleAPI;
//# sourceMappingURL=OracleAPI.js.map