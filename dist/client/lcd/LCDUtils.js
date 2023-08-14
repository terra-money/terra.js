"use strict";
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
exports.LCDUtils = void 0;
var Coin_1 = require("../../core/Coin");
var numeric_1 = require("../../core/numeric");
var LCDUtils = /** @class */ (function () {
    function LCDUtils(lcd) {
        this.lcd = lcd;
    }
    /**
     * Calculates the tax that would be applied for the Coin if sent.
     * Tax = min(taxCap, taxRate * amount)
     * @param coin
     */
    LCDUtils.prototype.calculateTax = function (coin) {
        return __awaiter(this, void 0, void 0, function () {
            var rate, cap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lcd.treasury.taxRate()];
                    case 1:
                        rate = _a.sent();
                        return [4 /*yield*/, this.lcd.treasury.taxCap(coin.denom)];
                    case 2:
                        cap = _a.sent();
                        return [2 /*return*/, new Coin_1.Coin(coin.denom, numeric_1.Int.ceil(numeric_1.Dec.min(coin.amount.mul(rate), cap.amount)))];
                }
            });
        });
    };
    /**
     * Gets current validators and merges their voting power from the validator set query.
     */
    LCDUtils.prototype.validatorsWithVotingPower = function () {
        return __awaiter(this, void 0, void 0, function () {
            var validatorSet, validatorSetByPubKey, validators, next_key, validatorsRes, res, _i, validators_1, v, delegateInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lcd.tendermint.validatorSet()];
                    case 1:
                        validatorSet = (_a.sent())[0];
                        validatorSetByPubKey = validatorSet.reduce(function (m, o) {
                            m[o.pub_key.key] = o;
                            return m;
                        }, {});
                        validators = [];
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.lcd.staking.validators({
                            'pagination.key': next_key,
                        })];
                    case 3:
                        validatorsRes = _a.sent();
                        validators.push.apply(validators, validatorsRes[0]);
                        if (!validatorsRes[1].next_key)
                            return [3 /*break*/, 5];
                        next_key = validatorsRes[1].next_key;
                        _a.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5:
                        res = {};
                        for (_i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
                            v = validators_1[_i];
                            delegateInfo = validatorSetByPubKey[v.consensus_pubkey.toData().key];
                            if (delegateInfo === undefined)
                                continue;
                            res[v.operator_address] = {
                                validatorInfo: v,
                                votingPower: Number.parseInt(delegateInfo.voting_power),
                                proposerPriority: Number.parseInt(delegateInfo.proposer_priority),
                            };
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return LCDUtils;
}());
exports.LCDUtils = LCDUtils;
//# sourceMappingURL=LCDUtils.js.map