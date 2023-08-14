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
exports.DistributionAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var DistributionAPI = /** @class */ (function (_super) {
    __extends(DistributionAPI, _super);
    function DistributionAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    /**
     * Gets a delegator's rewards.
     * @param delegator delegator's account address
     */
    DistributionAPI.prototype.rewards = function (delegator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var rewardsData, rewards, _i, _a, reward;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.c
                            .get("/cosmos/distribution/v1beta1/delegators/".concat(delegator, "/rewards"), params)
                            .then(function (d) { return d; })];
                    case 1:
                        rewardsData = _b.sent();
                        rewards = {};
                        for (_i = 0, _a = rewardsData.rewards; _i < _a.length; _i++) {
                            reward = _a[_i];
                            rewards[reward.validator_address] = core_1.Coins.fromData(reward.reward);
                        }
                        return [2 /*return*/, {
                                rewards: rewards,
                                total: core_1.Coins.fromData(rewardsData.total),
                            }];
                }
            });
        });
    };
    /**
     * Gets a validator's rewards.
     * @param validator validator's operator address
     */
    DistributionAPI.prototype.validatorCommission = function (validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/distribution/v1beta1/validators/".concat(validator, "/commission"), params)
                        .then(function (d) { return d.commission; })
                        .then(function (d) { return core_1.Coins.fromData(d.commission); })];
            });
        });
    };
    /**
     * Gets the withdraw address of a delegator, the address to which rewards are withdrawn.
     * @param delegator
     */
    DistributionAPI.prototype.withdrawAddress = function (delegator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/distribution/v1beta1/delegators/".concat(delegator, "/withdraw_address"), params)
                        .then(function (d) { return d.withdraw_address; })];
            });
        });
    };
    /**
     * Gets the current value of the community pool.
     */
    DistributionAPI.prototype.communityPool = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/distribution/v1beta1/community_pool", params)
                        .then(function (d) { return core_1.Coins.fromData(d.pool); })];
            });
        });
    };
    /**
     * Gets the current distribution parameters.
     */
    DistributionAPI.prototype.parameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/distribution/v1beta1/params", params)
                        .then(function (_a) {
                        var d = _a.params;
                        return ({
                            base_proposer_reward: new core_1.Dec(d.base_proposer_reward),
                            community_tax: new core_1.Dec(d.community_tax),
                            bonus_proposer_reward: new core_1.Dec(d.bonus_proposer_reward),
                            withdraw_addr_enabled: d.withdraw_addr_enabled,
                        });
                    })];
            });
        });
    };
    return DistributionAPI;
}(BaseAPI_1.BaseAPI));
exports.DistributionAPI = DistributionAPI;
//# sourceMappingURL=DistributionAPI.js.map