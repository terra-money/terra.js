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
exports.Fee = void 0;
var json_1 = require("../util/json");
var Coins_1 = require("./Coins");
var numeric_1 = require("./numeric");
var tx_1 = require("@terra-money/terra.proto/cosmos/tx/v1beta1/tx");
var Long = __importStar(require("long"));
/**
 * A transaction must include a fee, otherwise it will be rejected.
 */
var Fee = /** @class */ (function (_super) {
    __extends(Fee, _super);
    /**
     * Creates a new Fee object.
     * @param gas gas limit
     * @param amount amount to be paid to validator
     */
    function Fee(gas_limit, amount, payer, granter) {
        var _this = _super.call(this) || this;
        _this.gas_limit = gas_limit;
        _this.payer = payer;
        _this.granter = granter;
        _this.amount = new Coins_1.Coins(amount);
        return _this;
    }
    Fee.fromAmino = function (data) {
        var gas = data.gas, amount = data.amount;
        return new Fee(Number.parseInt(gas), Coins_1.Coins.fromAmino(amount), '', '');
    };
    Fee.prototype.toAmino = function () {
        return {
            gas: new numeric_1.Int(this.gas_limit).toString(),
            amount: this.amount.toAmino(),
        };
    };
    Fee.fromData = function (data) {
        return new Fee(Number.parseInt(data.gas_limit), Coins_1.Coins.fromData(data.amount), data.payer, data.granter);
    };
    Fee.prototype.toData = function () {
        var _a = this, amount = _a.amount, gas_limit = _a.gas_limit, payer = _a.payer, granter = _a.granter;
        return {
            amount: amount.toData(),
            gas_limit: gas_limit.toFixed(),
            granter: granter !== null && granter !== void 0 ? granter : '',
            payer: payer !== null && payer !== void 0 ? payer : '',
        };
    };
    Fee.fromProto = function (proto) {
        return new Fee(proto.gasLimit.toNumber(), Coins_1.Coins.fromProto(proto.amount), proto.payer, proto.granter);
    };
    Fee.prototype.toProto = function () {
        var _a = this, amount = _a.amount, gas_limit = _a.gas_limit, payer = _a.payer, granter = _a.granter;
        return tx_1.Fee.fromPartial({
            amount: amount.toProto(),
            gasLimit: Long.fromNumber(gas_limit),
            granter: granter,
            payer: payer,
        });
    };
    /**
     * Gets the minimum gas prices implied by the fee. Minimum gas prices are `fee amount / gas`.
     */
    Fee.prototype.gasPrices = function () {
        return this.amount.toDecCoins().div(this.gas_limit);
    };
    return Fee;
}(json_1.JSONSerializable));
exports.Fee = Fee;
//# sourceMappingURL=Fee.js.map