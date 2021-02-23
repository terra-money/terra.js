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
exports.StakingAPI = void 0;
var core_1 = require("../../../core");
var BaseAPI_1 = require("./BaseAPI");
var Delegation_1 = require("../../../core/staking/Delegation");
var Validator_1 = require("../../../core/staking/Validator");
var Redelegation_1 = require("../../../core/staking/Redelegation");
var Denom_1 = require("../../../core/Denom");
var StakingAPI = /** @class */ (function (_super) {
    __extends(StakingAPI, _super);
    function StakingAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Queries all delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    StakingAPI.prototype.delegations = function (delegator, validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (delegator !== undefined && validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/staking/delegators/" + delegator + "/delegations/" + validator)
                            .then(function (data) { return [Delegation_1.Delegation.fromData(data.result)]; })];
                }
                else if (delegator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/staking/delegators/" + delegator + "/delegations")
                            .then(function (data) { return data.result.map(Delegation_1.Delegation.fromData); })];
                }
                else if (validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/staking/validators/" + validator + "/delegations")
                            .then(function (data) { return data.result.map(Delegation_1.Delegation.fromData); })];
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
                return [2 /*return*/, this.delegations(delegator, validator).then(function (delgs) { return delgs[0]; })];
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
    StakingAPI.prototype.unbondingDelegations = function (delegator, validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (delegator !== undefined && validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/staking/delegators/" + delegator + "/unbonding_delegations/" + validator)
                            .then(function (data) { return [core_1.UnbondingDelegation.fromData(data.result)]; })];
                }
                else if (delegator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/staking/delegators/" + delegator + "/unbonding_delegations")
                            .then(function (data) { return data.result.map(core_1.UnbondingDelegation.fromData); })];
                }
                else if (validator !== undefined) {
                    return [2 /*return*/, this.c
                            .get("/staking/validators/" + validator + "/unbonding_delegations")
                            .then(function (data) { return data.result.map(core_1.UnbondingDelegation.fromData); })];
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
                return [2 /*return*/, this.unbondingDelegations(delegator, validator).then(function (udelgs) { return udelgs[0]; })];
            });
        });
    };
    /**
     * Queries all redelegations, filterable by delegator, source validator, and target validator.
     * @param delegator delegator's account address
     * @param validatorSrc source validator's operator address (from).
     * @param validatorDst destination validator's operator address (to).
     */
    StakingAPI.prototype.redelegations = function (delegator, validatorSrc, validatorDst) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                params = {
                    delegator: delegator,
                    validator_from: validatorSrc,
                    validator_to: validatorDst,
                };
                return [2 /*return*/, this.c
                        .get("/staking/redelegations", params)
                        .then(function (d) { return d.result.map(Redelegation_1.Redelegation.fromData); })];
            });
        });
    };
    /**
     * Gets all bonded validators for a delegator given its address.
     * @param delegator delegator's account address
     */
    StakingAPI.prototype.bondedValidators = function (delegator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/staking/delegators/" + delegator + "/validators")
                        .then(function (d) { return d.result.map(Validator_1.Validator.fromData); })];
            });
        });
    };
    /**
     * Get all current registered validators, including validators that are not currently in the validating set.
     */
    StakingAPI.prototype.validators = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/staking/validators")
                        .then(function (d) { return d.result.map(Validator_1.Validator.fromData); })];
            });
        });
    };
    /**
     * Gets the validator information for a specific validator.
     * @param validator validator's operator address
     */
    StakingAPI.prototype.validator = function (validator) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/staking/validators/" + validator)
                        .then(function (d) { return Validator_1.Validator.fromData(d.result); })];
            });
        });
    };
    /**
     * Gets the current staking pool.
     */
    StakingAPI.prototype.pool = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/staking/pool")
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            bonded_tokens: new core_1.Coin(Denom_1.Denom.LUNA, d.bonded_tokens),
                            not_bonded_tokens: new core_1.Coin(Denom_1.Denom.LUNA, d.not_bonded_tokens),
                        });
                    })];
            });
        });
    };
    /**
     * Gets the current Staking module's parameters.
     */
    StakingAPI.prototype.parameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/staking/parameters")
                        .then(function (_a) {
                        var d = _a.result;
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