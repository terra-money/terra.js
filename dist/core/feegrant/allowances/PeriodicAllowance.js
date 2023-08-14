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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodicAllowance = void 0;
var json_1 = require("../../../util/json");
var Coins_1 = require("../../Coins");
var BasicAllowance_1 = require("./BasicAllowance");
var any_1 = require("@terra-money/terra.proto/google/protobuf/any");
var feegrant_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant");
var Long = __importStar(require("long"));
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
var PeriodicAllowance = /** @class */ (function (_super) {
    __extends(PeriodicAllowance, _super);
    /**
     * @param basic basic allowance given per period
     * @param period the time duration in which period_spend_limit coins can be spent before that allowance is reset
     * @param period_spend_limit the maximum number of coins that can be spent in the period
     * @param period_can_spend the number of coins left to be spent before the period_reset time
     * @param period_reset the time at which this period resets and a new one begins
     */
    function PeriodicAllowance(basic, period, period_spend_limit, period_can_spend, period_reset) {
        var _this = _super.call(this) || this;
        _this.basic = basic;
        _this.period = period;
        _this.period_reset = period_reset;
        _this.period_spend_limit = new Coins_1.Coins(period_spend_limit);
        _this.period_can_spend = new Coins_1.Coins(period_can_spend);
        return _this;
    }
    PeriodicAllowance.fromAmino = function (data, isClassic) {
        var _a = data.value, basic = _a.basic, period = _a.period, period_spend_limit = _a.period_spend_limit, period_can_spend = _a.period_can_spend, period_reset = _a.period_reset;
        return new PeriodicAllowance(BasicAllowance_1.BasicAllowance.fromAmino(basic, isClassic), Number.parseInt(period), Coins_1.Coins.fromAmino(period_spend_limit), Coins_1.Coins.fromAmino(period_can_spend), new Date(period_reset));
    };
    PeriodicAllowance.prototype.toAmino = function (isClassic) {
        var _a = this, basic = _a.basic, period = _a.period, period_spend_limit = _a.period_spend_limit, period_can_spend = _a.period_can_spend, period_reset = _a.period_reset;
        return {
            type: isClassic
                ? 'feegrant/PeriodicAllowance'
                : 'cosmos-sdk/PeriodicAllowance',
            value: {
                basic: basic.toAmino(isClassic),
                period: period.toString(),
                period_spend_limit: period_spend_limit.toAmino(),
                period_can_spend: period_can_spend.toAmino(),
                period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
            },
        };
    };
    PeriodicAllowance.fromData = function (proto, _) {
        _;
        var basic = proto.basic, period = proto.period, period_spend_limit = proto.period_spend_limit, period_can_spend = proto.period_can_spend, period_reset = proto.period_reset;
        return new PeriodicAllowance(BasicAllowance_1.BasicAllowance.fromData(basic), Number.parseInt(period), Coins_1.Coins.fromData(period_spend_limit), Coins_1.Coins.fromData(period_can_spend), new Date(period_reset));
    };
    PeriodicAllowance.prototype.toData = function (_) {
        _;
        var _a = this, basic = _a.basic, period = _a.period, period_spend_limit = _a.period_spend_limit, period_can_spend = _a.period_can_spend, period_reset = _a.period_reset;
        return {
            '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance',
            basic: basic.toData(),
            period: period.toString(),
            period_spend_limit: period_spend_limit.toData(),
            period_can_spend: period_can_spend.toData(),
            period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
        };
    };
    PeriodicAllowance.fromProto = function (proto, _) {
        var _a;
        _;
        return new PeriodicAllowance(BasicAllowance_1.BasicAllowance.fromProto(proto.basic), (_a = proto.period) === null || _a === void 0 ? void 0 : _a.seconds.toNumber(), Coins_1.Coins.fromProto(proto.periodSpendLimit), Coins_1.Coins.fromProto(proto.periodCanSpend), proto.periodReset);
    };
    PeriodicAllowance.prototype.toProto = function (_) {
        _;
        var _a = this, basic = _a.basic, period = _a.period, period_spend_limit = _a.period_spend_limit, period_can_spend = _a.period_can_spend, period_reset = _a.period_reset;
        return feegrant_1.PeriodicAllowance.fromPartial({
            basic: basic,
            period: { seconds: Long.fromNumber(period) },
            periodCanSpend: period_can_spend.toProto(),
            periodReset: period_reset,
            periodSpendLimit: period_spend_limit.toProto(),
        });
    };
    PeriodicAllowance.prototype.packAny = function (isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
            value: feegrant_1.PeriodicAllowance.encode(this.toProto(isClassic)).finish(),
        });
    };
    PeriodicAllowance.unpackAny = function (msgAny, isClassic) {
        return PeriodicAllowance.fromProto(feegrant_1.PeriodicAllowance.decode(msgAny.value), isClassic);
    };
    return PeriodicAllowance;
}(json_1.JSONSerializable));
exports.PeriodicAllowance = PeriodicAllowance;
//# sourceMappingURL=PeriodicAllowance.js.map