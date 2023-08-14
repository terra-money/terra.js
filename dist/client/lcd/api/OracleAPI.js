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
exports.OracleAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var OracleAPI = /** @class */ (function (_super) {
    __extends(OracleAPI, _super);
    function OracleAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    /**
     * Gets the Oracle module's currently registered exchange rate for uluna in all available denominations.
     */
    OracleAPI.prototype.exchangeRates = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/denoms/exchange_rates", params)
                        .then(function (d) { return core_1.Coins.fromData(d.exchange_rates); })];
            });
        });
    };
    /**
     * Gets the Oracle module's currently registered exchange rate for the specific denomination.
     * @param denom denomination in which to get the exchange rate of uluna
     */
    OracleAPI.prototype.exchangeRate = function (denom, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/denoms/".concat(denom, "/exchange_rate"), params)
                        .then(function (d) {
                        return core_1.Coin.fromData({
                            denom: denom,
                            amount: d.exchange_rate,
                        });
                    })];
            });
        });
    };
    /**
     * Gets the current list of active denominations.
     */
    OracleAPI.prototype.activeDenoms = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/denoms/actives", params)
                        .then(function (d) { return d.actives; })];
            });
        });
    };
    /**
     * Gets the registered feeder address associated with the validator. The feeder address is the
     * Terra account that is permitted to sign Oracle vote messages in the validator's name.
     * @param validator validator's operator address
     */
    OracleAPI.prototype.feederAddress = function (validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/validators/".concat(validator, "/feeder"), params)
                        .then(function (d) { return d.feeder_addr; })];
            });
        });
    };
    /**
     * Gets the number of missed oracle votes for the validator over the current slash window.
     * @param validator validator's operator address
     */
    OracleAPI.prototype.misses = function (validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/validators/".concat(validator, "/miss"), params)
                        .then(function (d) { return Number.parseInt(d.miss_counter); })];
            });
        });
    };
    /**
     * Gets the validator's current submitted aggregate prevote
     * @param validator validator's operator address
     */
    OracleAPI.prototype.aggregatePrevote = function (validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/validators/".concat(validator, "/aggregate_prevote"), params)
                        .then(function (d) { return core_1.AggregateExchangeRatePrevote.fromData(d.aggregate_prevote); })];
            });
        });
    };
    /**
     * Gets the validator's current submitted aggregate vote
     * @param validator validator's operator address
     */
    OracleAPI.prototype.aggregateVote = function (validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/validators/".concat(validator, "/aggregate_vote"), params)
                        .then(function (d) { return core_1.AggregateExchangeRateVote.fromData(d.aggregate_vote); })];
            });
        });
    };
    /**
     * Gets the current Oracle module's parameters.
     */
    OracleAPI.prototype.parameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.lcd.config.isClassic) {
                    throw new Error('Not supported for the network');
                }
                return [2 /*return*/, this.c
                        .get("/terra/oracle/v1beta1/params", params)
                        .then(function (_a) {
                        var d = _a.params;
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