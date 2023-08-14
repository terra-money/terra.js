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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.StakingAPI = void 0;
var core_1 = require("../../../core");
var BaseAPI_1 = require("./BaseAPI");
var Delegation_1 = require("../../../core/staking/Delegation");
var Validator_1 = require("../../../core/staking/Validator");
var Redelegation_1 = require("../../../core/staking/Redelegation");
var StakingAPI = /** @class */ (function (_super) {
    __extends(StakingAPI, _super);
    function StakingAPI(lcd) {
        var _this = _super.call(this, lcd.apiRequester) || this;
        _this.lcd = lcd;
        return _this;
    }
    /**
     * Queries all delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    StakingAPI.prototype.delegations = function (delegator, validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (delegator !== undefined && validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/cosmos/staking/v1beta1/validators/".concat(validator, "/delegations/").concat(delegator), params)
                            .then(function (_a) {
                            var data = _a.delegation_response;
                            return [
                                [Delegation_1.Delegation.fromData(data)],
                                { total: 1, next_key: '' },
                            ];
                        })];
                }
                else if (delegator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/cosmos/staking/v1beta1/delegations/".concat(delegator), params)
                            .then(function (data) { return [
                            data.delegation_responses.map(Delegation_1.Delegation.fromData),
                            data.pagination,
                        ]; })];
                }
                else if (validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/cosmos/staking/v1beta1/validators/".concat(validator, "/delegations"), params)
                            .then(function (data) { return [
                            data.delegation_responses.map(Delegation_1.Delegation.fromData),
                            data.pagination,
                        ]; })];
                }
                else {
                    throw new TypeError('arguments delegator and validator cannot both be empty');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Gets the delegation between a delegator and validator, if it exists.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    StakingAPI.prototype.delegation = function (delegator, validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.delegations(delegator, validator).then(function (delgs) { return delgs[0][0]; })];
            });
        });
    };
    /**
     * Queries all unbonding delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    StakingAPI.prototype.unbondingDelegations = function (delegator, validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (delegator !== undefined && validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/cosmos/staking/v1beta1/validators/".concat(validator, "/delegations/").concat(delegator, "/unbonding_delegation"), params)
                            .then(function (_a) {
                            var data = _a.unbond;
                            return [
                                [core_1.UnbondingDelegation.fromData(data)],
                                { next_key: '', total: 1 },
                            ];
                        })];
                }
                else if (delegator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/cosmos/staking/v1beta1/delegators/".concat(delegator, "/unbonding_delegations"), params)
                            .then(function (data) { return [
                            data.unbonding_responses.map(core_1.UnbondingDelegation.fromData),
                            data.pagination,
                        ]; })];
                }
                else if (validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/cosmos/staking/v1beta1/validators/".concat(validator, "/unbonding_delegations"), params)
                            .then(function (data) { return [
                            data.unbonding_responses.map(core_1.UnbondingDelegation.fromData),
                            data.pagination,
                        ]; })];
                }
                else {
                    throw new TypeError('arguments delegator and validator cannot both be empty');
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Gets the unbonding delegation between a delegator and validator, if it exists.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    StakingAPI.prototype.unbondingDelegation = function (delegator, validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.unbondingDelegations(delegator, validator).then(function (udelgs) { return udelgs[0][0]; })];
            });
        });
    };
    /**
     * Queries all redelegations, filterable by delegator, source validator, and target validator.
     * @param delegator delegator's account address
     * @param validatorSrc source validator's operator address (from).
     * @param validatorDst destination validator's operator address (to).
     */
    StakingAPI.prototype.redelegations = function (delegator, validatorSrc, validatorDst, _params) {
        if (_params === void 0) { _params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = __assign(__assign({}, _params), { src_validator_addr: validatorSrc, dst_validator_addr: validatorDst });
                return [2 /*return*/, this.c
                        .get("/cosmos/staking/v1beta1/delegators/".concat(delegator, "/redelegations"), params)
                        .then(function (d) { return [
                        d.redelegation_responses.map(Redelegation_1.Redelegation.fromData),
                        d.pagination,
                    ]; })];
            });
        });
    };
    /**
     * Gets all bonded validators for a delegator given its address.
     * @param delegator delegator's account address
     */
    StakingAPI.prototype.bondedValidators = function (delegator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/staking/v1beta1/delegators/".concat(delegator, "/validators"), params)
                        .then(function (d) { return [d.validators.map(Validator_1.Validator.fromData), d.pagination]; })];
            });
        });
    };
    /**
     * Get all current registered validators, including validators that are not currently in the validating set.
     */
    StakingAPI.prototype.validators = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/staking/v1beta1/validators", params)
                        .then(function (d) { return [d.validators.map(Validator_1.Validator.fromData), d.pagination]; })];
            });
        });
    };
    /**
     * Gets the validator information for a specific validator.
     * @param validator validator's operator address
     */
    StakingAPI.prototype.validator = function (validator, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/staking/v1beta1/validators/".concat(validator), params)
                        .then(function (d) { return Validator_1.Validator.fromData(d.validator); })];
            });
        });
    };
    /**
     * Gets the current staking pool.
     */
    StakingAPI.prototype.pool = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/staking/v1beta1/pool", params)
                        .then(function (_a) {
                        var d = _a.pool;
                        return ({
                            bonded_tokens: new core_1.Coin('uluna', d.bonded_tokens),
                            not_bonded_tokens: new core_1.Coin('uluna', d.not_bonded_tokens),
                        });
                    })];
            });
        });
    };
    /**
     * Gets the current Staking module's parameters.
     */
    StakingAPI.prototype.parameters = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/cosmos/staking/v1beta1/params", params)
                        .then(function (_a) {
                        var d = _a.params;
                        return ({
                            unbonding_time: Number.parseInt(d.unbonding_time),
                            max_validators: d.max_validators,
                            max_entries: d.max_entries,
                            historical_entries: d.historical_entries,
                            bond_denom: d.bond_denom,
                        });
                    })];
            });
        });
    };
    return StakingAPI;
}(BaseAPI_1.BaseAPI));
exports.StakingAPI = StakingAPI;
//# sourceMappingURL=StakingAPI.js.map