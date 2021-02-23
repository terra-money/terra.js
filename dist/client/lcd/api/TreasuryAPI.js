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
exports.TreasuryAPI = void 0;
var BaseAPI_1 = require("./BaseAPI");
var core_1 = require("../../../core");
var TreasuryAPI = /** @class */ (function (_super) {
    __extends(TreasuryAPI, _super);
    function TreasuryAPI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the current registered Tax Cap for a specified denomation.
     * @param denom denomination desired for Tax Cap query.
     */
    TreasuryAPI.prototype.taxCap = function (denom) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/treasury/tax_cap/" + denom)
                        .then(function (d) { return new core_1.Coin(denom, d.result); })];
            });
        });
    };
    /**
     * Gets the current registered Tax Rate.
     */
    TreasuryAPI.prototype.taxRate = function (height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/treasury/tax_rate", height ? { height: height } : undefined)
                        .then(function (d) { return new core_1.Dec(d.result); })];
            });
        });
    };
    /**
     * Gets the current registered Reward Weight monetary policy lever.
     */
    TreasuryAPI.prototype.rewardWeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/treasury/reward_weight")
                        .then(function (d) { return new core_1.Dec(d.result); })];
            });
        });
    };
    /**
     * Gets the tax proceeds for the epoch.
     */
    TreasuryAPI.prototype.taxProceeds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/treasury/tax_proceeds")
                        .then(function (d) { return core_1.Coins.fromData(d.result); })];
            });
        });
    };
    /**
     * Gets the seigniorage proceeds for the epoch.
     */
    TreasuryAPI.prototype.seigniorageProceeds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/treasury/seigniorage_proceeds")
                        .then(function (d) { return new core_1.Coin(core_1.Denom.LUNA, d.result); })];
            });
        });
    };
    /**
     * Gets the current Treasury module's parameters.
     */
    TreasuryAPI.prototype.parameters = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.c
                        .get("/treasury/parameters")
                        .then(function (_a) {
                        var d = _a.result;
                        return ({
                            tax_policy: core_1.PolicyConstraints.fromData(d.tax_policy),
                            reward_policy: core_1.PolicyConstraints.fromData(d.reward_policy),
                            mining_increment: new core_1.Dec(d.mining_increment),
                            seigniorage_burden_target: new core_1.Dec(d.seigniorage_burden_target),
                            window_long: Number.parseInt(d.window_long),
                            window_short: Number.parseInt(d.window_short),
                            window_probation: Number.parseInt(d.window_probation),
                        });
                    })];
            });
        });
    };
    return TreasuryAPI;
}(BaseAPI_1.BaseAPI));
exports.TreasuryAPI = TreasuryAPI;
//# sourceMappingURL=TreasuryAPI.js.map